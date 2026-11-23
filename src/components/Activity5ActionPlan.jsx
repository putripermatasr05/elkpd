import React from 'react';
import { MapPin, Calendar, Clock, Award, CheckCircle2, Flag, UserCheck } from 'lucide-react';

export default function Activity5ActionPlan({ data, onChange }) {
  const actionPlan = data.actionPlan || {};

  const updateAction = (field, value) => {
    onChange('actionPlan', {
      ...actionPlan,
      [field]: value,
    });
  };

  return (
    <div className="space-y-8">
      {/* Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white shadow-lg shadow-orange-600/15">
        <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-wider mb-1">
          <MapPin className="w-4 h-4 text-amber-300" />
          <span>Aktivitas 5</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          MY FUTURE ACTION PLAN — Rencana Aksi Masa Depan
        </h2>
        <p className="text-amber-100 text-sm sm:text-base mt-2 max-w-2xl">
          Cita-cita tanpa rencana hanyalah angan-angan. Rancang langkah nyata jangka pendek, menengah, dan panjang secara bertahap agar tujuan kariermu terwujud dengan pasti.
        </p>
      </div>

      <div className="space-y-6">
        {/* Jangka Pendek */}
        <div className="glass-card p-6 sm:p-7 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                Tahap 1
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-slate-800">
                Jangka Pendek (Saat Ini s.d. 1 Tahun ke Depan di Sekolah)
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            Target akademik, peningkatan nilai rapor mata pelajaran terkait, pendalaman materi ujian, pembiasaan disiplin, dan konsultasi rutin dengan Guru BK.
          </p>
          <textarea
            rows={3}
            value={actionPlan.shortTerm || ''}
            onChange={(e) => updateAction('shortTerm', e.target.value)}
            placeholder="Contoh: Menjaga rata-rata nilai matematika & fisika minimal 88, belajar soal UTBK 1 jam tiap malam, berkonsultasi ke ruang BK sebulan sekali..."
            className="lkpd-textarea"
          />
        </div>

        {/* Jangka Menengah */}
        <div className="glass-card p-6 sm:p-7 border-l-4 border-l-purple-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-md">
                Tahap 2
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-slate-800">
                Jangka Menengah (1 s.d. 3 Tahun ke Depan — Masa Kuliah / Pelatihan)
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            Lolos seleksi masuk kampus/sekolah kedinasan impian, aktif berorganisasi yang relevan, membangun portofolio karya, dan mengikuti magang industri.
          </p>
          <textarea
            rows={3}
            value={actionPlan.mediumTerm || ''}
            onChange={(e) => updateAction('mediumTerm', e.target.value)}
            placeholder="Contoh: Diterima di jurusan pilihan di PTN, aktif di himpunan mahasiswa, membuat 5 proyek desain nyata, dan magang di konsultan terkemuka..."
            className="lkpd-textarea"
          />
        </div>

        {/* Jangka Panjang */}
        <div className="glass-card p-6 sm:p-7 border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                Tahap 3
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-slate-800">
                Jangka Panjang (3 s.d. 5+ Tahun ke Depan — Karier Mandiri & Profesional)
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            Lulus tepat waktu dengan predikat memuaskan, sertifikasi profesi resmi, masuk ke dunia kerja profesional, atau merintis usaha mandiri.
          </p>
          <textarea
            rows={3}
            value={actionPlan.longTerm || ''}
            onChange={(e) => updateAction('longTerm', e.target.value)}
            placeholder="Contoh: Lulus tepat waktu, lulus sertifikasi profesional, bekerja di perusahaan impian atau mendirikan studio sendiri yang bermanfaat bagi banyak orang..."
            className="lkpd-textarea"
          />
        </div>

        {/* Pihak Pendamping */}
        <div className="glass-card p-6 sm:p-7">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-800">
                Pihak yang Membantu Memantau & Mengingatkan Komitmen Aksi Saya:
              </h3>
              <p className="text-xs text-slate-500">
                Siapa saja mentor, guru BK, keluarga, atau sahabat yang kamu libatkan
              </p>
            </div>
          </div>
          <input
            type="text"
            value={actionPlan.supportPersons || ''}
            onChange={(e) => updateAction('supportPersons', e.target.value)}
            placeholder="Contoh: Orang tua di rumah, Guru BK (Ibu Putri/Pak Konselor), dan teman kelompok belajar..."
            className="lkpd-input"
          />
        </div>
      </div>
    </div>
  );
}
