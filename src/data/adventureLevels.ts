import { LevelData, WorldInfo } from '../types/game';

export const WORLDS_INFO: WorldInfo[] = [
  {
    id: 'buah',
    name: 'Pulau Buah Ceria',
    themeColor: 'from-amber-400 to-orange-400',
    bgGradient: 'bg-gradient-to-b from-amber-50 to-orange-50',
    description: 'Mengenal angka 1 sampai 5 lewat buah-buahan segar!',
    icon: '🍎',
    badge: 'Dunia 1'
  },
  {
    id: 'hewan',
    name: 'Hutan Satwa Pintar',
    themeColor: 'from-emerald-400 to-teal-500',
    bgGradient: 'bg-gradient-to-b from-emerald-50 to-teal-50',
    description: 'Belajar tambah-tambahan bareng hewan-hewan imut!',
    icon: '🐰',
    badge: 'Dunia 2'
  },
  {
    id: 'permen',
    name: 'Lembah Permen Manis',
    themeColor: 'from-pink-400 to-rose-400',
    bgGradient: 'bg-gradient-to-b from-pink-50 to-rose-50',
    description: 'Belajar pengurangan sambil menikmati permen & donat!',
    icon: '🍭',
    badge: 'Dunia 3'
  },
  {
    id: 'bentuk',
    name: 'Kastil Bentuk Ajaib',
    themeColor: 'from-blue-400 to-indigo-500',
    bgGradient: 'bg-gradient-to-b from-blue-50 to-indigo-50',
    description: 'Membandingkan jumlah dan mencari bentuk ajaib!',
    icon: '⭐',
    badge: 'Dunia 4'
  },
  {
    id: 'bintang',
    name: 'Puncak Bintang MathBux',
    themeColor: 'from-purple-500 to-amber-400',
    bgGradient: 'bg-gradient-to-b from-purple-50 to-amber-50',
    description: 'Tantangan juara master untuk mendapatkan MathBux jumbo!',
    icon: '🏆',
    badge: 'Dunia 5'
  }
];

export const ADVENTURE_LEVELS: LevelData[] = [
  // ================= WORLD 1: BUAH =================
  {
    id: 1,
    worldId: 'buah',
    title: 'Apel Merah Manis',
    subtitle: 'Hitung buah apel di atas rumput',
    icon: '🍎',
    color: 'bg-red-500',
    borderColor: 'border-red-400',
    rewardBux: 40,
    questions: [
      {
        id: 'w1_l1_q1',
        type: 'count_objects',
        prompt: 'Ada berapa buah apel merah di layar?',
        speechPrompt: 'Ada berapa buah apel merah di layar? Ayo ketuk apelnya sambil berhitung ya!',
        emoji: '🍎',
        items: [
          { id: 1, emoji: '🍎', name: 'Apel 1' },
          { id: 2, emoji: '🍎', name: 'Apel 2' },
          { id: 3, emoji: '🍎', name: 'Apel 3' }
        ],
        options: [
          { id: 'opt_1', label: '2', isCorrect: false },
          { id: 'opt_2', label: '3', isCorrect: true },
          { id: 'opt_3', label: '4', isCorrect: false }
        ],
        explanation: 'Hebat! Tepat sekali ada 3 buah apel merah yang manis! 🍎🍎🍎',
        funFact: 'Apel merah kaya akan vitamin agar badanmu sehat dan kuat!'
      },
      {
        id: 'w1_l1_q2',
        type: 'count_objects',
        prompt: 'Sekarang, hitung ada berapa apel jatuh ini?',
        speechPrompt: 'Sekarang, hitung ada berapa buah apel ini?',
        emoji: '🍎',
        items: [
          { id: 1, emoji: '🍎', name: 'Apel 1' },
          { id: 2, emoji: '🍎', name: 'Apel 2' }
        ],
        options: [
          { id: 'opt_1', label: '1', isCorrect: false },
          { id: 'opt_2', label: '2', isCorrect: true },
          { id: 'opt_3', label: '3', isCorrect: false }
        ],
        explanation: 'Pintar sekali! Ada 2 apel merah! 🍎🍎',
        funFact: 'Satu apel ditambah satu apel sama dengan dua!'
      },
      {
        id: 'w1_l1_q3',
        type: 'count_objects',
        prompt: 'Berapa banyak buah stroberi segar ini?',
        speechPrompt: 'Berapa banyak buah stroberi segar ini? Ketuk untuk menghitungnya!',
        emoji: '🍓',
        items: [
          { id: 1, emoji: '🍓', name: 'Stroberi 1' },
          { id: 2, emoji: '🍓', name: 'Stroberi 2' },
          { id: 3, emoji: '🍓', name: 'Stroberi 3' },
          { id: 4, emoji: '🍓', name: 'Stroberi 4' }
        ],
        options: [
          { id: 'opt_1', label: '4', isCorrect: true },
          { id: 'opt_2', label: '5', isCorrect: false },
          { id: 'opt_3', label: '3', isCorrect: false }
        ],
        explanation: 'Luar biasa! Ada 4 stroberi merah merona! 🍓🍓🍓🍓',
        funFact: 'Jari di satu tanganmu hampir sama banyaknya dengan 4 stroberi!'
      }
    ]
  },
  {
    id: 2,
    worldId: 'buah',
    title: 'Pisang & Jeruk Segar',
    subtitle: 'Berhitung sampai angka 5',
    icon: '🍌',
    color: 'bg-amber-500',
    borderColor: 'border-amber-400',
    rewardBux: 50,
    questions: [
      {
        id: 'w1_l2_q1',
        type: 'count_objects',
        prompt: 'Monyet ingin makan pisang! Hitung ada berapa pisang kuning?',
        speechPrompt: 'Monyet ingin makan pisang! Hitung ada berapa pisang kuning?',
        emoji: '🍌',
        items: [
          { id: 1, emoji: '🍌', name: 'Pisang 1' },
          { id: 2, emoji: '🍌', name: 'Pisang 2' },
          { id: 3, emoji: '🍌', name: 'Pisang 3' },
          { id: 4, emoji: '🍌', name: 'Pisang 4' },
          { id: 5, emoji: '🍌', name: 'Pisang 5' }
        ],
        options: [
          { id: 'opt_1', label: '3', isCorrect: false },
          { id: 'opt_2', label: '4', isCorrect: false },
          { id: 'opt_3', label: '5', isCorrect: true }
        ],
        explanation: 'Yey! Ada 5 pisang! Sama seperti 5 jari di tanganmu! ✋',
        funFact: 'Pisang mengandung kalium yang baik untuk energi bermainmu!'
      },
      {
        id: 'w1_l2_q2',
        type: 'count_objects',
        prompt: 'Berapa buah jeruk oranye yang manis ini?',
        speechPrompt: 'Berapa buah jeruk oranye yang manis ini?',
        emoji: '🍊',
        items: [
          { id: 1, emoji: '🍊', name: 'Jeruk 1' }
        ],
        options: [
          { id: 'opt_1', label: '1', isCorrect: true },
          { id: 'opt_2', label: '2', isCorrect: false },
          { id: 'opt_3', label: '0', isCorrect: false }
        ],
        explanation: 'Benar! Hanya ada 1 buah jeruk segar! 🍊',
        funFact: 'Angka 1 berdiri tegak lurus seperti tiang bendera!'
      },
      {
        id: 'w1_l2_q3',
        type: 'count_objects',
        prompt: 'Hitung semangka yang segar ini yuk!',
        speechPrompt: 'Hitung semangka yang segar ini yuk!',
        emoji: '🍉',
        items: [
          { id: 1, emoji: '🍉', name: 'Semangka 1' },
          { id: 2, emoji: '🍉', name: 'Semangka 2' },
          { id: 3, emoji: '🍉', name: 'Semangka 3' }
        ],
        options: [
          { id: 'opt_1', label: '2', isCorrect: false },
          { id: 'opt_2', label: '3', isCorrect: true },
          { id: 'opt_3', label: '5', isCorrect: false }
        ],
        explanation: 'Wah jagoan! Ada 3 potong semangka yang sangat manis! 🍉🍉🍉',
        funFact: 'Semangka banyak airnya, membuat tubuh jadi segar!'
      }
    ]
  },
  {
    id: 3,
    worldId: 'buah',
    title: 'Pesta Kebun Buah',
    subtitle: 'Tantangan akhir Pulau Buah',
    icon: '🍍',
    color: 'bg-orange-500',
    borderColor: 'border-orange-400',
    rewardBux: 60,
    questions: [
      {
        id: 'w1_l3_q1',
        type: 'count_objects',
        prompt: 'Berapa banyak buah nanas berduri yang lucu?',
        speechPrompt: 'Berapa banyak buah nanas berduri yang lucu?',
        emoji: '🍍',
        items: [
          { id: 1, emoji: '🍍', name: 'Nanas 1' },
          { id: 2, emoji: '🍍', name: 'Nanas 2' },
          { id: 3, emoji: '🍍', name: 'Nanas 3' },
          { id: 4, emoji: '🍍', name: 'Nanas 4' }
        ],
        options: [
          { id: 'opt_1', label: '4', isCorrect: true },
          { id: 'opt_2', label: '3', isCorrect: false },
          { id: 'opt_3', label: '5', isCorrect: false }
        ],
        explanation: 'Cerdas! Ada 4 nanas berkacamata mahkota! 🍍🍍🍍🍍'
      },
      {
        id: 'w1_l3_q2',
        type: 'count_objects',
        prompt: 'Ayo hitung buah anggur ungu lezat ini!',
        speechPrompt: 'Ayo hitung buah anggur ungu lezat ini!',
        emoji: '🍇',
        items: [
          { id: 1, emoji: '🍇', name: 'Anggur 1' },
          { id: 2, emoji: '🍇', name: 'Anggur 2' },
          { id: 3, emoji: '🍇', name: 'Anggur 3' },
          { id: 4, emoji: '🍇', name: 'Anggur 4' },
          { id: 5, emoji: '🍇', name: 'Anggur 5' }
        ],
        options: [
          { id: 'opt_1', label: '5', isCorrect: true },
          { id: 'opt_2', label: '4', isCorrect: false },
          { id: 'opt_3', label: '6', isCorrect: false }
        ],
        explanation: 'Hebat sekali! Tepat 5 ikat anggur ungu! 🍇'
      }
    ]
  },

  // ================= WORLD 2: HEWAN =================
  {
    id: 4,
    worldId: 'hewan',
    title: 'Kelinci Bersahabat',
    subtitle: 'Penjumlahan 1 + 1 bergambar',
    icon: '🐰',
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-400',
    rewardBux: 60,
    questions: [
      {
        id: 'w2_l4_q1',
        type: 'addition_visual',
        prompt: '1 Kelinci putih bertemu 1 Kelinci putih. Ada berapa semuanya?',
        speechPrompt: 'Satu kelinci putih ditambah satu kelinci putih, berapa jumlah semuanya?',
        emoji: '🐰',
        itemGroupA: [{ id: 1, emoji: '🐰' }],
        itemGroupB: [{ id: 2, emoji: '🐰' }],
        options: [
          { id: 'opt_1', label: '2', isCorrect: true },
          { id: 'opt_2', label: '3', isCorrect: false },
          { id: 'opt_3', label: '1', isCorrect: false }
        ],
        explanation: '1 + 1 = 2 kelinci yang melompat bersama! 🐰 + 🐰 = 🐰🐰'
      },
      {
        id: 'w2_l4_q2',
        type: 'addition_visual',
        prompt: '2 Bebek kuning berenang, datang lagi 1 Bebek. Jadi ada berapa bebek?',
        speechPrompt: 'Dua bebek kuning ditambah satu bebek lagi, berapa semuanya?',
        emoji: '🦆',
        itemGroupA: [{ id: 1, emoji: '🦆' }, { id: 2, emoji: '🦆' }],
        itemGroupB: [{ id: 3, emoji: '🦆' }],
        options: [
          { id: 'opt_1', label: '3', isCorrect: true },
          { id: 'opt_2', label: '4', isCorrect: false },
          { id: 'opt_3', label: '2', isCorrect: false }
        ],
        explanation: 'Kwek kwek! 2 bebek + 1 bebek = 3 bebek berenang ceria! 🦆🦆🦆'
      }
    ]
  },
  {
    id: 5,
    worldId: 'hewan',
    title: 'Kucing & Katak Lompat',
    subtitle: 'Penjumlahan 2 + 2 dan 3 + 1',
    icon: '🐱',
    color: 'bg-teal-500',
    borderColor: 'border-teal-400',
    rewardBux: 70,
    questions: [
      {
        id: 'w2_l5_q1',
        type: 'addition_visual',
        prompt: '2 Kucing oyen tidur, lalu 2 Kucing oyen lagi datang bermain! Ada berapa kucing?',
        speechPrompt: 'Dua kucing ditambah dua kucing lagi, berapa jumlah seluruhnya?',
        emoji: '🐱',
        itemGroupA: [{ id: 1, emoji: '🐱' }, { id: 2, emoji: '🐱' }],
        itemGroupB: [{ id: 3, emoji: '🐱' }, { id: 4, emoji: '🐱' }],
        options: [
          { id: 'opt_1', label: '3', isCorrect: false },
          { id: 'opt_2', label: '4', isCorrect: true },
          { id: 'opt_3', label: '5', isCorrect: false }
        ],
        explanation: 'Meong! 2 + 2 = 4 kucing lucu! 🐾'
      },
      {
        id: 'w2_l5_q2',
        type: 'addition_visual',
        prompt: '3 Katak hijau di kolam, melompat lagi 1 Katak! Berapa katak sekarang?',
        speechPrompt: 'Tiga katak hijau ditambah satu katak melompat, berapa semuanya?',
        emoji: '🐸',
        itemGroupA: [{ id: 1, emoji: '🐸' }, { id: 2, emoji: '🐸' }, { id: 3, emoji: '🐸' }],
        itemGroupB: [{ id: 4, emoji: '🐸' }],
        options: [
          { id: 'opt_1', label: '4', isCorrect: true },
          { id: 'opt_2', label: '5', isCorrect: false },
          { id: 'opt_3', label: '3', isCorrect: false }
        ],
        explanation: 'Hebat! 3 + 1 = 4 katak melompat tinggi! 🐸'
      }
    ]
  },
  {
    id: 6,
    worldId: 'hewan',
    title: 'Kolam Ikan Mas Ajaib',
    subtitle: 'Penjumlahan sampai angka 5',
    icon: '🐟',
    color: 'bg-cyan-500',
    borderColor: 'border-cyan-400',
    rewardBux: 80,
    questions: [
      {
        id: 'w2_l6_q1',
        type: 'addition_visual',
        prompt: '3 Ikan mas berenang ke kiri, ditambah 2 Ikan mas berenang ke kanan. Berapa semuanya?',
        speechPrompt: 'Tiga ikan mas ditambah dua ikan mas, ada berapa semua ikan di kolam?',
        emoji: '🐟',
        itemGroupA: [{ id: 1, emoji: '🐟' }, { id: 2, emoji: '🐟' }, { id: 3, emoji: '🐟' }],
        itemGroupB: [{ id: 4, emoji: '🐟' }, { id: 5, emoji: '🐟' }],
        options: [
          { id: 'opt_1', label: '4', isCorrect: false },
          { id: 'opt_2', label: '5', isCorrect: true },
          { id: 'opt_3', label: '6', isCorrect: false }
        ],
        explanation: 'Wah pintar sekali! 3 + 2 = 5 ikan mas berenang riang! 🐟🐟🐟🐟🐟'
      },
      {
        id: 'w2_l6_q2',
        type: 'addition_visual',
        prompt: '1 Anak ayam kuning ditambah 4 Anak ayam lainnya. Berapa anak ayam semuanya?',
        speechPrompt: 'Satu anak ayam ditambah empat anak ayam, berapa jumlah semuanya?',
        emoji: '🐥',
        itemGroupA: [{ id: 1, emoji: '🐥' }],
        itemGroupB: [{ id: 2, emoji: '🐥' }, { id: 3, emoji: '🐥' }, { id: 4, emoji: '🐥' }, { id: 5, emoji: '🐥' }],
        options: [
          { id: 'opt_1', label: '5', isCorrect: true },
          { id: 'opt_2', label: '4', isCorrect: false },
          { id: 'opt_3', label: '6', isCorrect: false }
        ],
        explanation: 'Cit cit cit! 1 + 4 = 5 anak ayam imut! 🐥'
      }
    ]
  },

  // ================= WORLD 3: PERMEN =================
  {
    id: 7,
    worldId: 'permen',
    title: 'Permen Lolipop Manis',
    subtitle: 'Konsep Pengurangan Ramah Anak (3 - 1)',
    icon: '🍭',
    color: 'bg-pink-500',
    borderColor: 'border-pink-400',
    rewardBux: 70,
    questions: [
      {
        id: 'w3_l7_q1',
        type: 'subtraction_visual',
        prompt: 'Kamu punya 3 Permen lolipop. Dimakan 1 lolipop (❌). Berapa permen yang tersisa?',
        speechPrompt: 'Kamu punya tiga permen. Dimakan satu, berapa sisa permenmu sekarang?',
        emoji: '🍭',
        items: [
          { id: 1, emoji: '🍭', name: 'Permen sisa 1' },
          { id: 2, emoji: '🍭', name: 'Permen sisa 2' },
          { id: 3, emoji: '❌', name: 'Sudah dimakan' }
        ],
        options: [
          { id: 'opt_1', label: '1', isCorrect: false },
          { id: 'opt_2', label: '2', isCorrect: true },
          { id: 'opt_3', label: '3', isCorrect: false }
        ],
        explanation: 'Tepat sekali! 3 permen dikurangi 1 permen sama dengan 2 permen! (3 - 1 = 2) 🎉'
      },
      {
        id: 'w3_l7_q2',
        type: 'subtraction_visual',
        prompt: 'Ada 2 Permen kapas. Adik meminta 1 permen (❌). Tersisa berapa permen untukmu?',
        speechPrompt: 'Ada dua permen kapas, adik meminta satu permen. Tersisa berapa untukmu?',
        emoji: '🍬',
        items: [
          { id: 1, emoji: '🍬', name: 'Permen sisa' },
          { id: 2, emoji: '❌', name: 'Diberikan ke adik' }
        ],
        options: [
          { id: 'opt_1', label: '1', isCorrect: true },
          { id: 'opt_2', label: '2', isCorrect: false },
          { id: 'opt_3', label: '0', isCorrect: false }
        ],
        explanation: 'Bagus! 2 dikurangi 1 sama dengan 1 permen! 🍬'
      }
    ]
  },
  {
    id: 8,
    worldId: 'permen',
    title: 'Donat Cokelat Ceria',
    subtitle: 'Pengurangan 4 - 2 dan 4 - 1',
    icon: '🍩',
    color: 'bg-rose-500',
    borderColor: 'border-rose-400',
    rewardBux: 80,
    questions: [
      {
        id: 'w3_l8_q1',
        type: 'subtraction_visual',
        prompt: 'Di piring ada 4 donat lezat. Beruang lapar memakan 2 donat (❌❌). Berapa sisa donat?',
        speechPrompt: 'Ada empat donat lezat di piring. Beruang makan dua donat. Berapa sisa donat di piring?',
        emoji: '🍩',
        items: [
          { id: 1, emoji: '🍩', name: 'Donat sisa 1' },
          { id: 2, emoji: '🍩', name: 'Donat sisa 2' },
          { id: 3, emoji: '❌', name: 'Dimakan' },
          { id: 4, emoji: '❌', name: 'Dimakan' }
        ],
        options: [
          { id: 'opt_1', label: '2', isCorrect: true },
          { id: 'opt_2', label: '1', isCorrect: false },
          { id: 'opt_3', label: '3', isCorrect: false }
        ],
        explanation: 'Pintar! 4 - 2 = 2 donat lezat yang tersisa! 🍩🍩'
      },
      {
        id: 'w3_l8_q2',
        type: 'subtraction_visual',
        prompt: 'Ada 4 kue mangkok cupcake manis. 1 cupcake dimakan (❌). Sisa berapa cupcake?',
        speechPrompt: 'Ada empat cupcake manis. Satu cupcake dimakan. Tersisa berapa cupcake?',
        emoji: '🧁',
        items: [
          { id: 1, emoji: '🧁', name: 'Cupcake 1' },
          { id: 2, emoji: '🧁', name: 'Cupcake 2' },
          { id: 3, emoji: '🧁', name: 'Cupcake 3' },
          { id: 4, emoji: '❌', name: 'Dimakan' }
        ],
        options: [
          { id: 'opt_1', label: '3', isCorrect: true },
          { id: 'opt_2', label: '2', isCorrect: false },
          { id: 'opt_3', label: '4', isCorrect: false }
        ],
        explanation: 'Yummy! 4 - 1 = 3 cupcake tersisa di meja! 🧁🧁🧁'
      }
    ]
  },
  {
    id: 9,
    worldId: 'permen',
    title: 'Es Krim Pelangi Dingin',
    subtitle: 'Pengurangan sampai 5 - 2',
    icon: '🍦',
    color: 'bg-fuchsia-500',
    borderColor: 'border-fuchsia-400',
    rewardBux: 90,
    questions: [
      {
        id: 'w3_l9_q1',
        type: 'subtraction_visual',
        prompt: 'Toko es krim punya 5 es krim cone. Terjual 2 es krim (❌❌). Sisa berapa di toko?',
        speechPrompt: 'Toko es krim punya lima es krim. Terjual dua es krim. Berapa es krim yang tersisa?',
        emoji: '🍦',
        items: [
          { id: 1, emoji: '🍦', name: 'Es krim 1' },
          { id: 2, emoji: '🍦', name: 'Es krim 2' },
          { id: 3, emoji: '🍦', name: 'Es krim 3' },
          { id: 4, emoji: '❌', name: 'Terjual' },
          { id: 5, emoji: '❌', name: 'Terjual' }
        ],
        options: [
          { id: 'opt_1', label: '2', isCorrect: false },
          { id: 'opt_2', label: '3', isCorrect: true },
          { id: 'opt_3', label: '4', isCorrect: false }
        ],
        explanation: 'Luar biasa! 5 - 2 = 3 es krim pelangi yang dingin dan enak! 🍦🍦🍦'
      }
    ]
  },

  // ================= WORLD 4: BENTUK & UKURAN =================
  {
    id: 10,
    worldId: 'bentuk',
    title: 'Mana Yang Lebih Banyak?',
    subtitle: 'Membandingkan jumlah benda',
    icon: '⚖️',
    color: 'bg-blue-500',
    borderColor: 'border-blue-400',
    rewardBux: 80,
    questions: [
      {
        id: 'w4_l10_q1',
        type: 'compare_quantity',
        prompt: 'Kelompok mana yang punya BINTANG LEBIH BANYAK?',
        speechPrompt: 'Kelompok mana yang punya bintang lebih banyak?',
        emoji: '⭐',
        options: [
          { id: 'opt_1', label: 'Kelompok A: ⭐ ⭐', sublabel: '2 Bintang', isCorrect: false },
          { id: 'opt_2', label: 'Kelompok B: ⭐ ⭐ ⭐ ⭐', sublabel: '4 Bintang', isCorrect: true }
        ],
        explanation: 'Betul! 4 Bintang lebih banyak daripada 2 Bintang! 🌟'
      },
      {
        id: 'w4_l10_q2',
        type: 'compare_quantity',
        prompt: 'Mana kotak mainan dengan BOLA PALING BANYAK?',
        speechPrompt: 'Mana kotak mainan dengan bola paling banyak?',
        emoji: '⚽',
        options: [
          { id: 'opt_1', label: 'Kotak Merah: ⚽ ⚽ ⚽ ⚽ ⚽', sublabel: '5 Bola', isCorrect: true },
          { id: 'opt_2', label: 'Kotak Biru: ⚽ ⚽ ⚽', sublabel: '3 Bola', isCorrect: false }
        ],
        explanation: 'Keren! Kotak Merah memiliki 5 bola, lebih banyak dari 3 bola!'
      }
    ]
  },
  {
    id: 11,
    worldId: 'bentuk',
    title: 'Bentuk Geometri Cilik',
    subtitle: 'Mengenal Lingkaran, Segitiga, Kotak',
    icon: '🔺',
    color: 'bg-indigo-500',
    borderColor: 'border-indigo-400',
    rewardBux: 90,
    questions: [
      {
        id: 'w4_l11_q1',
        type: 'shape_pattern',
        prompt: 'Bentuk mana yang berbentuk LINGKARAN bulat seperti bola?',
        speechPrompt: 'Bentuk mana yang berbentuk lingkaran bulat seperti bola?',
        emoji: '🔴',
        options: [
          { id: 'opt_1', label: '🔴 Lingkaran', isCorrect: true },
          { id: 'opt_2', label: '🔺 Segitiga', isCorrect: false },
          { id: 'opt_3', label: '🟦 Persegi Kotak', isCorrect: false }
        ],
        explanation: 'Lingkaran bulat bundar seperti roda sepeda dan bola sepak! ⚽'
      },
      {
        id: 'w4_l11_q2',
        type: 'shape_pattern',
        prompt: 'Bentuk mana yang memiliki 3 sudut runcing seperti atap rumah?',
        speechPrompt: 'Bentuk mana yang memiliki tiga sudut runcing seperti atap rumah?',
        emoji: '🔺',
        options: [
          { id: 'opt_1', label: '🟦 Kotak', isCorrect: false },
          { id: 'opt_2', label: '🔺 Segitiga', isCorrect: true },
          { id: 'opt_3', label: '⭐ Bintang', isCorrect: false }
        ],
        explanation: 'Hebat! Segitiga punya 3 sudut dan 3 sisi seperti potongan pizza! 🍕'
      }
    ]
  },
  {
    id: 12,
    worldId: 'bentuk',
    title: 'Angka Lebih Besar',
    subtitle: 'Mana angka yang bernilai lebih besar?',
    icon: '🔢',
    color: 'bg-violet-500',
    borderColor: 'border-violet-400',
    rewardBux: 100,
    questions: [
      {
        id: 'w4_l12_q1',
        type: 'compare_quantity',
        prompt: 'Di antara angka 2 dan angka 5, mana angka yang LEBIH BESAR?',
        speechPrompt: 'Di antara angka dua dan lima, mana angka yang lebih besar?',
        emoji: '5️⃣',
        options: [
          { id: 'opt_1', label: 'Angka 2', isCorrect: false },
          { id: 'opt_2', label: 'Angka 5', isCorrect: true }
        ],
        explanation: 'Hebat! Angka 5 lebih besar daripada angka 2! 🖐️ > ✌️'
      },
      {
        id: 'w4_l12_q2',
        type: 'compare_quantity',
        prompt: 'Mana yang LEBIH SEDIKIT: 1 Koin atau 4 Koin?',
        speechPrompt: 'Mana yang lebih sedikit, satu koin atau empat koin?',
        emoji: '🪙',
        options: [
          { id: 'opt_1', label: '1 Koin', isCorrect: true },
          { id: 'opt_2', label: '4 Koin', isCorrect: false }
        ],
        explanation: 'Tepat sekali! 1 koin lebih sedikit daripada 4 koin! 🪙'
      }
    ]
  },

  // ================= WORLD 5: PUNCAK BINTANG JUARA =================
  {
    id: 13,
    worldId: 'bintang',
    title: 'Bintang Luar Angkasa',
    subtitle: 'Berhitung Angka 6, 7, dan 8',
    icon: '✨',
    color: 'bg-purple-600',
    borderColor: 'border-purple-400',
    rewardBux: 110,
    questions: [
      {
        id: 'w5_l13_q1',
        type: 'count_objects',
        prompt: 'Hitung bintang-bintang kejora berkilau di langit malam!',
        speechPrompt: 'Hitung bintang-bintang kejora berkilau di langit malam!',
        emoji: '⭐',
        items: [
          { id: 1, emoji: '⭐', name: 'Bintang 1' },
          { id: 2, emoji: '⭐', name: 'Bintang 2' },
          { id: 3, emoji: '⭐', name: 'Bintang 3' },
          { id: 4, emoji: '⭐', name: 'Bintang 4' },
          { id: 5, emoji: '⭐', name: 'Bintang 5' },
          { id: 6, emoji: '⭐', name: 'Bintang 6' }
        ],
        options: [
          { id: 'opt_1', label: '5', isCorrect: false },
          { id: 'opt_2', label: '6', isCorrect: true },
          { id: 'opt_3', label: '7', isCorrect: false }
        ],
        explanation: 'Kerlap-kerlip indah! Ada 6 bintang kejora! ⭐⭐⭐⭐⭐⭐'
      },
      {
        id: 'w5_l13_q2',
        type: 'count_objects',
        prompt: 'Astronot melihat 7 planet kecil! Ayo hitung planetnya:',
        speechPrompt: 'Astronot melihat planet kecil! Ayo hitung ada berapa planet?',
        emoji: '🪐',
        items: [
          { id: 1, emoji: '🪐', name: 'Planet 1' },
          { id: 2, emoji: '🪐', name: 'Planet 2' },
          { id: 3, emoji: '🪐', name: 'Planet 3' },
          { id: 4, emoji: '🪐', name: 'Planet 4' },
          { id: 5, emoji: '🪐', name: 'Planet 5' },
          { id: 6, emoji: '🪐', name: 'Planet 6' },
          { id: 7, emoji: '🪐', name: 'Planet 7' }
        ],
        options: [
          { id: 'opt_1', label: '6', isCorrect: false },
          { id: 'opt_2', label: '7', isCorrect: true },
          { id: 'opt_3', label: '8', isCorrect: false }
        ],
        explanation: 'Astronot cilik hebat! Ada 7 planet berputar! 🪐'
      }
    ]
  },
  {
    id: 14,
    worldId: 'bintang',
    title: 'Roket Penjumlahan Juara',
    subtitle: 'Tambah-tambahan menuju bulan',
    icon: '🚀',
    color: 'bg-indigo-600',
    borderColor: 'border-indigo-400',
    rewardBux: 130,
    questions: [
      {
        id: 'w5_l14_q1',
        type: 'addition_visual',
        prompt: '4 Roket biru siap meluncur, ditambah 3 Roket merah! Berapa total semua roket?',
        speechPrompt: 'Empat roket biru ditambah tiga roket merah, berapa total semua roket?',
        emoji: '🚀',
        itemGroupA: [{ id: 1, emoji: '🚀' }, { id: 2, emoji: '🚀' }, { id: 3, emoji: '🚀' }, { id: 4, emoji: '🚀' }],
        itemGroupB: [{ id: 5, emoji: '🚀' }, { id: 6, emoji: '🚀' }, { id: 7, emoji: '🚀' }],
        options: [
          { id: 'opt_1', label: '6', isCorrect: false },
          { id: 'opt_2', label: '7', isCorrect: true },
          { id: 'opt_3', label: '8', isCorrect: false }
        ],
        explanation: '3.. 2.. 1.. Meluncur! 4 + 3 = 7 roket penjelajah angkasa! 🚀'
      },
      {
        id: 'w5_l14_q2',
        type: 'addition_visual',
        prompt: '5 Robot perak membantu 2 Robot emas. Ada berapa kawan robot semuanya?',
        speechPrompt: 'Lima robot perak ditambah dua robot emas, berapa kawan robot semuanya?',
        emoji: '🤖',
        itemGroupA: [{ id: 1, emoji: '🤖' }, { id: 2, emoji: '🤖' }, { id: 3, emoji: '🤖' }, { id: 4, emoji: '🤖' }, { id: 5, emoji: '🤖' }],
        itemGroupB: [{ id: 6, emoji: '🤖' }, { id: 7, emoji: '🤖' }],
        options: [
          { id: 'opt_1', label: '7', isCorrect: true },
          { id: 'opt_2', label: '6', isCorrect: false },
          { id: 'opt_3', label: '8', isCorrect: false }
        ],
        explanation: 'Beep bop! 5 + 2 = 7 kawan robot! Pintar sekali!'
      }
    ]
  },
  {
    id: 15,
    worldId: 'bintang',
    title: 'Kuis Raja MathBux Emas',
    subtitle: 'Tantangan Pamungkas: Bonus Hadiah 200 MathBux!',
    icon: '👑',
    color: 'bg-amber-500',
    borderColor: 'border-yellow-400',
    rewardBux: 200,
    questions: [
      {
        id: 'w5_l15_q1',
        type: 'addition_visual',
        prompt: 'Raja punya 5 Mahkota emas, mendapat hadiah 5 Mahkota lagi! Berapa jumlah mahkota raja?',
        speechPrompt: 'Raja punya lima mahkota emas, mendapat hadiah lima mahkota lagi. Berapa jumlah mahkota raja?',
        emoji: '👑',
        itemGroupA: [{ id: 1, emoji: '👑' }, { id: 2, emoji: '👑' }, { id: 3, emoji: '👑' }, { id: 4, emoji: '👑' }, { id: 5, emoji: '👑' }],
        itemGroupB: [{ id: 6, emoji: '👑' }, { id: 7, emoji: '👑' }, { id: 8, emoji: '👑' }, { id: 9, emoji: '👑' }, { id: 10, emoji: '👑' }],
        options: [
          { id: 'opt_1', label: '9', isCorrect: false },
          { id: 'opt_2', label: '10', isCorrect: true },
          { id: 'opt_3', label: '8', isCorrect: false }
        ],
        explanation: 'KEMENANGAN SEMPURNA! 5 + 5 = 10! Kamu resmi menjadi Raja Matematika Anak TK! 👑🎉'
      },
      {
        id: 'w5_l15_q2',
        type: 'subtraction_visual',
        prompt: 'Ada 5 balon MathBux terbang. 2 balon meletus (❌❌). Sisa berapa balon yang terbang?',
        speechPrompt: 'Ada lima balon terbang, dua balon meletus. Berapa sisa balon yang masih terbang tinggi?',
        emoji: '🎈',
        items: [
          { id: 1, emoji: '🎈', name: 'Balon 1' },
          { id: 2, emoji: '🎈', name: 'Balon 2' },
          { id: 3, emoji: '🎈', name: 'Balon 3' },
          { id: 4, emoji: '❌', name: 'Meletus' },
          { id: 5, emoji: '❌', name: 'Meletus' }
        ],
        options: [
          { id: 'opt_1', label: '3', isCorrect: true },
          { id: 'opt_2', label: '2', isCorrect: false },
          { id: 'opt_3', label: '4', isCorrect: false }
        ],
        explanation: '5 - 2 = 3 balon MathBux! Selamat, kamu luar biasa!'
      }
    ]
  }
];
