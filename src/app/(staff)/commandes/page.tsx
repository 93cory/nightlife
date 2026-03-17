"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrdersStore, DemoOrder } from "@/lib/store/ordersStore";
import { useToast } from "@/components/ui/Toast";
import Badge from "@/components/ui/Badge";
import ReceiptModal from "@/components/staff/ReceiptModal";
import { formatPrice, formatRelativeTime } from "@/lib/utils/format";
import type { OrderStatus } from "@/lib/types";

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bgColor: string; icon: string }> = {
  pending: { label: "En attente", color: "text-gold", bgColor: "bg-gold/15 border-gold/30", icon: "⏳" },
  preparing: { label: "En prépa", color: "text-info", bgColor: "bg-info/15 border-info/30", icon: "👨‍🍳" },
  served: { label: "Servi", color: "text-success", bgColor: "bg-success/15 border-success/30", icon: "✅" },
  paid: { label: "Payé", color: "text-muted", bgColor: "bg-dark-3 border-white/[0.06]", icon: "💰" },
  cancelled: { label: "Annulé", color: "text-accent", bgColor: "bg-accent/15 border-accent/30", icon: "❌" },
};

const NEXT_ACTION: Record<string, { label: string; nextStatus: OrderStatus; emoji: string }> = {
  pending: { label: "PRÉPARER", nextStatus: "preparing", emoji: "👨‍🍳" },
  preparing: { label: "SERVIR", nextStatus: "served", emoji: "✅" },
  served: { label: "ENCAISSER", nextStatus: "paid", emoji: "💰" },
};

const FILTERS = [
  { value: "all", label: "Toutes", emoji: "📋" },
  { value: "pending", label: "En attente", emoji: "⏳" },
  { value: "preparing", label: "En prépa", emoji: "👨‍🍳" },
  { value: "served", label: "Servi", emoji: "✅" },
  { value: "paid", label: "Payé", emoji: "💰" },
];

export default function CommandesPage() {
  const [filter, setFilter] = useState("all");
  const [receiptOrder, setReceiptOrder] = useState<DemoOrder | null>(null);
  const orders = useOrdersStore((s) => s.orders);
  const updateStatus = useOrdersStore((s) => s.updateStatus);
  const toast = useToast((s) => s.add);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const activeCount = orders.filter((o) => ["pending", "preparing", "served"].includes(o.status)).length;

  function handleAction(order: DemoOrder, action: typeof NEXT_ACTION[string]) {
    updateStatus(order.id, action.nextStatus);
    const msgs: Record<string, string> = {
      preparing: "Commande en préparation",
      served: "Commande servie",
      paid: "Paiement encaissé",
    };
    toast(msgs[action.nextStatus] || "Statut mis à jour", "success", action.emoji);
    // Show receipt when payment is made
    if (action.nextStatus === "paid") {
      setTimeout(() => setReceiptOrder({ ...order, status: "paid" }), 300);
    }
  }

  return (
    <motion.div
      className="no-scrollbar pb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="px-5 pt-5 pb-1 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] tracking-[0.15em] text-cream">Commandes</h1>
          <p className="text-[9px] text-muted mt-0.5">{activeCount} active{activeCount > 1 ? "s" : ""} · {orders.length} total</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-success animate-pulse-ring" />
          </div>
          <span className="text-[9px] text-success tracking-wider font-medium">LIVE</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar px-5 mt-3 mb-4">
        {FILTERS.map((f) => {
          const count = f.value === "all" ? orders.length : orders.filter((o) => o.status === f.value).length;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-3 py-2 rounded-xl text-[9px] tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 btn-press ${
                filter === f.value
                  ? "bg-accent/15 border border-accent/30 text-accent font-medium"
                  : "bg-dark-3 border border-white/[0.04] text-muted"
              }`}
            >
              <span className="text-xs">{f.emoji}</span>
              {f.label}
              {count > 0 && (
                <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-bold ${
                  filter === f.value ? "bg-accent/30 text-accent" : "bg-white/[0.06] text-muted"
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Orders */}
      <div className="px-5 space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-4xl mb-3 opacity-20">🧾</div>
              <p className="text-[11px] text-muted">Aucune commande</p>
              <p className="text-[9px] text-muted/50 mt-1">Changez le filtre ou attendez une nouvelle commande</p>
            </motion.div>
          ) : (
            filtered.map((order) => {
              const cfg = STATUS_CONFIG[order.status];
              const action = NEXT_ACTION[order.status];
              const elapsed = Math.floor((Date.now() - order.createdAt.getTime()) / 60000);
              const isAlert = order.status === "pending" && elapsed > 10;

              return (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`card p-4 ${isAlert ? "border-accent/20 bg-accent/[0.03]" : ""}`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-display text-sm ${cfg.bgColor}`}>
                        T{order.table}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-cream font-medium">👤 {order.waiter}</span>
                          <span className="text-[8px] text-muted">· {formatRelativeTime(order.createdAt)}</span>
                        </div>
                        {order.clientName && (
                          <p className="text-[8px] text-gold/50 mt-0.5">Client: {order.clientName}</p>
                        )}
                      </div>
                    </div>
                    <p className="font-display text-base text-cream">{formatPrice(order.totalAmount)}</p>
                  </div>

                  {/* Items */}
                  <div className="space-y-1 mb-3 pl-[52px]">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-[10px]">
                        <span className="text-cream">{item.emoji} {item.quantity}× {item.name}</span>
                        <span className="text-muted">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Status + Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{cfg.icon}</span>
                      <Badge variant={order.status === "paid" ? "muted" : order.status === "pending" ? "gold" : "success"}>
                        {cfg.label}
                      </Badge>
                      {isAlert && (
                        <span className="text-[8px] text-accent animate-pulse">⚠️ +{elapsed}min</span>
                      )}
                    </div>
                    {action && (
                      <button
                        onClick={() => handleAction(order, action)}
                        className="px-4 py-2 rounded-xl bg-accent/12 border border-accent/25 text-[9px] text-accent tracking-wider font-medium btn-press"
                      >
                        {action.emoji} {action.label}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      <ReceiptModal order={receiptOrder} onClose={() => setReceiptOrder(null)} />
    </motion.div>
  );
}
