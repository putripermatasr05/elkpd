import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar, { STEPS } from './components/Sidebar';
import BottomNav from './components/BottomNav';
import CoverSection from './components/CoverSection';
import Activity1WhoAmI from './components/Activity1WhoAmI';
import Activity2ExploreCareer from './components/Activity2ExploreCareer';
import Activity3CareerInvestigation from './components/Activity3CareerInvestigation';
import Activity4CareerDecision from './components/Activity4CareerDecision';
import Activity5ActionPlan from './components/Activity5ActionPlan';
import Activity6ReflectCommit from './components/Activity6ReflectCommit';
import Activity7FollowUp from './components/Activity7FollowUp';
import EvaluationWorksheet from './components/EvaluationWorksheet';
import AdminDashboard from './components/AdminDashboard';
import PrintModal from './components/PrintModal';
import ResetModal from './components/ResetModal';
import {
  loadLKPD1,
  saveLKPD1,
  loadLKPD2,
  saveLKPD2,
  clearAllLKPD,
  INITIAL_LKPD1_DATA,
  INITIAL_LKPD2_DATA,
  generateLKPD1Txt,
  generateLKPD2Txt,
} from './data/elkpdData';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const checkIsAdminRoute = () => {
  const params = new URLSearchParams(window.location.search);
  const path = window.location.pathname.toLowerCase();
  return params.get('admin') === 'true' || path === '/admin' || path === '/admin/';
};

export default function App() {
  const [isAdminView, setIsAdminView] = useState(() => checkIsAdminRoute());
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') === 'lkpd2' ? 'lkpd2' : 'lkpd1';
  });
  const [currentStep, setCurrentStep] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('step') || 'cover';
  });
  const [lkpd1Data, setLkpd1Data] = useState(() => loadLKPD1());
  const [lkpd2Data, setLkpd2Data] = useState(() => loadLKPD2());

  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync popstate (back/forward browser navigation)
  useEffect(() => {
    const onPopState = () => setIsAdminView(checkIsAdminRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Auto-save LKPD 1 on changes
  useEffect(() => {
    saveLKPD1(lkpd1Data);
  }, [lkpd1Data]);

  // Auto-save LKPD 2 on changes
  useEffect(() => {
    saveLKPD2(lkpd2Data);
  }, [lkpd2Data]);

  const exitAdminView = () => {
    setIsAdminView(false);
    window.history.pushState({}, '', '/');
  };

  if (isAdminView) {
    return <AdminDashboard onExitAdmin={exitAdminView} />;
  }

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Field updates
  const handleUpdateLKPD1 = (field, value) => {
    setLkpd1Data((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateLKPD2 = (field, value) => {
    setLkpd2Data((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate Progress Percent for LKPD 1
  const calculateProgress = () => {
    let score = 0;
    if (lkpd1Data.nama && lkpd1Data.kelas) score += 15;
    if ((lkpd1Data.hobbies && lkpd1Data.hobbies.length > 0) || lkpd1Data.strengths) score += 15;
    if (lkpd1Data.riasecAnswers && Object.keys(lkpd1Data.riasecAnswers).length >= 3) score += 15;
    if (lkpd1Data.exploredCareers && lkpd1Data.exploredCareers.some((c) => c.title)) score += 15;
    if (lkpd1Data.investigation && lkpd1Data.investigation.careerName) score += 15;
    if (lkpd1Data.decision && lkpd1Data.decision.planACareer) score += 15;
    if (lkpd1Data.actionPlan && lkpd1Data.actionPlan.shortTerm) score += 10;
    return Math.min(score, 100);
  };

  const progressPercent = calculateProgress();

  // Copy TXT handler
  const handleCopyTxt = async () => {
    const text = activeTab === 'lkpd1' ? generateLKPD1Txt(lkpd1Data) : generateLKPD2Txt(lkpd2Data);
    try {
      await navigator.clipboard.writeText(text);
      showToast('Ringkasan teks berhasil disalin ke clipboard!');
    } catch (err) {
      showToast('Gagal menyalin teks. Silakan gunakan tombol Cetak.');
    }
  };

  // Download TXT file handler
  const handleDownloadTxt = () => {
    const isLkpd1 = activeTab === 'lkpd1';
    const text = isLkpd1 ? generateLKPD1Txt(lkpd1Data) : generateLKPD2Txt(lkpd2Data);
    const filename = isLkpd1
      ? `E-LKPD_Pilih_Karierku_${lkpd1Data.nama ? lkpd1Data.nama.replace(/\s+/g, '_') : 'Siswa'}.txt`
      : `E-LKPD_Evaluasi_BK_${lkpd2Data.nama ? lkpd2Data.nama.replace(/\s+/g, '_') : 'Siswa'}.txt`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Berkas TXT berhasil diunduh!');
  };

  // Reset handler
  const handleConfirmReset = () => {
    if (activeTab === 'lkpd1') {
      setLkpd1Data(INITIAL_LKPD1_DATA);
      setCurrentStep('cover');
    } else {
      setLkpd2Data(INITIAL_LKPD2_DATA);
    }
    clearAllLKPD();
    showToast('Seluruh lembar kerja berhasil dikosongkan.');
  };

  // Step index helpers for LKPD 1
  const stepIdx = STEPS.findIndex((s) => s.id === currentStep);
  const prevStep = stepIdx > 0 ? STEPS[stepIdx - 1] : null;
  const nextStep = stepIdx < STEPS.length - 1 ? STEPS[stepIdx + 1] : null;

  return (
    <div className="min-h-screen relative flex flex-col font-sans">
      {/* Background Aurora Orbs matching TemanBK */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 no-print max-w-full">
        <div className="absolute top-10 left-4 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-purple-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-2 sm:right-4 w-64 h-64 sm:w-[28rem] sm:h-[28rem] bg-amber-200/35 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-2 sm:left-4 w-64 h-64 sm:w-[30rem] sm:h-[30rem] bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 right-4 sm:right-10 w-60 h-60 sm:w-80 sm:h-80 bg-rose-200/25 rounded-full blur-3xl" />
      </div>

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lastSaved={activeTab === 'lkpd1' ? lkpd1Data.lastSaved : lkpd2Data.lastSaved}
        onOpenPrint={() => setIsPrintOpen(true)}
        onCopyTxt={handleCopyTxt}
        onOpenReset={() => setIsResetOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
        {activeTab === 'lkpd1' ? (
          /* LKPD 1: PILIH KARIERKU */
          <div className="flex gap-8 items-start">
            {/* Desktop Left Sidebar */}
            <Sidebar
              currentStep={currentStep}
              onSelectStep={(stepId) => {
                setCurrentStep(stepId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              progressPercent={progressPercent}
            />

            {/* Dynamic Step Content */}
            <div className="flex-1 min-w-0 pb-28 lg:pb-8">
              {currentStep === 'cover' && (
                <CoverSection
                  data={lkpd1Data}
                  onChange={handleUpdateLKPD1}
                  onStart={() => {
                    setCurrentStep('act1');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}

              {currentStep === 'act1' && (
                <Activity1WhoAmI
                  data={lkpd1Data}
                  onChange={handleUpdateLKPD1}
                />
              )}

              {currentStep === 'act2' && (
                <Activity2ExploreCareer
                  data={lkpd1Data}
                  onChange={handleUpdateLKPD1}
                />
              )}

              {currentStep === 'act3' && (
                <Activity3CareerInvestigation
                  data={lkpd1Data}
                  onChange={handleUpdateLKPD1}
                />
              )}

              {currentStep === 'act4' && (
                <Activity4CareerDecision
                  data={lkpd1Data}
                  onChange={handleUpdateLKPD1}
                />
              )}

              {currentStep === 'act5' && (
                <Activity5ActionPlan
                  data={lkpd1Data}
                  onChange={handleUpdateLKPD1}
                />
              )}

              {currentStep === 'act6' && (
                <Activity6ReflectCommit
                  data={lkpd1Data}
                  onChange={handleUpdateLKPD1}
                  onOpenPrint={() => setIsPrintOpen(true)}
                  onDownloadTxt={handleDownloadTxt}
                  onGoToCover={() => {
                    setCurrentStep('cover');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onGoToFollowUp={() => {
                    setCurrentStep('act7');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}

              {currentStep === 'act7' && (
                <Activity7FollowUp
                  onSwitchToLKPD2={() => {
                    setActiveTab('lkpd2');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}

              {/* Stepper Footer Navigation for Desktop */}
              <div className="hidden lg:flex items-center justify-between mt-8 pt-6 border-t border-purple-100/80 no-print">
                <button
                  onClick={() => {
                    if (prevStep) {
                      setCurrentStep(prevStep.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={!prevStep}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                    prevStep
                      ? 'bg-white hover:bg-purple-50 text-slate-700 border border-purple-100 shadow-sm'
                      : 'opacity-40 cursor-not-allowed text-slate-400'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya: {prevStep ? prevStep.short : '-'}</span>
                </button>

                <div className="text-xs text-slate-500 font-medium">
                  Langkah {stepIdx + 1} dari {STEPS.length}
                </div>

                <button
                  onClick={() => {
                    if (nextStep) {
                      setCurrentStep(nextStep.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={!nextStep}
                  className={`px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    nextStep
                      ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-200'
                      : 'opacity-40 cursor-not-allowed text-slate-400'
                  }`}
                >
                  <span>Lanjut: {nextStep ? nextStep.short : '-'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile Bottom Bar for LKPD 1 */}
            <BottomNav
              currentStep={currentStep}
              onSelectStep={(stepId) => {
                setCurrentStep(stepId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              progressPercent={progressPercent}
            />
          </div>
        ) : (
          /* LKPD 2: EVALUASI TINDAK LANJUT BK */
          <div className="pb-12 lg:pb-8">
            <EvaluationWorksheet
              data={lkpd2Data}
              onChange={handleUpdateLKPD2}
              onOpenPrint={() => setIsPrintOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 lg:bottom-8 right-4 sm:right-8 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2.5 border border-slate-700">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <PrintModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
        activeTab={activeTab}
        lkpd1Data={lkpd1Data}
        lkpd2Data={lkpd2Data}
      />

      <ResetModal
        isOpen={isResetOpen}
        onClose={() => setIsResetOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
