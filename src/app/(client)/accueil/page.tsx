"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/hooks/useAuth";
import { useOrdersStore } from "@/lib/store/ordersStore";
import { useNotificationsStore } from "@/lib/store/notificationsStore";
import NotificationsSheet from "@/components/client/NotificationsSheet";
import HappyHourBanner from "@/components/client/HappyHourBanner";
import Badge from "@/components/ui/Badge";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { formatPrice } from "@/lib/utils/format";
import { TIER_BENEFITS, TIER_ORDER, TIER_THRESHOLDS } from "@/lib/utils/constants";
import type { LoyaltyTier } from "@/lib/types";

const EVENTS = [
  { id: "1", name: "AfroVibes Night", venue: "Le Privilege", date: "Ven 21 Mar", time: "22h", emoji: "🎵", price: 5000, gradient: "from-purple/30 via-purple/10 to-transparent" },
  { id: "2", name: "DJ Malenga", venue: "Duplex Club", date: "Sam 22 Mar", time: "23h", emoji: "🎧", price: 3000, gradient: "from-info/25 via-info/8 to-transparent" },
  { id: "3", name: "Soirée VIP Gold", venue: "Luxury Lounge", date: "Ven 28 Mar", time: "21h", emoji: "✨", price: 10000, gradient: "from-gold/25 via-gold/8 to-transparent" },
  { id: "4", name: "Ladies Night", venue: "Crystal Bar", date: "Sam 29 Mar", time: "22h", emoji: "💃", price: 0, gradient: "from-accent/25 via-accent/8 to-transparent" },
];

const POPULAR = [
  { id: "pop-1", name: "Régab Pression", emoji: "🍺", price: 1000, sold: 342 },
  { id: "pop-2", name: "Whisky JB", emoji: "🥃", price: 4500, sold: 187 },
  { id: "pop-3", name: "Brochettes Mixtes", emoji: "🍗", price: 2500, sold: 256 },
  { id: "pop-4", name: "Mojito Africain", emoji: "🍸", price: 4000, sold: 198 },
  { id: "pop-5", name: "Hennessy VS", emoji: "🥃", price: 35000, sold: 89 },
  { id: "pop-6", name: "Tropical Sunset", emoji: "🍹", price: 3500, sold: 156 },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function AccueilPage() {
  const { displayName, loading } = useAuth();
  const router = useRouter();
  const orders = useOrdersStore((s) => s.orders);
  const activeOrders = orders.filter((o) => ["pending", "preparing", "served"].includes(o.status));
  const unreadCount = useNotificationsStore((s) => s.notifications.filter((n) => !n.read).length);
  const [showNotifs, setShowNotifs] = useState(false);

  const points = 2840;
  const tier: LoyaltyTier = "silver";
  const tierInfo = TIER_BENEFITS[tier];
  const currentTierIdx = TIER_ORDER.indexOf(tier);
  const nextTier = currentTierIdx < TIER_ORDER.length - 1 ? TIER_ORDER[currentTierIdx + 1] : null;
  const nextThreshold = nextTier ? TIER_THRESHOLDS[nextTier] : null;
  const pointsToNext = nextThreshold ? nextThreshold - points : 0;
  const progressPct = nextThreshold
    ? ((points - TIER_THRESHOLDS[tier]) / (nextThreshold - TIER_THRESHOLDS[tier])) * 100
    : 100;

  const hour = new Date().getHours();
  const greeting = hour >= 18 ? "Bonsoir" : hour >= 12 ? "Bon après-midi" : "Bonjour";
  const name = displayName || "Jean-Pierre";

  if (loading) return null;

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Header with gradient */}
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-muted/60 tracking-[0.2em] uppercase">{greeting}</p>
            <h1 className="font-serif text-[26px] font-semibold text-cream mt-0.5 leading-tight">
              {name} <span className="text-gold/40">.</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotifs(true)}
              className="relative w-10 h-10 rounded-full bg-dark-2 border border-white/[0.06] flex items-center justify-center btn-press"
            >
              <span className="text-base">🔔</span>
              {unreadCount > 0 && (
                <div className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-[7px] text-white font-bold">{unreadCount}</span>
                </div>
              )}
            </button>
            <button
              onClick={() => router.push("/profil")}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center btn-press"
            >
              <span className="font-display text-sm text-gold">{name[0]}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Active Order Banner */}
      {activeOrders.length > 0 && (
        <motion.div variants={fadeUp} className="px-5 mb-3">
          <button
            onClick={() => router.push("/mes-commandes")}
            className="w-full glass-accent rounded-2xl p-3.5 flex items-center gap-3 btn-press"
          >
            <div className="relative">
              <span className="text-xl">🧾</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                <span className="text-[7px] text-white font-bold">{activeOrders.length}</span>
              </div>
            </div>
            <div className="text-left flex-1">
              <p className="text-[11px] font-semibold text-cream">Commande en cours</p>
              <p className="text-[9px] text-muted">Table {activeOrders[0].table} · {activeOrders[0].items.length} articles</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse-live" />
              <span className="text-[9px] text-accent tracking-wider font-medium">LIVE</span>
            </div>
          </button>
        </motion.div>
      )}

      {/* Loyalty Card */}
      <motion.div variants={fadeUp} className="px-5 mb-4">
        <button
          onClick={() => router.push("/fidelite")}
          className="w-full relative overflow-hidden rounded-[20px] p-5 btn-press"
        >
          {/* Card background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.12] via-gold/[0.04] to-dark-2 border border-gold/15 rounded-[20px]" />
          <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle,rgba(201,168,76,0.1)_0%,transparent_70%)]" />

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="gold">{tierInfo.label}</Badge>
                <span className="text-[8px] text-gold/50 tracking-wider">CARTE FIDÉLITÉ</span>
              </div>
              <p className="font-display text-[36px] text-gold leading-none tracking-wider">
                <AnimatedCounter value={points} />
              </p>
              <p className="text-[9px] text-muted mt-1">points accumulés</p>
            </div>
            <div className="text-right">
              <div className="font-display text-4xl text-gold/10">NL</div>
            </div>
          </div>

          {/* Progress */}
          {nextTier && (
            <div className="relative z-10 mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8px] text-muted">{tierInfo.label}</span>
                <span className="text-[8px] text-gold">{TIER_BENEFITS[nextTier].label}</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressPct, 100)}%` }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-[8px] text-muted/60 mt-1 text-right">
                Encore {pointsToNext} pts
              </p>
            </div>
          )}
        </button>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={fadeUp} className="flex gap-2 px-5 mb-4">
        <button
          onClick={() => router.push("/menu")}
          className="flex-1 relative overflow-hidden bg-gradient-to-br from-accent/[0.1] to-accent/[0.02] border border-accent/15 rounded-2xl p-4 text-center btn-press"
        >
          <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center text-xl mx-auto mb-2">
            🍽️
          </div>
          <p className="text-[11px] font-semibold text-cream">Commander</p>
          <p className="text-[8px] text-muted mt-0.5">Menu complet</p>
        </button>
        <button
          onClick={() => router.push("/reservation")}
          className="flex-1 relative overflow-hidden bg-gradient-to-br from-gold/[0.08] to-gold/[0.02] border border-gold/15 rounded-2xl p-4 text-center btn-press"
        >
          <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/20 flex items-center justify-center text-xl mx-auto mb-2">
            📋
          </div>
          <p className="text-[11px] font-semibold text-cream">Réserver</p>
          <p className="text-[8px] text-muted mt-0.5">Une table</p>
        </button>
      </motion.div>

      {/* Events Carousel */}
      <motion.div variants={fadeUp} className="mb-4">
        <div className="flex items-center justify-between px-5 mb-2.5">
          <div>
            <p className="text-[13px] font-semibold text-cream">Soirées à venir</p>
            <p className="text-[9px] text-muted mt-0.5">Prochains événements</p>
          </div>
          <button
            onClick={() => router.push("/soirees")}
            className="text-[9px] text-gold tracking-wider btn-press"
          >
            TOUT VOIR →
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-2">
          {EVENTS.map((ev) => (
            <button
              key={ev.id}
              onClick={() => router.push("/soirees")}
              className={`min-w-[150px] max-w-[150px] rounded-2xl overflow-hidden border border-white/[0.04] flex-shrink-0 bg-gradient-to-br ${ev.gradient} btn-press`}
            >
              <div className="h-[70px] flex items-center justify-center">
                <span className="text-3xl animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>
                  {ev.emoji}
                </span>
              </div>
              <div className="px-3 pb-3">
                <p className="text-[10px] font-semibold text-cream truncate">{ev.name}</p>
                <p className="text-[8px] text-muted mt-0.5">{ev.venue}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[8px] text-muted">{ev.date}</span>
                  <span className="text-[9px] text-gold font-display tracking-wider">
                    {ev.price === 0 ? "GRATUIT" : `${formatPrice(ev.price)}`}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Popular Section */}
      <motion.div variants={fadeUp} className="px-5">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <p className="text-[13px] font-semibold text-cream">Les plus commandés</p>
            <p className="text-[9px] text-muted mt-0.5">Ce soir au bar</p>
          </div>
          <button
            onClick={() => router.push("/menu")}
            className="text-[9px] text-gold tracking-wider btn-press"
          >
            MENU →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {POPULAR.map((item, i) => (
            <button
              key={item.id}
              onClick={() => router.push("/menu")}
              className="card p-3 flex items-center gap-2.5 text-left btn-press"
            >
              <div className="w-10 h-10 rounded-xl bg-dark-3 flex items-center justify-center text-lg shrink-0">
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium text-cream truncate">{item.name}</p>
                <p className="text-[10px] text-gold font-display tracking-wider">
                  {formatPrice(item.price)}
                </p>
                <p className="text-[7px] text-muted/50 mt-0.5">{item.sold} vendus</p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Happy Hour */}
      <motion.div variants={fadeUp} className="px-5 mt-4 pb-2">
        <HappyHourBanner />
      </motion.div>

      <NotificationsSheet open={showNotifs} onClose={() => setShowNotifs(false)} />
    </motion.div>
  );
}
