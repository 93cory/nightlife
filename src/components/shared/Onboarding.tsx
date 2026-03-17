"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  {
    emoji: "🍸",
    title: "Commandez depuis\nvotre table",
    desc: "Parcourez le menu, ajoutez au panier et commandez en un tap. Fini les attentes au bar.",
    gradient: "from-gold/10 via-gold/[0.03] to-transparent",
    accentColor: "text-gold",
  },
  {
    emoji: "📊",
    title: "Suivi en\ntemps réel",
    desc: "Suivez votre commande étape par étape. Notification quand c'est prêt. Tout est transparent.",
    gradient: "from-info/10 via-info/[0.03] to-transparent",
    accentColor: "text-info",
  },
  {
    emoji: "⭐",
    title: "Cumulez des\npoints fidélité",
    desc: "Chaque commande vous rapporte des points. Débloquez des récompenses exclusives et montez de niveau.",
    gradient: "from-accent/10 via-accent/[0.03] to-transparent",
    accentColor: "text-accent",
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];
  const isLast = current === SLIDES.length - 1;

  return (
    <div className="fixed inset-0 z-[150] bg-night-black flex flex-col">
      {/* Skip */}
      <div className="flex justify-end px-6 pt-6">
        <button
          onClick={onComplete}
          className="text-[10px] text-muted tracking-wider btn-press"
        >
          PASSER →
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center w-full max-w-sm"
          >
            {/* Glow + Emoji */}
            <div className="relative mx-auto w-40 h-40 mb-8">
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} rounded-full blur-2xl`} />
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.span
                  className="text-7xl"
                  initial={{ scale: 0.5, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                >
                  {slide.emoji}
                </motion.span>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-display text-[32px] tracking-[0.1em] text-cream leading-tight whitespace-pre-line">
              {slide.title}
            </h2>

            {/* Description */}
            <p className="text-[12px] text-muted leading-relaxed mt-4 max-w-[260px] mx-auto">
              {slide.desc}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom */}
      <div className="px-8 pb-10">
        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "bg-gold w-6" : "bg-white/10 w-1.5"
              }`}
              layout
            />
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => {
            if (isLast) {
              onComplete();
            } else {
              setCurrent(current + 1);
            }
          }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold to-gold-light text-night-black text-[13px] font-bold tracking-[0.15em] btn-press"
        >
          {isLast ? "COMMENCER" : "SUIVANT"}
        </button>
      </div>
    </div>
  );
}
