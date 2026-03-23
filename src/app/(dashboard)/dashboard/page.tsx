"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  Clock,
  CreditCard,
  Smartphone,
  Banknote,
  AlertTriangle,
} from "lucide-react";

// Demo data
const stats = [
  {
    label: "CA Aujourd'hui",
    value: "847 500",
    unit: "FCFA",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    label: "Commandes",
    value: "43",
    unit: "",
    change: "+8",
    trend: "up" as const,
    icon: ShoppingCart,
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    label: "Clients servis",
    value: "67",
    unit: "",
    change: "+15%",
    trend: "up" as const,
    icon: Users,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    label: "Ticket moyen",
    value: "19 710",
    unit: "FCFA",
    change: "-3.2%",
    trend: "down" as const,
    icon: CreditCard,
    color: "text-warning",
    bg: "bg-warning/10",
  },
];

const recentOrders = [
  { id: "CMD-047", table: "Table 3", items: "2x Heineken, 1x Mojito", amount: 8000, status: "served", time: "Il y a 5 min" },
  { id: "CMD-046", table: "Table 7", items: "1x Poulet braisé, 2x Régab", amount: 7000, status: "preparing", time: "Il y a 12 min" },
  { id: "CMD-045", table: "Carré VIP 2", items: "1x Hennessy, 4x Red Bull", amount: 87000, status: "served", time: "Il y a 18 min" },
  { id: "CMD-044", table: "Table 1", items: "3x Castel, 1x Brochettes", amount: 7500, status: "paid", time: "Il y a 25 min" },
  { id: "CMD-043", table: "Table 5", items: "2x Cocktail Passion, 1x Salade", amount: 10500, status: "paid", time: "Il y a 32 min" },
];

const paymentBreakdown = [
  { mode: "Cash", amount: 385000, percent: 45, icon: Banknote, color: "bg-success" },
  { mode: "Mobile Money", amount: 340000, percent: 40, icon: Smartphone, color: "bg-gold" },
  { mode: "Carte", amount: 122500, percent: 15, icon: CreditCard, color: "bg-info" },
];

const topProducts = [
  { name: "Heineken", qty: 48, revenue: 96000 },
  { name: "Castel", qty: 35, revenue: 52500 },
  { name: "Mojito", qty: 22, revenue: 88000 },
  { name: "Red Bull", qty: 18, revenue: 54000 },
  { name: "Régab", qty: 15, revenue: 15000 },
];

const lowStock = [
  { name: "Heineken", current: 4, min: 12, unit: "bouteilles" },
  { name: "Citron vert", current: 2, min: 10, unit: "pièces" },
  { name: "Red Bull", current: 6, min: 15, unit: "canettes" },
];

const hourlyRevenue = [
  { hour: "18h", amount: 45000 },
  { hour: "19h", amount: 78000 },
  { hour: "20h", amount: 125000 },
  { hour: "21h", amount: 187000 },
  { hour: "22h", amount: 215000 },
  { hour: "23h", amount: 142000 },
  { hour: "00h", amount: 55500 },
];

const statusColors: Record<string, string> = {
  pending: "bg-warning/20 text-warning",
  preparing: "bg-info/20 text-info",
  ready: "bg-gold/20 text-gold",
  served: "bg-success/20 text-success",
  paid: "bg-text-dim/20 text-text-dim",
};

const statusLabels: Record<string, string> = {
  pending: "En attente",
  preparing: "En préparation",
  ready: "Prêt",
  served: "Servi",
  paid: "Payé",
};

export default function DashboardPage() {
  const [period, setPeriod] = useState<"today" | "week" | "month">("today");
  const maxRevenue = Math.max(...hourlyRevenue.map((h) => h.amount));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-text-muted text-sm">
            Le Privilège Lounge — Samedi 22 mars 2026
          </p>
        </div>
        <div className="flex gap-1 bg-surface rounded-lg p-1">
          {(["today", "week", "month"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                period === p
                  ? "bg-gold/20 text-gold"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              {p === "today" ? "Aujourd'hui" : p === "week" ? "Semaine" : "Mois"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="glass rounded-xl p-4 hover:glow-gold transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon size={20} className={stat.color} />
                </div>
                <span
                  className={`flex items-center gap-0.5 text-xs font-medium ${
                    stat.trend === "up" ? "text-success" : "text-danger"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-text-muted mt-0.5">
                {stat.unit && <span className="text-text-dim">{stat.unit} — </span>}
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 glass rounded-xl">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-semibold">Commandes récentes</h2>
            <a
              href="/dashboard/commandes"
              className="text-xs text-gold hover:underline flex items-center gap-1"
            >
              Tout voir <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 hover:bg-surface-light/50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium text-gold">
                      {order.id}
                    </span>
                    <span className="text-xs text-text-dim">{order.table}</span>
                  </div>
                  <p className="text-sm text-text-muted mt-0.5 truncate">
                    {order.items}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-sm">
                    {order.amount.toLocaleString("fr-FR")} F
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        statusColors[order.status]
                      }`}
                    >
                      {statusLabels[order.status]}
                    </span>
                    <span className="text-[10px] text-text-dim flex items-center gap-0.5">
                      <Clock size={10} />
                      {order.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Payment breakdown */}
          <div className="glass rounded-xl p-4">
            <h3 className="font-semibold mb-4">Répartition paiements</h3>
            <div className="space-y-3">
              {paymentBreakdown.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.mode}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon size={14} className="text-text-muted" />
                        <span className="text-sm">{p.mode}</span>
                      </div>
                      <span className="text-sm font-medium">
                        {p.amount.toLocaleString("fr-FR")} F
                      </span>
                    </div>
                    <div className="h-1.5 bg-surface-lighter rounded-full overflow-hidden">
                      <div
                        className={`h-full ${p.color} rounded-full transition-all`}
                        style={{ width: `${p.percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} className="text-warning" />
              <h3 className="font-semibold">Alertes stock</h3>
            </div>
            <div className="space-y-3">
              {lowStock.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm">{item.name}</span>
                  <span className="text-xs text-danger font-medium">
                    {item.current}/{item.min} {item.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Hourly Revenue */}
        <div className="glass rounded-xl p-4">
          <h3 className="font-semibold mb-4">CA par heure</h3>
          <div className="flex items-end gap-2 h-40">
            {hourlyRevenue.map((h) => (
              <div key={h.hour} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-text-dim">
                  {(h.amount / 1000).toFixed(0)}k
                </span>
                <div
                  className="w-full bg-gradient-gold rounded-t-md transition-all"
                  style={{
                    height: `${(h.amount / maxRevenue) * 100}%`,
                    minHeight: 4,
                  }}
                />
                <span className="text-[10px] text-text-muted">{h.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="glass rounded-xl p-4">
          <h3 className="font-semibold mb-4">Top 5 produits</h3>
          <div className="space-y-3">
            {topProducts.map((product, i) => (
              <div
                key={product.name}
                className="flex items-center gap-3"
              >
                <span className="text-sm font-bold text-gold w-5">
                  #{i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{product.name}</span>
                    <span className="text-sm text-text-muted">
                      {product.revenue.toLocaleString("fr-FR")} F
                    </span>
                  </div>
                  <div className="h-1 bg-surface-lighter rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-gold/60 rounded-full"
                      style={{
                        width: `${(product.qty / topProducts[0].qty) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs text-text-dim">{product.qty} vendus</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
