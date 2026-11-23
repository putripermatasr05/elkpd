import React, { useState } from 'react';
import { Save, Copy, CheckCircle, Calendar, User, GraduationCap, Heart, Printer, Sparkles, Check } from 'lucide-react';
import { generateLKPD2Txt } from '../data/elkpdData';
import confetti from 'canvas-confetti';

export default function EvaluationWorksheet({
  data,
  onChange,
  onOpenPrint,
}) {
  const [copied, setCopied] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const handleCopyTxt = async () => {
    const text = generateLKPD2Txt(data);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleManualSave = () => {
    onChange('isCompleted', true);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3500);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {}
  };

  const q1Options = ['Sudah sepenuhnya', 'Sudah sebagian', 'Belum terlaksana'];
  const q2Options = ['Sangat membantu', 'Cukup membantu', 'Belum membantu'];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Outer Card Styled with Soft Warm Background Matching Canva LKPD 2 */}
      <div className="relative overflow-hidden rounded-3xl bg-white/95 border border-amber-200/60 shadow-[0_10px_40px_rgba(180,120,60,0.08)] p-6 sm:p-10">
        
        {/* Top Header Labels */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100/80 pb-4 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFF2EE] text-[#A0522D] border border-amber-200/60 tracking-wider">
            LEMBAR KERJA PESERTA DIDIK
          </span>
          <span className="text-xs font-medium text-slate-500">
            Bimbingan dan Konseling · Refleksi diri
          </span>
        </div>

        {/* Header Hero Title */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#FFF5F0] via-[#FEF8F2] to-[#FFF0E8] border border-amber-200/50 mb-8">
          <span className="text-xs font-black tracking-widest text-amber-800 uppercase block mb-1">
            E-LKPD • EVALUASI
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-[#5A3A2A] tracking-tight mb-2">
            Evaluasi Tindak Lanjut BK
          </h1>
          <p className="text-sm sm:text-base text-[#764E1F] font-medium italic leading-relaxed">
            Isi lembar ini dengan jujur untuk melihat perkembanganmu setelah mengikuti tindak lanjut layanan BK. Tidak ada jawaban yang salah.
          </p>
        </div>

        {/* 01. Identitas Siswa */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-white/80 border border-amber-100 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-amber-100/70 pb-3">
            <span className="w-7 h-7 rounded-full bg-[#EADCCF] text-[#5A3A2A] font-bold text-xs flex items-center justify-center">
              01
            </span>
            <h2 className="font-display font-bold text-base sm:text-lg text-[#5A3A2A]">
              Identitas Siswa
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-700" />
                Nama lengkap
              </label>
              <input
                type="text"
                value={data.nama || ''}
                onChange={(e) => onChange('nama', e.target.value)}
                placeholder="Nama lengkapmu"
                className="lkpd-input bg-white border-amber-200/60 focus:border-amber-400 focus:ring-amber-300/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                Kelas
              </label>
              <input
                type="text"
                value={data.kelas || ''}
                onChange={(e) => onChange('kelas', e.target.value)}
                placeholder="Kelas / Jurusan"
                className="lkpd-input bg-white border-amber-200/60 focus:border-amber-400 focus:ring-amber-300/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                Tanggal pengisian
              </label>
              <input
                type="date"
                value={data.tanggal || ''}
                onChange={(e) => onChange('tanggal', e.target.value)}
                className="lkpd-input bg-white border-amber-200/60 focus:border-amber-400 focus:ring-amber-300/40"
              />
            </div>
          </div>
        </div>

        {/* 02. Refleksi Tindak Lanjut */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 border-b border-amber-100/70 pb-3">
            <span className="w-7 h-7 rounded-full bg-[#EADCCF] text-[#5A3A2A] font-bold text-xs flex items-center justify-center">
              02
            </span>
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg text-[#5A3A2A]">
                Refleksi Tindak Lanjut
              </h2>
              <p className="text-xs text-slate-500">
                Pilih jawaban yang paling sesuai, lalu tuliskan pengalamanmu secara singkat.
              </p>
            </div>
          </div>

          {/* Pertanyaan 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-amber-100/80 space-y-2.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#5A3A2A]">
              1. Sejauh mana rencana tindak lanjutmu sudah dilaksanakan?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {q1Options.map((opt) => {
                const isSelected = data.questionOne === opt;
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => onChange('questionOne', opt)}
                    className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 border text-center ${
                      isSelected
                        ? 'bg-[#5A3A2A] text-white border-[#5A3A2A] shadow-md'
                        : 'bg-white hover:bg-amber-50/50 text-[#5A3A2A] border-amber-200/70'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-white bg-white text-[#5A3A2A]' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-[#5A3A2A]" />}
                    </div>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pertanyaan 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-amber-100/80 space-y-2.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#5A3A2A]">
              2. Apakah tindak lanjut tersebut membantumu?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {q2Options.map((opt) => {
                const isSelected = data.questionTwo === opt;
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => onChange('questionTwo', opt)}
                    className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 border text-center ${
                      isSelected
                        ? 'bg-[#5A3A2A] text-white border-[#5A3A2A] shadow-md'
                        : 'bg-white hover:bg-amber-50/50 text-[#5A3A2A] border-amber-200/70'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-white bg-white text-[#5A3A2A]' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-[#5A3A2A]" />}
                    </div>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pertanyaan 3 */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#5A3A2A]">
              3. Perubahan positif apa yang sudah kamu rasakan?
            </label>
            <textarea
              rows={3}
              value={data.questionThree || ''}
              onChange={(e) => onChange('questionThree', e.target.value)}
              placeholder="Ceritakan perubahan perasaan, peningkatan motivasi belajar, rasa percaya diri, atau kebiasaan baru yang lebih baik..."
              className="lkpd-textarea bg-white border-amber-200/70 focus:border-amber-400 focus:ring-amber-300/40"
            />
          </div>

          {/* Pertanyaan 4 */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#5A3A2A]">
              4. Kendala apa yang masih kamu hadapi?
            </label>
            <textarea
              rows={3}
              value={data.questionFour || ''}
              onChange={(e) => onChange('questionFour', e.target.value)}
              placeholder="Tuliskan kesulitan, distraksi, rasa ragu, atau hambatan teknis yang masih kamu jumpai dalam menjalani rencana..."
              className="lkpd-textarea bg-white border-amber-200/70 focus:border-amber-400 focus:ring-amber-300/40"
            />
          </div>

          {/* Pertanyaan 5 */}
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-[#5A3A2A]">
              5. Apa langkah kecil yang akan kamu lakukan selanjutnya?
            </label>
            <textarea
              rows={3}
              value={data.questionFive || ''}
              onChange={(e) => onChange('questionFive', e.target.value)}
              placeholder="Satu atau dua tindakan konkret sederhana yang akan kamu mulai besok untuk terus maju..."
              className="lkpd-textarea bg-white border-amber-200/70 focus:border-amber-400 focus:ring-amber-300/40"
            />
          </div>
        </div>

        {/* Toast Notifikasi Tersimpan */}
        {savedToast && (
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs sm:text-sm font-medium">
              Jawaban berhasil disimpan di browser perangkatmu! ✨
            </span>
          </div>
        )}

        {/* Privacy Note matching Canva text */}
        <div className="mt-6 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/50 text-[11px] sm:text-xs text-[#5A3A2A] leading-relaxed">
          Jawaban tersimpan otomatis di browser perangkat ini. Untuk membuat berkas TXT, salin jawaban lalu tempel ke editor teks dan simpan dengan nama yang ditampilkan.
        </div>

        {/* Action Buttons matching Canva */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={handleManualSave}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#5A3A2A] hover:bg-[#462c1f] text-white font-bold transition-all shadow-md text-xs sm:text-sm hover:scale-[1.02] active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Simpan jawaban</span>
          </button>

          <button
            onClick={handleCopyTxt}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-amber-50 text-[#5A3A2A] font-bold transition-all border border-amber-300/80 text-xs sm:text-sm"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'Berhasil Disalin! ✓' : 'Salin jawaban TXT'}</span>
          </button>

          <button
            onClick={onOpenPrint}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-all border border-slate-200 text-xs sm:text-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / PDF</span>
          </button>
        </div>

        {/* Quote Footer matching Canva */}
        <div className="mt-8 pt-6 border-t border-amber-100 text-center text-xs sm:text-sm text-[#764E1F] italic font-medium">
          “Beri dirimu waktu untuk bertumbuh, satu langkah setiap hari.”
        </div>
      </div>
    </div>
  );
}
