"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useOrdersStore } from "@/lib/store/ordersStore";
import { useToast } from "@/components/ui/Toast";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { formatPrice, formatRelativeTime } from "@/lib/utils/format";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function CaissePage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const toast = useToast((s) => s.add);
  const orders = useOrdersStore((s) => s.orders);
  const paidOrders = orders.filter((o) => o.status === "paid");
  const totalCA = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const txnCount = paidOrders.length;

  const cashPct = 45;
  const mobilePct = 35;
  const cardPct = 15;
  const loyaltyPct = 5;
  const cashAmount = Math.round(totalCA * cashPct / 100);
  const mobileAmount = Math.round(totalCA * mobilePct / 100);
  const cardAmount = Math.round(totalCA * cardPct / 100);
  const loyaltyAmount = totalCA - cashAmount - mobileAmount - cardAmount;

  const PAYMENT_MODES = [
    { icon: "💵", name: "Cash", amount: cashAmount, pct: cashPct, color: "bg-success" },
    { icon: "📲", name: "Mobile Money", amount: mobileAmount, pct: mobilePct, color: "bg-info" },
    { icon: "💳", name: "Carte", amount: cardAmount, pct: cardPct, color: "bg-purple" },
    { icon: "⭐", name: "Fidélité", amount: loyaltyAmount, pct: loyaltyPct, color: "bg-gold" },
  ];

  function handleClose() {
    setShowConfirm(false);
    toast("Caisse clôturée avec succès", "success", "💰");
  }

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[22px] tracking-[0.15em] text-cream">Caisse</h1>
        <p className="text-[9px] text-muted mt-0.5">Service Soir · 18h00 → maintenant</p>
      </motion.div>

      {/* Total */}
      <motion.div variants={fadeUp} className="px-5 mt-3">
        <div className="relative overflow-hidden rounded-[22px] p-6 bg-gradient-to-br from-success/[0.08] via-success/[0.03] to-dark-2 border border-success/15 glow-success text-center">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(46,204,113,0.06)_0%,transparent_60%)]" />
          <p className="text-[9px] text-success/60 tracking-[0.3em] uppercase relative z-10">Total Encaissé</p>
          <p className="font-display text-[44px] text-cream leading-none mt-2 relative z-10">
            <AnimatedCounter value={totalCA} format={(n) => formatPrice(n)} />
          </p>
          <p className="text-[10px] text-success mt-1 relative z-10">XAF · {txnCount} transaction{txnCount > 1 ? "s" : ""}</p>
        </div>
      </motion.div>

      {/* Payment bar */}
      <motion.div variants={fadeUp} className="px-5 mt-4">
        <div className="flex h-3 rounded-full overflow-hidden">
          {PAYMENT_MODES.map((pm) => (
            <motion.div
              key={pm.name}
              className={`${pm.color}/50 first:rounded-l-full last:rounded-r-full`}
              initial={{ width: 0 }}
              animate={{ width: `${pm.pct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          ))}
        </div>
      </motion.div>

      {/* Payment Modes */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-2 px-5 mt-3 mb-4">
        {PAYMENT_MODES.map((pm) => (
          <div key={pm.name} className="card p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${pm.color}/60`} />
              <span className="text-[9px] text-muted">{pm.icon} {pm.name}</span>
            </div>
            <p className="font-display text-base text-cream">{formatPrice(pm.amount)}</p>
            <p className="text-[8px] text-muted mt-0.5">{pm.pct}% du total</p>
          </div>
        ))}
      </motion.div>

      {/* Transactions */}
      <motion.div variants={fadeUp} className="px-5">
        <p className="text-[11px] font-semibold text-cream mb-2.5">Dernières Transactions</p>
        {paidOrders.length === 0 ? (
          <p className="text-[10px] text-muted py-6 text-center">Aucune transaction</p>
        ) : (
          <div className="space-y-0">
            {paidOrders.slice(0, 8).map((order) => (
              <div
                key={order.id}
                className="border-b border-white/[0.04] py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-dark-3 flex items-center justify-center font-display text-[10px] text-muted">
                    T{order.table}
                  </div>
                  <div>
                    <p className="text-[10px] text-cream font-medium">
                      {order.items.map((i) => i.name).join(", ").slice(0, 30)}
                    </p>
                    <p className="text-[8px] text-muted mt-0.5">{order.waiter} · {formatRelativeTime(order.createdAt)}</p>
                  </div>
                </div>
                <p className="font-display text-sm text-cream">{formatPrice(order.totalAmount)}</p>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Close Register */}
      <motion.div variants={fadeUp} className="px-5 mt-5">
        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full card border-accent/15 py-3.5 text-center btn-press"
          >
            <span className="text-[11px] text-accent tracking-wider">⚠️ Clôturer la Caisse</span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-accent p-5 text-center space-y-3"
          >
            <p className="text-[13px] font-medium text-cream">Confirmer la clôture ?</p>
            <p className="text-[10px] text-muted">
              Total : <span className="text-gold font-display">{formatPrice(totalCA)} XAF</span> · {txnCount} transaction{txnCount > 1 ? "s" : ""}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-white/[0.06] text-[10px] text-muted btn-press"
              >
                Annuler
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-2.5 rounded-xl bg-accent text-white text-[10px] font-bold tracking-wider btn-press"
              >
                CLÔTURER
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
