import React from 'react';
import { User, Heart, Sparkles, Check, CheckCircle2, Info, Compass, HelpCircle } from 'lucide-react';
import { RIASEC_TYPES, RIASEC_QUESTIONS, SUGGESTED_HOBBIES, calculateRIASEC } from '../data/elkpdData';

export default function Activity1WhoAmI({ data, onChange }) {
  const selectedHobbies = data.hobbies || [];
  const riasecAnswers = data.riasecAnswers || {};
  const riasecResult = calculateRIASEC(riasecAnswers);

  const toggleHobby = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      onChange('hobbies', selectedHobbies.filter((h) => h !== hobby));
    } else {
      onChange('hobbies', [...selectedHobbies, hobby]);
    }
  };

  const toggleQuestion = (qId) => {
    onChange('riasecAnswers', {
      ...riasecAnswers,
      [qId]: !riasecAnswers[qId],
    });
  };

  return (
    <div className="space-y-8">
      {/* Activity Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white shadow-lg shadow-purple-600/15">
        <div className="flex items-center gap-2 text-purple-200 text-xs font-bold uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Aktivitas 1</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          WHO AM I? — Mengenal Diri & Minat Karier
        </h2>
        <p className="text-purple-100 text-sm sm:text-base mt-2 max-w-2xl">
          Langkah pertama menuju masa depan yang sukses adalah mengenal siapa dirimu sesungguhnya, apa yang kamu sukai, kelebihanmu, serta kecenderungan tipe minatmu.
        </p>
      </div>

      {/* Bagian A: Kegiatan yang Saya Sukai */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
            A
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-slate-800">
              Kegiatan & Hobi yang Saya Sukai
            </h3>
            <p className="text-xs text-slate-500">
              Pilih aktivitas yang paling membuatmu merasa senang, bersemangat, dan betah berlama-lama
            </p>
          </div>
        </div>

        {/* Hobby Chips */}
        <div className="flex flex-wrap gap-2.5 mb-5">
          {SUGGESTED_HOBBIES.map((hobby) => {
            const isSelected = selectedHobbies.includes(hobby);
            return (
              <button
                type="button"
                key={hobby}
                onClick={() => toggleHobby(hobby)}
                className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-105'
                    : 'bg-purple-50/80 hover:bg-purple-100 text-slate-700 border border-purple-100'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{hobby}</span>
              </button>
            );
          })}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Kegiatan atau hobi lain yang kamu sukai (tuliskan jika belum ada di atas):
          </label>
          <input
            type="text"
            value={data.otherHobbies || ''}
            onChange={(e) => onChange('otherHobbies', e.target.value)}
            placeholder="Contoh: Menulis puisi, merakit Gundam, berkebun hidroponik..."
            className="lkpd-input"
          />
        </div>
      </div>

      {/* Bagian B: Mengenal Diri Sendiri */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
            B
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-slate-800">
              Mengenal Karakter Diri Sendiri
            </h3>
            <p className="text-xs text-slate-500">
              Renungkan kelebihan, aspek pengembangan diri, dan prinsip yang kamu pegang teguh
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              1. Kelebihan / Potensi Diri yang Menonjol:
            </label>
            <textarea
              rows={2}
              value={data.strengths || ''}
              onChange={(e) => onChange('strengths', e.target.value)}
              placeholder="Contoh: Saya mudah bergaul, teliti menganalisis detail, cepat memahami materi pelajaran hitungan, dan bisa dipercaya memegang tanggung jawab..."
              className="lkpd-textarea"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              2. Hal yang Masih Perlu Saya Perbaiki / Kembangkan:
            </label>
            <textarea
              rows={2}
              value={data.areasToImprove || ''}
              onChange={(e) => onChange('areasToImprove', e.target.value)}
              placeholder="Contoh: Saya terkadang kurang percaya diri berbicara di hadapan banyak orang, atau sering menunda pekerjaan jika belum terdesak..."
              className="lkpd-textarea"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              3. Nilai Hidup / Prinsip yang Menjadi Pegangan Saya:
            </label>
            <textarea
              rows={2}
              value={data.coreValues || ''}
              onChange={(e) => onChange('coreValues', e.target.value)}
              placeholder="Contoh: Kejujuran, ketekunan, bermanfaat bagi sesama, dan selalu bertanggung jawab terhadap apa yang telah dimulai..."
              className="lkpd-textarea"
            />
          </div>
        </div>
      </div>

      {/* Bagian C: Mengenal Minat melalui Teori John Holland (RIASEC) */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
            C
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-slate-800">
              Mengenal Minat melalui Teori John Holland (RIASEC)
            </h3>
            <p className="text-xs text-slate-500">
              Teori kepribadian karier paling populer di dunia untuk memetakan kesesuaian minat dengan dunia kerja
            </p>
          </div>
        </div>

        {/* Petunjuk pengerjaan */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 mb-6 text-xs sm:text-sm text-amber-900 leading-relaxed flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Petunjuk:</strong> Bacalah penjelasan dan pernyataan berikut. Kemudian, beri tanda centang (✓) pada setiap pernyataan yang paling sesuai dan mencerminkan dirimu.
          </span>
        </div>

        {/* 6 Tipologi Singkat */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-7">
          {Object.values(RIASEC_TYPES).map((item) => (
            <div
              key={item.code}
              className={`p-3 rounded-2xl ${item.bgColor} border ${item.borderColor} transition-all`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-display font-extrabold text-base text-slate-800">
                  {item.code}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/80 text-slate-700 border border-slate-200">
                  {riasecResult.scores[item.code]}/3
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-800 truncate mb-1">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-600 line-clamp-3 leading-snug">
                {item.summary}
              </p>
            </div>
          ))}
        </div>

        {/* Daftar 18 Pernyataan Angket RIASEC */}
        <div className="space-y-3 mb-8">
          <h4 className="font-display font-bold text-sm text-slate-800 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-purple-600" />
            <span>Pilih Pernyataan yang Sesuai dengan Dirimu:</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {RIASEC_QUESTIONS.map((q, idx) => {
              const isChecked = !!riasecAnswers[q.id];
              const typeInfo = RIASEC_TYPES[q.type];
              return (
                <div
                  key={q.id}
                  onClick={() => toggleQuestion(q.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isChecked
                      ? 'bg-purple-50/90 border-purple-400 shadow-sm'
                      : 'bg-white/70 hover:bg-white border-purple-100 hover:border-purple-200'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isChecked
                        ? 'bg-purple-600 border-purple-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs sm:text-sm text-slate-800 leading-snug block">
                      {q.text}
                    </span>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-purple-600 bg-purple-100/60 px-2 py-0.5 rounded-md">
                      Tipe {q.type} ({typeInfo.title})
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hasil Live Holland Code */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 via-indigo-50 to-amber-50 border border-purple-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100/80 pb-4 mb-4">
            <div>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider block mb-1">
                Hasil Pemetaan Minat Holland (RIASEC)
              </span>
              <h4 className="font-display font-extrabold text-xl sm:text-2xl text-slate-800">
                Holland Code Kamu: <span className="text-purple-600 tracking-wider">{riasecResult.hollandCode}</span>
              </h4>
            </div>

            <div className="flex items-center gap-2">
              {riasecResult.topThree.map(([code, score], i) => (
                <div key={code} className="text-center px-3 py-1.5 rounded-2xl bg-white border border-purple-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500">#{i + 1}</div>
                  <div className="font-display font-black text-lg text-purple-700">{code}</div>
                  <div className="text-[10px] text-slate-600 font-medium">{score}/3 poin</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interpretasi Tipe Dominan */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {riasecResult.topThree.map(([code, score]) => {
              const item = RIASEC_TYPES[code];
              return (
                <div key={code} className="p-3.5 rounded-2xl bg-white/90 border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-6 h-6 rounded-lg bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                      {code}
                    </span>
                    <h5 className="font-bold text-xs text-slate-800 truncate">
                      {item.name}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                    {item.summary}
                  </p>
                  <div className="text-[11px] text-purple-700 font-medium">
                    <strong>Contoh Karier:</strong> {item.careerExamples.slice(0, 3).join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
