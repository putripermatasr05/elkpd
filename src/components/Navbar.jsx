import React from 'react';
import { BookOpen, CheckCircle, Printer, Copy, RotateCcw, Sparkles, Heart } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  lastSaved,
  onOpenPrint,
  onCopyTxt,
  onOpenReset,
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-3 gap-2">
          {/* Logo & App title */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-purple-200 shrink-0">
              <BookOpen className="w-4 h-4 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-sm sm:text-xl text-slate-800 tracking-tight">
                  E-LKPD <span className="text-purple-600">BK</span>
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-purple-100 text-purple-700">
                  TemanBK
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">
                Layanan Bimbingan & Konseling
              </p>
            </div>
          </div>

          {/* LKPD Tabs Switcher (Desktop / Tablet view) */}
          <div className="hidden sm:flex items-center bg-purple-50/90 p-1 rounded-2xl border border-purple-100/80">
            <button
              onClick={() => setActiveTab('lkpd1')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'lkpd1'
                  ? 'bg-white text-purple-700 shadow-sm shadow-purple-100'
                  : 'text-slate-600 hover:text-purple-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>1. Pilih Karierku</span>
            </button>
            <button
              onClick={() => setActiveTab('lkpd2')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'lkpd2'
                  ? 'bg-white text-amber-900 shadow-sm shadow-amber-100'
                  : 'text-slate-600 hover:text-amber-800'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-amber-600" />
              <span>2. Evaluasi Tindak Lanjut</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Auto save badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tersimpan</span>
            </div>

            <button
              onClick={onCopyTxt}
              title="Salin ringkasan teks"
              className="p-1.5 sm:px-3 sm:py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 border border-purple-200"
            >
              <Copy className="w-4 h-4 text-purple-600" />
              <span className="hidden md:inline">Salin TXT</span>
            </button>

            <button
              onClick={onOpenPrint}
              title="Cetak atau simpan PDF"
              className="p-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-md shadow-purple-200"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Cetak / PDF</span>
            </button>

            <button
              onClick={onOpenReset}
              title="Hapus jawaban"
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher Row */}
        <div className="grid grid-cols-2 sm:hidden bg-purple-50/90 p-1 rounded-xl border border-purple-100/80 mb-2 gap-1">
          <button
            onClick={() => setActiveTab('lkpd1')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all truncate ${
              activeTab === 'lkpd1'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-slate-600'
            }`}
          >
            <Sparkles className="w-3 h-3 text-purple-600 shrink-0" />
            <span className="truncate">1. Pilih Karierku</span>
          </button>
          <button
            onClick={() => setActiveTab('lkpd2')}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-bold transition-all truncate ${
              activeTab === 'lkpd2'
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-slate-600'
            }`}
          >
            <Heart className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="truncate">2. Evaluasi Tindak Lanjut</span>
          </button>
        </div>
      </div>
    </header>
  );
}
