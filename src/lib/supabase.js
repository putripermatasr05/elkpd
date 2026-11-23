import { createClient } from '@supabase/supabase-js';
import { calculateRIASEC } from '../data/elkpdData.js';

export const SUPABASE_URL =
  import.meta.env?.VITE_SUPABASE_URL || 'https://kjjwcehdxhahvmjbysxx.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_tsqg2-bsVvH8mTAL2ocw0g__CnfsicV';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const LS_SUBMISSIONS = 'elkpd_local_submissions_v1';
const DEFAULT_ADMIN_PIN = import.meta.env?.VITE_ADMIN_PIN || '2405';

export const verifyAdminPin = (pin) => {
  const clean = String(pin || '').trim();
  const configuredPin = import.meta.env?.VITE_ADMIN_PIN ? String(import.meta.env.VITE_ADMIN_PIN).trim() : null;

  if (configuredPin) {
    return clean === configuredPin;
  }
  return clean === DEFAULT_ADMIN_PIN || clean === 'bkadmin';
};

/* ─── SQL Setup Script untuk Supabase SQL Editor ─── */
export const ELKPD_SQL_SETUP = `-- Buat Tabel Pengumpulan Jawaban E-LKPD BK
CREATE TABLE IF NOT EXISTS public.elkpd_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lkpd_type TEXT NOT NULL,           -- 'lkpd1' (Pilih Karierku) atau 'lkpd2' (Evaluasi Tindak Lanjut)
    student_name TEXT NOT NULL,
    student_class TEXT NOT NULL,
    filled_date TEXT,
    holland_code TEXT,
    plan_a_career TEXT,
    eval_execution TEXT,
    eval_helpfulness TEXT,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Aktifkan Row Level Security (RLS) & Izinkan Akses Publik (Anon)
ALTER TABLE public.elkpd_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public elkpd_submissions access" ON public.elkpd_submissions;
CREATE POLICY "Public elkpd_submissions access"
    ON public.elkpd_submissions
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Index untuk mempercepat pencarian di Dashboard Guru BK
CREATE INDEX IF NOT EXISTS idx_elkpd_type ON public.elkpd_submissions (lkpd_type);
CREATE INDEX IF NOT EXISTS idx_elkpd_created_at ON public.elkpd_submissions (created_at DESC);
`;

/* ─── Cek apakah tabel elkpd_submissions sudah siap di Supabase ─── */
export const checkElkpdTable = async () => {
  try {
    const { error } = await supabase
      .from('elkpd_submissions')
      .select('id')
      .limit(1);
    if (!error) return { ready: true, error: null };
    return { ready: false, error: error.message || error.code };
  } catch (err) {
    return { ready: false, error: err.message };
  }
};

/* ─── Kirim Jawaban Siswa ke Supabase (+ fallback lokal) ─── */
export const submitLKPDResponse = async (lkpdType, data) => {
  const studentName = (data.nama || '').trim();
  const studentClass = (data.kelas || '').trim();

  if (!studentName || !studentClass) {
    throw new Error('Mohon lengkapi Nama Lengkap dan Kelas terlebih dahulu sebelum mengirim jawaban.');
  }

  const riasec = lkpdType === 'lkpd1' ? calculateRIASEC(data.riasecAnswers) : null;

  const record = {
    lkpd_type: lkpdType,
    student_name: studentName,
    student_class: studentClass,
    filled_date: data.tanggal || new Date().toISOString().split('T')[0],
    holland_code: lkpdType === 'lkpd1' ? riasec?.hollandCode || '' : null,
    plan_a_career: lkpdType === 'lkpd1' ? data.decision?.planACareer || '' : null,
    eval_execution: lkpdType === 'lkpd2' ? data.questionOne || '' : null,
    eval_helpfulness: lkpdType === 'lkpd2' ? data.questionTwo || '' : null,
    payload: data,
  };

  // 1. Coba kirim ke Supabase
  try {
    const { data: inserted, error } = await supabase
      .from('elkpd_submissions')
      .insert([record])
      .select()
      .single();

    if (!error && inserted) {
      return { success: true, source: 'supabase', record: inserted };
    }
    console.warn('Supabase insert error, fallback ke localStorage:', error?.message);
  } catch (err) {
    console.warn('Supabase unreachable, fallback ke localStorage:', err.message);
  }

  // 2. Fallback simpan ke localStorage agar tidak hilang
  const localRecord = {
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    ...record,
    created_at: new Date().toISOString(),
    _isLocal: true,
  };

  try {
    const existing = JSON.parse(localStorage.getItem(LS_SUBMISSIONS) || '[]');
    existing.unshift(localRecord);
    localStorage.setItem(LS_SUBMISSIONS, JSON.stringify(existing));
  } catch (e) {
    console.error('LocalStorage fallback failed:', e);
  }

  return { success: true, source: 'local', record: localRecord };
};

/* ─── Ambil Semua Jawaban untuk Dashboard Guru BK ─── */
export const fetchAllSubmissions = async () => {
  let remoteData = [];
  let tableReady = false;

  try {
    const { data, error } = await supabase
      .from('elkpd_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      remoteData = data;
      tableReady = true;
    }
  } catch (err) {
    console.warn('Fetch Supabase gagal:', err.message);
  }

  let localData = [];
  try {
    localData = JSON.parse(localStorage.getItem(LS_SUBMISSIONS) || '[]');
  } catch {
    localData = [];
  }

  // Gabungkan remote & local (jika ada fallback lokal)
  const combined = [...remoteData, ...localData].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return { submissions: combined, tableReady, remoteCount: remoteData.length, localCount: localData.length };
};

/* ─── Hapus 1 Data Jawaban (untuk Admin) ─── */
export const deleteSubmission = async (item) => {
  if (item._isLocal || String(item.id).startsWith('local_')) {
    try {
      const existing = JSON.parse(localStorage.getItem(LS_SUBMISSIONS) || '[]');
      const filtered = existing.filter((x) => x.id !== item.id);
      localStorage.setItem(LS_SUBMISSIONS, JSON.stringify(filtered));
      return true;
    } catch {
      return false;
    }
  }

  try {
    const { error } = await supabase
      .from('elkpd_submissions')
      .delete()
      .eq('id', item.id);
    return !error;
  } catch {
    return false;
  }
};

/* ─── Export Data ke CSV (Siap Buka di Excel / Google Sheets) ─── */
const escapeCSV = (val) => {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""').replace(/\r?\n/g, ' ');
  return `"${str}"`;
};

export const exportSubmissionsToCSV = (submissions, filterType = 'all') => {
  if (!submissions || submissions.length === 0) return false;

  let headers = [];
  let rows = [];

  if (filterType === 'lkpd1') {
    headers = [
      'Waktu Kirim',
      'Nama Lengkap',
      'Kelas',
      'Tanggal Pengisian',
      'Hobi & Kegiatan',
      'Kelebihan Diri',
      'Pengembangan Diri',
      'Nilai Hidup',
      'Holland Code',
      'Karier Eksplorasi 1',
      'Karier Eksplorasi 2',
      'Karier Eksplorasi 3',
      'Investigasi Profesi',
      'Jalur Studi',
      'Hard Skills',
      'Soft Skills',
      'Tantangan',
      'Prospek Masa Depan',
      'Plan A (Karier)',
      'Plan A (Pendidikan)',
      'Plan A (Alasan)',
      'Plan B (Karier)',
      'Plan B (Pendidikan)',
      'Dukungan Dibutuhkan',
      'Aksi Jangka Pendek',
      'Aksi Jangka Menengah',
      'Aksi Jangka Panjang',
      'Wawasan Baru',
      'Komitmen Pribadi',
    ];

    rows = submissions.map((s) => {
      const p = s.payload || {};
      const exp = p.exploredCareers || [];
      return [
        new Date(s.created_at).toLocaleString('id-ID'),
        s.student_name,
        s.student_class,
        s.filled_date,
        [...(p.hobbies || []), p.otherHobbies].filter(Boolean).join('; '),
        p.strengths,
        p.areasToImprove,
        p.coreValues,
        s.holland_code,
        exp[0]?.title ? `${exp[0].title} (${exp[0].riasecType || '-'})` : '',
        exp[1]?.title ? `${exp[1].title} (${exp[1].riasecType || '-'})` : '',
        exp[2]?.title ? `${exp[2].title} (${exp[2].riasecType || '-'})` : '',
        p.investigation?.careerName,
        p.investigation?.educationPath,
        p.investigation?.hardSkills,
        p.investigation?.softSkills,
        p.investigation?.challenges,
        p.investigation?.careerOutlook,
        p.decision?.planACareer,
        p.decision?.planAEducation,
        p.decision?.planAReason,
        p.decision?.planBCareer,
        p.decision?.planBEducation,
        p.decision?.supportNeeded,
        p.actionPlan?.shortTerm,
        p.actionPlan?.mediumTerm,
        p.actionPlan?.longTerm,
        p.reflection?.newInsights,
        p.reflection?.commitmentStatement,
      ];
    });
  } else if (filterType === 'lkpd2') {
    headers = [
      'Waktu Kirim',
      'Nama Lengkap',
      'Kelas',
      'Tanggal Pengisian',
      '1. Pelaksanaan Tindak Lanjut',
      '2. Manfaat Tindak Lanjut',
      '3. Perubahan Positif',
      '4. Kendala Dihadapi',
      '5. Langkah Kecil Selanjutnya',
    ];

    rows = submissions.map((s) => {
      const p = s.payload || {};
      return [
        new Date(s.created_at).toLocaleString('id-ID'),
        s.student_name,
        s.student_class,
        s.filled_date,
        p.questionOne || s.eval_execution,
        p.questionTwo || s.eval_helpfulness,
        p.questionThree,
        p.questionFour,
        p.questionFive,
      ];
    });
  } else {
    headers = [
      'Waktu Kirim',
      'Jenis E-LKPD',
      'Nama Lengkap',
      'Kelas',
      'Tanggal Pengisian',
      'Holland Code',
      'Plan A Karier',
      'Pelaksanaan Evaluasi',
      'Manfaat Evaluasi',
      'Ringkasan Refleksi / Komitmen',
    ];

    rows = submissions.map((s) => {
      const p = s.payload || {};
      const isLkpd1 = s.lkpd_type === 'lkpd1';
      return [
        new Date(s.created_at).toLocaleString('id-ID'),
        isLkpd1 ? 'Pilih Karierku' : 'Evaluasi Tindak Lanjut BK',
        s.student_name,
        s.student_class,
        s.filled_date,
        isLkpd1 ? s.holland_code : '-',
        isLkpd1 ? s.plan_a_career || p.decision?.planACareer : '-',
        !isLkpd1 ? s.eval_execution || p.questionOne : '-',
        !isLkpd1 ? s.eval_helpfulness || p.questionTwo : '-',
        isLkpd1 ? p.reflection?.commitmentStatement : p.questionThree,
      ];
    });
  }

  const csvContent =
    '\uFEFF' + // UTF-8 BOM agar Excel langsung membaca karakter Indonesia dengan benar
    [headers.map(escapeCSV).join(','), ...rows.map((r) => r.map(escapeCSV).join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const label = filterType === 'lkpd1' ? 'Pilih_Karierku' : filterType === 'lkpd2' ? 'Evaluasi_BK' : 'Semua_ELKPD';
  const dateTag = new Date().toISOString().split('T')[0];
  link.href = url;
  link.download = `Rekap_${label}_${dateTag}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};
