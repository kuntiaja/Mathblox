import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Palette, Play, ShoppingBag, ArrowLeft, Heart, Smile } from 'lucide-react';
import { AvatarCustomization, UserProgress } from '../types/game';
import { AvatarDisplay } from './AvatarDisplay';
import { soundManager } from '../utils/audio';

interface AvatarStudioProps {
  progress: UserProgress;
  onUpdateAvatar: (updated: Partial<AvatarCustomization>) => void;
  onUpdatePlayerName: (name: string) => void;
  onGoToShop: () => void;
  onGoToMap: () => void;
}

export const AvatarStudio: React.FC<AvatarStudioProps> = ({
  progress,
  onUpdateAvatar,
  onUpdatePlayerName,
  onGoToShop,
  onGoToMap,
}) => {
  const [currentAnimation, setCurrentAnimation] = useState<'idle' | 'dance' | 'jump' | 'wave' | 'celebrate'>('idle');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(progress.playerName || 'Bintang Cilik');

  const skinColors = [
    { label: 'Kuning Ceria', color: '#fde047' },
    { label: 'Peach Terang', color: '#fed7aa' },
    { label: 'Cokelat Madu', color: '#f59e0b' },
    { label: 'Cokelat Manis', color: '#b45309' },
    { label: 'Biru Awan', color: '#93c5fd' },
    { label: 'Merah Muda', color: '#f9a8d4' },
  ];

  const emotes = [
    { id: 'dance', label: '💃 Joget Lucu' },
    { id: 'jump', label: '🦘 Lompat Ceria' },
    { id: 'wave', label: '👋 Dadah Melambai' },
    { id: 'celebrate', label: '🎉 Sorak Menang' },
    { id: 'idle', label: '🧘 Diam Manis' },
  ];

  const handleEmote = (emoteId: 'idle' | 'dance' | 'jump' | 'wave' | 'celebrate') => {
    soundManager.playPop();
    setCurrentAnimation(emoteId);
    if (emoteId === 'celebrate') {
      soundManager.playCorrect();
    }
  };

  const handleSaveName = () => {
    soundManager.playPop();
    if (tempName.trim()) {
      onUpdatePlayerName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-24">
      {/* Studio Banner */}
      <div className="bg-gradient-to-b from-indigo-50 via-purple-50/40 to-white pt-6 pb-6 px-4 border-b border-indigo-100">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playPop();
                onGoToMap();
              }}
              className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-bold">
                <Sparkles size={14} className="text-indigo-500" />
                <span>Kamar Karakter Pribadi</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                Kamar Avatarku 🛋️
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                Pilih warna kulit, gerakkan avatarmu dengan tombol joget, dan lihat teman peliharaanmu!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onGoToShop();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs shadow-md transition-transform active:scale-95"
          >
            <ShoppingBag size={16} />
            <span>Belanja Aksesoris Baru</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* LEFT: Live Interactive Avatar Stage */}
          <div className="md:col-span-6 bg-gradient-to-b from-slate-50 to-indigo-50/60 rounded-3xl p-6 sm:p-8 border-3 border-indigo-200/90 shadow-md flex flex-col items-center justify-center relative overflow-hidden">
            {/* Player Name Tag with Edit */}
            <div className="mb-4">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    maxLength={15}
                    onChange={(e) => setTempName(e.target.value)}
                    className="bg-white border-2 border-indigo-400 rounded-xl px-3 py-1 text-xs font-black text-slate-900 text-center outline-none"
                  />
                  <button
                    onClick={handleSaveName}
                    className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-xs"
                  >
                    Simpan
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setIsEditingName(true)}
                  className="bg-white/95 px-4 py-1.5 rounded-full border-2 border-indigo-300 shadow-xs cursor-pointer hover:bg-indigo-50 flex items-center gap-1.5 transition-colors"
                >
                  <span className="text-xs font-black text-indigo-950">
                    ⭐ {progress.playerName || 'Bintang Cilik'}
                  </span>
                  <span className="text-[10px] text-indigo-500 font-bold">✎ Ubah</span>
                </div>
              )}
            </div>

            {/* Avatar Stage */}
            <div className="relative w-64 h-72 flex items-center justify-center">
              {/* Floor Shadow */}
              <div className="absolute bottom-4 w-44 h-8 bg-indigo-200/70 rounded-full filter blur-[1px]" />
              <AvatarDisplay avatar={progress.avatar} animation={currentAnimation} size="xl" />
            </div>

            {/* Interactive Emote Buttons */}
            <div className="mt-4 w-full">
              <div className="text-[11px] font-black uppercase text-indigo-800 text-center mb-2">
                Pilih Gerakan Lucu (Emote):
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {emotes.map((em) => (
                  <button
                    key={em.id}
                    onClick={() => handleEmote(em.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      currentAnimation === em.id
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm ring-2 ring-indigo-200'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {em.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Customization Studio (Skin Tone & Wardrobe Summary) */}
          <div className="md:col-span-6 flex flex-col gap-5">
            {/* Skin Tone Selector */}
            <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Palette size={18} className="text-amber-500" />
                <h3 className="text-sm font-black text-slate-900">
                  Warna Kulit Avatar
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {skinColors.map((sc) => (
                  <button
                    key={sc.color}
                    onClick={() => {
                      soundManager.playPop();
                      onUpdateAvatar({ skinColor: sc.color });
                    }}
                    className={`flex items-center gap-2 p-2 rounded-2xl border-2 transition-all cursor-pointer ${
                      progress.avatar.skinColor === sc.color
                        ? 'border-indigo-500 bg-indigo-50/50 shadow-xs ring-2 ring-indigo-200'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-slate-300 shadow-xs shrink-0"
                      style={{ backgroundColor: sc.color }}
                    />
                    <span className="text-xs font-bold text-slate-700">{sc.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Wardrobe Summary Card */}
            <div className="bg-amber-50/70 rounded-3xl p-5 border-2 border-amber-200 shadow-xs">
              <h3 className="text-sm font-black text-amber-950 mb-3 flex items-center justify-between">
                <span>Perlengkapan yang Dipakai</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-200/70 px-2 py-0.5 rounded-full">
                  {progress.inventory.length} Barang Milikmu
                </span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between bg-white/90 p-2.5 rounded-xl border border-amber-100">
                  <span className="font-bold text-slate-600">👑 Topi:</span>
                  <span className="font-black text-slate-800">
                    {progress.avatar.equippedHat ? 'Terpasang' : 'Belum Pakai'}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white/90 p-2.5 rounded-xl border border-amber-100">
                  <span className="font-bold text-slate-600">👕 Kostum:</span>
                  <span className="font-black text-slate-800">
                    {progress.avatar.equippedOutfit ? 'Terpasang' : 'Kaos Bintang Math'}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white/90 p-2.5 rounded-xl border border-amber-100">
                  <span className="font-bold text-slate-600">🐱 Teman Hewan:</span>
                  <span className="font-black text-slate-800">
                    {progress.avatar.equippedPet ? 'Menemani Bermain' : 'Belum Ada'}
                  </span>
                </div>

                <div className="flex items-center justify-between bg-white/90 p-2.5 rounded-xl border border-amber-100">
                  <span className="font-bold text-slate-600">✨ Aura Berkilau:</span>
                  <span className="font-black text-slate-800">
                    {progress.avatar.equippedAura ? 'Menyala Indah' : 'Belum Ada'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundManager.playPop();
                  onGoToShop();
                }}
                className="mt-4 w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs shadow-xs transition-transform active:scale-95"
              >
                Ganti atau Beli Aksesoris di Toko 🛍️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
