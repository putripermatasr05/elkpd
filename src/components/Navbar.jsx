import React from 'react';
import {
  Compass,
  Heart,
  CheckCircle,
  Printer,
  Copy,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock,
  Grid,
  BookOpen,
} from 'lucide-react';

export default function Navbar({
  currentPage,
  onNavigate,
  lastSaved,
  onOpenPrint,
  onCopyTxt,
  onOpenReset,
  onOpenAdmin,
}) {
  const isKarier = currentPage === 'karier';
  const isEvaluasi = currentPage === 'evaluasi';
  const isHub = currentPage === 'hub';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100/80 shadow-sm no-print max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3.5 gap-2">
          
          {/* Logo & Dynamic Page Branding */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => onNavigate('hub')}
              title="Kembali ke Portal E-LKPD"
              className="flex items-center gap-2 sm:gap-3 text-left group min-w-0"
            >
              <div
                className={`w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105 shrink-0 ${
                  isEvaluasi
                    ? 'bg-[#5A3A2A] shadow-amber-900/20'
                    : 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-500 shadow-purple-200'
                }`}
              >
                {isEvaluasi ? (
                  <Heart className="w-4 h-4 sm:w-6 sm:h-6" />
                ) : isKarier ? (
                  <Compass className="w-4 h-4 sm:w-6 sm:h-6" />
                ) : (
                  <BookOpen className="w-4 h-4 sm:w-6 sm:h-6" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-display font-extrabold text-xs sm:text-lg text-slate-900 tracking-tight truncate">
                    {isKarier && (
                      <>
                        E-LKPD <span className="text-purple-600">KARIER</span>
                      </>
                    )}
                    {isEvaluasi && (
                      <>
                        E-LKPD <span className="text-[#A0522D]">EVALUASI</span>
                      </>
                    )}
                    {isHub && (
                      <>
                        PORTAL <span className="text-purple-600">E-LKPD</span>
                      </>
                    )}
                  </span>

                  <span
                    className={`hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold shrink-0 ${
                      isEvaluasi
                        ? 'bg-[#FFF2EE] text-[#A0522D] border border-amber-200/60'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {isEvaluasi ? 'Evaluasi Tindak Lanjut' : isKarier ? 'Bimbingan Karier' : 'TemanBK'}
                  </span>
                </div>

                <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block truncate">
                  {isKarier && 'Kenali Minat, Tentukan Pilihan, Rencanakan Masa Depan'}
                  {isEvaluasi && 'Refleksi Diri & Pemantauan Perkembangan Siswa'}
                  {isHub && 'Pilih Lembar Kerja Peserta Didik Bimbingan & Konseling'}
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Direct Page Switcher Pill */}
          <div className="hidden lg:flex items-center gap-2">
            {isKarier && (
              <button
                onClick={() => onNavigate('evaluasi')}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50/80 hover:bg-amber-100/80 text-[#5A3A2A] border border-amber-200/80 transition-all shadow-sm group"
                title="Beralih ke instrumen Evaluasi Tindak Lanjut"
              >
                <Heart className="w-3.5 h-3.5 text-amber-700 group-hover:scale-110 transition-transform" />
                <span>Buka E-LKPD Evaluasi Tindak Lanjut</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
              </button>
            )}

            {isEvaluasi && (
              <button
                onClick={() => onNavigate('karier')}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-all shadow-sm group"
                title="Beralih ke instrumen Pilih Karierku"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-purple-600" />
                <Compass className="w-3.5 h-3.5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span>Buka E-LKPD Pilih Karierku</span>
              </button>
            )}

            {!isHub && (
              <button
                onClick={() => onNavigate('hub')}
                className="p-1.5 px-3 rounded-full text-xs font-semibold text-slate-600 hover:text-purple-700 hover:bg-purple-50 border border-slate-200/80 transition-all flex items-center gap-1.5"
                title="Lihat semua lembar kerja di Portal E-LKPD"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Pilihan LKPD</span>
              </button>
            )}
          </div>

          {/* Action Buttons Right Side */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Auto save badge on desktop */}
            {!isHub && (
              <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tersimpan</span>
              </div>
            )}

            {!isHub && (
              <>
                <button
                  onClick={onCopyTxt}
                  title="Salin ringkasan teks"
                  className="p-1.5 sm:px-3 sm:py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 border border-purple-200"
                >
                  <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 shrink-0" />
                  <span className="hidden md:inline">Salin TXT</span>
                </button>

                <button
                  onClick={onOpenPrint}
                  title="Cetak atau simpan PDF"
                  className={`p-1.5 sm:px-3.5 sm:py-2 rounded-xl text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-md ${
                    isEvaluasi
                      ? 'bg-[#5A3A2A] hover:bg-[#462c1f] shadow-amber-900/20'
                      : 'bg-purple-600 hover:bg-purple-700 shadow-purple-200'
                  }`}
                >
                  <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="hidden sm:inline">Cetak / PDF</span>
                </button>

                <button
                  onClick={onOpenReset}
                  title="Kosongkan lembar kerja"
                  className="hidden sm:flex p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Guru BK Admin Portal Button */}
            <button
              onClick={onOpenAdmin}
              title="Portal Dashboard Guru BK"
              className="p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-1 sm:gap-1.5 shadow-sm active:scale-95"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Guru BK</span>
            </button>
          </div>
        </div>

        {/* Mobile Page Indicator & Cross-link Bar */}
        {!isHub && (
          <div className="flex lg:hidden items-center justify-between py-1 px-2.5 rounded-xl bg-purple-50/80 border border-purple-100/90 mb-1.5 text-xs">
            {isKarier ? (
              <>
                <span className="text-[11px] font-bold text-purple-900 truncate mr-2">
                  1. Pilih Karierku
                </span>
                <button
                  onClick={() => onNavigate('evaluasi')}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-white px-2.5 py-1 rounded-lg border border-amber-200/80 shadow-xs shrink-0"
                >
                  <span>Ke Evaluasi</span>
                  <ArrowRight className="w-3 h-3 text-amber-700" />
                </button>
              </>
            ) : (
              <>
                <span className="text-[11px] font-bold text-[#5A3A2A] truncate mr-2">
                  2. Evaluasi Tindak Lanjut
                </span>
                <button
                  onClick={() => onNavigate('karier')}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-800 bg-white px-2.5 py-1 rounded-lg border border-purple-200/80 shadow-xs shrink-0"
                >
                  <ArrowLeft className="w-3 h-3 text-purple-700" />
                  <span>Ke Karier</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}