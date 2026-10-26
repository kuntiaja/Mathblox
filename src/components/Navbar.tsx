import React from 'react';
import { Volume2, VolumeX, Sparkles, Map, ShoppingBag, User, Gift, Pencil, Settings } from 'lucide-react';
import { MathBuxBadge } from './MathBuxBadge';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentTab: 'map' | 'shop' | 'avatar' | 'quiz';
  onSelectTab: (tab: 'map' | 'shop' | 'avatar') => void;
  mathBux: number;
  recentEarnedBux: number | null;
  soundEnabled: boolean;
  voiceEnabled: boolean;
  onToggleSound: () => void;
  onToggleVoice: () => void;
  onOpenWhiteboard: () => void;
  onOpenDailyModal: () => void;
  onOpenParentModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  mathBux,
  recentEarnedBux,
  soundEnabled,
  voiceEnabled,
  onToggleSound,
  onToggleVoice,
  onOpenWhiteboard,
  onOpenDailyModal,
  onOpenParentModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Logo & Title */}
        <div 
          onClick={() => {
            soundManager.playPop();
            onSelectTab('map');
          }}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-emerald-400 flex items-center justify-center shadow-md border-2 border-white group-hover:scale-105 transition-transform">
            <span className="text-2xl drop-shadow-xs">🚀</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-amber-600 via-orange-500 to-emerald-600 bg-clip-text text-transparent">
                MathBux
              </span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full uppercase tracking-wider border border-amber-300">
                TK Juara
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold -mt-1 hidden sm:block">
              Petualangan Matematika Anak Cerdas
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => {
              soundManager.playPop();
              onSelectTab('map');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-sm transition-all ${
              currentTab === 'map'
                ? 'bg-white text-amber-600 shadow-xs border border-amber-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Map size={17} />
            <span>Peta Petualangan</span>
          </button>

          <button
            onClick={() => {
              soundManager.playPop();
              onSelectTab('shop');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-sm transition-all ${
              currentTab === 'shop'
                ? 'bg-white text-emerald-600 shadow-xs border border-emerald-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <ShoppingBag size={17} />
            <span>Toko MathBux</span>
            <span className="bg-emerald-500 text-white text-[9px] px-1 rounded-sm font-extrabold animate-pulse">
              ROBLOX
            </span>
          </button>

          <button
            onClick={() => {
              soundManager.playPop();
              onSelectTab('avatar');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-sm transition-all ${
              currentTab === 'avatar'
                ? 'bg-white text-indigo-600 shadow-xs border border-indigo-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <User size={17} />
            <span>Kamar Avatar</span>
          </button>
        </nav>

        {/* Action Controls & Currency */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Daily Spin / Gift Button */}
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenDailyModal();
            }}
            className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-sm border border-pink-300 transition-transform active:scale-95 cursor-pointer"
            title="Hadiah Harian Koin MathBux"
          >
            <Gift size={16} className="animate-bounce" />
            <span className="hidden sm:inline">Hadiah</span>
          </button>

          {/* Math Whiteboard Doodle Button */}
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenWhiteboard();
            }}
            className="w-8.5 h-8.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 flex items-center justify-center transition-transform active:scale-90"
            title="Papan Coretan Jari"
          >
            <Pencil size={17} />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundManager.playPop();
            }}
            className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center transition-all ${
              soundEnabled
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                : 'bg-rose-50 text-rose-500 border border-rose-200'
            }`}
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>

          {/* Voice Narration Toggle */}
          <button
            onClick={() => {
              onToggleVoice();
              soundManager.playPop();
            }}
            className={`px-2 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 border transition-all ${
              voiceEnabled
                ? 'bg-teal-50 text-teal-700 border-teal-200'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
            title="Suara Narator Anak Indonesia"
          >
            <span className="text-xs">🗣️</span>
            <span className="text-[10px] hidden sm:inline">{voiceEnabled ? 'Suara Aktif' : 'Suara Off'}</span>
          </button>

          {/* Parent & Teacher Info */}
          <button
            onClick={() => {
              soundManager.playPop();
              onOpenParentModal();
            }}
            className="w-8.5 h-8.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center border border-slate-200"
            title="Menu Guru & Orang Tua"
          >
            <Settings size={16} />
          </button>

          {/* MathBux Robux-like Currency Badge */}
          <MathBuxBadge
            amount={mathBux}
            showAddAnimation={recentEarnedBux}
            onClick={() => {
              soundManager.playPop();
              onSelectTab('shop');
            }}
          />
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-white border-t border-slate-200 py-1.5 px-2">
        <button
          onClick={() => {
            soundManager.playPop();
            onSelectTab('map');
          }}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
            currentTab === 'map' ? 'text-amber-600 bg-amber-50 font-black' : 'text-slate-500'
          }`}
        >
          <Map size={18} />
          <span>Peta</span>
        </button>

        <button
          onClick={() => {
            soundManager.playPop();
            onSelectTab('shop');
          }}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold transition-all relative ${
            currentTab === 'shop' ? 'text-emerald-600 bg-emerald-50 font-black' : 'text-slate-500'
          }`}
        >
          <ShoppingBag size={18} />
          <span>Toko</span>
          <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
        </button>

        <button
          onClick={() => {
            soundManager.playPop();
            onSelectTab('avatar');
          }}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
            currentTab === 'avatar' ? 'text-indigo-600 bg-indigo-50 font-black' : 'text-slate-500'
          }`}
        >
          <User size={18} />
          <span>Avatar</span>
        </button>
      </div>
    </header>
  );
};
