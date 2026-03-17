"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useOrdersStore } from "@/lib/store/ordersStore";
import { formatPrice, formatXAFShort } from "@/lib/utils/format";

const PERIODS = [
  { label: "Aujourd'hui", key: "day" },
  { label: "Semaine", key: "week" },
  { label: "Mois", key: "month" },
];

const HOURLY_DATA = [
  { hour: "18h", value: 15000 },
  { hour: "19h", value: 28000 },
  { hour: "20h", value: 45000 },
  { hour: "21h", value: 78000 },
  { hour: "22h", value: 125000 },
  { hour: "23h", value: 112000 },
  { hour: "00h", value: 98000 },
  { hour: "01h", value: 65000 },
];

const TOP_PRODUCTS = [
  { rank: 1, name: "Régab Pression", emoji: "🍺", sold: 342, revenue: 342000, pct: 32 },
  { rank: 2, name: "Whisky JB", emoji: "🥃", sold: 187, revenue: 841500, pct: 23 },
  { rank: 3, name: "Brochettes Mixtes", emoji: "🍗", sold: 256, revenue: 640000, pct: 18 },
  { rank: 4, name: "Mojito Africain", emoji: "🍸", sold: 198, revenue: 792000, pct: 14 },
  { rank: 5, name: "Hennessy VS", emoji: "🥃", sold: 89, revenue: 3115000, pct: 8 },
  { rank: 6, name: "Moët & Chandon", emoji: "🍾", sold: 45, revenue: 2025000, pct: 5 },
];

const PAYMENT_SPLIT = [
  { mode: "Cash", emoji: "💵", pct: 45, color: "bg-success" },
  { mode: "Mobile Money", emoji: "📲", pct: 35, color: "bg-info" },
  { mode: "Carte", emoji: "💳", pct: 15, color: "bg-purple" },
  { mode: "Fidélité", emoji: "⭐", pct: 5, color: "bg-gold" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function RapportsPage() {
  const [activePeriod, setActivePeriod] = useState("week");
  const orders = useOrdersStore((s) => s.orders);
  const paidOrders = orders.filter((o) => o.status === "paid");
  const totalCA = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const weekCA = 642000 + totalCA;
  const weekOrders = 89 + paidOrders.length;
  const avgBasket = weekOrders > 0 ? Math.round(weekCA / weekOrders) : 0;
  const maxHourly = Math.max(...HOURLY_DATA.map((d) => d.value));

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[22px] tracking-[0.15em] text-cream">Rapports</h1>
        <p className="text-[9px] text-muted mt-0.5">Semaine du 10 → 16 mars 2026</p>
      </motion.div>

      {/* Period Tabs */}
      <motion.div variants={fadeUp} className="flex gap-1.5 px-5 mt-3 mb-4">
        {PERIODS.map((p) => (
          <button
            key={p.key}
            onClick={() => setActivePeriod(p.key)}
            className={`px-3.5 py-2 rounded-xl text-[9px] tracking-wider transition-all btn-press ${
              activePeriod === p.key
                ? "bg-accent/15 border border-accent/30 text-accent font-medium"
                : "bg-dark-3 border border-white/[0.04] text-muted"
            }`}
          >
            {p.label}
          </button>
        ))}
      </motion.div>

      {/* KPIs */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-2 px-5 mb-4">
        <div className="card-gold p-4 glow-gold">
          <p className="text-[8px] text-gold/60 tracking-[0.2em] uppercase">Chiffre d&apos;affaires</p>
          <p className="font-display text-[26px] text-gold leading-none mt-1">
            <AnimatedCounter value={weekCA} format={(n) => formatXAFShort(n)} />
          </p>
          <p className="text-[8px] text-success mt-1">▲ +18% vs sem. passée</p>
        </div>
        <div className="card p-4">
          <p className="text-[8px] text-muted tracking-[0.2em] uppercase">Commandes</p>
          <p className="font-display text-[26px] text-cream leading-none mt-1">
            <AnimatedCounter value={weekOrders} />
          </p>
          <p className="text-[8px] text-success mt-1">▲ +12% vs sem. passée</p>
        </div>
        <div className="card p-4">
          <p className="text-[8px] text-muted tracking-[0.2em] uppercase">Panier Moyen</p>
          <p className="font-display text-xl text-cream leading-none mt-1">
            <AnimatedCounter value={avgBasket} format={(n) => formatPrice(n)} />
          </p>
          <p className="text-[8px] text-success mt-1">▲ +5%</p>
        </div>
        <div className="card p-4">
          <p className="text-[8px] text-muted tracking-[0.2em] uppercase">Clients Uniq.</p>
          <p className="font-display text-xl text-cream leading-none mt-1">
            <AnimatedCounter value={156} />
          </p>
          <p className="text-[8px] text-accent mt-1">▼ -3%</p>
        </div>
      </motion.div>

      {/* Hourly Chart */}
      <motion.div variants={fadeUp} className="card mx-5 p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[11px] text-cream font-medium">📊 CA par Heure</p>
          <p className="text-[8px] text-muted">Ce soir</p>
        </div>
        <div className="flex items-end justify-between gap-1.5 h-[100px]">
          {HOURLY_DATA.map((d, i) => {
            const height = (d.value / maxHourly) * 100;
            const isPeak = d.value === maxHourly;
            return (
              <div key={d.hour} className="flex flex-col items-center gap-1 flex-1">
                {isPeak && (
                  <span className="text-[7px] text-gold font-display">{formatXAFShort(d.value)}</span>
                )}
                <motion.div
                  className={`w-full rounded-t-md ${
                    isPeak
                      ? "bg-gradient-to-t from-gold/30 to-gold/60"
                      : "bg-white/[0.06] hover:bg-white/[0.1]"
                  } transition-colors`}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                />
                <span className={`text-[7px] ${isPeak ? "text-gold font-medium" : "text-muted"}`}>
                  {d.hour}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Payment Split */}
      <motion.div variants={fadeUp} className="card mx-5 p-4 mb-4">
        <p className="text-[11px] text-cream font-medium mb-3">💳 Modes de Paiement</p>
        <div className="flex h-3 rounded-full overflow-hidden mb-3">
          {PAYMENT_SPLIT.map((p) => (
            <motion.div
              key={p.mode}
              className={`${p.color}/60 first:rounded-l-full last:rounded-r-full`}
              initial={{ width: 0 }}
              animate={{ width: `${p.pct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {PAYMENT_SPLIT.map((p) => (
            <div key={p.mode} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${p.color}/60`} />
              <span className="text-[9px] text-muted">{p.emoji} {p.mode}</span>
              <span className="text-[9px] text-cream font-medium ml-auto">{p.pct}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Top Products */}
      <motion.div variants={fadeUp} className="card mx-5 p-4">
        <p className="text-[11px] text-cream font-medium mb-3">🏆 Top Produits</p>
        <div className="space-y-3">
          {TOP_PRODUCTS.map((p, i) => (
            <div key={p.rank} className="flex items-center gap-3">
              <span className={`font-display text-sm w-5 text-center ${i === 0 ? "text-gold" : "text-muted"}`}>
                {p.rank}
              </span>
              <span className="text-base">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-cream truncate">{p.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-dark-3 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${p.pct * 3}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-[8px] text-muted w-6 text-right">{p.pct}%</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[9px] text-cream font-medium">{p.sold}</p>
                <p className="text-[7px] text-muted">vendus</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
