import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2, RotateCcw, Volume2, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  voiceEnabled: boolean;
  onToggleSound: () => void;
  onToggleVoice: () => void;
  onResetProgress: () => void;
}

export const ParentModal: React.FC<ParentModalProps> = ({
  isOpen,
  onClose,
  soundEnabled,
  voiceEnabled,
  onToggleSound,
  onToggleVoice,
  onResetProgress,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinAnswer, setPinAnswer] = useState('');
  const [pinError, setPinError] = useState(false);

  // Simple math challenge for parents/teachers
  const correctAnswer = '5'; // 3 + 2

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinAnswer.trim() === correctAnswer) {
      soundManager.playPop();
      setIsUnlocked(true);
      setPinError(false);
    } else {
      soundManager.playWrong();
      setPinError(true);
    }
  };

  const handleConfirmReset = () => {
    if (window.confirm('Apakah Ayah/Bunda yakin ingin mengulang seluruh progres petualangan dari awal?')) {
      soundManager.playPop();
      onResetProgress();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white max-w-md w-full rounded-3xl p-6 border-4 border-amber-300 shadow-2xl relative">
        <button
          onClick={() => {
            soundManager.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-transform active:scale-90"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl">
            👨‍👩‍👧
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">Area Orang Tua & Guru</h3>
            <p className="text-xs text-slate-500 font-medium">Pengaturan & Informasi Kurikulum TK</p>
          </div>
        </div>

        {!isUnlocked ? (
          <form onSubmit={handleVerify} className="space-y-4 py-2">
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
              <span className="font-bold">Kunci Keamanan Dewasa:</span>
              <p className="mt-1">Berapakah hasil dari <strong>3 + 2</strong>?</p>
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Jawaban..."
                value={pinAnswer}
                onChange={(e) => {
                  setPinAnswer(e.target.value);
                  setPinError(false);
                }}
                className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 font-black text-xs text-amber-950 rounded-xl transition-transform active:scale-95"
              >
                Buka
              </button>
            </div>

            {pinError && (
              <p className="text-xs text-rose-500 font-bold">Jawaban belum tepat, silakan coba lagi.</p>
            )}
          </form>
        ) : (
          <div className="space-y-4 py-2">
            {/* Curriculum Info */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                <BookOpen size={14} className="text-emerald-600" />
                <span>Materi Pembelajaran Anak TK:</span>
              </div>
              <ul className="text-[11px] text-slate-600 font-medium list-disc list-inside space-y-0.5">
                <li>Mengenal angka & korespondensi 1-ke-1 (1 - 10)</li>
                <li>Penjumlahan konkret bergambar (1 - 10)</li>
                <li>Pengurangan intuitif dengan analogi makanan dimakan</li>
                <li>Perbandingan kuantitas (lebih banyak / lebih sedikit)</li>
                <li>Mengenal bentuk geometri dasar (lingkaran, segitiga, kotak)</li>
              </ul>
            </div>

            {/* Audio Settings */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center justify-between p-2.5 rounded-xl border border-slate-200">
                <span>Efek Suara Pop & Chime</span>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={onToggleSound}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
              </label>

              <label className="text-xs font-bold text-slate-700 flex items-center justify-between p-2.5 rounded-xl border border-slate-200">
                <span>Suara Narator Anak Indonesia</span>
                <input
                  type="checkbox"
                  checked={voiceEnabled}
                  onChange={onToggleVoice}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
              </label>
            </div>

            {/* Reset Progress */}
            <button
              onClick={handleConfirmReset}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors"
            >
              <RotateCcw size={14} />
              <span>Reset Seluruh Progres Belajar</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
