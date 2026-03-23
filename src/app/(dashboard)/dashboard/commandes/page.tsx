"use client";

import { useState } from "react";
import { Clock, ChefHat, CheckCircle, CreditCard, AlertCircle } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "En attente", color: "text-warning", bg: "bg-warning/15" },
  preparing: { label: "En préparation", color: "text-info", bg: "bg-info/15" },
  ready: { label: "Prêt", color: "text-gold", bg: "bg-gold/15" },
  served: { label: "Servi", color: "text-success", bg: "bg-success/15" },
  paid: { label: "Payé", color: "text-text-dim", bg: "bg-white/5" },
};

const initialOrders = [
  { id: "CMD-048", table: 9, staff: "Patrick Mba", status: "pending", time: 2, items: [{ name: "Heineken", qty: 3, price: 2000 }, { name: "Ailes poulet", qty: 2, price: 3500 }], total: 13000 },
  { id: "CMD-047", table: 3, staff: "Marie-Claire Nzé", status: "pending", time: 5, items: [{ name: "Mojito", qty: 2, price: 4000 }, { name: "Plantain frit", qty: 1, price: 1500 }], total: 9500 },
  { id: "CMD-046", table: 7, staff: "Patrick Mba", status: "preparing", time: 12, items: [{ name: "Castel", qty: 3, price: 1500 }, { name: "Brochettes", qty: 2, price: 3000 }], total: 10500 },
  { id: "CMD-045", table: 1, staff: "Marie-Claire Nzé", status: "preparing", time: 8, items: [{ name: "Piña Colada", qty: 1, price: 4500 }, { name: "Sex on the Beach", qty: 1, price: 4500 }], total: 9000 },
  { id: "CMD-044", table: 5, staff: "Patrick Mba", status: "ready", time: 18, items: [{ name: "J. Walker Red", qty: 2, price: 5000 }, { name: "Red Bull", qty: 2, price: 3000 }], total: 16000 },
  { id: "CMD-043", table: 2, staff: "Marie-Claire Nzé", status: "served", time: 25, items: [{ name: "Cocktail Passion", qty: 2, price: 5000 }], total: 10000 },
  { id: "CMD-042", table: 4, staff: "Patrick Mba", status: "served", time: 32, items: [{ name: "Régab", qty: 4, price: 1000 }], total: 4000 },
  { id: "CMD-041", table: 8, staff: "Marie-Claire Nzé", status: "paid", time: 45, items: [{ name: "Castel", qty: 2, price: 1500 }, { name: "Guinness", qty: 1, price: 2500 }], total: 5500 },
  { id: "CMD-040", table: 6, staff: "Patrick Mba", status: "paid", time: 55, items: [{ name: "Heineken", qty: 2, price: 2000 }, { name: "Coca-Cola", qty: 2, price: 800 }], total: 5600 },
  { id: "CMD-039", table: 10, staff: "Marie-Claire Nzé", status: "paid", time: 68, items: [{ name: "Absolut", qty: 1, price: 4000 }, { name: "Tonic", qty: 2, price: 1000 }], total: 6000 },
];

const tabs = [
  { id: "all", label: "Toutes" },
  { id: "pending", label: "En attente" },
  { id: "preparing", label: "En préparation" },
  { id: "ready", label: "Prêtes" },
  { id: "served", label: "Servies" },
];

export default function CommandesPage() {
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState(initialOrders);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const counts: Record<string, number> = {};
  orders.forEach((o) => { counts[o.status] = (counts[o.status] || 0) + 1; });

  const advanceStatus = (id: string) => {
    const flow: Record<string, string> = { pending: "preparing", preparing: "ready", ready: "served", served: "paid" };
    setOrders((prev) => prev.map((o) => (o.id === id && flow[o.status] ? { ...o, status: flow[o.status] } : o)));
  };

  const actionLabel: Record<string, string> = {
    pending: "Commencer",
    preparing: "Marquer prêt",
    ready: "Servi",
    served: "Encaisser",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Commandes</h1>
        <span className="text-sm text-text-muted">{orders.length} commandes aujourd&apos;hui</span>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              filter === t.id ? "bg-gold/15 text-gold" : "text-text-muted hover:bg-surface-light"
            }`}
          >
            {t.label}
            {t.id !== "all" && counts[t.id] ? (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-surface-lighter">{counts[t.id]}</span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((order) => {
          const cfg = statusConfig[order.status];
          const timeColor = order.time < 5 ? "text-success" : order.time < 15 ? "text-warning" : "text-danger";
          return (
            <div key={order.id} className="glass rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-gold">{order.id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                </div>
                <span className={`flex items-center gap-1 text-xs ${timeColor}`}>
                  <Clock size={12} /> {order.time} min
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs text-text-dim mb-2">Table {order.table} — {order.staff}</p>
                <div className="space-y-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span>{item.qty}x {item.name}</span>
                      <span className="text-text-muted">{(item.qty * item.price).toLocaleString("fr-FR")} F</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <span className="font-bold">{order.total.toLocaleString("fr-FR")} F</span>
                  {actionLabel[order.status] && (
                    <button
                      onClick={() => advanceStatus(order.id)}
                      className="px-3 py-1.5 rounded-lg bg-gold/15 text-gold text-xs font-medium hover:bg-gold/25 transition-colors"
                    >
                      {actionLabel[order.status]}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
