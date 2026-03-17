"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { formatPrice } from "@/lib/utils/format";
import { TIER_BENEFITS, TIER_ORDER, TIER_THRESHOLDS, TIER_EMOJIS } from "@/lib/utils/constants";
import type { LoyaltyTier } from "@/lib/types";

const HISTORY = [
  { id: "1", description: "Luxury Lounge · Table 7", points: 120, type: "earn" as const, date: "14 mars · 22h30", emoji: "🍸" },
  { id: "2", description: "Récompense: Cocktail offert", points: -500, type: "redeem" as const, date: "12 mars · 21h00", emoji: "🎁" },
  { id: "3", description: "AfroVibes Night · Ticket", points: 50, type: "earn" as const, date: "08 mars · Réservation", emoji: "🎵" },
  { id: "4", description: "Le Privilege · Table 3", points: 85, type: "earn" as const, date: "02 mars · 21h15", emoji: "🥃" },
  { id: "5", description: "DJ Mix Master · VIP", points: 200, type: "earn" as const, date: "25 fév · 23h00", emoji: "🎧" },
  { id: "6", description: "Duplex Club · Table 12", points: 340, type: "earn" as const, date: "20 fév · 22h45", emoji: "🍾" },
  { id: "7", description: "Parrainage: Marc O.", points: 150, type: "earn" as const, date: "15 fév · Bonus", emoji: "👥" },
];

const REWARDS = [
  { name: "Cocktail offert", points: 500, emoji: "🍸" },
  { name: "Entrée gratuite", points: 1000, emoji: "🎟️" },
  { name: "Bouteille -50%", points: 2000, emoji: "🍾" },
  { name: "Table VIP", points: 3000, emoji: "👑" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function FidelitePage() {
  const points = 2840;
  const tier: LoyaltyTier = "silver";
  const currentTierIdx = TIER_ORDER.indexOf(tier);
  const nextTier = currentTierIdx < TIER_ORDER.length - 1 ? TIER_ORDER[currentTierIdx + 1] : null;
  const nextThreshold = nextTier ? TIER_THRESHOLDS[nextTier] : null;
  const pointsToNext = nextThreshold ? nextThreshold - points : 0;
  const progressPct = nextThreshold
    ? ((points - TIER_THRESHOLDS[tier]) / (nextThreshold - TIER_THRESHOLDS[tier])) * 100
    : 100;

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[24px] tracking-[0.15em] text-cream">Fidélité</h1>
        <p className="text-[9px] text-muted mt-0.5">Votre programme de récompenses</p>
      </motion.div>

      {/* Loyalty Card */}
      <motion.div variants={fadeUp} className="px-5 mt-3">
        <div className="relative overflow-hidden rounded-[22px] p-6 bg-gradient-to-br from-[#1A1200] via-[#2A2000] to-gold/[0.06] border border-gold/25">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(201,168,76,0.1)_0%,transparent_60%)]" />
          <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-[radial-gradient(circle,rgba(201,168,76,0.05)_0%,transparent_60%)]" />

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-[8px] tracking-[0.35em] text-gold/50 uppercase">NightLife · Carte Membre</p>
              <span className="bg-gold text-night-black text-[8px] font-bold px-2.5 py-1 rounded-full tracking-[0.15em]">
                {TIER_EMOJIS[tier]} {TIER_BENEFITS[tier].label.toUpperCase()}
              </span>
            </div>

            <p className="font-display text-[48px] text-gold leading-none mt-3 tracking-wider">
              <AnimatedCounter value={points} />
            </p>
            <p className="text-[10px] text-gold/50 mt-0.5">points accumulés</p>

            {nextTier && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] text-gold/40">{TIER_BENEFITS[tier].label}</span>
                  <span className="text-[9px] text-gold">{TIER_BENEFITS[nextTier].label}</span>
                </div>
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progressPct, 100)}%` }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
                <p className="text-[8px] text-gold/40 mt-1 text-right">Encore {pointsToNext} pts</p>
              </div>
            )}

            <p className="mt-4 text-[12px] tracking-[0.12em] text-white/25 uppercase">Jean-Pierre Obiang</p>
          </div>
        </div>
      </motion.div>

      {/* Rewards */}
      <motion.div variants={fadeUp} className="px-5 mt-5">
        <p className="text-[11px] font-semibold text-cream mb-2.5">🎁 Récompenses disponibles</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {REWARDS.map((r) => {
            const canRedeem = points >= r.points;
            return (
              <button
                key={r.name}
                className={`min-w-[120px] card p-3 text-center shrink-0 btn-press ${
                  canRedeem ? "border-gold/20 bg-gold/[0.04]" : "opacity-50"
                }`}
              >
                <span className="text-2xl">{r.emoji}</span>
                <p className="text-[9px] text-cream mt-1.5 font-medium">{r.name}</p>
                <p className={`text-[9px] font-display tracking-wider mt-0.5 ${canRedeem ? "text-gold" : "text-muted"}`}>
                  {formatPrice(r.points)} pts
                </p>
                {canRedeem && (
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full bg-gold/15 text-[7px] text-gold tracking-wider">
                    DISPONIBLE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Tier Levels */}
      <motion.div variants={fadeUp} className="px-5 mt-5">
        <p className="text-[11px] font-semibold text-cream mb-2.5">🏆 Niveaux</p>
        <div className="space-y-1.5">
          {TIER_ORDER.map((t) => {
            const isActive = t === tier;
            const isAchieved = TIER_ORDER.indexOf(t) <= currentTierIdx;
            return (
              <div
                key={t}
                className={`rounded-xl p-3 flex items-center gap-3 border transition-all ${
                  isActive
                    ? "card-gold glow-gold"
                    : "card"
                } ${!isAchieved && !isActive ? "opacity-40" : ""}`}
              >
                <span className="text-xl">{TIER_EMOJIS[t]}</span>
                <div className="flex-1">
                  <p className={`text-[10px] font-semibold ${isActive ? "text-gold" : isAchieved ? "text-cream" : "text-muted"}`}>
                    {TIER_BENEFITS[t].label}
                    <span className="text-muted font-normal"> · {formatPrice(TIER_THRESHOLDS[t])} pts</span>
                  </p>
                  <p className="text-[8px] text-muted mt-0.5">{TIER_BENEFITS[t].perks}</p>
                </div>
                {isAchieved && t !== tier && <span className="text-success text-xs">✓</span>}
                {isActive && <span className="text-[8px] text-gold bg-gold/15 px-2 py-0.5 rounded-full">Actuel</span>}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* History */}
      <motion.div variants={fadeUp} className="px-5 mt-5">
        <p className="text-[11px] font-semibold text-cream mb-2.5">📋 Historique</p>
        <div className="space-y-0">
          {HISTORY.map((entry) => (
            <div
              key={entry.id}
              className="border-b border-white/[0.04] py-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-dark-3 flex items-center justify-center text-sm">
                {entry.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-cream font-medium truncate">{entry.description}</p>
                <p className="text-[8px] text-muted mt-0.5">{entry.date}</p>
              </div>
              <p className={`font-display text-sm ${entry.type === "earn" ? "text-success" : "text-accent"}`}>
                {entry.type === "earn" ? "+" : ""}{entry.points} pts
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
