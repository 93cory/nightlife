"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wine, UtensilsCrossed, Music, Smartphone, ArrowRight } from "lucide-react";

const slides = [
  {
    icon: Wine,
    emoji: "🍸",
    title: "Gérez votre bar",
    description: "Caisse ultra-rapide, stock en temps réel, happy hours automatiques",
    gradient: "from-gold/20 to-amber-900/20",
  },
  {
    icon: UtensilsCrossed,
    emoji: "🍽️",
    title: "Gérez votre restaurant",
    description: "Menu digital, tickets cuisine KDS, Click & Collect et livraison",
    gradient: "from-red-800/20 to-orange-900/20",
  },
  {
    icon: Music,
    emoji: "🎵",
    title: "Gérez votre club",
    description: "Billetterie, carrés VIP, DJ planning, sécurité et scanner QR",
    gradient: "from-purple-800/20 to-pink-900/20",
  },
  {
    icon: Smartphone,
    emoji: "📱",
    title: "Tout sur mobile",
    description: "PWA installable, fonctionne hors-ligne, paiement Airtel Money & Moov Money",
    gradient: "from-info/20 to-blue-900/20",
  },
];

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);

  function next() {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      onComplete();
    }
  }

  const slide = slides[current];

  return (
    <div className="fixed inset-0 z-[90] bg-background flex flex-col items-center justify-center p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="text-center max-w-sm"
        >
          <div className={`w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br ${slide.gradient} flex items-center justify-center mb-8`}>
            <span className="text-6xl">{slide.emoji}</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">{slide.title}</h2>
          <p className="text-text-muted text-sm leading-relaxed">{slide.description}</p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex gap-2 mt-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-gold w-6" : "bg-surface-lighter"
            }`}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-8 w-full max-w-sm flex gap-3">
        {current < slides.length - 1 ? (
          <>
            <button
              onClick={onComplete}
              className="flex-1 py-3 text-sm text-text-dim hover:text-text-muted transition-colors"
            >
              Passer
            </button>
            <button
              onClick={next}
              className="flex-1 py-3 bg-gradient-gold text-black font-semibold rounded-xl flex items-center justify-center gap-1"
            >
              Suivant <ArrowRight size={16} />
            </button>
          </>
        ) : (
          <button
            onClick={onComplete}
            className="w-full py-3.5 bg-gradient-gold text-black font-semibold rounded-xl text-lg"
          >
            Commencer
          </button>
        )}
      </div>
    </div>
  );
}
