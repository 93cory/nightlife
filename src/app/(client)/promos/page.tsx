"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useReferralStore, Promo } from "@/lib/store/referralStore";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils/format";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const CATEGORY_CONFIG: Record<string, { label: string; icon: string; gradient: string }> = {
  bienvenue: { label: "Bienvenue", icon: "👋", gradient: "from-gold/15 to-gold/[0.03] border-gold/20" },
  fidelite: { label: "Fidélité", icon: "⭐", gradient: "from-success/15 to-success/[0.03] border-success/20" },
  evenement: { label: "Événement", icon: "🎵", gradient: "from-purple-500/15 to-purple-500/[0.03] border-purple-500/20" },
  parrainage: { label: "Parrainage", icon: "🎁", gradient: "from-accent/15 to-accent/[0.03] border-accent/20" },
};

export default function PromosPage() {
  const { promos, applyPromo } = useReferralStore();
  const toast = useToast((s) => s.add);
  const [code, setCode] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? promos : promos.filter((p) => p.category === filter);

  function handleApply() {
    if (!code.trim()) return;
    const result = applyPromo(code.trim());
    if (result) {
      toast(
        `Code appliqué ! ${result.type === "percent" ? `-${result.discount}%` : `-${formatPrice(result.discount)} XAF`}`,
        "success",
        "🎉"
      );
      setCode("");
    } else {
      toast("Code invalide ou expiré", "error", "❌");
    }
  }

  function daysLeft(date: Date) {
    return Math.max(0, Math.ceil((date.getTime() - Date.now()) / 86400000));
  }

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[24px] tracking-[0.15em] text-cream">Codes Promo</h1>
        <p className="text-[9px] text-muted mt-0.5">{promos.length} code{promos.length > 1 ? "s" : ""} disponible{promos.length > 1 ? "s" : ""}</p>
      </motion.div>

      {/* Enter Code */}
      <motion.div variants={fadeUp} className="px-5 mt-3">
        <div className="card p-4 flex items-center gap-2">
          <input
            className="flex-1 input-dark px-4 py-2.5 text-[11px] text-cream tracking-[0.1em] uppercase"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="ENTREZ UN CODE PROMO"
          />
          <button
            onClick={handleApply}
            disabled={!code.trim()}
            className="px-4 py-2.5 rounded-xl bg-gold/15 border border-gold/25 text-[10px] text-gold tracking-wider font-medium btn-press disabled:opacity-30"
          >
            APPLIQUER
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} className="flex gap-1.5 overflow-x-auto no-scrollbar px-5 mt-3 mb-3">
        {[
          { value: "all", label: "Tous", icon: "📋" },
          ...Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => ({
            value: key,
            label: cfg.label,
            icon: cfg.icon,
          })),
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-2 rounded-xl text-[9px] tracking-wider whitespace-nowrap flex items-center gap-1.5 btn-press ${
              filter === f.value
                ? "bg-gold/15 border border-gold/25 text-gold"
                : "bg-dark-3 border border-white/[0.04] text-muted"
            }`}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </motion.div>

      {/* Promo Cards */}
      <div className="px-5 space-y-2.5">
        {filtered.map((promo) => {
          const cfg = CATEGORY_CONFIG[promo.category];
          const days = daysLeft(promo.expiresAt);
          const usable = promo.usageCount < promo.maxUsage && days > 0;

          return (
            <motion.div
              key={promo.code}
              variants={fadeUp}
              className={`rounded-xl p-4 border bg-gradient-to-r ${cfg.gradient} ${!usable ? "opacity-50" : ""}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cfg.icon}</span>
                  <div>
                    <p className="font-display text-[16px] text-cream tracking-wider">{promo.code}</p>
                    <p className="text-[8px] text-muted mt-0.5">{cfg.label}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-[24px] text-cream leading-none">
                    {promo.type === "percent" ? `-${promo.discount}%` : `-${formatPrice(promo.discount)}`}
                  </p>
                  {promo.type === "fixed" && <p className="text-[8px] text-muted">XAF</p>}
                </div>
              </div>

              <p className="text-[10px] text-cream/80 mb-2">{promo.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[8px] text-muted">
                  <span>⏳ {days > 0 ? `${days}j restants` : "Expiré"}</span>
                  <span>📊 {promo.usageCount}/{promo.maxUsage} utilisations</span>
                </div>
                {usable && (
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(promo.code);
                      toast("Code copié !", "success", "📋");
                    }}
                    className="text-[8px] text-gold tracking-wider btn-press"
                  >
                    COPIER
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
