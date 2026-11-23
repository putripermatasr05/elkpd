import React, { useState } from 'react';
import { Lightbulb, Award, CheckCircle, Download, Send, Sparkles, FileText, Printer, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Activity6ReflectCommit({
  data,
  onChange,
  onOpenPrint,
  onDownloadTxt,
  onGoToFollowUp,
}) {
  const reflection = data.reflection || {};
  const [submitted, setSubmitted] = useState(false);

  const updateReflection = (field, value) => {
    onChange('reflection', {
      ...reflection,
      [field]: value,
    });
  };

  const handleCelebrateSubmit = () => {
    setSubmitted(true);
    onChange('isCompleted', true);

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="space-y-8">
      {/* Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white shadow-lg shadow-purple-600/15">
        <div className="flex items-center gap-2 text-violet-200 text-xs font-bold uppercase tracking-wider mb-1">
          <Lightbulb className="w-4 h-4 text-amber-300" />
          <span>Aktivitas 6</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          REFLECT & COMMIT! — Refleksi & Komitmen Diri
        </h2>
        <p className="text-violet-100 text-sm sm:text-base mt-2 max-w-2xl">
          Tutup proses perencanaan kariermu dengan merenungkan hikmah yang kamu peroleh serta membuat surat komitmen tulus kepada dirimu sendiri untuk terus berjuang.
        </p>
      </div>

      <div className="glass-card p-6 sm:p-8 space-y-6">
        {/* Wawasan Baru */}
        <div>
          <label className="block text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            1. Wawasan & Kesadaran Baru yang Saya Dapatkan Setelah Mengisi E-LKPD Ini:
          </label>
          <textarea
            rows={3}
            value={reflection.newInsights || ''}
            onChange={(e) => updateReflection('newInsights', e.target.value)}
            placeholder="Contoh: Saya baru menyadari bahwa minat saya condong ke tipe Realistic dan Social, sehingga karier di bidang teknologi pendidikan atau teknik lingkungan terasa sangat pas..."
            className="lkpd-textarea"
          />
        </div>

        {/* Ikrar Komitmen Diri */}
        <div className="card-pastel-purple p-6 rounded-2xl border border-purple-200/80 space-y-4">
          <div className="flex items-center gap-2 text-purple-900 font-bold text-base font-display">
            <Award className="w-5 h-5 text-purple-700" />
            <span>2. Surat Ikrar & Komitmen Pribadi Saya:</span>
          </div>
          <p className="text-xs text-purple-800/80 leading-relaxed">
            Tuliskan janji pada dirimu sendiri untuk tetap tekun belajar, tidak mudah menyerah saat menghadapi tantangan, dan senantiasa berusaha mengembangkan potensi terbaikmu.
          </p>

          <textarea
            rows={4}
            value={reflection.commitmentStatement || ''}
            onChange={(e) => updateReflection('commitmentStatement', e.target.value)}
            placeholder="Tuliskan komitmenmu di sini... Contoh: 'Saya berjanji kepada diri saya sendiri untuk bersungguh-sungguh belajar, menjaga kedisiplinan, dan terus mengasah keterampilan agar impian saya menjadi kenyataan...'"
            className="lkpd-textarea bg-white"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-purple-950 mb-1">
                Tertanda (Nama Lengkap Siswa):
              </label>
              <input
                type="text"
                value={reflection.studentSignatureName || data.nama || ''}
                onChange={(e) => updateReflection('studentSignatureName', e.target.value)}
                placeholder="Nama lengkapmu"
                className="lkpd-input bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-purple-950 mb-1">
                Tanggal Penandatanganan Komitmen:
              </label>
              <input
                type="date"
                value={reflection.signedDate || data.tanggal || ''}
                onChange={(e) => updateReflection('signedDate', e.target.value)}
                className="lkpd-input bg-white"
              />
            </div>
          </div>
        </div>

        {/* Status Submission Banner */}
        {submitted && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 animate-fadeIn">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Jawaban Berhasil Dikirim & Tersimpan! 🎉</h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                Selamat! Kamu telah menyelesaikan seluruh rangkaian perencanaan karier di E-LKPD Pilih Karierku. Silakan unduh atau cetak hasilnya, lalu lanjutkan ke Aktivitas 7 untuk evaluasi tindak lanjut.
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons matching Canva */}
        <div className="pt-4 border-t border-purple-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCelebrateSubmit}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold transition-all shadow-md shadow-purple-200 text-sm hover:scale-[1.02] active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>📤 KIRIM JAWABAN</span>
            </button>

            <button
              onClick={onDownloadTxt}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold transition-all border border-purple-200 text-sm"
            >
              <Download className="w-4 h-4" />
              <span>⬇️ UNDUH JAWABAN (TXT)</span>
            </button>

            <button
              onClick={onOpenPrint}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-all border border-slate-200 text-sm"
            >
              <Printer className="w-4 h-4" />
              <span>CETAK / PDF</span>
            </button>
          </div>

          <button
            onClick={onGoToFollowUp}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md shadow-emerald-200 text-sm hover:scale-[1.02] active:scale-95"
          >
            <span>Aktivitas 7: Follow Up</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
