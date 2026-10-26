import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, ArrowLeft, Star, Sparkles, Check, Heart, Pencil, HelpCircle, Trophy, ShoppingBag } from 'lucide-react';
import { LevelData, MathQuestion } from '../types/game';
import { soundManager } from '../utils/audio';
import { fireWinConfetti, fireMathBuxBurst } from '../utils/confetti';
import { MathBuxBadge } from './MathBuxBadge';

interface GameStageProps {
  level: LevelData;
  onExit: () => void;
  onCompleteLevel: (levelId: number, stars: number, buxReward: number) => void;
  onGoToShop: () => void;
  onOpenWhiteboard: () => void;
}

export const GameStage: React.FC<GameStageProps> = ({
  level,
  onExit,
  onCompleteLevel,
  onGoToShop,
  onOpenWhiteboard,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [tappedItems, setTappedItems] = useState<number[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [earnedInLevel, setEarnedInLevel] = useState(0);
  const [isLevelFinished, setIsLevelFinished] = useState(false);
  const [earnedStars, setEarnedStars] = useState(3);

  const currentQuestion: MathQuestion = level.questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex) / level.questions.length) * 100;

  // Speak prompt on new question load
  useEffect(() => {
    setTappedItems([]);
    setSelectedOptionId(null);
    setIsAnswerCorrect(null);
    setShowExplanation(false);

    // Speak prompt if voice enabled
    const timer = setTimeout(() => {
      soundManager.speak(currentQuestion.speechPrompt || currentQuestion.prompt);
    }, 400);

    return () => clearTimeout(timer);
  }, [currentQuestionIndex]);

  // Handle tapping individual objects (interactive counting)
  const handleItemTap = (itemId: number) => {
    soundManager.playPop();
    if (!tappedItems.includes(itemId)) {
      const nextTapped = [...tappedItems, itemId];
      setTappedItems(nextTapped);
      // Play ascending musical note
      soundManager.playCountNote(nextTapped.length);
      soundManager.speak(`${nextTapped.length}`);
    }
  };

  // Handle option select
  const handleOptionSelect = (optionId: string, isCorrect: boolean) => {
    if (isAnswerCorrect === true) return; // already solved

    setSelectedOptionId(optionId);

    if (isCorrect) {
      soundManager.playCorrect();
      fireWinConfetti();
      setIsAnswerCorrect(true);
      setShowExplanation(true);
      setEarnedInLevel((prev) => prev + 15);

      soundManager.speak(currentQuestion.explanation || 'Hebat sekali! Jawabanmu benar!');
    } else {
      soundManager.playWrong();
      setIsAnswerCorrect(false);
      setWrongAttempts((prev) => prev + 1);
      soundManager.speak('Hampir benar! Ayo coba lagi ya!');
    }
  };

  // Next question or Finish Level
  const handleNext = () => {
    soundManager.playPop();
    if (currentQuestionIndex < level.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate stars
      let finalStars = 3;
      if (wrongAttempts >= 3) finalStars = 1;
      else if (wrongAttempts >= 1) finalStars = 2;

      setEarnedStars(finalStars);
      setIsLevelFinished(true);
      soundManager.playFanfare();
      fireMathBuxBurst();

      const totalBux = level.rewardBux + earnedInLevel;
      onCompleteLevel(level.id, finalStars, totalBux);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between select-none">
      {/* Top Header Bar */}
      <div className="bg-white border-b-2 border-amber-100 px-4 py-3 sticky top-0 z-30 shadow-xs">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          {/* Back button */}
          <button
            onClick={() => {
              soundManager.playPop();
              onExit();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Peta</span>
          </button>

          {/* Level Title & Progress Bar */}
          <div className="flex-1 max-w-md mx-2">
            <div className="flex items-center justify-between text-xs font-black mb-1">
              <span className="text-amber-800 flex items-center gap-1">
                <span>{level.icon}</span>
                <span>{level.title}</span>
              </span>
              <span className="text-slate-500">
                Soal {currentQuestionIndex + 1} / {level.questions.length}
              </span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full transition-all duration-300"
              />
            </div>
          </div>

          {/* Whiteboard Doodle Tool */}
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenWhiteboard();
            }}
            className="px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold flex items-center gap-1 transition-transform active:scale-95"
            title="Buka Papan Coretan Jari"
          >
            <Pencil size={15} />
            <span className="hidden sm:inline">Coretan</span>
          </button>
        </div>
      </div>

      {/* Main Question Arena */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        {!isLevelFinished ? (
          <div className="bg-white rounded-3xl p-5 sm:p-8 border-3 border-amber-200/90 shadow-lg relative overflow-hidden">
            {/* Top Prompt with Speaker Icon */}
            <div className="flex items-start justify-between gap-3 mb-6 bg-amber-50/80 p-4 rounded-2xl border border-amber-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl p-1 bg-white rounded-xl shadow-xs">💡</span>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
                    {currentQuestion.prompt}
                  </h2>
                  <p className="text-xs text-amber-900 font-semibold mt-1">
                    Ketuk gambar untuk berhitung dengan jari!
                  </p>
                </div>
              </div>

              {/* Speaker Narration Button */}
              <button
                onClick={() => {
                  soundManager.playPop();
                  soundManager.speak(currentQuestion.speechPrompt || currentQuestion.prompt);
                }}
                className="w-10 h-10 rounded-2xl bg-white hover:bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center shrink-0 shadow-xs transition-transform active:scale-90"
                title="Dengarkan Suara"
              >
                <Volume2 size={20} />
              </button>
            </div>

            {/* INTERACTIVE COUNTING AREA */}
            <div className="my-6 min-h-[160px] flex flex-col items-center justify-center bg-gradient-to-b from-sky-50/50 to-emerald-50/40 rounded-2xl p-5 border-2 border-dashed border-sky-200">
              {/* Type: count_objects or subtraction_visual */}
              {currentQuestion.items && currentQuestion.items.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
                  {currentQuestion.items.map((item, idx) => {
                    const isTapped = tappedItems.includes(item.id);
                    const tapOrderIndex = tappedItems.indexOf(item.id);

                    return (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleItemTap(item.id)}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl cursor-pointer select-none transition-all ${
                          isTapped
                            ? 'bg-amber-100 border-3 border-amber-400 shadow-md ring-2 ring-amber-200'
                            : 'bg-white border-2 border-slate-200 shadow-xs hover:border-amber-300'
                        }`}
                      >
                        <span>{item.emoji}</span>

                        {/* Number Badge if tapped */}
                        {isTapped && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber-500 text-white font-black text-sm flex items-center justify-center border-2 border-white shadow-md"
                          >
                            {tapOrderIndex + 1}
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Type: addition_visual with Group A + Group B */}
              {currentQuestion.type === 'addition_visual' && currentQuestion.itemGroupA && currentQuestion.itemGroupB && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
                  {/* Group A */}
                  <div className="flex flex-col items-center">
                    <div className="flex flex-wrap items-center justify-center gap-2 bg-white/90 p-3 rounded-2xl border-2 border-emerald-200 shadow-xs min-w-[100px]">
                      {currentQuestion.itemGroupA.map((item) => (
                        <span key={item.id} className="text-3xl sm:text-4xl animate-bounce-slow">
                          {item.emoji}
                        </span>
                      ))}
                    </div>
                    <span className="mt-1.5 text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {currentQuestion.itemGroupA.length} {currentQuestion.emoji}
                    </span>
                  </div>

                  {/* Plus Sign */}
                  <div className="w-10 h-10 rounded-full bg-amber-400 text-amber-950 font-black text-2xl flex items-center justify-center shadow-md border-2 border-white">
                    +
                  </div>

                  {/* Group B */}
                  <div className="flex flex-col items-center">
                    <div className="flex flex-wrap items-center justify-center gap-2 bg-white/90 p-3 rounded-2xl border-2 border-emerald-200 shadow-xs min-w-[100px]">
                      {currentQuestion.itemGroupB.map((item) => (
                        <span key={item.id} className="text-3xl sm:text-4xl animate-bounce-slow">
                          {item.emoji}
                        </span>
                      ))}
                    </div>
                    <span className="mt-1.5 text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {currentQuestion.itemGroupB.length} {currentQuestion.emoji}
                    </span>
                  </div>
                </div>
              )}

              {/* Counting indicator footer */}
              {tappedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-xs font-black text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300"
                >
                  Sudah dihitung: {tappedItems.length} buah! 🌟
                </motion.div>
              )}
            </div>

            {/* MULTIPLE CHOICE OPTIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let btnStyle = 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800';

                if (isSelected) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-lg ring-4 ring-emerald-200';
                  } else {
                    btnStyle = 'bg-rose-100 border-rose-400 text-rose-800';
                  }
                }

                return (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionSelect(opt.id, opt.isCorrect)}
                    disabled={isAnswerCorrect === true}
                    className={`p-4 rounded-2xl border-3 font-black text-lg sm:text-xl shadow-xs transition-all flex flex-col items-center justify-center cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt.label}</span>
                    {opt.sublabel && (
                      <span className={`text-xs font-semibold mt-0.5 ${isSelected && opt.isCorrect ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {opt.sublabel}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* FEEDBACK & NEXT BUTTON */}
            <AnimatePresence>
              {isAnswerCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-6 p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-3 ${
                    isAnswerCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-center sm:text-left">
                    <span className="text-3xl">
                      {isAnswerCorrect ? '🎉' : '💪'}
                    </span>
                    <div>
                      <div className="font-black text-base">
                        {isAnswerCorrect ? 'Hore! Kamu Benar!' : 'Ayo Coba Sekali Lagi!'}
                      </div>
                      <p className="text-xs font-semibold mt-0.5">
                        {isAnswerCorrect ? currentQuestion.explanation : 'Hitung pelan-pelan ya, pasti bisa!'}
                      </p>
                    </div>
                  </div>

                  {isAnswerCorrect ? (
                    <button
                      onClick={handleNext}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <span>Lanjut</span>
                      <span>➡️</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        soundManager.playPop();
                        setSelectedOptionId(null);
                        setIsAnswerCorrect(null);
                      }}
                      className="w-full sm:w-auto px-5 py-2 rounded-xl bg-white text-rose-700 border border-rose-300 font-bold text-xs"
                    >
                      Coba Lagi
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* LEVEL COMPLETE CELEBRATION MODAL */
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-2xl text-center max-w-lg mx-auto w-full"
          >
            {/* Crown / Trophy */}
            <div className="w-24 h-24 mx-auto -mt-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-4 border-white shadow-xl flex items-center justify-center text-5xl mb-4">
              🏆
            </div>

            <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
              Level Selesai!
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              Luar Biasa, Jagoan! 🌟
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mb-6">
              Kamu berhasil menyelesaikan tantangan matematika ini dengan sangat pintar!
            </p>

            {/* Stars Earned */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map((starIdx) => (
                <motion.div
                  key={starIdx}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: starIdx * 0.2 }}
                >
                  <Star
                    size={38}
                    className={
                      starIdx <= earnedStars
                        ? 'text-yellow-400 fill-yellow-400 filter drop-shadow-md'
                        : 'text-slate-200 fill-slate-200'
                    }
                  />
                </motion.div>
              ))}
            </div>

            {/* Robux Reward Card */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border-2 border-emerald-300 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-left">
                <span className="text-3xl">💎</span>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Reward MathBux (Robux)</div>
                  <div className="text-xl font-black text-emerald-700">
                    +{level.rewardBux + earnedInLevel} MathBux!
                  </div>
                </div>
              </div>

              <div className="text-xs font-black bg-emerald-500 text-white px-3 py-1 rounded-full shadow-xs">
                Koin Masuk! 🪙
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  soundManager.playPop();
                  onGoToShop();
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                <span>Belanja ke Toko</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playPop();
                  onExit();
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-sm shadow-md transition-transform active:scale-95"
              >
                Lanjut Petualangan 🗺️
              </button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="text-center py-3 text-xs text-slate-400 font-medium">
        Setiap jawaban benar memberimu koin MathBux untuk koleksi avatar!
      </footer>
    </div>
  );
};
