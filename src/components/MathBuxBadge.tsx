import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MathBuxBadgeProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  showAddAnimation?: number | null; // e.g. +20
  onClick?: () => void;
}

export const MathBuxBadge: React.FC<MathBuxBadgeProps> = ({
  amount,
  size = 'md',
  showAddAnimation = null,
  onClick
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3.5 py-1.5 gap-2',
    lg: 'text-lg px-4.5 py-2.5 gap-2.5 font-bold',
  };

  const iconSizes = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-5.5 h-5.5 text-sm',
    lg: 'w-7 h-7 text-base',
  };

  return (
    <div className="relative inline-flex items-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`relative flex items-center bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 text-white font-extrabold rounded-2xl shadow-md border-2 border-emerald-300/80 cursor-pointer overflow-hidden ${sizeClasses[size]}`}
      >
        {/* Shimmer light bar */}
        <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 animate-pulse pointer-events-none" />

        {/* MathBux Hexagon Gold/Emerald Icon (Robux Inspired) */}
        <div className={`relative flex items-center justify-center rounded-lg bg-gradient-to-b from-yellow-300 to-amber-500 shadow-inner border border-yellow-100 font-black text-amber-950 ${iconSizes[size]}`}>
          {/* Inner hexagon cutout */}
          <div className="w-1.5 h-1.5 bg-emerald-700/60 rounded-xs rotate-45" />
          <span className="sr-only">MathBux</span>
        </div>

        <span className="tracking-wide drop-shadow-xs flex items-center gap-1">
          {amount.toLocaleString('id-ID')}
          <span className="text-[10px] text-emerald-100 font-semibold uppercase tracking-wider hidden sm:inline">
            MathBux
          </span>
        </span>
      </motion.button>

      {/* Floating +Bux Animation */}
      <AnimatePresence>
        {showAddAnimation && showAddAnimation > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{ opacity: 1, y: -28, scale: 1.2 }}
            exit={{ opacity: 0, y: -45, scale: 0.9 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute -top-3 right-0 pointer-events-none font-black text-amber-500 bg-white/95 px-2.5 py-0.5 rounded-full border-2 border-amber-400 shadow-lg text-xs whitespace-nowrap z-50 flex items-center gap-1"
          >
            <span>+{showAddAnimation}</span>
            <span className="text-emerald-600">💎</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
