export type WorldId = 'buah' | 'hewan' | 'permen' | 'bentuk' | 'bintang';

export type QuestionType = 
  | 'count_objects'      // Hitung jumlah objek
  | 'addition_visual'    // Penjumlahan bergambar (misal: 2 apel + 3 apel)
  | 'subtraction_visual' // Pengurangan bergambar (misal: 4 permen dimakan 1)
  | 'compare_quantity'   // Mana yang lebih banyak / sedikit
  | 'shape_pattern';     // Mengenal pola dan bentuk

export interface MathQuestion {
  id: string;
  type: QuestionType;
  prompt: string; // Teks instruksi ramah anak
  speechPrompt: string; // Teks suara narator
  emoji: string;
  items?: { id: number; emoji: string; name: string }[];
  itemGroupA?: { id: number; emoji: string }[];
  itemGroupB?: { id: number; emoji: string }[];
  options: {
    id: string;
    label: string;
    sublabel?: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  funFact?: string;
}

export interface LevelData {
  id: number;
  worldId: WorldId;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  borderColor: string;
  rewardBux: number;
  questions: MathQuestion[];
}

export interface WorldInfo {
  id: WorldId;
  name: string;
  themeColor: string;
  bgGradient: string;
  description: string;
  icon: string;
  badge: string;
}

export type ShopCategory = 'hats' | 'outfits' | 'pets' | 'auras' | 'toys';

export interface ShopItem {
  id: string;
  name: string;
  category: ShopCategory;
  price: number;
  icon: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  previewEffect?: string;
  svgType: string;
}

export interface AvatarCustomization {
  skinColor: string;
  faceExpression: string;
  equippedHat: string | null;
  equippedOutfit: string | null;
  equippedPet: string | null;
  equippedAura: string | null;
  equippedToy: string | null;
}

export interface UserProgress {
  mathBux: number;
  unlockedLevel: number; // 1-indexed
  levelStars: Record<number, number>; // levelId -> 1..3 stars
  inventory: string[]; // List of owned item ids
  avatar: AvatarCustomization;
  streakDays: number;
  lastDailyClaim: string | null;
  soundEnabled: boolean;
  voiceEnabled: boolean;
  playerName: string;
}
