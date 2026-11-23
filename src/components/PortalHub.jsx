import React from 'react';
import {
  Compass,
  Heart,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Lock,
  Layers,
  Award,
  Clock,
  FileText,
  Calendar,
  Send,
} from 'lucide-react';

export default function PortalHub({ onSelectLKPD, onOpenAdmin }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2 sm:py-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 via-indigo-700 to-slate-900 text-white p-6 sm:p-12 shadow-xl shadow-purple-900/15">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20 text-purple-100">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Universitas Lambung Mangkurat</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20 text-purple-100">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>Bimbingan & Konseling</span>
            </span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-3 leading-tight">
            Portal E-LKPD BK
          </h1>
          <p className="text-purple-100 text-sm sm:text-lg font-medium leading-relaxed">
            Platform Lembar Kerja Peserta Didik Digital untuk Layanan Bimbingan dan Konseling. Pilih instrumen layanan di bawah ini sesuai arahan Guru BK:
          </p>
        </div>
      </div>

      {/* Grid of Two Distinct LKPD Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: E-LKPD Pilih Karierku */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-purple-200/80 hover:border-purple-300 hover:shadow-xl transition-all duration-300 group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-200 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200/60">
                Instrumen 1
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 block mb-1">
                Layanan Bimbingan Karier
              </span>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-800 group-hover:text-purple-700 transition-colors">
                E-LKPD: Pilih Karierku
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Panduan komprehensif 7 tahapan untuk memetakan kepribadian Holland (RIASEC), mengeksplorasi profesi impian, merancang Plan A & B, serta menyusun Action Plan masa depan.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="pt-2 space-y-2 border-t border-purple-100/80">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Asesmen Minat Holland (RIASEC 6 Tipe)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Investigasi Jalur Pendidikan & Karier</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Penyusunan Rencana Aksi (Pendek, Menengah, Panjang)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Tersimpan Otomatis & Terkirim ke Guru BK</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onSelectLKPD('karier')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold transition-all shadow-md shadow-purple-200 active:scale-95 text-sm sm:text-base"
            >
              <span>Buka E-LKPD Pilih Karierku</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: E-LKPD Evaluasi Tindak Lanjut */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-amber-200/80 hover:border-amber-300 hover:shadow-xl transition-all duration-300 group bg-gradient-to-b from-white via-amber-50/20 to-white">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#5A3A2A] text-white flex items-center justify-center shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform">
                <Heart className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF2EE] text-[#A0522D] border border-amber-200/60">
                Instrumen 2
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                Refleksi & Monitoring Layanan BK
              </span>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-800 group-hover:text-[#5A3A2A] transition-colors">
                E-LKPD: Evaluasi Tindak Lanjut
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Instrumen evaluasi mandiri berisi 5 pertanyaan refleksi untuk melihat tingkat keterlaksanaan rencana, perubahan positif, kendala yang dihadapi, serta langkah lanjutan siswa.
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="pt-2 space-y-2 border-t border-amber-100/80">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Tingkat Keterlaksanaan Rencana Aksi</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Refleksi Kebermaknaan & Dampak Positif</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Identifikasi Hambatan & Solusi Konkret</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Pengiriman Langsung ke Database Guru BK</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => onSelectLKPD('evaluasi')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#5A3A2A] hover:bg-[#462c1f] text-white font-bold transition-all shadow-md active:scale-95 text-sm sm:text-base"
            >
              <span>Buka E-LKPD Evaluasi Tindak Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Teacher / Admin Access Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-800 flex items-center justify-center text-amber-400 shrink-0 border border-slate-700">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white">
              Portal Guru Bimbingan dan Konseling
            </h3>
            <p className="text-xs text-slate-400">
              Pantau jawaban siswa secara langsung, unduh data CSV/Excel, dan kelola dokumen E-LKPD.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAdmin}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 active:scale-95 flex items-center justify-center gap-1.5"
        >
          <span>Masuk Dashboard Guru BK</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}