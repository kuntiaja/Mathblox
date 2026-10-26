import confetti from 'canvas-confetti';

export function fireWinConfetti() {
  // Center blast
  confetti({
    particleCount: 70,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#22c55e', '#eab308', '#3b82f6', '#ec4899', '#a855f7'],
    shapes: ['star', 'circle'],
    scalar: 1.2
  });

  // Left & right cannons
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#f59e0b', '#10b981', '#6366f1']
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#ec4899', '#3b82f6', '#eab308']
    });
  }, 200);
}

export function fireMathBuxBurst() {
  confetti({
    particleCount: 40,
    spread: 80,
    origin: { y: 0.3 },
    colors: ['#eab308', '#facc15', '#10b981'],
    scalar: 1.4
  });
}
