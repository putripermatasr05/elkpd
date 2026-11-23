import React from 'react';
import { Search, Compass, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { RIASEC_TYPES, calculateRIASEC } from '../data/elkpdData';

export default function Activity2ExploreCareer({ data, onChange }) {
  const riasec = calculateRIASEC(data.riasecAnswers);
  const careers = data.exploredCareers || [
    { title: '', riasecType: '', reason: '' },
    { title: '', riasecType: '', reason: '' },
    { title: '', riasecType: '', reason: '' },
  ];

  const updateCareer = (index, field, value) => {
    const updated = [...careers];
    updated[index] = { ...updated[index], [field]: value };
    onChange('exploredCareers', updated);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Title Banner */}
      <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-600/15">
        <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">
          <Search className="w-4 h-4 text-amber-300" />
          <span>Aktivitas 2</span>
        </div>
        <h2 className="font-display font-extrabold text-xl sm:text-3xl text-white leading-tight">
          EXPLORE YOUR CAREER! — Menjelajahi Pilihan Karier
        </h2>
        <p className="text-blue-100 text-xs sm:text-base mt-2 max-w-2xl leading-relaxed">
          Setelah mengetahui tipe kepribadian Holland Code-mu ({riasec.hollandCode}), saatnya menjelajahi berbagai profesi yang selaras dengan minatmu dan memilih 3 bidang yang paling memikat hati.
        </p>
      </div>

      {/* Rekomendasi Profesi Berdasarkan Holland Code */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-slate-800">
              Peta Profesi Sesuai Holland Code: <span className="text-blue-600">{riasec.hollandCode}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Gunakan referensi profesi di bawah ini sebagai inspirasi penjelajahan kariermu
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {riasec.topThree.map(([code], i) => {
            const item = RIASEC_TYPES[code];
            return (
              <div key={code} className={`p-4 rounded-2xl ${item.bgColor} border ${item.borderColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-sm text-slate-800">
                    Tipe {code} — {item.title}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border">
                    Prioritas #{i + 1}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3">{item.summary}</p>
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-700">Contoh Pilihan Karier:</div>
                  <ul className="space-y-1">
                    {item.careerExamples.map((ex, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 Profesi Pilihan Siswa */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-slate-800">
              3 Profesi yang Paling Menarik Minat Saya
            </h3>
            <p className="text-xs text-slate-500">
              Pilih 3 pekerjaan yang paling ingin kamu geluti di masa depan beserta alasan kuatmu
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {careers.map((career, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-white/80 border border-purple-100 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-100 text-purple-700 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Karier Pilihan #{idx + 1}
                </span>
                <span className="text-xs text-slate-400">Eksplorasi Minat</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Profesi / Karier:
                  </label>
                  <input
                    type="text"
                    value={career.title || ''}
                    onChange={(e) => updateCareer(idx, 'title', e.target.value)}
                    placeholder={`Contoh: ${idx === 0 ? 'UI/UX Designer' : idx === 1 ? 'Data Analyst' : 'Konselor Pendidikan'}`}
                    className="lkpd-input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kategori Minat (RIASEC):
                  </label>
                  <select
                    value={career.riasecType || ''}
                    onChange={(e) => updateCareer(idx, 'riasecType', e.target.value)}
                    className="lkpd-input"
                  >
                    <option value="">Pilih Tipe</option>
                    <option value="R">R - Realistic</option>
                    <option value="I">I - Investigative</option>
                    <option value="A">A - Artistic</option>
                    <option value="S">S - Social</option>
                    <option value="E">E - Enterprising</option>
                    <option value="C">C - Conventional</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mengapa saya tertarik dan merasa cocok dengan profesi ini?
                </label>
                <textarea
                  rows={2}
                  value={career.reason || ''}
                  onChange={(e) => updateCareer(idx, 'reason', e.target.value)}
                  placeholder="Ceritakan ketertarikanmu, bakat yang mendukung, atau pengalaman yang membuatmu antusias..."
                  className="lkpd-textarea"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
