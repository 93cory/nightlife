"use client";

import { Star, Gift, Trophy, ArrowRight, QrCode, Clock } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";

const tiers = [
  { name: "Bronze", min: 0, color: "text-amber-700", bg: "bg-amber-700/20", icon: "🥉" },
  { name: "Silver", min: 500, color: "text-gray-400", bg: "bg-gray-400/20", icon: "🥈" },
  { name: "Gold", min: 1500, color: "text-gold", bg: "bg-gold/20", icon: "🥇" },
  { name: "VIP", min: 3000, color: "text-purple-400", bg: "bg-purple-400/20", icon: "👑" },
];

const rewards = [
  { id: 1, name: "Cocktail gratuit", points: 500, emoji: "🍹", available: true },
  { id: 2, name: "-20% sur l'addition", points: 800, emoji: "💰", available: true },
  { id: 3, name: "Entrée VIP club", points: 1200, emoji: "🎫", available: true },
  { id: 4, name: "Bouteille offerte", points: 2500, emoji: "🍾", available: false },
  { id: 5, name: "Soirée privée 10 pers.", points: 5000, emoji: "🎉", available: false },
];

const history = [
  { desc: "Commande #CMD-041 — Le Privilège", points: 95, type: "earn" as const, date: "22 mars" },
  { desc: "Commande #CMD-035 — Chez Mama Rose", points: 70, type: "earn" as const, date: "18 mars" },
  { desc: "Cocktail gratuit échangé", points: -500, type: "redeem" as const, date: "15 mars" },
  { desc: "Commande #CMD-028 — Le Privilège", points: 60, type: "earn" as const, date: "15 mars" },
  { desc: "Bonus inscription", points: 200, type: "earn" as const, date: "1 mars" },
];

export default function FidelitePage() {
  const user = useAuthStore((s) => s.user);
  const points = user?.loyalty_points ?? 2450;
  const tier = user?.loyalty_tier ?? "gold";
  const currentTier = tiers.find((t) => t.name.toLowerCase() === tier) || tiers[2];
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Programme fidélité</h1>

      {/* Card */}
      <div className="relative rounded-2xl p-6 bg-gradient-to-br from-gold/20 via-amber-900/20 to-bordeaux/20 border border-gold/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-[80px]" />
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-gold tracking-wider">NIGHTLIFE MEMBER</span>
              <p className="text-sm text-text-muted mt-0.5">{user?.full_name || "Client"}</p>
            </div>
            <span className="text-3xl">{currentTier.icon}</span>
          </div>
          <p className="text-4xl font-black text-gold">{points.toLocaleString("fr-FR")}</p>
          <p className="text-xs text-text-muted">points disponibles</p>

          {nextTier && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={currentTier.color}>{currentTier.name}</span>
                <span className={nextTier.color}>{nextTier.name}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${Math.min(100, (points / nextTier.min) * 100)}%` }} />
              </div>
              <p className="text-[10px] text-text-dim mt-1">{Math.max(0, nextTier.min - points)} points pour atteindre {nextTier.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* QR Card */}
      <div className="glass rounded-xl p-4 flex items-center gap-4">
        <div className="p-3 bg-white rounded-xl">
          <QrCode size={48} className="text-black" />
        </div>
        <div>
          <p className="font-semibold text-sm">Votre carte membre</p>
          <p className="text-xs text-text-muted">Présentez ce QR code en caisse pour cumuler des points</p>
        </div>
      </div>

      {/* Tiers */}
      <div>
        <h2 className="font-semibold mb-3">Niveaux de fidélité</h2>
        <div className="grid grid-cols-4 gap-2">
          {tiers.map((t) => (
            <div key={t.name} className={`rounded-xl p-3 text-center border ${t.name.toLowerCase() === tier ? "border-gold/30 glow-gold" : "border-border"}`}>
              <span className="text-2xl">{t.icon}</span>
              <p className="text-xs font-bold mt-1">{t.name}</p>
              <p className="text-[10px] text-text-dim">{t.min}+ pts</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards */}
      <div>
        <h2 className="font-semibold mb-3">Récompenses</h2>
        <div className="space-y-2">
          {rewards.map((r) => (
            <div key={r.id} className={`glass rounded-xl p-3 flex items-center justify-between ${!r.available ? "opacity-40" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{r.emoji}</span>
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-gold font-bold">{r.points} points</p>
                </div>
              </div>
              <button
                disabled={!r.available || points < r.points}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  r.available && points >= r.points
                    ? "bg-gold/20 text-gold hover:bg-gold/30"
                    : "bg-surface-light text-text-dim cursor-not-allowed"
                }`}
              >
                {points >= r.points ? "Échanger" : "Insuffisant"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* History */}
      <div>
        <h2 className="font-semibold mb-3">Historique</h2>
        <div className="space-y-2">
          {history.map((h, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-sm">{h.desc}</p>
                <p className="text-[10px] text-text-dim flex items-center gap-1"><Clock size={10} /> {h.date}</p>
              </div>
              <span className={`text-sm font-bold ${h.type === "earn" ? "text-success" : "text-danger"}`}>
                {h.type === "earn" ? "+" : ""}{h.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
