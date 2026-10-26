import React, { useRef, useState, useEffect } from 'react';
import { Eraser, RotateCcw, X, Palette } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface MathWhiteboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MathWhiteboard: React.FC<MathWhiteboardProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#2563eb');
  const [brushSize, setBrushSize] = useState(6);
  const [isEraser, setIsEraser] = useState(false);

  const colors = [
    { label: 'Biru', value: '#2563eb' },
    { label: 'Merah', value: '#ef4444' },
    { label: 'Hijau', value: '#10b981' },
    { label: 'Kuning', value: '#f59e0b' },
    { label: 'Ungu', value: '#8b5cf6' },
    { label: 'Hitam', value: '#1e293b' },
  ];

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions based on container
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      // Fill white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);
    }
  }, [isOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    soundManager.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.strokeStyle = isEraser ? '#ffffff' : currentColor;
    ctx.lineWidth = isEraser ? brushSize * 3 : brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    soundManager.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border-4 border-amber-300 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-yellow-400 px-5 py-3.5 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🖍️</span>
            <div>
              <h3 className="font-bold text-lg leading-tight text-amber-950">Papan Coretan Jari</h3>
              <p className="text-xs text-amber-900 font-medium">Bantu berhitung dengan menggambar lidi atau lingkaran!</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/30 hover:bg-white/50 text-amber-950 flex items-center justify-center font-bold transition-transform active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-amber-50/70 border-b border-amber-200/80 px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          {/* Colors */}
          <div className="flex items-center gap-1.5">
            <Palette size={16} className="text-amber-700 mr-1 hidden sm:inline" />
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  soundManager.playPop();
                  setIsEraser(false);
                  setCurrentColor(c.value);
                }}
                className={`w-7 h-7 rounded-full transition-transform active:scale-95 flex items-center justify-center border-2 ${
                  !isEraser && currentColor === c.value ? 'scale-120 border-slate-800 shadow-md ring-2 ring-amber-300' : 'border-white'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.label}
              />
            ))}
          </div>

          {/* Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playPop();
                setIsEraser(!isEraser);
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isEraser
                  ? 'bg-rose-500 text-white shadow-sm ring-2 ring-rose-300'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Eraser size={14} />
              Penghapus
            </button>
            <button
              onClick={clearCanvas}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 transition-colors"
            >
              <RotateCcw size={14} />
              Bersihkan
            </button>
          </div>
        </div>

        {/* Whiteboard Canvas */}
        <div className="w-full h-72 sm:h-80 bg-white relative touch-none cursor-crosshair">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* Footer tip */}
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>💡 Tip: Buat garis lidi 1, 2, 3 untuk memudahkan penjumlahan!</span>
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 font-bold text-amber-950 text-xs shadow-sm transition-transform active:scale-95"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
