import React, { useState } from 'react';
import { Sparkles, User, Calendar, GraduationCap, CheckCircle2, BookOpen, ChevronDown, ChevronUp, ArrowRight, Award } from 'lucide-react';

export default function CoverSection({ data, onChange, onStart }) {
  const [showGoals, setShowGoals] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 text-white p-5 sm:p-10 shadow-xl shadow-purple-900/15">
        {/* Glow ambient background elements */}
        <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-purple-400/20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Institution Header Badges */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3.5 sm:mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20 text-purple-100">
              <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
              <span>ULM Banjarmasin</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-amber-400/20 text-amber-200 border border-amber-300/30">
              E-LKPD Karier
            </span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-5xl tracking-tight text-white mb-1.5 leading-tight">
            PILIH KARIERKU
          </h1>
          <p className="text-purple-100 text-sm sm:text-lg font-medium max-w-2xl">
            E-LKPD Layanan Bimbingan dan Konseling Bidang Karier
          </p>
          <p className="text-amber-200/90 text-xs sm:text-sm italic mt-1 font-sans">
            &ldquo;Kenali Minat, Tentukan Pilihan, Rencanakan Masa Depan&rdquo;
          </p>

          <div className="mt-4 sm:mt-6 p-3.5 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-base leading-relaxed text-purple-50">
            <strong>Selamat datang di E-LKPD PILIH KARIERKU!</strong> Lembar kerja ini membantumu mengenali potensi, memetakan minat Holland (RIASEC), memilih jalur karier impian, dan menyusun rencana aksi nyata.
          </div>

          <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3">
            <button
              onClick={onStart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-purple-900 font-bold hover:bg-purple-50 transition-all shadow-lg active:scale-95 text-sm sm:text-base"
            >
              <span>Mulai Pengisian</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold transition-all border border-white/20 text-xs sm:text-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>{showGuide ? 'Tutup Panduan' : 'Baca Panduan Penggunaan'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Identitas Siswa Card */}
      <div className="glass-card p-5 sm:p-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-5 border-b border-purple-100 pb-3">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base sm:text-lg text-slate-800">
              Identitas Peserta Didik
            </h2>
            <p className="text-xs text-slate-500">
              Lengkapi data dirimu sebelum mengerjakan aktivitas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-500" />
              Nama Lengkap <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.nama || ''}
              onChange={(e) => onChange('nama', e.target.value)}
              placeholder="Contoh: Putri Permata Sari"
              className="lkpd-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-purple-500" />
              Kelas / Jenjang <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.kelas || ''}
              onChange={(e) => onChange('kelas', e.target.value)}
              placeholder="Contoh: XII MIPA 1"
              className="lkpd-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              Tanggal Pengisian
            </label>
            <input
              type="date"
              value={data.tanggal || ''}
              onChange={(e) => onChange('tanggal', e.target.value)}
              className="lkpd-input"
            />
          </div>
        </div>
      </div>

      {/* Panduan Penggunaan Dropdown */}
      {showGuide && (
        <div className="card-pastel-yellow p-5 sm:p-7 transition-all">
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="font-display font-bold text-sm sm:text-lg text-amber-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 shrink-0" />
              <span>Panduan Penggunaan E-LKPD</span>
            </h3>
            <button
              onClick={() => setShowGuide(false)}
              className="text-xs text-amber-800 font-semibold hover:underline"
            >
              Tutup
            </button>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-amber-950/90 leading-relaxed font-sans">
            <li><strong>Kerjakan Secara Runtut:</strong> Terdapat 7 aktivitas terpadu mulai dari mengenal diri, tes minat Holland (RIASEC), investigasi profesi, Plan A & Plan B, hingga rencana aksi nyata.</li>
            <li><strong>Isi dengan Jujur:</strong> Tidak ada jawaban yang salah. Hasil terbaik lahir dari kejujuranmu mengevaluasi diri.</li>
            <li><strong>Simpan Otomatis & Kirim ke Guru BK:</strong> Jawaban tersimpan otomatis di HP/browsermu. Di Aktivitas 6, tekan tombol <strong>Kirim Jawaban ke Guru BK</strong> agar masuk ke rekap.</li>
            <li><strong>Unduh / Cetak PDF:</strong> Kamu dapat mencetak atau menyimpan portofolio kariermu dalam format PDF maupun TXT.</li>
          </ol>
        </div>
      )}

      {/* Tujuan Kegiatan Accordion */}
      <div className="glass-card p-5 sm:p-6">
        <button
          onClick={() => setShowGoals(!showGoals)}
          className="w-full flex items-center justify-between text-left group gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-bold text-sm sm:text-base text-slate-800 group-hover:text-purple-700 transition-colors">
                Tujuan Kegiatan Layanan Karier
              </h3>
              <p className="text-xs text-slate-500 truncate">
                7 kompetensi yang diharapkan dicapai peserta didik
              </p>
            </div>
          </div>
          <div className="p-1.5 rounded-lg bg-purple-50 text-purple-700 shrink-0">
            {showGoals ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showGoals && (
          <div className="mt-4 pt-4 border-t border-purple-50 grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
            {[
              'Mengenali minat, bakat, kelebihan, dan potensi diri secara mendalam.',
              'Memahami tipe kepribadian karier berdasarkan teori John Holland (RIASEC).',
              'Mengeksplorasi berbagai alternatif profesi yang relevan dengan tipe minat dominan.',
              'Melakukan investigasi mendalam terhadap profesi impian (jalur studi, skill, dan prospek).',
              'Mengambil keputusan karier strategis dengan menyusun Pilihan Utama (Plan A) & Cadangan (Plan B).',
              'Menyusun Rencana Aksi Nyata (Action Plan) jangka pendek, menengah, dan panjang.',
              'Merefleksikan proses bimbingan dan membangun komitmen pribadi untuk masa depan.',
            ].map((goal, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-50/50 border border-purple-100/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 leading-snug">{goal}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
