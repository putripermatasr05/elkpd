import React, { useState } from 'react';
import { Sparkles, User, Calendar, GraduationCap, CheckCircle2, BookOpen, ChevronDown, ChevronUp, ArrowRight, Award } from 'lucide-react';

export default function CoverSection({ data, onChange, onStart }) {
  const [showGoals, setShowGoals] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="space-y-6">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 text-white p-6 sm:p-10 shadow-xl shadow-purple-900/15">
        {/* Glow ambient background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-400/20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          {/* Institution Header Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20 text-purple-100">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              Universitas Lambung Mangkurat
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20 text-purple-100">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              Audere Guidance & Counseling
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-300/30">
              E-LKPD Karier Siswa
            </span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-2">
            PILIH KARIERKU
          </h1>
          <p className="text-purple-200 text-base sm:text-lg font-medium max-w-2xl">
            E-LKPD Layanan Bimbingan dan Konseling Bidang Karier
          </p>
          <p className="text-amber-200/90 text-sm italic mt-1 font-sans">
            "Kenali Minat, Tentukan Pilihan, Rencanakan Masa Depan"
          </p>

          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-sm sm:text-base leading-relaxed text-purple-100">
            👋 <strong>Selamat datang di E-LKPD PILIH KARIERKU!</strong> Lembar kerja ini dirancang khusus untuk memandumu mengenali potensi, memetakan minat berdasarkan teori kepribadian Holland (RIASEC), memilih jalur karier impian, dan menyusun rencana aksi nyata demi masa depanmu yang gemilang.
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-purple-900 font-bold hover:bg-purple-50 transition-all shadow-lg hover:scale-[1.02] active:scale-95 text-sm sm:text-base"
            >
              <span>Mulai Pengisian</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-semibold transition-all border border-white/20 text-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>{showGuide ? 'Tutup Panduan' : '📘 Baca Panduan Penggunaan'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Identitas Siswa Card */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-5 border-b border-purple-100 pb-3">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg text-slate-800">
              Identitas Peserta Didik
            </h2>
            <p className="text-xs text-slate-500">
              Silakan lengkapi data dirimu sebelum mengerjakan seluruh aktivitas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-500" />
              Nama Lengkap
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
              Kelas / Jenjang
            </label>
            <input
              type="text"
              value={data.kelas || ''}
              onChange={(e) => onChange('kelas', e.target.value)}
              placeholder="Contoh: XII MIPA 1 / XII SMK"
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
        <div className="card-pastel-yellow p-6 sm:p-7 transition-all animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-base sm:text-lg text-amber-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-700" />
              📘 Panduan Penggunaan E-LKPD “PILIH KARIERKU”
            </h3>
            <button
              onClick={() => setShowGuide(false)}
              className="text-xs text-amber-800 font-semibold hover:underline"
            >
              Tutup
            </button>
          </div>
          <ol className="list-decimal list-inside space-y-2.5 text-sm text-amber-950/90 leading-relaxed font-sans">
            <li><strong>Pelajari Setiap Aktivitas Secara Runtut:</strong> Terdapat 7 aktivitas terpadu mulai dari mengenali diri (Who Am I), tes minat Holland (RIASEC), investigasi profesi, keputusan Plan A & Plan B, hingga rencana aksi nyata.</li>
            <li><strong>Isi dengan Jujur & Apa Adanya:</strong> Tidak ada jawaban yang salah. Hasil terbaik lahir dari kejujuranmu mengevaluasi diri.</li>
            <li><strong>Fitur Penyimpanan Otomatis:</strong> Setiap jawaban yang kamu ketik akan otomatis tersimpan di peramban (browser) gawaimu. Kamu bisa melanjutkan kapan saja tanpa takut hilang.</li>
            <li><strong>Unduh / Cetak Portofolio:</strong> Setelah selesai hingga Aktivitas 6, kamu dapat mengunduh berkas jawaban atau mencetaknya dalam format PDF untuk diserahkan ke Guru BK atau didiskusikan bersama orang tua.</li>
            <li><strong>Lanjutan Evaluasi:</strong> Kamu dapat beralih ke tab <strong>"2. Evaluasi Tindak Lanjut"</strong> untuk merefleksikan progres perkembangan kariermu setelah sesi bimbingan.</li>
          </ol>
        </div>
      )}

      {/* Tujuan Kegiatan Accordion */}
      <div className="glass-card p-6">
        <button
          onClick={() => setShowGoals(!showGoals)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-800 group-hover:text-purple-700 transition-colors">
                Tujuan Kegiatan Layanan Karier
              </h3>
              <p className="text-xs text-slate-500">
                Kompetensi yang diharapkan dicapai peserta didik setelah mengisi E-LKPD ini
              </p>
            </div>
          </div>
          <div className="p-1 rounded-lg bg-purple-50 text-purple-700">
            {showGoals ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showGoals && (
          <div className="mt-4 pt-4 border-t border-purple-50 grid grid-cols-1 md:grid-cols-2 gap-3">
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
