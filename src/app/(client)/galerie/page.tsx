"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PHOTOS = [
  { id: "1", emoji: "🍸", label: "Le bar", desc: "Comptoir principal", color: "from-gold/20 to-gold/5" },
  { id: "2", emoji: "🎵", label: "La scène", desc: "Espace DJ & live", color: "from-purple/20 to-purple/5" },
  { id: "3", emoji: "🛋️", label: "Espace VIP", desc: "Carré privé", color: "from-accent/20 to-accent/5" },
  { id: "4", emoji: "🌴", label: "Terrasse", desc: "Vue nocturne", color: "from-info/20 to-info/5" },
  { id: "5", emoji: "🍽️", label: "Restaurant", desc: "Espace repas", color: "from-success/20 to-success/5" },
  { id: "6", emoji: "💃", label: "Piste de danse", desc: "Dancefloor", color: "from-purple/15 to-info/10" },
  { id: "7", emoji: "🍾", label: "Cave", desc: "Sélection premium", color: "from-gold/15 to-gold/5" },
  { id: "8", emoji: "🌙", label: "Entrée", desc: "Façade de nuit", color: "from-accent/15 to-accent/5" },
  { id: "9", emoji: "🎤", label: "Karaoke", desc: "Salle privée", color: "from-info/15 to-info/5" },
];

const CATEGORIES = ["Tout", "Ambiance", "Espace VIP", "Food & Drinks"];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const fadeUp = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function GaleriePage() {
  const [selected, setSelected] = useState<typeof PHOTOS[0] | null>(null);
  const [filter, setFilter] = useState("Tout");

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[24px] tracking-[0.15em] text-cream">Galerie</h1>
        <p className="text-[9px] text-muted mt-0.5">Luxury Lounge · {PHOTOS.length} photos</p>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} className="flex gap-1.5 overflow-x-auto no-scrollbar px-5 mt-3 mb-4">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`px-3 py-1.5 rounded-xl text-[9px] tracking-wider whitespace-nowrap btn-press ${
              filter === c
                ? "bg-gold/15 border border-gold/25 text-gold font-medium"
                : "bg-dark-3 border border-white/[0.04] text-muted"
            }`}
          >
            {c}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="px-5 grid grid-cols-3 gap-2">
        {PHOTOS.map((photo, i) => (
          <motion.button
            key={photo.id}
            variants={fadeUp}
            onClick={() => setSelected(photo)}
            className={`aspect-square rounded-2xl bg-gradient-to-br ${photo.color} border border-white/[0.04] flex flex-col items-center justify-center gap-1 btn-press relative overflow-hidden`}
          >
            <span className="text-3xl">{photo.emoji}</span>
            <p className="text-[8px] text-cream font-medium">{photo.label}</p>
          </motion.button>
        ))}
      </div>

      {/* Info */}
      <motion.div variants={fadeUp} className="px-5 mt-4">
        <div className="card p-4 text-center">
          <p className="text-[11px] text-cream font-medium">📸 Partagez vos photos</p>
          <p className="text-[9px] text-muted mt-1">Taguez @NightLifeGabon sur Instagram</p>
          <div className="flex justify-center gap-3 mt-3">
            {["📷 Instagram", "📱 TikTok", "🐦 Twitter"].map((social) => (
              <span key={social} className="text-[8px] text-muted bg-dark-3 px-2.5 py-1 rounded-full">
                {social}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[70]" onClick={() => setSelected(null)}>
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center px-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="text-center" onClick={(e) => e.stopPropagation()}>
                <div className={`w-64 h-64 mx-auto rounded-3xl bg-gradient-to-br ${selected.color} border border-white/[0.06] flex items-center justify-center mb-4`}>
                  <span className="text-8xl">{selected.emoji}</span>
                </div>
                <p className="font-display text-xl text-cream tracking-wider">{selected.label}</p>
                <p className="text-[10px] text-muted mt-1">{selected.desc} · Luxury Lounge</p>
                <button
                  onClick={() => setSelected(null)}
                  className="mt-4 px-6 py-2.5 rounded-xl border border-white/[0.06] text-[10px] text-muted tracking-wider btn-press"
                >
                  FERMER
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
