import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Lock, Play, Sparkles, CheckCircle2, ChevronRight, Trophy } from 'lucide-react';
import { WORLDS_INFO, ADVENTURE_LEVELS } from '../data/adventureLevels';
import { LevelData, UserProgress, WorldId } from '../types/game';
import { AvatarDisplay } from './AvatarDisplay';
import { soundManager } from '../utils/audio';

interface AdventureMapProps {
  progress: UserProgress;
  onSelectLevel: (level: LevelData) => void;
  onGoToShop: () => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  progress,
  onSelectLevel,
  onGoToShop,
}) => {
  const [selectedPreviewLevel, setSelectedPreviewLevel] = useState<LevelData | null>(null);

  // Group levels by world
  const levelsByWorld = WORLDS_INFO.map((world) => ({
    world,
    levels: ADVENTURE_LEVELS.filter((l) => l.worldId === world.id),
  }));

  const totalStars = Object.values(progress.levelStars).reduce((acc, curr) => acc + curr, 0);
  const totalCompleted = Object.keys(progress.levelStars).length;

  const handleLevelClick = (level: LevelData, isUnlocked: boolean) => {
    if (!isUnlocked) {
      soundManager.playWrong();
      soundManager.speak('Selesaikan level sebelumnya dulu ya adik hebat!');
      return;
    }
    soundManager.playPop();
    setSelectedPreviewLevel(level);
    soundManager.speak(`Level ${level.id}. ${level.title}!`);
  };

  const handleStartLevel = () => {
    if (selectedPreviewLevel) {
      soundManager.playPop();
      onSelectLevel(selectedPreviewLevel);
      setSelectedPreviewLevel(null);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24 text-slate-800">
      {/* Hero Welcome Banner (Clean, Bright White & Playful) */}
      <div className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-sky-50 to-white pt-6 pb-8 px-4 border-b border-amber-100">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            {/* Small Animated Avatar Greeting */}
            <div className="relative group cursor-pointer" onClick={onGoToShop}>
              <AvatarDisplay avatar={progress.avatar} size="sm" animation="wave" showPet={true} />
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full border border-white shadow-xs">
                Kamu!
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 bg-amber-200/70 text-amber-900 px-3 py-1 rounded-full text-xs font-bold mb-1.5 border border-amber-300">
                <Sparkles size={14} className="text-amber-600 animate-spin" />
                <span>Peta Petualangan Belajar</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Halo Anak Hebat! 🌟
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md">
                Pilih pulau matematika di bawah, selesaikan soal bergambar, dan kumpulkan banyak koin <strong className="text-emerald-700">MathBux</strong> untuk belanja aksesoris keren!
              </p>
            </div>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex sm:flex-col gap-2.5 w-full sm:w-auto justify-center">
            {/* Stars Total */}
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl shadow-xs border-2 border-amber-200">
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase leading-none">Bintang Diperoleh</div>
                <div className="text-base font-black text-slate-800">{totalStars} / {ADVENTURE_LEVELS.length * 3} ⭐</div>
              </div>
            </div>

            {/* Levels Cleared */}
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl shadow-xs border-2 border-emerald-200">
              <Trophy className="text-emerald-500" size={20} />
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase leading-none">Level Terselesaikan</div>
                <div className="text-base font-black text-slate-800">{totalCompleted} / {ADVENTURE_LEVELS.length} Level</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-12">
          {levelsByWorld.map(({ world, levels }, worldIndex) => {
            // A world is active if at least one level is unlocked or previous world was cleared
            const isWorldUnlocked = levels.some((lvl) => lvl.id <= progress.unlockedLevel);
            const isWorldCompleted = levels.every((lvl) => (progress.levelStars[lvl.id] || 0) > 0);

            return (
              <section
                key={world.id}
                className={`relative rounded-3xl p-5 sm:p-7 border-3 transition-all ${
                  isWorldUnlocked
                    ? `${world.bgGradient} border-slate-200/90 shadow-md`
                    : 'bg-slate-50 border-dashed border-slate-300 opacity-60'
                }`}
              >
                {/* World Header Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/60">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl sm:text-4xl p-2 bg-white rounded-2xl shadow-sm border border-slate-100">
                      {world.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${world.themeColor}`}>
                          {world.badge}
                        </span>
                        {isWorldCompleted && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <CheckCircle2 size={12} /> Selesai
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                        {world.name}
                      </h2>
                      <p className="text-xs text-slate-600 font-medium">{world.description}</p>
                    </div>
                  </div>

                  {/* Level Progress Indicator */}
                  <div className="text-xs font-bold text-slate-500 bg-white/80 px-3 py-1.5 rounded-xl border border-slate-200">
                    Level {levels[0].id} - {levels[levels.length - 1].id}
                  </div>
                </div>

                {/* Level Nodes Grid / Trail */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative">
                  {levels.map((level, idx) => {
                    const isUnlocked = level.id <= progress.unlockedLevel;
                    const stars = progress.levelStars[level.id] || 0;
                    const isCurrentFrontier = level.id === progress.unlockedLevel;

                    return (
                      <motion.div
                        key={level.id}
                        whileHover={isUnlocked ? { scale: 1.03, y: -4 } : {}}
                        whileTap={isUnlocked ? { scale: 0.97 } : { rotate: [-2, 2, -2] }}
                        onClick={() => handleLevelClick(level, isUnlocked)}
                        className={`relative rounded-2xl p-4 flex flex-col justify-between transition-all cursor-pointer border-2 shadow-xs ${
                          isUnlocked
                            ? isCurrentFrontier
                              ? 'bg-white border-amber-400 ring-4 ring-amber-200/80 shadow-lg'
                              : stars > 0
                              ? 'bg-white border-emerald-300'
                              : 'bg-white border-slate-200'
                            : 'bg-slate-100/80 border-slate-200 cursor-not-allowed text-slate-400'
                        }`}
                      >
                        {/* Current Player Pin marker */}
                        {isCurrentFrontier && (
                          <div className="absolute -top-4 -right-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-md border-2 border-white flex items-center gap-1 animate-bounce">
                            <span>Ayo Main!</span>
                            <span>🎯</span>
                          </div>
                        )}

                        {/* Top: Icon & Level Tag */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl border border-slate-100 shadow-inner">
                            {isUnlocked ? level.icon : <Lock size={20} className="text-slate-400" />}
                          </div>

                          <span className={`text-xs font-black px-2 py-0.5 rounded-lg ${
                            isUnlocked ? 'bg-slate-100 text-slate-700' : 'bg-slate-200 text-slate-400'
                          }`}>
                            Level {level.id}
                          </span>
                        </div>

                        {/* Middle: Title & Subtitle */}
                        <div className="my-2">
                          <h3 className={`font-black text-sm leading-tight ${isUnlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                            {level.title}
                          </h3>
                          <p className={`text-xs mt-0.5 font-medium line-clamp-1 ${isUnlocked ? 'text-slate-500' : 'text-slate-400'}`}>
                            {level.subtitle}
                          </p>
                        </div>

                        {/* Bottom: Stars & Reward Bux */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                          {/* Stars */}
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3].map((starIdx) => (
                              <Star
                                key={starIdx}
                                size={15}
                                className={
                                  starIdx <= stars
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-slate-200 fill-slate-200'
                                }
                              />
                            ))}
                          </div>

                          {/* Reward preview */}
                          <div className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <span>+{level.rewardBux}</span>
                            <span className="text-xs">💎</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Level Preview Modal */}
      {selectedPreviewLevel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white max-w-md w-full rounded-3xl p-6 border-4 border-amber-300 shadow-2xl relative text-center"
          >
            {/* Modal Icon Badge */}
            <div className="w-20 h-20 mx-auto -mt-12 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-lg flex items-center justify-center text-4xl mb-3">
              {selectedPreviewLevel.icon}
            </div>

            <div className="inline-block bg-amber-100 text-amber-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Level {selectedPreviewLevel.id}
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-1">
              {selectedPreviewLevel.title}
            </h3>
            <p className="text-sm text-slate-600 font-medium mb-4">
              {selectedPreviewLevel.subtitle}
            </p>

            {/* Questions count and MathBux Reward details */}
            <div className="grid grid-cols-2 gap-3 mb-6 bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xl">📝</span>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Jumlah Soal</div>
                  <div className="text-sm font-black text-slate-800">
                    {selectedPreviewLevel.questions.length} Soal Bergambar
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xl">💎</span>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Hadiah Robux</div>
                  <div className="text-sm font-black text-emerald-600">
                    +{selectedPreviewLevel.rewardBux} MathBux
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundManager.playPop();
                  setSelectedPreviewLevel(null);
                }}
                className="flex-1 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-sm transition-colors"
              >
                Kembali
              </button>

              <button
                onClick={handleStartLevel}
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Play size={18} fill="white" />
                <span>Mulai Main!</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
