import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { STEPS } from './Sidebar';

export default function BottomNav({
  currentStep,
  onSelectStep,
  progressPercent,
}) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);
  const prevStep = currentIndex > 0 ? STEPS[currentIndex - 1] : null;
  const nextStep = currentIndex < STEPS.length - 1 ? STEPS[currentIndex + 1] : null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-100 shadow-[0_-6px_24px_rgba(139,92,246,0.08)] no-print">
      {/* Slim progress indicator bar */}
      <div className="w-full h-1 bg-purple-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-md mx-auto px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] flex items-center justify-between gap-2">
        <button
          onClick={() => prevStep && onSelectStep(prevStep.id)}
          disabled={!prevStep}
          className={`px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shrink-0 active:scale-95 ${
            prevStep
              ? 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-100'
              : 'text-slate-300 bg-slate-50 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        {/* Step Selector Dropdown */}
        <div className="flex-1 min-w-0 flex flex-col items-center">
          <select
            value={currentStep}
            onChange={(e) => onSelectStep(e.target.value)}
            aria-label="Pilih Aktivitas"
            className="w-full text-center text-xs font-bold text-purple-900 bg-purple-50/80 border border-purple-200 rounded-xl px-2 py-2 focus:outline-none truncate"
          >
            {STEPS.map((s, idx) => (
              <option key={s.id} value={s.id}>
                {idx === 0 ? 'Pembuka' : `${idx}. ${s.short}`}
              </option>
            ))}
          </select>
          <div className="text-[10px] text-slate-500 mt-0.5">
            Progres: <strong className="text-purple-600">{progressPercent}%</strong>
          </div>
        </div>

        <button
          onClick={() => nextStep && onSelectStep(nextStep.id)}
          disabled={!nextStep}
          className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all shrink-0 active:scale-95 ${
            nextStep
              ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm shadow-purple-200'
              : 'text-slate-300 bg-slate-50 cursor-not-allowed'
          }`}
        >
          <span>Lanjut</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
