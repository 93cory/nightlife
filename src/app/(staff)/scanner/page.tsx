"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/Toast";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

interface ScanResult {
  name: string;
  memberId: string;
  tier: string;
  points: number;
  visits: number;
}

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [pointsToAdd, setPointsToAdd] = useState(0);
  const toast = useToast((s) => s.add);

  function handleScan() {
    setScanning(true);
    // Simulate scan
    setTimeout(() => {
      setScanning(false);
      setResult({
        name: "Jean-Pierre O.",
        memberId: "NL-GA-2026-0847",
        tier: "Silver",
        points: 2840,
        visits: 12,
      });
    }, 2000);
  }

  function handleAddPoints() {
    if (pointsToAdd <= 0) return;
    toast(`+${pointsToAdd} points ajoutés à ${result?.name}`, "gold", "⭐");
    setResult((prev) => prev ? { ...prev, points: prev.points + pointsToAdd } : null);
    setPointsToAdd(0);
  }

  function handleReset() {
    setResult(null);
    setPointsToAdd(0);
  }

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[22px] tracking-[0.15em] text-cream">Scanner QR</h1>
        <p className="text-[9px] text-muted mt-0.5">Identifier un client fidélité</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="scanner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-5 mt-4"
          >
            {/* Scanner viewport */}
            <div className="relative aspect-square max-w-[280px] mx-auto rounded-3xl bg-dark-2 border border-white/[0.06] overflow-hidden mb-6">
              {/* Camera simulation */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-3/50 to-dark-2/50" />

              {/* Scanner frame */}
              <div className="absolute inset-8">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-lg" />
              </div>

              {/* Scan line */}
              {scanning && (
                <motion.div
                  className="absolute left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                  animate={{ top: ["15%", "85%", "15%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              )}

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {scanning ? (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <span className="text-4xl">📱</span>
                  </motion.div>
                ) : (
                  <div className="text-center">
                    <span className="text-5xl opacity-30">📷</span>
                    <p className="text-[10px] text-muted mt-2">Pointez vers un QR code</p>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleScan}
              disabled={scanning}
              className={`w-full py-4 rounded-xl text-[12px] tracking-wider font-bold btn-press ${
                scanning
                  ? "bg-gold/10 text-gold/50"
                  : "bg-gradient-to-r from-gold to-gold-light text-night-black"
              }`}
            >
              {scanning ? "SCAN EN COURS..." : "📱 SCANNER UN QR CODE"}
            </button>

            <p className="text-center text-[9px] text-muted mt-3">
              Demandez au client d'afficher son QR code depuis l'app
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="px-5 mt-4"
          >
            {/* Client card */}
            <div className="card-gold p-5 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/25 flex items-center justify-center">
                  <span className="font-display text-xl text-gold">{result.name[0]}</span>
                </div>
                <div>
                  <p className="font-serif text-lg font-semibold text-cream">{result.name}</p>
                  <p className="text-[9px] text-muted">ID: {result.memberId}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-gold text-night-black text-[8px] font-bold px-2 py-0.5 rounded-full">
                      ⭐ {result.tier.toUpperCase()}
                    </span>
                    <span className="text-[8px] text-muted">{result.visits} visites</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-dark-3/50 rounded-xl p-3 text-center">
                  <p className="font-display text-2xl text-gold">{result.points.toLocaleString()}</p>
                  <p className="text-[8px] text-muted">Points actuels</p>
                </div>
                <div className="bg-dark-3/50 rounded-xl p-3 text-center">
                  <p className="font-display text-2xl text-success">{result.tier}</p>
                  <p className="text-[8px] text-muted">Niveau</p>
                </div>
              </div>
            </div>

            {/* Add points */}
            <div className="card p-4 mb-4">
              <p className="text-[11px] font-semibold text-cream mb-3">⭐ Ajouter des points</p>
              <div className="flex gap-2 mb-3">
                {[50, 100, 200, 500].map((pts) => (
                  <button
                    key={pts}
                    onClick={() => setPointsToAdd(pts)}
                    className={`flex-1 py-2.5 rounded-xl text-[10px] font-display tracking-wider btn-press ${
                      pointsToAdd === pts
                        ? "card-gold text-gold font-medium"
                        : "bg-dark-3 text-muted"
                    }`}
                  >
                    +{pts}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddPoints}
                disabled={pointsToAdd <= 0}
                className={`w-full py-3 rounded-xl text-[11px] tracking-wider font-bold btn-press ${
                  pointsToAdd > 0
                    ? "bg-gradient-to-r from-gold to-gold-light text-night-black"
                    : "bg-dark-3 text-muted"
                }`}
              >
                {pointsToAdd > 0 ? `VALIDER +${pointsToAdd} POINTS` : "SÉLECTIONNEZ UN MONTANT"}
              </button>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl border border-white/[0.06] text-[10px] text-muted tracking-wider btn-press"
            >
              ← SCANNER UN AUTRE CLIENT
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
