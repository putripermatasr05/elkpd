import React from 'react';
import { RefreshCw, ArrowRight, Heart, MessageSquare, CheckCircle2, Award, ExternalLink } from 'lucide-react';

export default function Activity7FollowUp({ onSwitchToLKPD2 }) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Title Banner */}
      <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 text-white shadow-lg shadow-teal-600/15">
        <div className="flex items-center gap-2 text-teal-200 text-xs font-bold uppercase tracking-wider mb-1">
          <RefreshCw className="w-4 h-4 text-amber-300" />
          <span>Aktivitas 7</span>
        </div>
        <h2 className="font-display font-extrabold text-xl sm:text-3xl text-white leading-tight">
          FOLLOW UP — Tindak Lanjut & Evaluasi Perkembangan
        </h2>
        <p className="text-teal-100 text-xs sm:text-base mt-2 max-w-2xl leading-relaxed">
          Perjalanan merencanakan karier tidak berhenti di sini. Evaluasi secara berkala perkembangan rencana aksimu dan diskusikan kembali dengan Guru Bimbingan dan Konseling.
        </p>
      </div>

      {/* Main Follow Up Card */}
      <div className="glass-card p-6 sm:p-10 space-y-6">
        <div className="card-pastel-mint p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-200">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Langkah Evaluasi Mandiri
              </span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-emerald-950">
                E-LKPD Evaluasi Tindak Lanjut BK
              </h3>
            </div>
          </div>

          <p className="text-sm text-emerald-900 leading-relaxed">
            Setelah kamu mulai merealisasikan langkah-langkah di <strong>My Future Action Plan</strong>, luangkan waktu untuk mengisi lembar refleksi tindak lanjut. Lembar ini berguna untuk mengukur sejauh mana rencanamu sudah berjalan, perubahan positif apa yang kamu rasakan, serta kendala yang perlu dibahas kembali bersama Guru BK.
          </p>

          <div className="pt-2">
            <button
              onClick={onSwitchToLKPD2}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-lg shadow-emerald-200 text-sm sm:text-base hover:scale-[1.02] active:scale-95"
            >
              <span>Buka E-LKPD Evaluasi Tindak Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bimbingan Lanjutan Card */}
        <div className="p-6 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-3">
          <div className="flex items-center gap-2.5 text-purple-900 font-bold text-base font-display">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <span>Konsultasi Lanjutan dengan Guru BK / Konselor:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Jika kamu membutuhkan teman bercerita, bimbingan pemilihan jurusan kuliah, atau ingin membahas hasil Holland Code-mu secara tatap muka atau daring, silakan temui Guru BK di sekolah atau gunakan portal konsultasi online TemanBK.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-2 text-xs text-slate-700 p-2.5 rounded-xl bg-white border border-purple-100">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span>Konsultasi bersifat rahasia dan aman</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-700 p-2.5 rounded-xl bg-white border border-purple-100">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span>Didampingi konselor profesional berkompeten</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
