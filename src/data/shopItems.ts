import { ShopItem } from '../types/game';

export const SHOP_ITEMS: ShopItem[] = [
  // --- TOPI & AKSESORIS KEPALA ---
  {
    id: 'hat_crown',
    name: 'Mahkota Emas Juara',
    category: 'hats',
    price: 150,
    icon: '👑',
    description: 'Mahkota berkilau untuk juara matematika sejati!',
    rarity: 'Legendary',
    svgType: 'crown'
  },
  {
    id: 'hat_chef',
    name: 'Topi Koki Cilik',
    category: 'hats',
    price: 60,
    icon: '👨‍🍳',
    description: 'Topi koki lucu pembuat donat dan kue lezat!',
    rarity: 'Common',
    svgType: 'chef'
  },
  {
    id: 'hat_astro',
    name: 'Helm Astronot Roket',
    category: 'hats',
    price: 120,
    icon: '🧑‍🚀',
    description: 'Helm pelindung untuk menjelajahi galaksi bintang!',
    rarity: 'Epic',
    svgType: 'astronaut'
  },
  {
    id: 'hat_dino',
    name: 'Topi Dino Roar',
    category: 'hats',
    price: 80,
    icon: '🦖',
    description: 'Topi dinosaurus hijau yang menggemaskan!',
    rarity: 'Rare',
    svgType: 'dino'
  },
  {
    id: 'hat_bunny',
    name: 'Telinga Kelinci Pink',
    category: 'hats',
    price: 50,
    icon: '🐰',
    description: 'Telinga kelinci berbulu halus yang bisa bergoyang!',
    rarity: 'Common',
    svgType: 'bunny'
  },
  {
    id: 'hat_glasses',
    name: 'Kacamata Pixel Roblox',
    category: 'hats',
    price: 90,
    icon: '🕶️',
    description: 'Kacamata hitam pixel 8-bit paling keren di dunia!',
    rarity: 'Rare',
    svgType: 'pixel_glasses'
  },
  {
    id: 'hat_pirate',
    name: 'Topi Bajak Laut Petualang',
    category: 'hats',
    price: 100,
    icon: '🏴‍☠️',
    description: 'Ayo berlayar mencari pulau harta karun angka!',
    rarity: 'Epic',
    svgType: 'pirate'
  },

  // --- KOSTUM & BAJU ---
  {
    id: 'outfit_superhero',
    name: 'Jubah Superhero Math',
    category: 'outfits',
    price: 140,
    icon: '🦸‍♂️',
    description: 'Jubah merah gagah pembasmi soal matematika sulit!',
    rarity: 'Epic',
    svgType: 'superhero'
  },
  {
    id: 'outfit_dino_suit',
    name: 'Kostum Dino Hijau',
    category: 'outfits',
    price: 95,
    icon: '🦕',
    description: 'Baju terusan dinosaurus dengan ekor yang lucu!',
    rarity: 'Rare',
    svgType: 'dino_suit'
  },
  {
    id: 'outfit_rainbow',
    name: 'Kaos Pelangi Ceria',
    category: 'outfits',
    price: 50,
    icon: '🌈',
    description: 'Warna-warni pelangi yang membuatmu selalu gembira!',
    rarity: 'Common',
    svgType: 'rainbow_shirt'
  },
  {
    id: 'outfit_astro_suit',
    name: 'Baju Astronot Bulan',
    category: 'outfits',
    price: 130,
    icon: '🚀',
    description: 'Pakaian luar angkasa putih dengan lencana roket!',
    rarity: 'Epic',
    svgType: 'astro_suit'
  },
  {
    id: 'outfit_golden_tshirt',
    name: 'Kaos Emas Roblox VIP',
    category: 'outfits',
    price: 200,
    icon: '✨',
    description: 'Baju emas berkilau seperti pemain sultan robux!',
    rarity: 'Legendary',
    svgType: 'gold_vip'
  },

  // --- TEMAN HEWAN PELIHARAAN (PETS) ---
  {
    id: 'pet_cat',
    name: 'Kucing Oyen Imut',
    category: 'pets',
    price: 110,
    icon: '🐱',
    description: 'Kucing manis berbulu oranye yang suka mengeong gembira!',
    rarity: 'Rare',
    svgType: 'cat'
  },
  {
    id: 'pet_dragon',
    name: 'Anak Naga Ajaib',
    category: 'pets',
    price: 220,
    icon: '🐲',
    description: 'Naga cilik yang bisa terbang dan menyemburkan percikan kembang api!',
    rarity: 'Legendary',
    svgType: 'dragon'
  },
  {
    id: 'pet_duck',
    name: 'Bebek Kuning Ceria',
    category: 'pets',
    price: 70,
    icon: '🦆',
    description: 'Kwek kwek! Bebek ceria yang selalu menemani belajarmu!',
    rarity: 'Common',
    svgType: 'duck'
  },
  {
    id: 'pet_dog',
    name: 'Anak Anjing Shiba',
    category: 'pets',
    price: 120,
    icon: '🐶',
    description: 'Sahabat setia berbulu cokelat yang lincah dan pintar!',
    rarity: 'Rare',
    svgType: 'dog'
  },
  {
    id: 'pet_panda',
    name: 'Panda Imut Gembul',
    category: 'pets',
    price: 160,
    icon: '🐼',
    description: 'Panda montok pecinta bambu yang suka bergulingan!',
    rarity: 'Epic',
    svgType: 'panda'
  },

  // --- EFEK AURA & PARTIKEL ---
  {
    id: 'aura_stars',
    name: 'Hujan Bintang Berkilau',
    category: 'auras',
    price: 80,
    icon: '⭐',
    description: 'Bintang-bintang kuning berkelap-kelip di sekelilingmu!',
    rarity: 'Rare',
    svgType: 'stars'
  },
  {
    id: 'aura_rainbow',
    name: 'Aura Pelangi Ajaib',
    category: 'auras',
    price: 150,
    icon: '✨',
    description: 'Lingkaran cahaya pelangi indah memancar saat melangkah!',
    rarity: 'Legendary',
    svgType: 'rainbow'
  },
  {
    id: 'aura_hearts',
    name: 'Hati Kasih Sayang',
    category: 'auras',
    price: 60,
    icon: '💖',
    description: 'Hati merah muda manis bertaburan di sekeliling avatar!',
    rarity: 'Common',
    svgType: 'hearts'
  },
  {
    id: 'aura_fire',
    name: 'Api Semangat Juara',
    category: 'auras',
    price: 130,
    icon: '🔥',
    description: 'Kobaran api semangat membakar rintangan belajar!',
    rarity: 'Epic',
    svgType: 'fire'
  },

  // --- MAINAN INTERAKTIF ---
  {
    id: 'toy_wand',
    name: 'Tongkat Bintang Ajaib',
    category: 'toys',
    price: 90,
    icon: '🪄',
    description: 'Tongkat peri ajaib yang berbunyi ting-ting saat diayunkan!',
    rarity: 'Rare',
    svgType: 'wand'
  },
  {
    id: 'toy_balloon',
    name: 'Balon MathBux Roblox',
    category: 'toys',
    price: 50,
    icon: '🎈',
    description: 'Balon hijau tosca bertuliskan simbol koin MathBux!',
    rarity: 'Common',
    svgType: 'balloon'
  },
  {
    id: 'toy_horn',
    name: 'Terompet Pesta Sorak',
    category: 'toys',
    price: 75,
    icon: '🎺',
    description: 'Terompet pesta berbunyi meriah merayakan kemenangan!',
    rarity: 'Common',
    svgType: 'horn'
  }
];
