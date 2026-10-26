import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Sparkles, X, Check, Flame } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { fireMathBuxBurst, fireWinConfetti } from '../utils/confetti';

interface DailyBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakDays: number;
  lastClaimDate: string | null;
  onClaimReward: (amount: number) => void;
}

export const DailyBonusModal: React.FC<DailyBonusModalProps> = ({
  isOpen,
  onClose,
  streakDays,
  lastClaimDate,
  onClaimReward,
}) => {
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [revealedAmount, setRevealedAmount] = useState<number | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];
  const hasClaimedToday = lastClaimDate === todayStr;

  const boxes = [
    { id: 1, label: 'Peti Merah', icon: '🎁', color: 'from-rose-400 to-red-500', reward: 50 },
    { id: 2, label: 'Peti Emas', icon: '💎', color: 'from-amber-400 to-yellow-500', reward: 75 },
    { id: 3, label: 'Peti Ajaib', icon: '⭐', color: 'from-purple-400 to-indigo-500', reward: 60 },
  ];

  const handleOpenBox = (box: typeof boxes[0]) => {
    if (hasClaimedToday || selectedBox !== null) return;

    soundManager.playCashRegister();
    fireWinConfetti();
    setSelectedBox(box.id);
    setRevealedAmount(box.reward);
    onClaimReward(box.reward);
    soundManager.speak(`Hore! Kamu mendapatkan bonus harian ${box.reward} MathBux!`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-2xl relative text-center"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-transform active:scale-90"
        >
          <X size={18} />
        </button>

        {/* Header Icon */}
        <div className="w-20 h-20 mx-auto -mt-16 rounded-3xl bg-gradient-to-tr from-pink-400 to-rose-500 border-4 border-white shadow-xl flex items-center justify-center text-4xl mb-3">
          🎁
        </div>

        {/* Streak Counter */}
        <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 text-xs font-black px-3 py-1 rounded-full mb-2 border border-orange-300">
          <Flame size={14} className="text-orange-600" />
          <span>Rajin Belajar: Hari ke-{streakDays || 1} 🔥</span>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-1">
          Peti Kejutan Harian!
        </h3>
        <p className="text-xs text-slate-600 font-medium mb-6">
          {hasClaimedToday
            ? 'Kamu sudah mengambil hadiah hari ini. Datang lagi besok ya!'
            : 'Pilih 1 dari 3 peti misteri di bawah untuk mendapatkan bonus koin MathBux gratis!'}
        </p>

        {/* Mystery Boxes */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {boxes.map((box) => {
            const isSelected = selectedBox === box.id;
            const isOpened = isSelected && revealedAmount !== null;

            return (
              <motion.button
                key={box.id}
                whileHover={!hasClaimedToday && selectedBox === null ? { scale: 1.05 } : {}}
                whileTap={!hasClaimedToday && selectedBox === null ? { scale: 0.95 } : {}}
                disabled={hasClaimedToday || (selectedBox !== null && !isSelected)}
                onClick={() => handleOpenBox(box)}
                className={`relative rounded-2xl p-3 flex flex-col items-center justify-center border-2 transition-all cursor-pointer ${
                  isOpened
                    ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 shadow-md'
                    : hasClaimedToday
                    ? 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed'
                    : 'bg-gradient-to-b from-amber-50 to-orange-50 border-amber-200 hover:border-amber-300 shadow-xs'
                }`}
              >
                <span className="text-4xl mb-1 filter drop-shadow-sm">
                  {isOpened ? '💎' : box.icon}
                </span>

                <span className="text-[11px] font-black text-slate-800">
                  {isOpened ? `+${revealedAmount} Bux` : box.label}
                </span>

                {isOpened && (
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-100 px-1.5 rounded-full mt-1">
                    Didapat!
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        {hasClaimedToday ? (
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-black text-xs text-slate-700 transition-colors"
          >
            Tutup
          </button>
        ) : (
          <div className="text-[11px] text-amber-800 font-bold bg-amber-50 p-2.5 rounded-xl border border-amber-200">
            ✨ Buka peti setiap hari agar koin MathBux mu semakin banyak!
          </div>
        )}
      </motion.div>
    </div>
  );
};
