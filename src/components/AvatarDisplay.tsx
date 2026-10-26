import React from 'react';
import { motion } from 'motion/react';
import { AvatarCustomization } from '../types/game';

interface AvatarDisplayProps {
  avatar: AvatarCustomization;
  animation?: 'idle' | 'dance' | 'jump' | 'wave' | 'celebrate';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showPet?: boolean;
  showAura?: boolean;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({
  avatar,
  animation = 'idle',
  size = 'lg',
  showPet = true,
  showAura = true,
}) => {
  const sizeMap = {
    sm: { width: 90, height: 110, scale: 0.55 },
    md: { width: 140, height: 170, scale: 0.8 },
    lg: { width: 200, height: 240, scale: 1.15 },
    xl: { width: 260, height: 310, scale: 1.45 },
  };

  const currentSize = sizeMap[size];

  // Motion animation variants for Roblox-like cute emotes
  const bodyVariants = {
    idle: {
      y: [0, -4, 0],
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' as const }
    },
    dance: {
      rotate: [-5, 5, -5],
      y: [0, -8, 0],
      transition: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' as const }
    },
    jump: {
      y: [0, -25, 0],
      scaleY: [1, 1.05, 0.95, 1],
      transition: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' as const }
    },
    wave: {
      rotate: [0, 4, 0, -4, 0],
      transition: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' as const }
    },
    celebrate: {
      scale: [1, 1.1, 1],
      rotate: [-8, 8, -8],
      y: [0, -15, 0],
      transition: { repeat: Infinity, duration: 0.9, ease: 'easeInOut' as const }
    }
  };

  const armRightVariants = {
    idle: { rotate: 0 },
    wave: {
      rotate: [-20, 45, -20],
      transition: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' as const }
    },
    dance: {
      rotate: [30, -30, 30],
      transition: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' as const }
    },
    jump: {
      rotate: -45,
      transition: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' as const }
    },
    celebrate: {
      rotate: [-60, -30, -60],
      transition: { repeat: Infinity, duration: 0.7, ease: 'easeInOut' as const }
    }
  };

  const armLeftVariants = {
    idle: { rotate: 0 },
    wave: { rotate: 5 },
    dance: {
      rotate: [-30, 30, -30],
      transition: { repeat: Infinity, duration: 0.6, ease: 'easeInOut' as const }
    },
    jump: {
      rotate: 45,
      transition: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' as const }
    },
    celebrate: {
      rotate: [60, 30, 60],
      transition: { repeat: Infinity, duration: 0.7, ease: 'easeInOut' as const }
    }
  };

  // Pet helper
  const petMap: Record<string, { emoji: string; name: string }> = {
    pet_cat: { emoji: '🐱', name: 'Kucing Oyen' },
    pet_dragon: { emoji: '🐲', name: 'Naga Ajaib' },
    pet_duck: { emoji: '🦆', name: 'Bebek Kuning' },
    pet_dog: { emoji: '🐶', name: 'Shiba Ceria' },
    pet_panda: { emoji: '🐼', name: 'Panda Gembul' },
  };

  const equippedPetInfo = avatar.equippedPet ? petMap[avatar.equippedPet] : null;

  return (
    <div 
      className="relative flex items-center justify-center select-none"
      style={{ width: currentSize.width, height: currentSize.height }}
    >
      {/* --- AURA PARTICLES EFFECT --- */}
      {showAura && avatar.equippedAura && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {avatar.equippedAura === 'aura_stars' && (
            <>
              <motion.span 
                animate={{ scale: [0.6, 1.2, 0.6], rotate: [0, 180, 360], opacity: [0.4, 0.9, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -top-3 -left-2 text-2xl"
              >⭐</motion.span>
              <motion.span 
                animate={{ scale: [1, 0.5, 1], rotate: [360, 180, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                className="absolute top-10 -right-4 text-xl"
              >✨</motion.span>
              <motion.span 
                animate={{ scale: [0.7, 1.3, 0.7], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.8, delay: 0.7 }}
                className="absolute -bottom-2 left-3 text-lg"
              >🌟</motion.span>
            </>
          )}

          {avatar.equippedAura === 'aura_rainbow' && (
            <motion.div 
              animate={{ rotate: 360, scale: [0.95, 1.05, 0.95] }}
              transition={{ rotate: { repeat: Infinity, duration: 8, ease: 'linear' }, scale: { repeat: Infinity, duration: 2 } }}
              className="absolute w-full h-full rounded-full border-4 border-dashed border-amber-300 opacity-60 filter blur-[0.5px]"
              style={{
                background: 'radial-gradient(circle, rgba(254,240,138,0.3) 0%, rgba(199,210,254,0.2) 50%, rgba(251,207,232,0) 80%)'
              }}
            />
          )}

          {avatar.equippedAura === 'aura_hearts' && (
            <>
              <motion.span 
                animate={{ y: [0, -18, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="absolute -top-4 -right-1 text-2xl"
              >💖</motion.span>
              <motion.span 
                animate={{ y: [0, -22, 0], opacity: [0.3, 0.9, 0.3] }}
                transition={{ repeat: Infinity, duration: 2.2, delay: 0.5 }}
                className="absolute top-14 -left-4 text-xl"
              >💕</motion.span>
            </>
          )}

          {avatar.equippedAura === 'aura_fire' && (
            <>
              <motion.span 
                animate={{ y: [0, -12, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="absolute -bottom-2 -left-2 text-2xl"
              >🔥</motion.span>
              <motion.span 
                animate={{ y: [0, -14, 0], scale: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 0.7, delay: 0.3 }}
                className="absolute -bottom-2 -right-2 text-2xl"
              >🔥</motion.span>
            </>
          )}
        </div>
      )}

      {/* --- AVATAR MAIN CHARACTER (ROBLOX BLOCKY CUTE AESTHETIC) --- */}
      <motion.div
        variants={bodyVariants}
        animate={animation}
        className="relative flex flex-col items-center justify-center"
      >
        {/* === HAT LAYER (TOP) === */}
        <div className="relative z-30 mb-[-12px]">
          {avatar.equippedHat === 'hat_crown' && (
            <motion.div 
              animate={{ rotate: [-2, 2, -2] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-4xl drop-shadow-md"
            >
              👑
            </motion.div>
          )}

          {avatar.equippedHat === 'hat_chef' && (
            <div className="text-4xl drop-shadow-md -translate-y-1">
              👨‍🍳
            </div>
          )}

          {avatar.equippedHat === 'hat_astro' && (
            <div className="text-4xl drop-shadow-md -translate-y-1">
              🧑‍🚀
            </div>
          )}

          {avatar.equippedHat === 'hat_dino' && (
            <div className="text-4xl drop-shadow-md -translate-y-1">
              🦖
            </div>
          )}

          {avatar.equippedHat === 'hat_bunny' && (
            <div className="text-4xl drop-shadow-md -translate-y-1">
              🐰
            </div>
          )}

          {avatar.equippedHat === 'hat_glasses' && (
            <div className="text-3xl drop-shadow-md translate-y-3 z-40">
              🕶️
            </div>
          )}

          {avatar.equippedHat === 'hat_pirate' && (
            <div className="text-4xl drop-shadow-md -translate-y-1">
              🏴‍☠️
            </div>
          )}
        </div>

        {/* === HEAD (ROBLOX CUTE BLOCKY WITH SMOOTH BEVEL) === */}
        <div 
          className="relative z-20 w-16 h-15 rounded-2xl shadow-md border-3 border-slate-700/20 flex flex-col items-center justify-center transition-colors"
          style={{ backgroundColor: avatar.skinColor || '#fde047' }}
        >
          {/* Glasses overlay if equipped */}
          {avatar.equippedHat === 'hat_glasses' ? (
            <div className="text-2xl drop-shadow-sm font-bold">🕶️</div>
          ) : (
            <>
              {/* Cute Eyes with Sparkle */}
              <div className="flex items-center gap-3 mt-1">
                <div className="w-2.5 h-3 bg-slate-800 rounded-full relative flex items-start justify-end p-0.5">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
                <div className="w-2.5 h-3 bg-slate-800 rounded-full relative flex items-start justify-end p-0.5">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              </div>

              {/* Cute Rosy Cheeks */}
              <div className="flex items-center gap-6 mt-0.5">
                <div className="w-2 h-1 bg-rose-400/60 rounded-full" />
                <div className="w-2 h-1 bg-rose-400/60 rounded-full" />
              </div>

              {/* Smiling Happy Mouth */}
              <div className="w-3.5 h-2 border-b-2.5 border-slate-800 rounded-b-full -mt-0.5" />
            </>
          )}
        </div>

        {/* === UPPER BODY & ARMS === */}
        <div className="relative z-10 flex items-start justify-center mt-[-3px]">
          {/* Left Arm */}
          <motion.div 
            variants={armLeftVariants}
            animate={animation}
            style={{ originX: 0.9, originY: 0.1 }}
            className="w-4 h-12 rounded-xl border-2 border-slate-700/20 -mr-1 shadow-sm flex flex-col justify-end items-center"
            style-color={avatar.skinColor}
          >
            <div 
              className="w-full h-full rounded-xl flex flex-col justify-between"
              style={{ backgroundColor: getOutfitSleeveColor(avatar.equippedOutfit, avatar.skinColor) }}
            >
              <div className="w-full h-3 rounded-t-xl" />
              {/* Little blocky hand */}
              <div 
                className="w-full h-3.5 rounded-b-xl border-t border-slate-700/10"
                style={{ backgroundColor: avatar.skinColor || '#fde047' }}
              />
            </div>
          </motion.div>

          {/* Torso (Roblox Blocky T-shirt / Outfit) */}
          <div 
            className="relative w-18 h-14 rounded-xl border-2.5 border-slate-700/30 shadow-md flex flex-col items-center justify-center p-1 overflow-hidden"
            style={{ backgroundColor: getOutfitBodyColor(avatar.equippedOutfit) }}
          >
            {/* Outfit Graphic Badge */}
            {renderOutfitBadge(avatar.equippedOutfit)}
          </div>

          {/* Right Arm (holds toys if equipped) */}
          <motion.div 
            variants={armRightVariants}
            animate={animation}
            style={{ originX: 0.1, originY: 0.1 }}
            className="w-4 h-12 rounded-xl border-2 border-slate-700/20 -ml-1 shadow-sm flex flex-col justify-end items-center relative"
          >
            <div 
              className="w-full h-full rounded-xl flex flex-col justify-between"
              style={{ backgroundColor: getOutfitSleeveColor(avatar.equippedOutfit, avatar.skinColor) }}
            >
              <div className="w-full h-3 rounded-t-xl" />
              {/* Hand */}
              <div 
                className="w-full h-3.5 rounded-b-xl border-t border-slate-700/10"
                style={{ backgroundColor: avatar.skinColor || '#fde047' }}
              />
            </div>

            {/* EQUIPPED TOY IN RIGHT HAND */}
            {avatar.equippedToy && (
              <motion.div 
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute -top-3 -right-6 text-2xl filter drop-shadow-md select-none"
              >
                {avatar.equippedToy === 'toy_wand' && '🪄'}
                {avatar.equippedToy === 'toy_balloon' && '🎈'}
                {avatar.equippedToy === 'toy_horn' && '🎺'}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* === LEGS (ROBLOX BLOCKY PANTS) === */}
        <div className="flex gap-1.5 mt-[-2px] z-0">
          <div 
            className="w-6 h-10 rounded-b-xl border-2 border-slate-700/30 shadow-sm flex flex-col justify-end"
            style={{ backgroundColor: getPantsColor(avatar.equippedOutfit) }}
          >
            {/* Shoes */}
            <div className="w-full h-3 bg-slate-800 rounded-b-lg" />
          </div>
          <div 
            className="w-6 h-10 rounded-b-xl border-2 border-slate-700/30 shadow-sm flex flex-col justify-end"
            style={{ backgroundColor: getPantsColor(avatar.equippedOutfit) }}
          >
            {/* Shoes */}
            <div className="w-full h-3 bg-slate-800 rounded-b-lg" />
          </div>
        </div>
      </motion.div>

      {/* --- EQUIPPED PET COMPANION (BOUNCING ALONGSIDE) --- */}
      {showPet && equippedPetInfo && (
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [-4, 4, -4],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
            ease: 'easeInOut',
          }}
          className="absolute -right-6 bottom-2 z-30 flex flex-col items-center"
        >
          <div className="text-3xl filter drop-shadow-lg cursor-pointer transform hover:scale-125 transition-transform">
            {equippedPetInfo.emoji}
          </div>
          <div className="bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[9px] px-1.5 py-0.2 rounded-full shadow-sm mt-0.5 whitespace-nowrap">
            {equippedPetInfo.name}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Helper colors for outfits
function getOutfitBodyColor(outfitId: string | null): string {
  switch (outfitId) {
    case 'outfit_superhero':
      return '#dc2626'; // Red
    case 'outfit_dino_suit':
      return '#16a34a'; // Green
    case 'outfit_rainbow':
      return '#38bdf8'; // Sky blue base
    case 'outfit_astro_suit':
      return '#f1f5f9'; // White space suit
    case 'outfit_golden_tshirt':
      return '#eab308'; // Robux Gold VIP
    default:
      return '#3b82f6'; // Default Bright Blue
  }
}

function getOutfitSleeveColor(outfitId: string | null, defaultSkin: string): string {
  if (!outfitId) return '#3b82f6';
  if (outfitId === 'outfit_rainbow') return '#ec4899'; // Pink sleeves
  return getOutfitBodyColor(outfitId);
}

function getPantsColor(outfitId: string | null): string {
  switch (outfitId) {
    case 'outfit_superhero':
      return '#1e3a8a'; // Deep blue superhero tights
    case 'outfit_dino_suit':
      return '#15803d'; // Green dino legs
    case 'outfit_rainbow':
      return '#8b5cf6'; // Purple playful pants
    case 'outfit_astro_suit':
      return '#cbd5e1'; // Space suit silver-grey
    case 'outfit_golden_tshirt':
      return '#1e293b'; // Stylish dark pants
    default:
      return '#2563eb'; // Blue jeans
  }
}

function renderOutfitBadge(outfitId: string | null) {
  if (outfitId === 'outfit_superhero') {
    return (
      <div className="flex flex-col items-center">
        <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] font-black text-red-700 shadow-sm border border-yellow-200">
          M
        </div>
      </div>
    );
  }
  if (outfitId === 'outfit_dino_suit') {
    return <span className="text-sm">🦖</span>;
  }
  if (outfitId === 'outfit_rainbow') {
    return (
      <div className="flex flex-col gap-0.5 w-7 items-center">
        <div className="w-full h-1 bg-red-400 rounded-full" />
        <div className="w-full h-1 bg-yellow-300 rounded-full" />
        <div className="w-full h-1 bg-emerald-400 rounded-full" />
      </div>
    );
  }
  if (outfitId === 'outfit_astro_suit') {
    return (
      <div className="flex items-center gap-0.5">
        <span className="text-xs">🚀</span>
        <div className="w-2 h-2 rounded-full bg-cyan-400" />
      </div>
    );
  }
  if (outfitId === 'outfit_golden_tshirt') {
    return (
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-black tracking-wider text-amber-950 bg-yellow-200 px-1 rounded shadow-xs">
          VIP
        </span>
        <span className="text-xs">💎</span>
      </div>
    );
  }

  // Default Math Star Shirt
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm drop-shadow-xs">⭐</span>
      <span className="text-[8px] font-black text-white/90 tracking-tighter">MATH</span>
    </div>
  );
}
