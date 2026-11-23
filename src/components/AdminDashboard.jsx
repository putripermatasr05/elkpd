import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock,
  LogOut,
  RefreshCw,
  Download,
  FileSpreadsheet,
  Search,
  Eye,
  Trash2,
  Printer,
  FileText,
  Database,
  Copy,
  Check,
  Sparkles,
  Heart,
  Users,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import {
  verifyAdminPin,
  fetchAllSubmissions,
  deleteSubmission,
  exportSubmissionsToCSV,
  ELKPD_SQL_SETUP,
} from '../lib/supabase';
import { generateLKPD1Txt, generateLKPD2Txt, RIASEC_TYPES } from '../data/elkpdData';
import PrintModal from './PrintModal';

export default function AdminDashboard({ onExitAdmin }) {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem('elkpd_admin_authed') === '1');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableReady, setTableReady] = useState(true);
  const [showSql, setShowSql] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);

  const [filterType, setFilterType] = useState('all'); // 'all' | 'lkpd1' | 'lkpd2'
  const [filterClass, setFilterClass] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedItem, setSelectedItem] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    const res = await fetchAllSubmissions();
    setSubmissions(res.submissions);
    setTableReady(res.tableReady);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthed) {
      loadData();
    }
  }, [isAuthed]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput)) {
      sessionStorage.setItem('elkpd_admin_authed', '1');
      setIsAuthed(true);
      setPinError('');
    } else {
      setPinError('PIN Admin tidak sesuai. Coba lagi.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('elkpd_admin_authed');
    setIsAuthed(false);
    setPinInput('');
  };

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(ELKPD_SQL_SETUP);
      setSqlCopied(true);
      showToast('Script SQL berhasil disalin!');
      setTimeout(() => setSqlCopied(false), 3000);
    } catch {
      showToast('Gagal menyalin SQL.');
    }
  };

  const handleDownloadTxt = (item) => {
    const isLkpd1 = item.lkpd_type === 'lkpd1';
    const text = isLkpd1 ? generateLKPD1Txt(item.payload || {}) : generateLKPD2Txt(item.payload || {});
    const safeName = (item.student_name || 'Siswa').replace(/\s+/g, '_');
    const filename = isLkpd1
      ? `E-LKPD_Pilih_Karierku_${safeName}.txt`
      : `E-LKPD_Evaluasi_BK_${safeName}.txt`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Berhasil mengunduh TXT untuk ${item.student_name}`);
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Hapus data jawaban milik "${item.student_name}"? Data yang dihapus tidak bisa dikembalikan.`)) {
      return;
    }
    const ok = await deleteSubmission(item);
    if (ok) {
      setSubmissions((prev) => prev.filter((x) => x.id !== item.id));
      showToast('Data berhasil dihapus.');
    } else {
      showToast('Gagal menghapus data.');
    }
  };

  // Unique classes for filter dropdown
  const availableClasses = useMemo(() => {
    const set = new Set();
    submissions.forEach((s) => {
      if (s.student_class) set.add(s.student_class.trim());
    });
    return Array.from(set).sort();
  }, [submissions]);

  // Filtered submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((s) => {
      if (filterType !== 'all' && s.lkpd_type !== filterType) return false;
      if (filterClass !== 'all' && (s.student_class || '').trim() !== filterClass) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = (s.student_name || '').toLowerCase().includes(q);
        const matchClass = (s.student_class || '').toLowerCase().includes(q);
        const matchPlan = (s.plan_a_career || '').toLowerCase().includes(q);
        const matchCode = (s.holland_code || '').toLowerCase().includes(q);
        if (!matchName && !matchClass && !matchPlan && !matchCode) return false;
      }
      return true;
    });
  }, [submissions, filterType, filterClass, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const lkpd1List = submissions.filter((s) => s.lkpd_type === 'lkpd1');
    const lkpd2List = submissions.filter((s) => s.lkpd_type === 'lkpd2');
    const riasecCount = {};
    lkpd1List.forEach((s) => {
      const primary = (s.holland_code || '')[0];
      if (primary && RIASEC_TYPES[primary]) {
        riasecCount[primary] = (riasecCount[primary] || 0) + 1;
      }
    });
    const topRiasec = Object.entries(riasecCount).sort((a, b) => b[1] - a[1])[0];
    return {
      total: submissions.length,
      lkpd1Count: lkpd1List.length,
      lkpd2Count: lkpd2List.length,
      topRiasec: topRiasec ? `${topRiasec[0]} (${RIASEC_TYPES[topRiasec[0]].title})` : '-',
    };
  }, [submissions]);

  /* ─── PIN Login Screen ─── */
  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF8FF] relative overflow-hidden">
        <div className="w-full max-w-md glass-card p-6 sm:p-8 space-y-6 relative z-10">
          <div className="text-center space-y-3">
            {/* 2 Logo Institusi */}
            <div className="flex items-center justify-center gap-3">
              <img
                src="/lambangULM2021warna.webp"
                alt="Logo ULM"
                className="w-12 h-12 object-contain"
              />
              <img
                src="/auderebk.png"
                alt="Logo BK"
                className="w-12 h-12 object-contain rounded-full"
              />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-2xl text-slate-800">
                Dashboard Guru BK
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Universitas Lambung Mangkurat • E-LKPD Bimbingan dan Konseling
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                PIN Akses Admin
              </label>
              <input
                type="password"
                inputMode="numeric"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan PIN (contoh: 1234)"
                className="lkpd-input text-center text-lg tracking-widest font-bold"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-medium mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-200 transition-all"
            >
              Masuk Dashboard
            </button>
          </form>

          <div className="pt-3 border-t border-purple-100 text-center">
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Halaman E-LKPD Siswa</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Main Admin Dashboard ─── */
  return (
    <div className="min-h-screen bg-[#FAF8FF] pb-12">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <img
                src="/lambangULM2021warna.webp"
                alt="Logo ULM"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-xs"
              />
              <img
                src="/auderebk.png"
                alt="Logo BK"
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-full drop-shadow-xs"
              />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-base sm:text-xl text-slate-800 leading-tight">
                Dashboard Rekap E-LKPD BK
              </h1>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className={`inline-flex items-center gap-1 font-semibold ${tableReady ? 'text-emerald-600' : 'text-amber-600'}`}>
                  <span className={`w-2 h-2 rounded-full ${tableReady ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  {tableReady ? 'Terhubung Supabase' : 'Mode Lokal (Belum Setup SQL)'}
                </span>
                <span>•</span>
                <span>BK FKIP ULM</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExitAdmin}
              className="px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold flex items-center gap-1.5 border border-purple-200 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tampilan Siswa</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 no-print">
        {/* Setup SQL Alert Banner (muncul jika tabel belum dibuat di Supabase) */}
        {!tableReady && (
          <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 border border-amber-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm text-amber-950">
                    Tabel Database <code className="bg-amber-100 px-1.5 py-0.5 rounded">elkpd_submissions</code> Belum Dibuat di Supabase
                  </h3>
                  <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    Agar jawaban siswa dari HP mereka langsung masuk ke dashboard ini secara online, jalankan script SQL sekali saja di <strong>Supabase SQL Editor</strong>.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopySql}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  {sqlCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{sqlCopied ? 'SQL Disalin!' : 'Salin Script SQL'}</span>
                </button>
                <button
                  onClick={() => setShowSql(!showSql)}
                  className="px-3 py-2 rounded-xl bg-white text-amber-900 border border-amber-300 font-semibold text-xs"
                >
                  {showSql ? 'Tutup SQL' : 'Lihat SQL'}
                </button>
              </div>
            </div>

            {showSql && (
              <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-300 text-xs overflow-x-auto custom-scroll leading-relaxed">
                {ELKPD_SQL_SETUP}
              </pre>
            )}
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="glass-card p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Total Jawaban</span>
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-slate-800">
              {stats.total}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Semua lembar terkirim</p>
          </div>

          <div className="card-pastel-purple p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-purple-800">Pilih Karierku</span>
              <div className="w-8 h-8 rounded-xl bg-white/80 text-purple-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-purple-950">
              {stats.lkpd1Count}
            </div>
            <p className="text-[11px] text-purple-700 mt-0.5">E-LKPD Bidang Karier</p>
          </div>

          <div className="card-pastel-peach p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-orange-900">Evaluasi BK</span>
              <div className="w-8 h-8 rounded-xl bg-white/80 text-orange-700 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display font-extrabold text-2xl sm:text-3xl text-orange-950">
              {stats.lkpd2Count}
            </div>
            <p className="text-[11px] text-orange-800 mt-0.5">Tindak Lanjut & Refleksi</p>
          </div>

          <div className="card-pastel-mint p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald-900">RIASEC Dominan</span>
              <div className="w-8 h-8 rounded-xl bg-white/80 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display font-extrabold text-lg sm:text-xl text-emerald-950 truncate">
              {stats.topRiasec}
            </div>
            <p className="text-[11px] text-emerald-800 mt-0.5">Minat terbanyak siswa</p>
          </div>
        </div>

        {/* Filter & Export Toolbar */}
        <div className="glass-card p-4 sm:p-5 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row flex-1 gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama siswa, kelas, karier, atau Holland Code..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-purple-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>

              <div className="grid grid-cols-2 sm:flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-white border border-purple-100 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none"
                >
                  <option value="all">Semua E-LKPD</option>
                  <option value="lkpd1">1. Pilih Karierku</option>
                  <option value="lkpd2">2. Evaluasi BK</option>
                </select>

                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-white border border-purple-100 text-xs sm:text-sm font-medium text-slate-700 focus:outline-none"
                >
                  <option value="all">Semua Kelas</option>
                  {availableClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={loadData}
                disabled={loading}
                className="px-3.5 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs sm:text-sm font-semibold flex items-center gap-1.5 border border-purple-200 transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={() => {
                  const ok = exportSubmissionsToCSV(filteredSubmissions, filterType);
                  if (ok) showToast('File CSV (Excel) berhasil diunduh! 📊');
                  else showToast('Belum ada data untuk diunduh.');
                }}
                disabled={filteredSubmissions.length === 0}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-200 transition-all"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Unduh Excel (CSV)</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
            <span>
              Menampilkan <strong>{filteredSubmissions.length}</strong> dari {submissions.length} data jawaban
            </span>
            <span className="hidden sm:inline">
              Tip: Pilih filter &ldquo;1. Pilih Karierku&rdquo; atau &ldquo;2. Evaluasi BK&rdquo; sebelum klik Unduh Excel agar kolom lebih lengkap.
            </span>
          </div>
        </div>

        {/* Submissions List */}
        {loading ? (
          <div className="glass-card p-12 text-center text-slate-500 text-sm">
            Memuat data jawaban siswa...
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="glass-card p-10 sm:p-14 text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-50 text-purple-400 flex items-center justify-center">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-slate-700">
              Belum ada data jawaban
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Jawaban siswa akan otomatis muncul di sini begitu siswa menekan tombol Kirim / Simpan Jawaban di E-LKPD.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-purple-50/80 border-b border-purple-100 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <th className="py-3.5 px-4">Siswa & Kelas</th>
                      <th className="py-3.5 px-4">Jenis E-LKPD</th>
                      <th className="py-3.5 px-4">Ringkasan Hasil</th>
                      <th className="py-3.5 px-4">Waktu Kirim</th>
                      <th className="py-3.5 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50 text-sm">
                    {filteredSubmissions.map((item) => {
                      const isLkpd1 = item.lkpd_type === 'lkpd1';
                      return (
                        <tr key={item.id} className="hover:bg-purple-50/40 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800">{item.student_name}</div>
                            <div className="text-xs text-slate-500">{item.student_class}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                isLkpd1
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {isLkpd1 ? <Sparkles className="w-3 h-3" /> : <Heart className="w-3 h-3" />}
                              {isLkpd1 ? 'Pilih Karierku' : 'Evaluasi BK'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs">
                            {isLkpd1 ? (
                              <div className="space-y-0.5">
                                <div>
                                  Holland: <strong className="text-purple-700">{item.holland_code || '-'}</strong>
                                </div>
                                <div className="truncate">
                                  Plan A: <strong>{item.plan_a_career || item.payload?.decision?.planACareer || '-'}</strong>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-0.5">
                                <div>
                                  Pelaksanaan: <strong>{item.eval_execution || '-'}</strong>
                                </div>
                                <div>
                                  Manfaat: <strong>{item.eval_helpfulness || '-'}</strong>
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                            {new Date(item.created_at).toLocaleString('id-ID', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedItem(item)}
                                title="Lihat Detail & Cetak PDF"
                                className="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Detail</span>
                              </button>
                              <button
                                onClick={() => handleDownloadTxt(item)}
                                title="Unduh TXT"
                                className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200"
                              >
                                <FileText className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(item)}
                                title="Hapus"
                                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden space-y-3">
              {filteredSubmissions.map((item) => {
                const isLkpd1 = item.lkpd_type === 'lkpd1';
                return (
                  <div key={item.id} className="glass-card p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">{item.student_name}</h3>
                        <p className="text-xs text-slate-500">{item.student_class}</p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${
                          isLkpd1 ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {isLkpd1 ? 'Pilih Karierku' : 'Evaluasi BK'}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-purple-50/50 text-xs text-slate-700 space-y-1">
                      {isLkpd1 ? (
                        <>
                          <div>Holland Code: <strong className="text-purple-700">{item.holland_code || '-'}</strong></div>
                          <div>Plan A: <strong>{item.plan_a_career || item.payload?.decision?.planACareer || '-'}</strong></div>
                        </>
                      ) : (
                        <>
                          <div>Pelaksanaan: <strong>{item.eval_execution || '-'}</strong></div>
                          <div>Manfaat: <strong>{item.eval_helpfulness || '-'}</strong></div>
                        </>
                      )}
                      <div className="text-[11px] text-slate-400 pt-1">
                        {new Date(item.created_at).toLocaleString('id-ID')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="flex-1 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Lihat & PDF</span>
                      </button>
                      <button
                        onClick={() => handleDownloadTxt(item)}
                        className="px-3 py-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>TXT</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 rounded-xl text-rose-500 bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      {/* Detail & Print Modal per Siswa */}
      {selectedItem && (
        <PrintModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          activeTab={selectedItem.lkpd_type}
          lkpd1Data={selectedItem.lkpd_type === 'lkpd1' ? selectedItem.payload || {} : {}}
          lkpd2Data={selectedItem.lkpd_type === 'lkpd2' ? selectedItem.payload || {} : {}}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-4 sm:right-8 z-50 px-4 py-3 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-medium shadow-2xl">
          {toast}
        </div>
      )}
    </div>
  );
}
