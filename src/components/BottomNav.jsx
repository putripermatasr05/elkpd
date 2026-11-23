import React from 'react';
import { ChevronLeft, ChevronRight, ListOrdered } from 'lucide-react';
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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-purple-100 p-3 shadow-lg no-print">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        <button
          onClick={() => prevStep && onSelectStep(prevStep.id)}
          disabled={!prevStep}
          className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
            prevStep
              ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              : 'text-slate-300 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        {/* Step Selector Dropdown */}
        <div className="flex-1 flex flex-col items-center">
          <select
            value={currentStep}
            onChange={(e) => onSelectStep(e.target.value)}
            className="w-full text-center text-xs font-bold text-purple-900 bg-purple-50/80 border border-purple-200 rounded-xl px-2 py-1.5 focus:outline-none"
          >
            {STEPS.map((s, idx) => (
              <option key={s.id} value={s.id}>
                {idx === 0 ? '🌟 ' : `${idx}. `}{s.short}
              </option>
            ))}
          </select>
          <div className="text-[10px] text-slate-500 mt-1">
            Progres: <strong className="text-purple-600">{progressPercent}%</strong>
          </div>
        </div>

        <button
          onClick={() => nextStep && onSelectStep(nextStep.id)}
          disabled={!nextStep}
          className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
            nextStep
              ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm shadow-purple-200'
              : 'text-slate-300 cursor-not-allowed'
          }`}
        >
          <span>Lanjut</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
