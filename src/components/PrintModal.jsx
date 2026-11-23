import React from 'react';
import { X, Printer, Download, Award, CheckCircle } from 'lucide-react';
import { calculateRIASEC, RIASEC_TYPES } from '../data/elkpdData';

export default function PrintModal({
  isOpen,
  onClose,
  activeTab,
  lkpd1Data,
  lkpd2Data,
}) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const isLkpd1 = activeTab === 'lkpd1';
  const riasec = isLkpd1 ? calculateRIASEC(lkpd1Data.riasecAnswers) : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 flex items-start justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Controls (Hidden in Print) */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between no-print">
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-slate-800">
              Pratinjau Cetak / Unduh Dokumen PDF
            </h3>
            <p className="text-xs text-slate-500">
              Dokumen ini dirancang rapi untuk dicetak langsung atau disimpan sebagai file PDF
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sekarang / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet */}
        <div className="p-6 sm:p-12 text-slate-900 font-sans space-y-6">
          {isLkpd1 ? (
            /* Document Content for LKPD 1 */
            <div className="space-y-6">
              {/* Header Institution */}
              <div className="border-b-2 border-slate-800 pb-4 text-center">
                <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Universitas Lambung Mangkurat • Bimbingan dan Konseling
                </div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-1">
                  LEMBAR KERJA PESERTA DIDIK (E-LKPD)
                </h1>
                <h2 className="text-lg font-bold text-purple-700">
                  “PILIH KARIERKU”
                </h2>
                <p className="text-xs italic text-slate-600 mt-0.5">
                  Kenali Minat, Tentukan Pilihan, Rencanakan Masa Depan
                </p>
              </div>

              {/* Identitas Table */}
              <div className="p-4 rounded-xl border border-slate-300 grid grid-cols-3 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-xs">Nama Lengkap:</span>
                  <strong className="text-slate-800">{lkpd1Data.nama || '-'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Kelas:</span>
                  <strong className="text-slate-800">{lkpd1Data.kelas || '-'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Tanggal Pengisian:</span>
                  <strong className="text-slate-800">{lkpd1Data.tanggal || '-'}</strong>
                </div>
              </div>

              {/* Aktivitas 1 Summary */}
              <div className="border border-slate-300 rounded-xl p-4 space-y-3">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-1">
                  AKTIVITAS 1 — WHO AM I? (PROFIL DIRI & MINAT RIASEC)
                </h3>
                <div className="text-xs space-y-1.5">
                  <p><strong>Hobi/Aktivitas Disukai:</strong> {(lkpd1Data.hobbies || []).join(', ') || '-'} {lkpd1Data.otherHobbies ? `(${lkpd1Data.otherHobbies})` : ''}</p>
                  <p><strong>Kelebihan Diri:</strong> {lkpd1Data.strengths || '-'}</p>
                  <p><strong>Hal yang Ingin Dikembangkan:</strong> {lkpd1Data.areasToImprove || '-'}</p>
                  <p><strong>Nilai Hidup:</strong> {lkpd1Data.coreValues || '-'}</p>
                  <p><strong>Hasil Holland Code:</strong> <span className="font-bold text-purple-700">{riasec?.hollandCode}</span> ({riasec?.topThree.map(([c]) => RIASEC_TYPES[c]?.title).join(' - ')})</p>
                </div>
              </div>

              {/* Aktivitas 2 Summary */}
              <div className="border border-slate-300 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-1">
                  AKTIVITAS 2 — EXPLORE YOUR CAREER (3 PROFESI PILIHAN)
                </h3>
                <div className="space-y-2 text-xs">
                  {(lkpd1Data.exploredCareers || []).map((c, i) => (
                    <div key={i} className="p-2 bg-slate-50 rounded-lg">
                      <strong>#{i + 1} {c.title || '-'}</strong> [Tipe: {c.riasecType || '-'}]
                      <p className="text-slate-600 mt-0.5">Alasan: {c.reason || '-'}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aktivitas 3 Summary */}
              <div className="border border-slate-300 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-1">
                  AKTIVITAS 3 — CAREER INVESTIGATION
                </h3>
                <div className="text-xs space-y-1">
                  <p><strong>Profesi Diinvestigasi:</strong> {lkpd1Data.investigation?.careerName || '-'}</p>
                  <p><strong>Jalur Studi:</strong> {lkpd1Data.investigation?.educationPath || '-'}</p>
                  <p><strong>Hard Skills:</strong> {lkpd1Data.investigation?.hardSkills || '-'}</p>
                  <p><strong>Soft Skills:</strong> {lkpd1Data.investigation?.softSkills || '-'}</p>
                  <p><strong>Tantangan:</strong> {lkpd1Data.investigation?.challenges || '-'}</p>
                  <p><strong>Prospek Masa Depan:</strong> {lkpd1Data.investigation?.careerOutlook || '-'}</p>
                </div>
              </div>

              {/* Aktivitas 4 Summary */}
              <div className="border border-slate-300 rounded-xl p-4 space-y-3">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-1">
                  AKTIVITAS 4 — MY CAREER DECISION (PLAN A & PLAN B)
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2 bg-purple-50/70 border border-purple-200 rounded-lg">
                    <strong className="text-purple-900 block mb-1">Pilihan Utama (Plan A):</strong>
                    <p>Karier: {lkpd1Data.decision?.planACareer || '-'}</p>
                    <p>Pendidikan: {lkpd1Data.decision?.planAEducation || '-'}</p>
                    <p>Alasan: {lkpd1Data.decision?.planAReason || '-'}</p>
                  </div>
                  <div className="p-2 bg-amber-50/70 border border-amber-200 rounded-lg">
                    <strong className="text-amber-950 block mb-1">Pilihan Cadangan (Plan B):</strong>
                    <p>Karier: {lkpd1Data.decision?.planBCareer || '-'}</p>
                    <p>Pendidikan: {lkpd1Data.decision?.planBEducation || '-'}</p>
                    <p>Pemicu: {lkpd1Data.decision?.planBTrigger || '-'}</p>
                  </div>
                </div>
                <div className="text-xs">
                  <strong>Dukungan yang Dibutuhkan:</strong> {lkpd1Data.decision?.supportNeeded || '-'}
                </div>
              </div>

              {/* Aktivitas 5 Summary */}
              <div className="border border-slate-300 rounded-xl p-4 space-y-2">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-1">
                  AKTIVITAS 5 — MY FUTURE ACTION PLAN
                </h3>
                <div className="text-xs space-y-1.5">
                  <p><strong>1. Jangka Pendek (Sekolah):</strong> {lkpd1Data.actionPlan?.shortTerm || '-'}</p>
                  <p><strong>2. Jangka Menengah (Kuliah/Vokasi):</strong> {lkpd1Data.actionPlan?.mediumTerm || '-'}</p>
                  <p><strong>3. Jangka Panjang (Karier):</strong> {lkpd1Data.actionPlan?.longTerm || '-'}</p>
                  <p><strong>Pihak Pendamping:</strong> {lkpd1Data.actionPlan?.supportPersons || '-'}</p>
                </div>
              </div>

              {/* Aktivitas 6 Summary / Tanda Tangan */}
              <div className="border border-slate-300 rounded-xl p-4 space-y-3">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-1">
                  AKTIVITAS 6 — REFLECT & COMMIT!
                </h3>
                <div className="text-xs space-y-1">
                  <p><strong>Wawasan Baru:</strong> {lkpd1Data.reflection?.newInsights || '-'}</p>
                  <p><strong>Ikrar Komitmen:</strong> <em>“{lkpd1Data.reflection?.commitmentStatement || '-'}”</em></p>
                </div>
                <div className="pt-4 flex justify-end text-xs text-right">
                  <div>
                    <p>Banjarmasin, {lkpd1Data.reflection?.signedDate || lkpd1Data.tanggal || '-'}</p>
                    <p className="mt-1">Peserta Didik yang Berkomitmen,</p>
                    <div className="h-12" />
                    <strong>{lkpd1Data.reflection?.studentSignatureName || lkpd1Data.nama || '(Nama Siswa)'}</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Document Content for LKPD 2 */
            <div className="space-y-6">
              <div className="border-b-2 border-slate-800 pb-4 text-center">
                <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                  Bimbingan dan Konseling • Refleksi Diri
                </div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 mt-1">
                  E-LKPD EVALUASI TINDAK LANJUT BK
                </h1>
                <p className="text-xs italic text-slate-600 mt-0.5">
                  “Beri dirimu waktu untuk bertumbuh, satu langkah setiap hari.”
                </p>
              </div>

              {/* Identitas */}
              <div className="p-4 rounded-xl border border-slate-300 grid grid-cols-3 gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-xs">Nama Lengkap:</span>
                  <strong className="text-slate-800">{lkpd2Data.nama || '-'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Kelas:</span>
                  <strong className="text-slate-800">{lkpd2Data.kelas || '-'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Tanggal Pengisian:</span>
                  <strong className="text-slate-800">{lkpd2Data.tanggal || '-'}</strong>
                </div>
              </div>

              {/* 5 Pertanyaan */}
              <div className="border border-slate-300 rounded-xl p-5 space-y-4 text-xs sm:text-sm">
                <div>
                  <strong className="block text-slate-800 mb-1">
                    1. Sejauh mana rencana tindak lanjutmu sudah dilaksanakan?
                  </strong>
                  <div className="p-2.5 rounded-lg bg-slate-50 font-semibold text-slate-700">
                    {lkpd2Data.questionOne || 'Belum diisi'}
                  </div>
                </div>

                <div>
                  <strong className="block text-slate-800 mb-1">
                    2. Apakah tindak lanjut tersebut membantumu?
                  </strong>
                  <div className="p-2.5 rounded-lg bg-slate-50 font-semibold text-slate-700">
                    {lkpd2Data.questionTwo || 'Belum diisi'}
                  </div>
                </div>

                <div>
                  <strong className="block text-slate-800 mb-1">
                    3. Perubahan positif apa yang sudah kamu rasakan?
                  </strong>
                  <div className="p-2.5 rounded-lg bg-slate-50 text-slate-700 leading-relaxed">
                    {lkpd2Data.questionThree || '-'}
                  </div>
                </div>

                <div>
                  <strong className="block text-slate-800 mb-1">
                    4. Kendala apa yang masih kamu hadapi?
                  </strong>
                  <div className="p-2.5 rounded-lg bg-slate-50 text-slate-700 leading-relaxed">
                    {lkpd2Data.questionFour || '-'}
                  </div>
                </div>

                <div>
                  <strong className="block text-slate-800 mb-1">
                    5. Apa langkah kecil yang akan kamu lakukan selanjutnya?
                  </strong>
                  <div className="p-2.5 rounded-lg bg-slate-50 text-slate-700 leading-relaxed">
                    {lkpd2Data.questionFive || '-'}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end text-xs text-right">
                <div>
                  <p>Tanggal: {lkpd2Data.tanggal || '-'}</p>
                  <p className="mt-1">Peserta Didik,</p>
                  <div className="h-12" />
                  <strong>{lkpd2Data.nama || '(Nama Siswa)'}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
