"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

const CRITERIA = [
  { key: "ambiance", label: "Ambiance", emoji: "🎵" },
  { key: "service", label: "Service", emoji: "👤" },
  { key: "drinks", label: "Boissons", emoji: "🍸" },
  { key: "food", label: "Nourriture", emoji: "🍗" },
  { key: "value", label: "Rapport qualité/prix", emoji: "💰" },
];

const EXISTING_REVIEWS = [
  { name: "Marie E.", rating: 5, comment: "Ambiance incroyable ! Le DJ était au top. Je reviendrai.", date: "Il y a 2 jours", avatar: "ME" },
  { name: "Marc N.", rating: 4, comment: "Très bon service, cocktails excellents. Un peu bruyant.", date: "Il y a 5 jours", avatar: "MN" },
  { name: "Léa O.", rating: 5, comment: "La meilleure soirée de Libreville. Staff adorable.", date: "Il y a 1 sem.", avatar: "LO" },
  { name: "Paul M.", rating: 3, comment: "Bien mais un peu cher pour ce que c'est.", date: "Il y a 2 sem.", avatar: "PM" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function AvisPage() {
  const toast = useToast((s) => s.add);
  const router = useRouter();
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function setRating(key: string, value: number) {
    setRatings((prev) => ({ ...prev, [key]: value }));
  }

  const avgRating = Object.values(ratings).length > 0
    ? (Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length).toFixed(1)
    : "0";

  function handleSubmit() {
    setSubmitted(true);
    toast("Merci pour votre avis !", "gold", "⭐");
  }

  if (submitted) {
    return (
      <motion.div
        className="no-scrollbar flex flex-col items-center justify-center min-h-[70vh] px-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 0.6 }}
        >
          🌟
        </motion.div>
        <h2 className="font-display text-[28px] tracking-[0.15em] text-gold">MERCI !</h2>
        <p className="text-[12px] text-cream mt-2">Votre avis a été publié</p>
        <p className="text-[10px] text-muted mt-1">+50 points fidélité crédités</p>
        <button
          onClick={() => router.push("/accueil")}
          className="mt-6 px-8 py-3 rounded-xl bg-gold/15 border border-gold/25 text-[11px] text-gold tracking-wider font-medium btn-press"
        >
          RETOUR À L'ACCUEIL
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[24px] tracking-[0.15em] text-cream">Donner un Avis</h1>
        <p className="text-[9px] text-muted mt-0.5">Luxury Lounge · Ce soir</p>
      </motion.div>

      {/* Overall score */}
      <motion.div variants={fadeUp} className="px-5 mt-3 mb-4">
        <div className="card-gold p-4 text-center">
          <p className="font-display text-5xl text-gold">{avgRating}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className={`text-lg ${parseFloat(avgRating) >= s ? "" : "opacity-20"}`}>⭐</span>
            ))}
          </div>
          <p className="text-[9px] text-muted mt-1">{Object.values(ratings).length}/{CRITERIA.length} critères notés</p>
        </div>
      </motion.div>

      {/* Criteria */}
      <div className="px-5 space-y-2 mb-4">
        {CRITERIA.map((c) => (
          <motion.div key={c.key} variants={fadeUp} className="card p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">{c.emoji}</span>
                <span className="text-[11px] text-cream font-medium">{c.label}</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(c.key, star)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center btn-press transition-transform"
                  >
                    <span className={`text-base ${(ratings[c.key] || 0) >= star ? "" : "opacity-15"}`}>
                      ⭐
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comment */}
      <motion.div variants={fadeUp} className="px-5 mb-4">
        <p className="text-[11px] font-semibold text-cream mb-2">💬 Commentaire (optionnel)</p>
        <textarea
          className="input-dark w-full px-3 py-3 text-[11px] text-cream min-h-[80px] resize-none"
          placeholder="Partagez votre expérience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </motion.div>

      {/* Submit */}
      <motion.div variants={fadeUp} className="px-5 mb-6">
        <button
          onClick={handleSubmit}
          disabled={Object.values(ratings).length === 0}
          className={`w-full py-3.5 rounded-xl text-[11px] tracking-wider font-bold btn-press ${
            Object.values(ratings).length > 0
              ? "bg-gradient-to-r from-gold to-gold-light text-night-black"
              : "bg-dark-3 text-muted"
          }`}
        >
          ⭐ PUBLIER MON AVIS · +50 pts
        </button>
      </motion.div>

      {/* Existing reviews */}
      <motion.div variants={fadeUp} className="px-5">
        <p className="text-[11px] font-semibold text-cream mb-2.5">📝 Avis récents</p>
        <div className="space-y-2">
          {EXISTING_REVIEWS.map((r, i) => (
            <div key={i} className="card p-3.5">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center">
                  <span className="text-[8px] text-gold font-bold">{r.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-medium text-cream">{r.name}</p>
                  <p className="text-[8px] text-muted">{r.date}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <span key={j} className="text-[10px]">⭐</span>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-muted/80 leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
