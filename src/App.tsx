/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserProgress, LevelData, ShopItem, ShopCategory, AvatarCustomization } from './types/game';
import { ADVENTURE_LEVELS } from './data/adventureLevels';
import { Navbar } from './components/Navbar';
import { AdventureMap } from './components/AdventureMap';
import { GameStage } from './components/GameStage';
import { VirtualShop } from './components/VirtualShop';
import { AvatarStudio } from './components/AvatarStudio';
import { MathWhiteboard } from './components/MathWhiteboard';
import { DailyBonusModal } from './components/DailyBonusModal';
import { ParentModal } from './components/ParentModal';
import { soundManager } from './utils/audio';

const STORAGE_KEY = 'mathbux_tk_player_save_v1';

const DEFAULT_PROGRESS: UserProgress = {
  mathBux: 100, // 100 free starter Robux/MathBux to boost kid's excitement!
  unlockedLevel: 1,
  levelStars: {},
  inventory: ['toy_balloon'], // Starter item
  avatar: {
    skinColor: '#fde047',
    faceExpression: 'happy',
    equippedHat: null,
    equippedOutfit: null,
    equippedPet: null,
    equippedAura: null,
    equippedToy: 'toy_balloon',
  },
  streakDays: 1,
  lastDailyClaim: null,
  soundEnabled: true,
  voiceEnabled: true,
  playerName: 'Juara Bintang',
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return DEFAULT_PROGRESS;
  });

  const [currentTab, setCurrentTab] = useState<'map' | 'shop' | 'avatar' | 'quiz'>('map');
  const [activeLevel, setActiveLevel] = useState<LevelData | null>(null);
  const [recentEarnedBux, setRecentEarnedBux] = useState<number | null>(null);

  // Modals
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  // Sync sound manager settings
  useEffect(() => {
    soundManager.setMuted(!progress.soundEnabled);
    soundManager.setVoiceMuted(!progress.voiceEnabled);
  }, [progress.soundEnabled, progress.voiceEnabled]);

  // Level Selection
  const handleSelectLevel = (level: LevelData) => {
    setActiveLevel(level);
    setCurrentTab('quiz');
  };

  // Level Completed
  const handleCompleteLevel = (levelId: number, stars: number, buxReward: number) => {
    setRecentEarnedBux(buxReward);
    setTimeout(() => setRecentEarnedBux(null), 3000);

    setProgress((prev) => {
      const currentBestStars = prev.levelStars[levelId] || 0;
      const updatedStars = {
        ...prev.levelStars,
        [levelId]: Math.max(currentBestStars, stars),
      };

      const nextUnlock = Math.max(prev.unlockedLevel, levelId + 1);

      return {
        ...prev,
        mathBux: prev.mathBux + buxReward,
        unlockedLevel: Math.min(nextUnlock, ADVENTURE_LEVELS.length),
        levelStars: updatedStars,
      };
    });
  };

  // Buy Shop Item
  const handleBuyItem = (item: ShopItem): boolean => {
    if (progress.mathBux < item.price) return false;

    setProgress((prev) => ({
      ...prev,
      mathBux: prev.mathBux - item.price,
      inventory: [...prev.inventory, item.id],
    }));
    return true;
  };

  // Equip / Unequip
  const handleEquipItem = (category: ShopCategory, itemId: string | null) => {
    setProgress((prev) => {
      const updatedAvatar = { ...prev.avatar };
      switch (category) {
        case 'hats':
          updatedAvatar.equippedHat = itemId;
          break;
        case 'outfits':
          updatedAvatar.equippedOutfit = itemId;
          break;
        case 'pets':
          updatedAvatar.equippedPet = itemId;
          break;
        case 'auras':
          updatedAvatar.equippedAura = itemId;
          break;
        case 'toys':
          updatedAvatar.equippedToy = itemId;
          break;
      }
      return {
        ...prev,
        avatar: updatedAvatar,
      };
    });
  };

  // Avatar customization
  const handleUpdateAvatar = (updated: Partial<AvatarCustomization>) => {
    setProgress((prev) => ({
      ...prev,
      avatar: { ...prev.avatar, ...updated },
    }));
  };

  // Player Name
  const handleUpdatePlayerName = (playerName: string) => {
    setProgress((prev) => ({ ...prev, playerName }));
  };

  // Daily Bonus Claim
  const handleClaimDailyReward = (amount: number) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setRecentEarnedBux(amount);
    setTimeout(() => setRecentEarnedBux(null), 3000);

    setProgress((prev) => ({
      ...prev,
      mathBux: prev.mathBux + amount,
      lastDailyClaim: todayStr,
      streakDays: prev.streakDays + 1,
    }));
  };

  // Toggles
  const handleToggleSound = () => {
    setProgress((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleToggleVoice = () => {
    setProgress((prev) => ({ ...prev, voiceEnabled: !prev.voiceEnabled }));
  };

  // Reset Progress
  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    setCurrentTab('map');
    setActiveLevel(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-['Fredoka',sans-serif]">
      {/* Navbar (hidden during active quiz for immersive child focus) */}
      {currentTab !== 'quiz' && (
        <Navbar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          mathBux={progress.mathBux}
          recentEarnedBux={recentEarnedBux}
          soundEnabled={progress.soundEnabled}
          voiceEnabled={progress.voiceEnabled}
          onToggleSound={handleToggleSound}
          onToggleVoice={handleToggleVoice}
          onOpenWhiteboard={() => setIsWhiteboardOpen(true)}
          onOpenDailyModal={() => setIsDailyModalOpen(true)}
          onOpenParentModal={() => setIsParentModalOpen(true)}
        />
      )}

      {/* Main Views */}
      {currentTab === 'map' && (
        <AdventureMap
          progress={progress}
          onSelectLevel={handleSelectLevel}
          onGoToShop={() => setCurrentTab('shop')}
        />
      )}

      {currentTab === 'quiz' && activeLevel && (
        <GameStage
          level={activeLevel}
          onExit={() => setCurrentTab('map')}
          onCompleteLevel={handleCompleteLevel}
          onGoToShop={() => setCurrentTab('shop')}
          onOpenWhiteboard={() => setIsWhiteboardOpen(true)}
        />
      )}

      {currentTab === 'shop' && (
        <VirtualShop
          progress={progress}
          onBuyItem={handleBuyItem}
          onEquipItem={handleEquipItem}
          onGoToMap={() => setCurrentTab('map')}
        />
      )}

      {currentTab === 'avatar' && (
        <AvatarStudio
          progress={progress}
          onUpdateAvatar={handleUpdateAvatar}
          onUpdatePlayerName={handleUpdatePlayerName}
          onGoToShop={() => setCurrentTab('shop')}
          onGoToMap={() => setCurrentTab('map')}
        />
      )}

      {/* Math Whiteboard Modal (scratchpad) */}
      <MathWhiteboard
        isOpen={isWhiteboardOpen}
        onClose={() => setIsWhiteboardOpen(false)}
      />

      {/* Daily Reward Mystery Chest Modal */}
      <DailyBonusModal
        isOpen={isDailyModalOpen}
        onClose={() => setIsDailyModalOpen(false)}
        streakDays={progress.streakDays}
        lastClaimDate={progress.lastDailyClaim}
        onClaimReward={handleClaimDailyReward}
      />

      {/* Parent & Teacher Area Modal */}
      <ParentModal
        isOpen={isParentModalOpen}
        onClose={() => setIsParentModalOpen(false)}
        soundEnabled={progress.soundEnabled}
        voiceEnabled={progress.voiceEnabled}
        onToggleSound={handleToggleSound}
        onToggleVoice={handleToggleVoice}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
