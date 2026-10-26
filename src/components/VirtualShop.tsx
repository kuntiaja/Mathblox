import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Sparkles, Check, Lock, ArrowLeft, Shirt, Heart, Wand2, Smile, AlertCircle } from 'lucide-react';
import { SHOP_ITEMS } from '../data/shopItems';
import { ShopCategory, ShopItem, UserProgress } from '../types/game';
import { AvatarDisplay } from './AvatarDisplay';
import { MathBuxBadge } from './MathBuxBadge';
import { soundManager } from '../utils/audio';
import { fireMathBuxBurst, fireWinConfetti } from '../utils/confetti';

interface VirtualShopProps {
  progress: UserProgress;
  onBuyItem: (item: ShopItem) => boolean;
  onEquipItem: (category: ShopCategory, itemId: string | null) => void;
  onGoToMap: () => void;
}

export const VirtualShop: React.FC<VirtualShopProps> = ({
  progress,
  onBuyItem,
  onEquipItem,
  onGoToMap,
}) => {
  const [activeCategory, setActiveCategory] = useState<ShopCategory>('hats');
  const [selectedItem, setSelectedItem] = useState<ShopItem>(SHOP_ITEMS[0]);
  const [purchaseModalItem, setPurchaseModalItem] = useState<ShopItem | null>(null);
  const [insufficientFundsItem, setInsufficientFundsItem] = useState<ShopItem | null>(null);

  const categories: { id: ShopCategory; label: string; icon: string }[] = [
    { id: 'hats', label: 'Topi & Kepala', icon: '👑' },
    { id: 'outfits', label: 'Kostum', icon: '👕' },
    { id: 'pets', label: 'Hewan Pet', icon: '🐱' },
    { id: 'auras', label: 'Aura Ajaib', icon: '✨' },
    { id: 'toys', label: 'Mainan Tangan', icon: '🎈' },
  ];

  const filteredItems = SHOP_ITEMS.filter((item) => item.category === activeCategory);

  const isOwned = (itemId: string) => progress.inventory.includes(itemId);

  const isEquipped = (item: ShopItem) => {
    switch (item.category) {
      case 'hats':
        return progress.avatar.equippedHat === item.id;
      case 'outfits':
        return progress.avatar.equippedOutfit === item.id;
      case 'pets':
        return progress.avatar.equippedPet === item.id;
      case 'auras':
        return progress.avatar.equippedAura === item.id;
      case 'toys':
        return progress.avatar.equippedToy === item.id;
      default:
        return false;
    }
  };

  const handleBuy = (item: ShopItem) => {
    if (progress.mathBux < item.price) {
      soundManager.playWrong();
      setInsufficientFundsItem(item);
      soundManager.speak(`Koin MathBux kamu belum cukup. Ayo mainkan kuis matematika untuk dapat koin lagi!`);
      return;
    }

    const success = onBuyItem(item);
    if (success) {
      soundManager.playCashRegister();
      fireMathBuxBurst();
      setPurchaseModalItem(item);
      soundManager.speak(`Hore! Kamu berhasil membeli ${item.name}!`);
    }
  };

  const handleToggleEquip = (item: ShopItem) => {
    soundManager.playPop();
    const currentlyEquipped = isEquipped(item);
    onEquipItem(item.category, currentlyEquipped ? null : item.id);
  };

  // Preview avatar with temporarily selected item
  const previewAvatar = {
    ...progress.avatar,
    equippedHat: selectedItem.category === 'hats' ? selectedItem.id : progress.avatar.equippedHat,
    equippedOutfit: selectedItem.category === 'outfits' ? selectedItem.id : progress.avatar.equippedOutfit,
    equippedPet: selectedItem.category === 'pets' ? selectedItem.id : progress.avatar.equippedPet,
    equippedAura: selectedItem.category === 'auras' ? selectedItem.id : progress.avatar.equippedAura,
    equippedToy: selectedItem.category === 'toys' ? selectedItem.id : progress.avatar.equippedToy,
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-24">
      {/* Shop Header Banner */}
      <div className="bg-gradient-to-b from-emerald-50 via-teal-50/40 to-white pt-6 pb-6 px-4 border-b border-emerald-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playPop();
                onGoToMap();
              }}
              className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              title="Kembali ke Peta Petualangan"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Roblox Style Shop
                </span>
                <span className="text-xs text-emerald-700 font-bold">Toko Virtual TK</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                Toko MathBux Anak Juara 🛍️
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                Gunakan koin MathBux hasil belajar matematikamu untuk membeli perlengkapan keren!
              </p>
            </div>
          </div>

          {/* Current MathBux Balance */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border-2 border-emerald-200 shadow-sm">
            <span className="text-xs font-bold text-slate-500 uppercase">Koin Milikmu:</span>
            <MathBuxBadge amount={progress.mathBux} size="lg" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Live Fitting Room / Avatar Pedestal */}
          <div className="lg:col-span-4 bg-gradient-to-b from-slate-50 to-amber-50/50 rounded-3xl p-6 border-3 border-amber-200 shadow-md flex flex-col items-center sticky top-20 text-center">
            <div className="inline-block bg-white text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full shadow-xs border border-amber-200 mb-4">
              Kamar Pas Avatar 🪞
            </div>

            {/* Avatar Stand */}
            <div className="relative w-48 h-56 flex items-center justify-center my-2">
              {/* Pedestal Shadow */}
              <div className="absolute bottom-2 w-36 h-6 bg-amber-200/80 rounded-full filter blur-[1px]" />
              <AvatarDisplay avatar={previewAvatar} animation="dance" size="lg" />
            </div>

            {/* Selected item preview details */}
            <div className="w-full mt-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-2xl">{selectedItem.icon}</span>
                <span className="font-black text-sm text-slate-900">{selectedItem.name}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mb-3">{selectedItem.description}</p>

              {/* Action for previewed item */}
              {isOwned(selectedItem.id) ? (
                <button
                  onClick={() => handleToggleEquip(selectedItem)}
                  className={`w-full py-2.5 px-4 rounded-xl font-black text-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5 shadow-sm ${
                    isEquipped(selectedItem)
                      ? 'bg-rose-500 hover:bg-rose-600 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  }`}
                >
                  {isEquipped(selectedItem) ? 'Lepas Aksesoris ❌' : 'Pakai Sekarang ✨'}
                </button>
              ) : (
                <button
                  onClick={() => handleBuy(selectedItem)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Beli Seharga {selectedItem.price}</span>
                  <span className="text-xs">💎</span>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Shop Catalog Items */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundManager.playPop();
                    setActiveCategory(cat.id);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-black text-xs whitespace-nowrap transition-all cursor-pointer border-2 shadow-xs ${
                    activeCategory === cat.id
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {filteredItems.map((item) => {
                const owned = isOwned(item.id);
                const equipped = isEquipped(item);
                const isSelected = selectedItem.id === item.id;

                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      soundManager.playPop();
                      setSelectedItem(item);
                    }}
                    className={`bg-white rounded-2xl p-4 border-2 flex flex-col justify-between transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-200 shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Item Rarity Badge & Status */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        item.rarity === 'Legendary'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : item.rarity === 'Epic'
                          ? 'bg-purple-100 text-purple-900 border border-purple-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.rarity}
                      </span>

                      {owned && (
                        <span className="flex items-center gap-0.5 text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                          <Check size={11} /> {equipped ? 'Dipakai' : 'Milikmu'}
                        </span>
                      )}
                    </div>

                    {/* Big Item Emoji / Icon */}
                    <div className="w-16 h-16 mx-auto my-2 rounded-2xl bg-gradient-to-tr from-slate-50 to-amber-50/70 border border-slate-100 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>

                    {/* Name & Description */}
                    <div className="text-center my-1.5">
                      <h3 className="font-black text-sm text-slate-900 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>

                    {/* Price or Equip state */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100">
                      {owned ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleEquip(item);
                          }}
                          className={`w-full py-1.5 rounded-xl font-black text-xs transition-all ${
                            equipped
                              ? 'bg-rose-100 hover:bg-rose-200 text-rose-700'
                              : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                          }`}
                        >
                          {equipped ? 'Lepas' : 'Pakai'}
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuy(item);
                          }}
                          className="w-full py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-xs shadow-xs flex items-center justify-center gap-1 transition-transform active:scale-95"
                        >
                          <span>{item.price}</span>
                          <span className="text-xs">💎</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SUCCESS PURCHASE MODAL */}
      <AnimatePresence>
        {purchaseModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white max-w-sm w-full rounded-3xl p-6 border-4 border-emerald-400 shadow-2xl text-center relative"
            >
              <div className="w-20 h-20 mx-auto -mt-14 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-300 border-4 border-white shadow-xl flex items-center justify-center text-4xl mb-3">
                {purchaseModalItem.icon}
              </div>

              <div className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-1">
                Berhasil Dibeli! 🎉
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-1">
                {purchaseModalItem.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mb-6">
                Aksesoris barumu sudah masuk ke dalam lemari avatar!
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleToggleEquip(purchaseModalItem);
                    setPurchaseModalItem(null);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-sm transition-transform active:scale-95"
                >
                  Langsung Pakai ✨
                </button>
                <button
                  onClick={() => setPurchaseModalItem(null)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Nanti Saja
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INSUFFICIENT FUNDS MODAL */}
      <AnimatePresence>
        {insufficientFundsItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white max-w-sm w-full rounded-3xl p-6 border-4 border-amber-300 shadow-2xl text-center relative"
            >
              <div className="w-16 h-16 mx-auto -mt-12 rounded-2xl bg-amber-100 border-3 border-white shadow-lg flex items-center justify-center text-3xl mb-3">
                🪙
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-1">
                MathBux Belum Cukup!
              </h3>
              <p className="text-xs text-slate-600 font-medium mb-4">
                Kamu membutuhkan <strong>{insufficientFundsItem.price} MathBux</strong> untuk membeli barang ini (kamu punya {progress.mathBux}).
              </p>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 mb-5 text-xs text-amber-900 font-bold">
                💡 Ayo selesaikan level matematika di peta petualangan untuk mengumpulkan banyak MathBux!
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setInsufficientFundsItem(null);
                    onGoToMap();
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-black text-xs shadow-sm transition-transform active:scale-95"
                >
                  Main Matematika 🗺️
                </button>
                <button
                  onClick={() => setInsufficientFundsItem(null)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
