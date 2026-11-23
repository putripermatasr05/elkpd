import React from 'react';
import { Target, Shield, HeartHandshake, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Activity4CareerDecision({ data, onChange }) {
  const decision = data.decision || {};

  const updateDecision = (field, value) => {
    onChange('decision', {
      ...decision,
      [field]: value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600 text-white shadow-lg shadow-purple-700/15">
        <div className="flex items-center gap-2 text-pink-200 text-xs font-bold uppercase tracking-wider mb-1">
          <Target className="w-4 h-4 text-amber-300" />
          <span>Aktivitas 4</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          MY CAREER DECISION — Mengambil Keputusan Karier
        </h2>
        <p className="text-pink-100 text-sm sm:text-base mt-2 max-w-2xl">
          Pengambilan keputusan yang matang selalu memiliki prioritas utama (Plan A) dan skenario cadangan strategis (Plan B) agar kamu tetap tangguh menghadapi berbagai dinamika.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pilihan Utama (Plan A) */}
        <div className="card-pastel-purple p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between border-b border-purple-200/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                A
              </span>
              <h3 className="font-display font-bold text-lg text-purple-900">
                Pilihan Utama (Plan A)
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-200/80 text-purple-800">
              Prioritas #1
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-950 mb-1">
              Profesi / Karier Impian Utama:
            </label>
            <input
              type="text"
              value={decision.planACareer || ''}
              onChange={(e) => updateDecision('planACareer', e.target.value)}
              placeholder="Contoh: Arsitek Bangunan Berkelanjutan"
              className="lkpd-input bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-950 mb-1">
              Jalur Pendidikan / Kampus / Jurusan yang Dituju:
            </label>
            <input
              type="text"
              value={decision.planAEducation || ''}
              onChange={(e) => updateDecision('planAEducation', e.target.value)}
              placeholder="Contoh: S1 Arsitektur - Universitas Lambung Mangkurat / PTN"
              className="lkpd-input bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-950 mb-1">
              Alasan Kuat & Tingkat Keyakinan Memilih Plan A:
            </label>
            <textarea
              rows={3}
              value={decision.planAReason || ''}
              onChange={(e) => updateDecision('planAReason', e.target.value)}
              placeholder="Mengapa ini menjadi pilihan utamamu? Apa yang membuatmu sangat yakin mampu berhasil di jalur ini?"
              className="lkpd-textarea bg-white"
            />
          </div>
        </div>

        {/* Pilihan Cadangan (Plan B) */}
        <div className="card-pastel-yellow p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                B
              </span>
              <h3 className="font-display font-bold text-lg text-amber-950">
                Pilihan Cadangan (Plan B)
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-200/80 text-amber-900">
              Alternatif Strategis
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-950 mb-1">
              Profesi / Karier Cadangan:
            </label>
            <input
              type="text"
              value={decision.planBCareer || ''}
              onChange={(e) => updateDecision('planBCareer', e.target.value)}
              placeholder="Contoh: Desainer Interior / Visualizer 3D"
              className="lkpd-input bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-950 mb-1">
              Jalur Pendidikan / Jurusan Alternatif:
            </label>
            <input
              type="text"
              value={decision.planBEducation || ''}
              onChange={(e) => updateDecision('planBEducation', e.target.value)}
              placeholder="Contoh: D4 / S1 Desain Interior / Pendidikan Vokasi"
              className="lkpd-input bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-950 mb-1">
              Kapan dan Dalam Kondisi Apa Plan B Ini Akan Diaktifkan?
            </label>
            <textarea
              rows={3}
              value={decision.planBTrigger || ''}
              onChange={(e) => updateDecision('planBTrigger', e.target.value)}
              placeholder="Contoh: Jika belum lolos seleksi PTN Arsitektur jalur SNBP & SNBT, saya akan mengalihkan fokus ke Desain Interior jalur mandiri/politeknik..."
              className="lkpd-textarea bg-white"
            />
          </div>
        </div>
      </div>

      {/* Dukungan yang Dibutuhkan Card */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-slate-800">
              Dukungan yang Saya Butuhkan untuk Mewujudkan Keputusan Ini
            </h3>
            <p className="text-xs text-slate-500">
              Sebutkan dukungan dari orang tua, keluarga, guru BK, dan lingkungan belajar
            </p>
          </div>
        </div>

        <textarea
          rows={3}
          value={decision.supportNeeded || ''}
          onChange={(e) => updateDecision('supportNeeded', e.target.value)}
          placeholder="Contoh: Saya membutuhkan restu dan diskusi rutin bersama orang tua mengenai biaya studi, pendampingan bimbingan karier dari Guru BK di sekolah, serta izin mengikuti kursus persiapan ujian masuk..."
          className="lkpd-textarea"
        />
      </div>
    </div>
  );
}
