import React, { useState } from 'react';
import { Lightbulb, Award, CheckCircle, Download, Send, Sparkles, Printer, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitLKPDResponse } from '../lib/supabase';

export default function Activity6ReflectCommit({
  data,
  onChange,
  onOpenPrint,
  onDownloadTxt,
  onGoToFollowUp,
  onGoToCover,
}) {
  const reflection = data.reflection || {};
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success' | 'error', message: string, source?: string }

  const updateReflection = (field, value) => {
    onChange('reflection', {
      ...reflection,
      [field]: value,
    });
  };

  const handleCelebrateSubmit = async () => {
    setSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await submitLKPDResponse('lkpd1', data);
      onChange('isCompleted', true);
      setSubmitStatus({
        type: 'success',
        source: res.source,
        message:
          res.source === 'supabase'
            ? 'Jawabanmu berhasil dikirim ke Database Guru BK & tersimpan di perangkat ini!'
            : 'Jawabanmu berhasil disimpan! (Mode cadangan lokal aktif hingga tabel Supabase disiapkan).',
      });
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    } catch (err) {
      setSubmitStatus({
        type: 'error',
        message: err.message || 'Gagal mengirim jawaban. Periksa kembali isianmu.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Title Banner */}
      <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white shadow-lg shadow-purple-600/15">
        <div className="flex items-center gap-2 text-violet-200 text-xs font-bold uppercase tracking-wider mb-1">
          <Lightbulb className="w-4 h-4 text-amber-300" />
          <span>Aktivitas 6</span>
        </div>
        <h2 className="font-display font-extrabold text-xl sm:text-3xl text-white leading-tight">
          REFLECT & COMMIT! — Refleksi & Komitmen Diri
        </h2>
        <p className="text-violet-100 text-xs sm:text-base mt-2 max-w-2xl leading-relaxed">
          Tutup proses perencanaan kariermu dengan merenungkan hikmah yang kamu peroleh serta membuat surat komitmen tulus kepada dirimu sendiri.
        </p>
      </div>

      <div className="glass-card p-5 sm:p-8 space-y-6">
        {/* Wawasan Baru */}
        <div>
          <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <span>1. Wawasan & Kesadaran Baru yang Saya Dapatkan:</span>
          </label>
          <textarea
            rows={3}
            value={reflection.newInsights || ''}
            onChange={(e) => updateReflection('newInsights', e.target.value)}
            placeholder="Contoh: Saya baru menyadari bahwa minat saya condong ke tipe Realistic dan Social, sehingga karier di bidang teknologi pendidikan terasa sangat pas..."
            className="lkpd-textarea"
          />
        </div>

        {/* Ikrar Komitmen Diri */}
        <div className="card-pastel-purple p-4 sm:p-6 rounded-2xl border border-purple-200/80 space-y-4">
          <div className="flex items-center gap-2 text-purple-900 font-bold text-sm sm:text-base font-display">
            <Award className="w-5 h-5 text-purple-700 shrink-0" />
            <span>2. Surat Ikrar & Komitmen Pribadi Saya:</span>
          </div>
          <p className="text-xs text-purple-800/80 leading-relaxed">
            Tuliskan janji pada dirimu sendiri untuk tetap tekun belajar, tidak mudah menyerah saat menghadapi tantangan, dan senantiasa mengembangkan potensi terbaikmu.
          </p>

          <textarea
            rows={4}
            value={reflection.commitmentStatement || ''}
            onChange={(e) => updateReflection('commitmentStatement', e.target.value)}
            placeholder="Tuliskan komitmenmu di sini... Contoh: 'Saya berjanji kepada diri saya sendiri untuk bersungguh-sungguh belajar dan terus mengasah keterampilan...'"
            className="lkpd-textarea bg-white"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1">
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
                Tanggal Penandatanganan:
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
        {submitStatus && submitStatus.type === 'success' && (
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm">Jawaban Berhasil Dikirim!</h4>
              <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                {submitStatus.message} Silakan unduh/cetak hasilnya atau lanjut ke Aktivitas 7.
              </p>
            </div>
          </div>
        )}

        {submitStatus && submitStatus.type === 'error' && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-medium">{submitStatus.message}</p>
            </div>
            {onGoToCover && (
              <button
                onClick={onGoToCover}
                className="px-3.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shrink-0"
              >
                Lengkapi Identitas
              </button>
            )}
          </div>
        )}

        {/* Action Buttons (Mobile-friendly full width stacked -> Desktop row) */}
        <div className="pt-4 border-t border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5">
            <button
              onClick={handleCelebrateSubmit}
              disabled={submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-bold transition-all shadow-md shadow-purple-200 text-sm active:scale-95"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{submitting ? 'Mengirim...' : 'Kirim Jawaban ke Guru BK'}</span>
            </button>

            <div className="grid grid-cols-2 sm:flex gap-2">
              <button
                onClick={onDownloadTxt}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold transition-all border border-purple-200 text-xs sm:text-sm"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Unduh TXT</span>
              </button>

              <button
                onClick={onOpenPrint}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-all border border-slate-200 text-xs sm:text-sm"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>Cetak / PDF</span>
              </button>
            </div>
          </div>

          <button
            onClick={onGoToFollowUp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md shadow-emerald-200 text-sm active:scale-95"
          >
            <span>Aktivitas 7: Follow Up</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
