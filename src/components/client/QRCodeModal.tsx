"use client";

import { motion, AnimatePresence } from "framer-motion";

interface QRCodeModalProps {
  open: boolean;
  onClose: () => void;
  name: string;
  memberId: string;
}

// Simple decorative QR-like SVG pattern (not a real QR - for presentation purposes)
function QRPattern() {
  const size = 180;
  const cellSize = 6;
  const cols = Math.floor(size / cellSize);
  // Deterministic pattern that looks like a QR code
  const pattern = [
    // Finder patterns (top-left, top-right, bottom-left)
    ...finderPattern(0, 0),
    ...finderPattern(cols - 7, 0),
    ...finderPattern(0, cols - 7),
    // Random-looking data cells
    ...dataPattern(cols),
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" rx={8} />
      {pattern.map((cell, i) => (
        <rect
          key={i}
          x={cell.x * cellSize + 3}
          y={cell.y * cellSize + 3}
          width={cellSize - 1}
          height={cellSize - 1}
          fill="#0a0a0a"
          rx={1}
        />
      ))}
      {/* Center logo */}
      <rect x={size/2 - 18} y={size/2 - 18} width={36} height={36} fill="white" rx={4} />
      <rect x={size/2 - 14} y={size/2 - 14} width={28} height={28} fill="#d4af37" rx={3} />
      <text x={size/2} y={size/2 + 5} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="monospace">NL</text>
    </svg>
  );
}

function finderPattern(ox: number, oy: number) {
  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {
      const isOuter = x === 0 || x === 6 || y === 0 || y === 6;
      const isInner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
      if (isOuter || isInner) {
        cells.push({ x: ox + x, y: oy + y });
      }
    }
  }
  return cells;
}

function dataPattern(cols: number) {
  const cells: { x: number; y: number }[] = [];
  // Seeded pseudo-random for consistent look
  let seed = 42;
  const rng = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < cols; x++) {
      // Skip finder pattern areas
      if (x < 8 && y < 8) continue;
      if (x >= cols - 8 && y < 8) continue;
      if (x < 8 && y >= cols - 8) continue;
      // Skip center area (for logo)
      if (x >= cols/2 - 4 && x <= cols/2 + 3 && y >= cols/2 - 4 && y <= cols/2 + 3) continue;

      if (rng() > 0.55) {
        cells.push({ x, y });
      }
    }
  }
  return cells;
}

export default function QRCodeModal({ open, onClose, name, memberId }: QRCodeModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" onClick={onClose}>
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div
              className="w-full max-w-[280px] bg-dark-1 rounded-3xl p-6 text-center border border-white/[0.06]"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[8px] text-gold/50 tracking-[0.3em] uppercase mb-4">NIGHTLIFE · CARTE MEMBRE</p>

              {/* QR */}
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white rounded-2xl shadow-lg">
                  <QRPattern />
                </div>
              </div>

              {/* Info */}
              <p className="font-serif text-lg font-semibold text-cream">{name}</p>
              <p className="text-[9px] text-muted mt-0.5">ID: {memberId}</p>

              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="text-center">
                  <p className="font-display text-base text-gold">2 840</p>
                  <p className="text-[7px] text-muted">points</p>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div className="text-center">
                  <p className="font-display text-base text-success">Silver</p>
                  <p className="text-[7px] text-muted">niveau</p>
                </div>
              </div>

              <p className="text-[8px] text-muted/50 mt-4">Présentez ce QR code au comptoir pour cumuler vos points</p>

              <button
                onClick={onClose}
                className="mt-4 w-full py-3 rounded-xl border border-white/[0.06] text-[10px] text-muted tracking-wider btn-press"
              >
                FERMER
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
