import React from 'react';
import {
  Compass,
  Heart,
  CheckCircle2,
  Printer,
  Grid,
  BookOpen,
} from 'lucide-react';

export default function Navbar({
  currentPage,
  onNavigate,
  onOpenPrint,
}) {
  const isKarier = currentPage === 'karier';
  const isEvaluasi = currentPage === 'evaluasi';
  const isHub = currentPage === 'hub';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-purple-100/70 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          
          {/* Logo & Judul Bersih */}
          <button
            onClick={() => onNavigate('hub')}
            title="Kembali ke Pilihan LKPD"
            className="flex items-center gap-2.5 sm:gap-3 text-left group"
          >
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 shrink-0 ${
                isEvaluasi
                  ? 'bg-[#5A3A2A]'
                  : 'bg-gradient-to-tr from-purple-600 to-indigo-600'
              }`}
            >
              {isEvaluasi ? (
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : isKarier ? (
                <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="font-display font-black text-sm sm:text-base text-slate-800 tracking-tight">
                {isKarier && (
                  <>
                    E-LKPD <span className="text-purple-600 font-extrabold">PILIH KARIERKU</span>
                  </>
                )}
                {isEvaluasi && (
                  <>
                    E-LKPD <span className="text-[#A0522D] font-extrabold">EVALUASI BK</span>
                  </>
                )}
                {isHub && (
                  <>
                    PORTAL <span className="text-purple-600 font-extrabold">E-LKPD BK</span>
                  </>
                )}
              </span>

              <span
                className={`hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  isEvaluasi
                    ? 'bg-[#FFF2EE] text-[#A0522D] border border-amber-200/60'
                    : 'bg-purple-100/80 text-purple-700'
                }`}
              >
                {isEvaluasi ? 'Refleksi Diri' : isKarier ? 'Bimbingan Karier' : 'TemanBK'}
              </span>
            </div>
          </button>

          {/* Area Kanan: Hanya yang Esensial untuk Siswa/Publik */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Indikator Auto-save (Memberikan ketenangan bagi siswa saat mengisi) */}
            {!isHub && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] sm:text-xs font-medium border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="hidden sm:inline">Tersimpan</span>
              </div>
            )}

            {/* Tombol Cetak / PDF */}
            {!isHub && (
              <button
                onClick={onOpenPrint}
                title="Cetak atau simpan lembar kerja ke PDF"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-xs active:scale-95 ${
                  isEvaluasi
                    ? 'bg-[#5A3A2A] hover:bg-[#462c1f]'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Cetak / PDF</span>
              </button>
            )}

            {/* Tombol Kembali ke Hub/Pilihan LKPD (Bila sedang di dalam LKPD) */}
            {!isHub && (
              <button
                onClick={() => onNavigate('hub')}
                title="Pilihan Lembar Kerja Lainnya"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-all border border-slate-200/80"
              >
                <Grid className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">Semua LKPD</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}