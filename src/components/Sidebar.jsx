import React from 'react';
import { Sparkles, CheckCircle2, ChevronRight, BookOpen, Compass, Search, Target, MapPin, Lightbulb, RefreshCw } from 'lucide-react';

export const STEPS = [
  { id: 'cover', title: 'Halaman Pembuka', short: 'Pembuka', icon: BookOpen },
  { id: 'act1', title: 'Aktivitas 1: Who Am I?', short: '1. Who Am I?', icon: Sparkles },
  { id: 'act2', title: 'Aktivitas 2: Explore Your Career!', short: '2. Explore', icon: Search },
  { id: 'act3', title: 'Aktivitas 3: Career Investigation', short: '3. Investigasi', icon: Compass },
  { id: 'act4', title: 'Aktivitas 4: My Career Decision', short: '4. Keputusan', icon: Target },
  { id: 'act5', title: 'Aktivitas 5: My Future Action Plan', short: '5. Action Plan', icon: MapPin },
  { id: 'act6', title: 'Aktivitas 6: Reflect & Commit!', short: '6. Komitmen', icon: Lightbulb },
  { id: 'act7', title: 'Aktivitas 7: Follow Up', short: '7. Follow Up', icon: RefreshCw },
];

export default function Sidebar({ currentStep, onSelectStep, progressPercent }) {
  return (
    <aside className="w-72 shrink-0 hidden lg:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto custom-scroll no-print z-30">
      <div className="glass-card p-5 space-y-5">
        {/* Progress Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span>Progress E-LKPD</span>
            <span className="text-purple-700 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-purple-200/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            {progressPercent === 100
              ? '🎉 Selesai! Siap dicetak / diunduh.'
              : 'Selesaikan seluruh tahap secara berurutan'}
          </p>
        </div>

        {/* Step Navigation List */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-2">
            Tahapan Pengerjaan
          </span>
          <nav className="space-y-1">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => onSelectStep(step.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                    isActive
                      ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-200 scale-[1.02]'
                      : 'hover:bg-purple-50 text-slate-700 text-xs sm:text-sm font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs truncate">{step.title}</span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="pt-3 border-t border-purple-100 text-[11px] text-slate-400 text-center leading-snug">
          BK FKIP Universitas Lambung Mangkurat
          <br />
          © {new Date().getFullYear()} TemanBK
        </div>
      </div>
    </aside>
  );
}
