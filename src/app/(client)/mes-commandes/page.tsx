"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useOrdersStore, DemoOrder } from "@/lib/store/ordersStore";
import SplitBillModal from "@/components/client/SplitBillModal";
import { formatPrice, formatRelativeTime } from "@/lib/utils/format";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: string; bg: string }> = {
  pending: { label: "En attente", color: "text-gold", icon: "⏳", bg: "bg-gold/10 border-gold/20" },
  preparing: { label: "En préparation", color: "text-info", icon: "👨‍🍳", bg: "bg-info/10 border-info/20" },
  served: { label: "Servi", color: "text-success", icon: "✅", bg: "bg-success/10 border-success/20" },
  paid: { label: "Payé", color: "text-muted", icon: "💰", bg: "bg-dark-3 border-white/[0.06]" },
  cancelled: { label: "Annulé", color: "text-accent", icon: "❌", bg: "bg-accent/10 border-accent/20" },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function ClientCommandesPage() {
  const orders = useOrdersStore((s) => s.orders);
  const [splitOrder, setSplitOrder] = useState<DemoOrder | null>(null);
  const activeOrders = orders.filter((o) => ["pending", "preparing", "served"].includes(o.status));
  const pastOrders = orders.filter((o) => ["paid", "cancelled"].includes(o.status));

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[24px] tracking-[0.15em] text-cream">Mes Commandes</h1>
        <p className="text-[9px] text-muted mt-0.5">
          {activeOrders.length} commande{activeOrders.length > 1 ? "s" : ""} en cours
        </p>
      </motion.div>

      {activeOrders.length === 0 && pastOrders.length === 0 && (
        <motion.div variants={fadeUp} className="text-center py-16 px-5">
          <div className="text-5xl mb-4 opacity-20">🧾</div>
          <p className="text-[12px] text-muted">Aucune commande</p>
          <p className="text-[9px] text-muted/50 mt-1">Passez une commande depuis le menu</p>
        </motion.div>
      )}

      {activeOrders.length > 0 && (
        <div className="px-5 mt-3 space-y-2.5">
          {activeOrders.map((order) => (
            <motion.div key={order.id} variants={fadeUp}>
              <OrderCard order={order} active onSplit={() => setSplitOrder(order)} />
            </motion.div>
          ))}
        </div>
      )}

      {pastOrders.length > 0 && (
        <div className="px-5 mt-5">
          <motion.p variants={fadeUp} className="text-[9px] tracking-[0.25em] text-muted uppercase mb-2.5">
            Historique
          </motion.p>
          <div className="space-y-2">
            {pastOrders.slice(0, 10).map((order) => (
              <motion.div key={order.id} variants={fadeUp}>
                <OrderCard order={order} active={false} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <SplitBillModal order={splitOrder} onClose={() => setSplitOrder(null)} />
    </motion.div>
  );
}

function OrderCard({ order, active, onSplit }: { order: DemoOrder; active: boolean; onSplit?: () => void }) {
  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;

  return (
    <div className={`card p-4 ${active ? "border-gold/10 bg-gradient-to-r from-gold/[0.03] to-transparent" : ""}`}>
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-display text-xs ${cfg.bg}`}>
            T{order.table}
          </div>
          <div>
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] tracking-wider ${cfg.bg} border`}>
              <span>{cfg.icon}</span>
              <span className={cfg.color}>{cfg.label}</span>
            </div>
          </div>
        </div>
        <span className="text-[8px] text-muted">{formatRelativeTime(order.createdAt)}</span>
      </div>

      <div className="space-y-1 mb-2.5">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between text-[10px]">
            <span className="text-cream">{item.emoji} {item.quantity}× {item.name}</span>
            <span className="text-muted">{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.04]">
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-muted">👤 {order.waiter}</span>
          {active && order.status === "served" && onSplit && (
            <button
              onClick={(e) => { e.stopPropagation(); onSplit(); }}
              className="px-2 py-1 rounded-lg bg-gold/10 border border-gold/20 text-[8px] text-gold tracking-wider btn-press"
            >
              💸 PARTAGER
            </button>
          )}
        </div>
        <span className="font-display text-base text-gold">{formatPrice(order.totalAmount)} XAF</span>
      </div>

      {active && (
        <div className="mt-3 flex gap-1">
          {["pending", "preparing", "served"].map((step, i) => {
            const steps = ["pending", "preparing", "served"];
            const currentIdx = steps.indexOf(order.status);
            const filled = i <= currentIdx;
            return (
              <motion.div
                key={step}
                className={`flex-1 h-1.5 rounded-full ${filled ? "bg-gold" : "bg-white/[0.06]"}`}
                initial={filled ? { width: 0 } : {}}
                animate={filled ? { width: "100%" } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
