// Data and Schema for E-LKPD BK (Pilih Karierku & Evaluasi Tindak Lanjut BK)

export const RIASEC_TYPES = {
  R: {
    code: 'R',
    name: 'Realistic (Praktis & Mekanikal)',
    title: 'Realistic',
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
    iconName: 'Wrench',
    summary: 'Suka bekerja dengan tangan, alat, mesin, benda nyata, dan aktivitas luar ruangan.',
    characteristics: ['Praktis & realistis', 'Menyukai ketangkasan fisik/teknik', 'Suka melihat hasil kerja nyata', 'Fokus pada solusi konkret'],
    careerExamples: ['Teknisi Mesin/Robotika', 'Arsitek Lapangan/Sipil', 'Ahli Pertanian Modern', 'Pilot / Teknisi Aviasi', 'Fotografer Alam / Lapangan', 'Network/Hardware Engineer']
  },
  I: {
    code: 'I',
    name: 'Investigative (Peneliti & Analitis)',
    title: 'Investigative',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    tagColor: 'bg-blue-100 text-blue-800 border-blue-300',
    iconName: 'Microscope',
    summary: 'Suka meneliti, menganalisis data, memecahkan teka-teki logika, dan mendalami sains.',
    characteristics: ['Kritis & rasa ingin tahu tinggi', 'Menyukai riset & analisis mendalam', 'Sistematis dalam berpikir', 'Independen & observatif'],
    careerExamples: ['Ilmuwan / Peneliti', 'Data Analyst / Scientist', 'Dokter / Dokter Spesialis', 'Software Engineer / AI Researcher', 'Psikolog Peneliti', 'Apoteker / Farmasis']
  },
  A: {
    code: 'A',
    name: 'Artistic (Kreatif & Ekspresif)',
    title: 'Artistic',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    tagColor: 'bg-purple-100 text-purple-800 border-purple-300',
    iconName: 'Palette',
    summary: 'Suka mengekspresikan ide, karya orisinal, desain visual, musik, dan penulisan kreatif.',
    characteristics: ['Imajinatif & berjiwa bebas', 'Sensitif terhadap keindahan/estetika', 'Suka kebebasan berkarya tanpa batas kaku', 'Inovatif dalam visual & cerita'],
    careerExamples: ['UI/UX Designer', 'Content Creator / Animator', 'Penulis / Jurnalis / Copywriter', 'Desainer Grafis / Mode', 'Sutradara / Video Editor', 'Musisi / Komposer']
  },
  S: {
    code: 'S',
    name: 'Social (Penolong & Pendidik)',
    title: 'Social',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-800',
    tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    iconName: 'HeartHandshake',
    summary: 'Suka mendengarkan, mengajar, membantu orang lain berkembang, dan melayani masyarakat.',
    characteristics: ['Empatik & ramah', 'Komunikatif & pendengar yang baik', 'Suka bekerja dalam tim', 'Peduli terhadap kesejahteraan orang lain'],
    careerExamples: ['Guru / Dosen', 'Konselor BK / Psikolog Klinis', 'Perawat / Tenaga Medis Komunitas', 'Pekerja Sosial', 'Human Resources (HRD)', 'Trainer / Public Educator']
  },
  E: {
    code: 'E',
    name: 'Enterprising (Pemimpin & Wirausaha)',
    title: 'Enterprising',
    color: 'from-rose-500 to-red-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-800',
    tagColor: 'bg-rose-100 text-rose-800 border-rose-300',
    iconName: 'TrendingUp',
    summary: 'Suka memimpin proyek, mempengaruhi orang lain, bernegosiasi, dan membangun bisnis.',
    characteristics: ['Percaya diri & persuasif', 'Berani mengambil risiko terukur', 'Berorientasi pada target & prestasi', 'Punya jiwa kepemimpinan kuat'],
    careerExamples: ['Wirausahawan / Entrepreneur', 'Manajer Pemasaran (Marketing)', 'Event Organizer Director', 'Public Relations Specialist', 'Business Development / Sales Executive', 'Pengacara / Advokat']
  },
  C: {
    code: 'C',
    name: 'Conventional (Teratur & Terorganisir)',
    title: 'Conventional',
    color: 'from-slate-600 to-zinc-700',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    textColor: 'text-slate-800',
    tagColor: 'bg-slate-100 text-slate-800 border-slate-300',
    iconName: 'FileSpreadsheet',
    summary: 'Suka bekerja dengan data terstruktur, angka, ketelitian berkas, dan mematuhi aturan baku.',
    characteristics: ['Teliti, cermat, & disiplin', 'Menyukai keteraturan & kerapian', 'Ahli dalam pengarsipan & angka', 'Konsisten mengikuti prosedur standar'],
    careerExamples: ['Akuntan / Auditor Keuangan', 'Data Entry & Records Administrator', 'Petugas Pajak / Perbankan', 'Quality Control Inspector', 'Sekretaris / Executive Assistant', 'Staf Logistik & Inventaris']
  }
};

// 18 RIASEC assessment quiz questions (3 for each dimension)
export const RIASEC_QUESTIONS = [
  { id: 'R1', type: 'R', text: 'Saya senang memperbaiki barang yang rusak atau merakit peralatan dengan tangan sendiri.' },
  { id: 'I1', type: 'I', text: 'Saya senang mencari tahu alasan di balik suatu fenomena dan suka membaca artikel ilmiah/teknologi.' },
  { id: 'A1', type: 'A', text: 'Saya senang menggambar, mendesain tampilan, menulis cerita, atau membuat karya seni orisinal.' },
  { id: 'S1', type: 'S', text: 'Saya senang mendengarkan curhat teman dan membantunya mencari solusi atas masalahnya.' },
  { id: 'E1', type: 'E', text: 'Saya senang memimpin kelompok, mengoordinasi kegiatan, dan mengajak orang lain mengikuti ide saya.' },
  { id: 'C1', type: 'C', text: 'Saya menyukai kegiatan yang teratur, rapi, menyusun jadwal, dan memeriksa ketepatan data/angka.' },
  
  { id: 'R2', type: 'R', text: 'Saya lebih menikmati aktivitas praktik langsung atau luar ruangan dibanding hanya duduk membaca teori berjam-jam.' },
  { id: 'I2', type: 'I', text: 'Saya menyukai teka-teki logika, eksperimen laboratorium, atau menganalisis data statistik.' },
  { id: 'A2', type: 'A', text: 'Saya menyukai kebebasan dalam mengekspresikan diri dan kurang nyaman jika dikekang aturan kaku.' },
  { id: 'S2', type: 'S', text: 'Saya merasa bersemangat ketika bisa mengajarkan materi pelajaran yang saya kuasai kepada teman lain.' },
  { id: 'E2', type: 'E', text: 'Saya tertarik pada dunia bisnis, penjualan, negosiasi, atau mengelola proyek agar sukses.' },
  { id: 'C2', type: 'C', text: 'Saya sangat cermat dalam memeriksa kesalahan tulisan, rincian biaya, atau dokumen administrasi.' },

  { id: 'R3', type: 'R', text: 'Saya tertarik mempelajari cara kerja mesin, otomotif, perkakas listrik, atau jaringan komputer fisik.' },
  { id: 'I3', type: 'I', text: 'Ketika menghadapi masalah, saya cenderung meneliti akar penyebabnya secara kritis dan obyektif.' },
  { id: 'A3', type: 'A', text: 'Saya suka mencoba hal-hal baru yang artistik seperti videografi, musik, lukisan, atau desain konten media sosial.' },
  { id: 'S3', type: 'S', text: 'Bagi saya, pekerjaan yang paling bermakna adalah pekerjaan yang memberi dampak positif bagi kemanusiaan.' },
  { id: 'E3', type: 'E', text: 'Saya tidak ragu berbicara di depan umum dan percaya diri mempengaruhi pendengar untuk setuju.' },
  { id: 'C3', type: 'C', text: 'Saya merasa tenang jika file, catatan, dan meja kerja saya tersusun rapi sesuai urutan yang jelas.' },
];

export const SUGGESTED_HOBBIES = [
  'Membaca Buku / Jurnal',
  'Menulis & Mengarang',
  'Menggambar / Digital Art',
  'Fotografi & Videografi',
  'Coding & Pemrograman',
  'Bermain Alat Musik',
  'Olahraga Tim / Atletik',
  'Memasak & Kuliner',
  'Otomotif & Robotika',
  'Organisasi & Kerelawanan',
  'Public Speaking / Debat',
  'Bisnis / Jual Beli Online',
  'Eksperimen Sains & Alam',
  'Mengedit Video & Desain Grafis',
  'Mendengarkan Musik / Podcast',
  'Pramuka / PMR / Paskibra'
];

export const INITIAL_LKPD1_DATA = {
  // Identity
  nama: '',
  kelas: '',
  tanggal: new Date().toISOString().split('T')[0],

  // Activity 1: Who Am I
  hobbies: [],
  otherHobbies: '',
  strengths: '',
  areasToImprove: '',
  coreValues: '',
  riasecAnswers: {}, // { R1: true/false, ... }

  // Activity 2: Explore Your Career
  exploredCareers: [
    { title: '', riasecType: '', reason: '' },
    { title: '', riasecType: '', reason: '' },
    { title: '', riasecType: '', reason: '' },
  ],

  // Activity 3: Career Investigation
  investigation: {
    careerName: '',
    educationPath: '',
    hardSkills: '',
    softSkills: '',
    challenges: '',
    careerOutlook: '',
  },

  // Activity 4: My Career Decision
  decision: {
    planACareer: '',
    planAEducation: '',
    planAReason: '',
    planBCareer: '',
    planBEducation: '',
    planBTrigger: '',
    supportNeeded: '',
  },

  // Activity 5: My Future Action Plan
  actionPlan: {
    shortTerm: '',   // Sekarang - 1 tahun (SMA/SMK)
    mediumTerm: '',  // 1 - 3 tahun (Kuliah / Kursus / Sertifikasi)
    longTerm: '',    // 3 - 5+ tahun (Karier Profesional)
    supportPersons: '',
  },

  // Activity 6: Reflect & Commit
  reflection: {
    newInsights: '',
    commitmentStatement: '',
    studentSignatureName: '',
    signedDate: new Date().toISOString().split('T')[0],
  },

  // Metadata
  isCompleted: false,
  lastSaved: null,
};

export const INITIAL_LKPD2_DATA = {
  nama: '',
  kelas: '',
  tanggal: new Date().toISOString().split('T')[0],
  questionOne: '',     // 'Sudah sepenuhnya' | 'Sudah sebagian' | 'Belum terlaksana'
  questionTwo: '',     // 'Sangat membantu' | 'Cukup membantu' | 'Belum membantu'
  questionThree: '',   // Perubahan positif yang dirasakan (textarea)
  questionFour: '',    // Kendala yang masih dihadapi (textarea)
  questionFive: '',    // Langkah kecil selanjutnya (textarea)
  isCompleted: false,
  lastSaved: null,
};

const STORAGE_KEY_LKPD1 = 'ruangbk_elkpd1_data_v1';
const STORAGE_KEY_LKPD2 = 'ruangbk_elkpd2_data_v1';

export const loadLKPD1 = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LKPD1);
    if (!raw) return INITIAL_LKPD1_DATA;
    return { ...INITIAL_LKPD1_DATA, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Error loading LKPD1:', err);
    return INITIAL_LKPD1_DATA;
  }
};

export const saveLKPD1 = (data) => {
  try {
    const payload = { ...data, lastSaved: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY_LKPD1, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.error('Error saving LKPD1:', err);
    return false;
  }
};

export const loadLKPD2 = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LKPD2);
    if (!raw) return INITIAL_LKPD2_DATA;
    return { ...INITIAL_LKPD2_DATA, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Error loading LKPD2:', err);
    return INITIAL_LKPD2_DATA;
  }
};

export const saveLKPD2 = (data) => {
  try {
    const payload = { ...data, lastSaved: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY_LKPD2, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.error('Error saving LKPD2:', err);
    return false;
  }
};

export const clearAllLKPD = () => {
  localStorage.removeItem(STORAGE_KEY_LKPD1);
  localStorage.removeItem(STORAGE_KEY_LKPD2);
};

// Calculate RIASEC scores from answers
export const calculateRIASEC = (answers = {}) => {
  const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  Object.entries(answers).forEach(([qId, val]) => {
    if (val) {
      const type = qId[0];
      if (scores[type] !== undefined) {
        scores[type] += 1;
      }
    }
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topThree = sorted.slice(0, 3);
  const hollandCode = topThree.map(([code]) => code).join('');
  const maxPossible = 3;

  return {
    scores,
    sorted,
    topThree,
    hollandCode: hollandCode || 'RIA',
    primaryType: sorted[0] ? sorted[0][0] : 'R',
    totalAnswered: Object.values(answers).filter(Boolean).length,
    maxPossible,
  };
};

// Generate TXT formatted export for LKPD 1
export const generateLKPD1Txt = (data) => {
  const riasec = calculateRIASEC(data.riasecAnswers);
  const divider = '='.repeat(60);
  const subDivider = '-'.repeat(60);

  return `${divider}
E-LKPD LAYANAN BIMBINGAN DAN KONSELING BIDANG KARIER
LEMBAR KERJA PESERTA DIDIK: "PILIH KARIERKU"
Universitas Lambung Mangkurat • TemanBK
${divider}

[IDENTITAS SISWA]
Nama Lengkap      : ${data.nama || '-'}
Kelas             : ${data.kelas || '-'}
Tanggal Pengisian : ${data.tanggal || '-'}

${subDivider}
AKTIVITAS 1: WHO AM I? (MENGENAL DIRI SENDIRI)
${subDivider}
A. Kegiatan/Hobi yang Disukai:
${(data.hobbies || []).length > 0 ? data.hobbies.map(h => `  • ${h}`).join('\n') : '  - Belum dipilih'}
${data.otherHobbies ? `  • Lainnya: ${data.otherHobbies}\n` : ''}
B. Mengenal Karakter Diri:
- Kelebihan / Potensi Diri : ${data.strengths || '-'}
- Hal yang Ingin Diperbaiki: ${data.areasToImprove || '-'}
- Nilai Hidup / Prinsip    : ${data.coreValues || '-'}

C. Hasil Minat Holland (RIASEC):
- Skor R (Realistic)    : ${riasec.scores.R}/3
- Skor I (Investigative): ${riasec.scores.I}/3
- Skor A (Artistic)     : ${riasec.scores.A}/3
- Skor S (Social)       : ${riasec.scores.S}/3
- Skor E (Enterprising) : ${riasec.scores.E}/3
- Skor C (Conventional) : ${riasec.scores.C}/3
- Holland Code Dominan  : ${riasec.hollandCode} (${riasec.topThree.map(([c]) => RIASEC_TYPES[c]?.title || c).join(' - ')})

${subDivider}
AKTIVITAS 2: EXPLORE YOUR CAREER (EKSPLORASI KARIER)
${subDivider}
Pilihan Karier Menarik Berdasarkan Minat:
${(data.exploredCareers || []).map((c, i) => `  ${i + 1}. ${c.title || '-'} [Tipe: ${c.riasecType || '-'}]
     Alasan Tertarik: ${c.reason || '-'}`).join('\n\n')}

${subDivider}
AKTIVITAS 3: CAREER INVESTIGATION (INVESTIGASI PROFESI IMPIAN)
${subDivider}
Profesi yang Diinvestigasi: ${data.investigation?.careerName || '-'}
1. Jalur Pendidikan/Studi : ${data.investigation?.educationPath || '-'}
2. Hard Skills Diperlukan : ${data.investigation?.hardSkills || '-'}
3. Soft Skills Diperlukan : ${data.investigation?.softSkills || '-'}
4. Tantangan Profesi      : ${data.investigation?.challenges || '-'}
5. Prospek Masa Depan     : ${data.investigation?.careerOutlook || '-'}

${subDivider}
AKTIVITAS 4: MY CAREER DECISION (KEPUTUSAN KARIERKU)
${subDivider}
[Pilihan Utama - Plan A]
- Profesi Impian Utama    : ${data.decision?.planACareer || '-'}
- Jalur Studi / Lanjutan  : ${data.decision?.planAEducation || '-'}
- Alasan & Keyakinan      : ${data.decision?.planAReason || '-'}

[Pilihan Cadangan - Plan B]
- Profesi Alternatif      : ${data.decision?.planBCareer || '-'}
- Jalur Studi Alternatif  : ${data.decision?.planBEducation || '-'}
- Pemicu Aktivasi Plan B  : ${data.decision?.planBTrigger || '-'}

Dukungan yang Dibutuhkan  : ${data.decision?.supportNeeded || '-'}

${subDivider}
AKTIVITAS 5: MY FUTURE ACTION PLAN (RENCANA AKSI NYATA)
${subDivider}
1. Jangka Pendek (Saat ini - 1 Tahun di Sekolah):
   ${data.actionPlan?.shortTerm || '-'}
2. Jangka Menengah (1 - 3 Tahun ke Depan):
   ${data.actionPlan?.mediumTerm || '-'}
3. Jangka Panjang (3 - 5+ Tahun ke Depan):
   ${data.actionPlan?.longTerm || '-'}
Pihak Pendamping/Dukungan : ${data.actionPlan?.supportPersons || '-'}

${subDivider}
AKTIVITAS 6: REFLECT & COMMIT (REFLEKSI & KOMITMEN PRIBADI)
${subDivider}
Wawasan Baru yang Didapat:
${data.reflection?.newInsights || '-'}

Pernyataan Komitmen Diri:
"${data.reflection?.commitmentStatement || '-'}"

Tertanda: ${data.reflection?.studentSignatureName || data.nama || '-'}
Tanggal : ${data.reflection?.signedDate || data.tanggal || '-'}

${divider}
Dicatat melalui E-LKPD Bimbingan dan Konseling | TemanBK
${divider}`;
};

// Generate TXT formatted export for LKPD 2
export const generateLKPD2Txt = (data) => {
  const divider = '='.repeat(60);

  return `${divider}
E-LKPD EVALUASI TINDAK LANJUT BK
LEMBAR KERJA PESERTA DIDIK
Bimbingan dan Konseling · Refleksi Diri
${divider}

[IDENTITAS SISWA]
Nama Lengkap      : ${data.nama || '-'}
Kelas             : ${data.kelas || '-'}
Tanggal Pengisian : ${data.tanggal || '-'}

[REFLEKSI TINDAK LANJUT]

1. Sejauh mana rencana tindak lanjutmu sudah dilaksanakan?
   Jawaban: ${data.questionOne || 'Belum diisi'}

2. Apakah tindak lanjut tersebut membantumu?
   Jawaban: ${data.questionTwo || 'Belum diisi'}

3. Perubahan positif apa yang sudah kamu rasakan?
   ${data.questionThree || '-'}

4. Kendala apa yang masih kamu hadapi?
   ${data.questionFour || '-'}

5. Apa langkah kecil yang akan kamu lakukan selanjutnya?
   ${data.questionFive || '-'}

${divider}
"Beri dirimu waktu untuk bertumbuh, satu langkah setiap hari."
Disimpan pada: ${data.lastSaved ? new Date(data.lastSaved).toLocaleString('id-ID') : new Date().toLocaleString('id-ID')}
${divider}`;
};
