"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/Toast";

type StockLevel = "ok" | "low" | "critical" | "empty";

interface StockItem {
  id: string;
  name: string;
  emoji: string;
  category: string;
  stock: number;
  unit: string;
  min: number;
  level: StockLevel;
}

const STOCK: StockItem[] = [
  { id: "s1", name: "Régab Pression", emoji: "🍺", category: "Bières", stock: 48, unit: "fûts (30L)", min: 10, level: "ok" },
  { id: "s2", name: "Heineken", emoji: "🍺", category: "Bières", stock: 72, unit: "bouteilles", min: 24, level: "ok" },
  { id: "s3", name: "Whisky JB", emoji: "🥃", category: "Spiritueux", stock: 5, unit: "bouteilles", min: 8, level: "low" },
  { id: "s4", name: "Hennessy VS", emoji: "🥃", category: "Spiritueux", stock: 3, unit: "bouteilles", min: 5, level: "low" },
  { id: "s5", name: "Vodka Grey Goose", emoji: "🍸", category: "Spiritueux", stock: 1, unit: "bouteille", min: 4, level: "critical" },
  { id: "s6", name: "Moët & Chandon", emoji: "🍾", category: "Champagne", stock: 6, unit: "bouteilles", min: 4, level: "ok" },
  { id: "s7", name: "Jus d'orange", emoji: "🍊", category: "Soft", stock: 0, unit: "litres", min: 10, level: "empty" },
  { id: "s8", name: "Tonic Water", emoji: "🫧", category: "Soft", stock: 12, unit: "bouteilles", min: 24, level: "low" },
  { id: "s9", name: "Citron vert", emoji: "🍋", category: "Garniture", stock: 2, unit: "kg", min: 3, level: "critical" },
  { id: "s10", name: "Glaçons", emoji: "🧊", category: "Garniture", stock: 25, unit: "kg", min: 15, level: "ok" },
  { id: "s11", name: "Brochettes (viande)", emoji: "🍗", category: "Cuisine", stock: 8, unit: "portions", min: 20, level: "critical" },
  { id: "s12", name: "Plantain", emoji: "🍌", category: "Cuisine", stock: 15, unit: "kg", min: 5, level: "ok" },
];

const LEVEL_CONFIG: Record<StockLevel, { label: string; color: string; bg: string }> = {
  ok: { label: "OK", color: "text-success", bg: "bg-success/15 border-success/25" },
  low: { label: "Bas", color: "text-gold", bg: "bg-gold/15 border-gold/25" },
  critical: { label: "Critique", color: "text-accent", bg: "bg-accent/15 border-accent/25" },
  empty: { label: "Rupture", color: "text-accent", bg: "bg-accent/25 border-accent/40" },
};

const FILTERS = ["Tout", "Alertes", "Bières", "Spiritueux", "Soft", "Cuisine"];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export default function InventairePage() {
  const [filter, setFilter] = useState("Tout");
  const toast = useToast((s) => s.add);

  const alertCount = STOCK.filter((s) => s.level !== "ok").length;

  const filtered = filter === "Tout"
    ? STOCK
    : filter === "Alertes"
      ? STOCK.filter((s) => s.level !== "ok")
      : STOCK.filter((s) => s.category === filter);

  function handleReorder(item: StockItem) {
    toast(`Commande de ${item.name} envoyée au fournisseur`, "success", "📦");
  }

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] tracking-[0.15em] text-cream">Inventaire</h1>
          <p className="text-[9px] text-muted mt-0.5">{STOCK.length} produits · {alertCount} alertes</p>
        </div>
        {alertCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/25">
            <span className="text-xs">⚠️</span>
            <span className="text-[9px] text-accent font-bold">{alertCount}</span>
          </div>
        )}
      </motion.div>

      {/* KPIs */}
      <motion.div variants={fadeUp} className="grid grid-cols-4 gap-1.5 px-5 mt-3 mb-3">
        {[
          { label: "Total", value: STOCK.length, color: "text-cream" },
          { label: "OK", value: STOCK.filter((s) => s.level === "ok").length, color: "text-success" },
          { label: "Bas", value: STOCK.filter((s) => s.level === "low").length, color: "text-gold" },
          { label: "Critique", value: STOCK.filter((s) => ["critical", "empty"].includes(s.level)).length, color: "text-accent" },
        ].map((kpi) => (
          <div key={kpi.label} className="card p-2.5 text-center">
            <p className={`font-display text-lg ${kpi.color}`}>{kpi.value}</p>
            <p className="text-[7px] text-muted">{kpi.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} className="flex gap-1.5 overflow-x-auto no-scrollbar px-5 mb-3">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-[9px] tracking-wider whitespace-nowrap btn-press ${
              filter === f
                ? "bg-accent/15 border border-accent/30 text-accent font-medium"
                : "bg-dark-3 border border-white/[0.04] text-muted"
            }`}
          >
            {f}
            {f === "Alertes" && alertCount > 0 && (
              <span className="ml-1 text-[7px] bg-accent/30 px-1.5 py-0.5 rounded-full">{alertCount}</span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Stock List */}
      <div className="px-5 space-y-1.5">
        {filtered.map((item) => {
          const cfg = LEVEL_CONFIG[item.level];
          const pct = Math.min((item.stock / (item.min * 2)) * 100, 100);
          return (
            <motion.div key={item.id} variants={fadeUp} className="card p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-dark-3 flex items-center justify-center text-lg shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[11px] font-medium text-cream truncate">{item.name}</p>
                    <span className={`px-1.5 py-0.5 rounded text-[7px] tracking-wider font-bold border ${cfg.bg} ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-dark-3 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          item.level === "ok" ? "bg-success" :
                          item.level === "low" ? "bg-gold" : "bg-accent"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-[9px] text-cream font-display shrink-0">
                      {item.stock} <span className="text-muted text-[7px]">{item.unit}</span>
                    </span>
                  </div>
                  <p className="text-[7px] text-muted mt-0.5">Min: {item.min} {item.unit} · {item.category}</p>
                </div>
                {item.level !== "ok" && (
                  <button
                    onClick={() => handleReorder(item)}
                    className="px-2.5 py-1.5 rounded-lg bg-accent/12 border border-accent/20 text-[8px] text-accent tracking-wider font-medium shrink-0 btn-press"
                  >
                    📦
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
