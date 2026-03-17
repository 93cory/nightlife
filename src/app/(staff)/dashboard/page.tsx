"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useOrdersStore } from "@/lib/store/ordersStore";
import { formatPrice, formatXAFShort, formatRelativeTime } from "@/lib/utils/format";

const statusColors: Record<string, string> = {
  pending: "bg-gold/20 text-gold border-gold/30",
  preparing: "bg-info/20 text-info border-info/30",
  served: "bg-success/20 text-success border-success/30",
  paid: "bg-dark-3 text-muted border-white/10",
};

const statusIcons: Record<string, string> = {
  pending: "⏳",
  preparing: "👨‍🍳",
  served: "✅",
  paid: "💰",
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function DashboardPage() {
  const orders = useOrdersStore((s) => s.orders);
  const activeOrders = orders.filter((o) => ["pending", "preparing", "served"].includes(o.status));
  const paidOrders = orders.filter((o) => o.status === "paid");
  const totalCA = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const orderCount = orders.filter((o) => o.status !== "cancelled").length;
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const alertCount = activeOrders.filter(
    (o) => o.status === "pending" && Date.now() - o.createdAt.getTime() > 10 * 60000
  ).length;

  const avgBasket = paidOrders.length > 0 ? Math.round(totalCA / paidOrders.length) : 0;

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Staff Header */}
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="accent">Manager</Badge>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse-live" />
              <span className="text-[8px] text-success tracking-wider">EN SERVICE</span>
            </div>
          </div>
          <p className="font-serif text-xl font-semibold text-cream">Alain Obiang</p>
          <p className="text-[9px] text-muted mt-0.5">Service Soir · 18h00 → 02h00</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/25 flex items-center justify-center text-sm font-bold text-accent">
          AO
        </div>
      </motion.div>

      {/* KPIs */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-2 px-5 mb-3">
        <div className="card-gold p-4 glow-gold">
          <p className="text-[8px] text-gold/60 tracking-[0.2em] uppercase">Chiffre d&apos;affaires</p>
          <p className="font-display text-[28px] text-gold leading-none mt-1">
            <AnimatedCounter value={totalCA} format={(n) => formatXAFShort(n)} />
          </p>
          <p className="text-[8px] text-muted mt-1">{paidOrders.length} transactions</p>
        </div>
        <div className="grid grid-rows-2 gap-2">
          <div className="card p-3">
            <div className="flex items-center justify-between">
              <p className="text-[8px] text-muted tracking-wider">COMMANDES</p>
              <span className="text-sm">🧾</span>
            </div>
            <p className="font-display text-xl text-cream mt-0.5">
              <AnimatedCounter value={orderCount} />
            </p>
          </div>
          <div className={`card p-3 ${alertCount > 0 ? "border-accent/20 bg-accent/[0.04]" : ""}`}>
            <div className="flex items-center justify-between">
              <p className="text-[8px] text-muted tracking-wider">ALERTES</p>
              {alertCount > 0 && <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
            </div>
            <p className={`font-display text-xl mt-0.5 ${alertCount > 0 ? "text-accent" : "text-cream"}`}>
              <AnimatedCounter value={alertCount} />
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Row */}
      <motion.div variants={fadeUp} className="flex gap-2 px-5 mb-4">
        <div className="flex-1 card p-3 text-center">
          <p className="text-[8px] text-muted">Panier Moy.</p>
          <p className="font-display text-sm text-cream mt-0.5">
            <AnimatedCounter value={avgBasket} format={(n) => formatXAFShort(n)} />
          </p>
        </div>
        <div className="flex-1 card p-3 text-center">
          <p className="text-[8px] text-muted">En attente</p>
          <p className={`font-display text-sm mt-0.5 ${pendingCount > 0 ? "text-gold" : "text-cream"}`}>
            <AnimatedCounter value={pendingCount} />
          </p>
        </div>
        <div className="flex-1 card p-3 text-center">
          <p className="text-[8px] text-muted">Serveurs</p>
          <p className="font-display text-sm text-success mt-0.5">3/4</p>
        </div>
        <div className="flex-1 card p-3 text-center">
          <p className="text-[8px] text-muted">Tables</p>
          <p className="font-display text-sm text-cream mt-0.5">7/12</p>
        </div>
      </motion.div>

      {/* Live Orders */}
      <motion.div variants={fadeUp} className="px-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[13px] font-semibold text-cream">Commandes Live</p>
            <p className="text-[9px] text-muted">{activeOrders.length} en cours</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-success" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-success animate-pulse-ring" />
            </div>
            <span className="text-[9px] text-success tracking-wider font-medium">LIVE</span>
          </div>
        </div>

        {activeOrders.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-3 opacity-20">🧾</div>
            <p className="text-[11px] text-muted">Aucune commande active</p>
            <p className="text-[9px] text-muted/50 mt-1">Les nouvelles commandes apparaîtront ici</p>
          </div>
        ) : (
          <div className="space-y-2">
            {activeOrders.map((order, i) => {
              const elapsed = Math.floor((Date.now() - order.createdAt.getTime()) / 60000);
              const isAlert = order.status === "pending" && elapsed > 10;
              const colorClass = statusColors[order.status] || statusColors.pending;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`card p-3.5 flex items-center gap-3 ${
                    isAlert ? "border-accent/20 bg-accent/[0.03]" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center font-display text-sm ${colorClass}`}
                  >
                    T{order.table}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-cream font-medium truncate">
                      {order.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[8px] text-muted">👤 {order.waiter}</span>
                      {order.clientName && (
                        <span className="text-[8px] text-gold/50">• {order.clientName}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display text-sm text-cream">{formatXAFShort(order.totalAmount)}</p>
                    <p className={`text-[8px] mt-0.5 flex items-center gap-1 justify-end ${
                      isAlert ? "text-accent" : order.status === "served" ? "text-success" : "text-gold"
                    }`}>
                      {statusIcons[order.status]}
                      <span>{elapsed < 1 ? "now" : `${elapsed}m`}</span>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
