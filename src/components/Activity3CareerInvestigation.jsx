import React from 'react';
import { BookOpen, GraduationCap, Wrench, Users, AlertTriangle, TrendingUp, Sparkles } from 'lucide-react';

export default function Activity3CareerInvestigation({ data, onChange }) {
  const investigation = data.investigation || {};

  const updateField = (field, value) => {
    onChange('investigation', {
      ...investigation,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Title Banner */}
      <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white shadow-lg shadow-emerald-600/15">
        <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4 text-amber-300" />
          <span>Aktivitas 3</span>
        </div>
        <h2 className="font-display font-extrabold text-xl sm:text-3xl text-white leading-tight">
          CAREER INVESTIGATION — Investigasi Profesi Impian
        </h2>
        <p className="text-emerald-100 text-xs sm:text-base mt-2 max-w-2xl leading-relaxed">
          Sukses berawal dari persiapan matang. Lakukan riset dan analisis menyeluruh mengenai syarat studi, keahlian, tantangan, dan peluang dari profesi impian utamamu.
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-6">
        {/* Nama Profesi */}
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70">
          <label className="block text-xs font-bold text-emerald-900 mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Nama Profesi / Karier yang Saya Investigasi:
          </label>
          <input
            type="text"
            value={investigation.careerName || ''}
            onChange={(e) => updateField('careerName', e.target.value)}
            placeholder="Contoh: Dokter Spesialis Anak / Full-Stack Web Developer / Diplomat"
            className="lkpd-input bg-white font-semibold text-slate-900"
          />
        </div>

        {/* 1. Jalur Studi / Pendidikan */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            1. Syarat Jenjang Studi & Jurusan Pendidikan:
          </label>
          <textarea
            rows={2}
            value={investigation.educationPath || ''}
            onChange={(e) => updateField('educationPath', e.target.value)}
            placeholder="Contoh: S1 Kedokteran dilanjutkan Profesi Dokter & Program Pendidikan Dokter Spesialis (PPDS)..."
            className="lkpd-textarea"
          />
        </div>

        {/* 2 & 3. Hard Skills and Soft Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-blue-600" />
              2. Keterampilan Teknis (Hard Skills) yang Wajib Dikuasai:
            </label>
            <textarea
              rows={3}
              value={investigation.hardSkills || ''}
              onChange={(e) => updateField('hardSkills', e.target.value)}
              placeholder="Contoh: Menguasai diagnosis medis, analisis laboratorium, penulisan resep, literasi data klinis..."
              className="lkpd-textarea"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-600" />
              3. Keterampilan Interpersonal (Soft Skills) yang Diperlukan:
            </label>
            <textarea
              rows={3}
              value={investigation.softSkills || ''}
              onChange={(e) => updateField('softSkills', e.target.value)}
              placeholder="Contoh: Empati tinggi terhadap pasien anak, komunikasi persuasif dengan orang tua, ketenangan saat darurat..."
              className="lkpd-textarea"
            />
          </div>
        </div>

        {/* 4. Tantangan Profesi */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            4. Tantangan & Hambatan Nyata dalam Menjalani Profesi Ini:
          </label>
          <textarea
            rows={2}
            value={investigation.challenges || ''}
            onChange={(e) => updateField('challenges', e.target.value)}
            placeholder="Contoh: Masa studi yang panjang, jam kerja bergilir (shift malam), beban mental saat menangani kasus kritis..."
            className="lkpd-textarea"
          />
        </div>

        {/* 5. Prospek Masa Depan */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            5. Peluang & Prospek Kerja di Masa Depan (5-10 Tahun ke Depan):
          </label>
          <textarea
            rows={2}
            value={investigation.careerOutlook || ''}
            onChange={(e) => updateField('careerOutlook', e.target.value)}
            placeholder="Contoh: Kebutuhan dokter spesialis anak di luar pulau Jawa masih sangat tinggi, peluang praktik mandiri maupun di rumah sakit rujukan sangat terbuka..."
            className="lkpd-textarea"
          />
        </div>
      </div>
    </div>
  );
}
