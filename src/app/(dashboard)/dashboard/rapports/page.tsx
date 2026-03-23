"use client";

import { useState } from "react";
import { TrendingUp, ShoppingCart, Users, DollarSign, Percent, BarChart3 } from "lucide-react";

const kpis = [
  { label: "CA total", value: "12 450 000", unit: "FCFA", change: "+15%", icon: DollarSign },
  { label: "Commandes", value: "487", unit: "", change: "+8%", icon: ShoppingCart },
  { label: "Ticket moyen", value: "25 560", unit: "FCFA", change: "+3%", icon: BarChart3 },
  { label: "Clients uniques", value: "312", unit: "", change: "+22%", icon: Users },
  { label: "Marge brute", value: "68%", unit: "", change: "+2%", icon: Percent },
  { label: "Taux occupation", value: "78%", unit: "", change: "+5%", icon: TrendingUp },
];

const dailyRevenue = [
  { day: "Lun", amount: 1250000 },
  { day: "Mar", amount: 980000 },
  { day: "Mer", amount: 1450000 },
  { day: "Jeu", amount: 1680000 },
  { day: "Ven", amount: 2350000 },
  { day: "Sam", amount: 2890000 },
  { day: "Dim", amount: 1850000 },
];

const topProducts = [
  { rank: 1, name: "Heineken", qty: 245, revenue: 490000, margin: 60 },
  { rank: 2, name: "Mojito", qty: 187, revenue: 748000, margin: 70 },
  { rank: 3, name: "Castel", qty: 312, revenue: 468000, margin: 67 },
  { rank: 4, name: "Red Bull", qty: 156, revenue: 468000, margin: 60 },
  { rank: 5, name: "Poulet braisé", qty: 134, revenue: 670000, margin: 60 },
  { rank: 6, name: "Régab", qty: 198, revenue: 198000, margin: 60 },
  { rank: 7, name: "J. Walker Red", qty: 89, revenue: 445000, margin: 73 },
  { rank: 8, name: "Brochettes", qty: 112, revenue: 336000, margin: 60 },
  { rank: 9, name: "Piña Colada", qty: 95, revenue: 427500, margin: 69 },
  { rank: 10, name: "Coca-Cola", qty: 287, revenue: 229600, margin: 63 },
];

const staffPerf = [
  { name: "Patrick Mba", role: "Barman", orders: 178, revenue: 3450000, tips: 145000 },
  { name: "Marie-Claire Nzé", role: "Serveuse", orders: 156, revenue: 2890000, tips: 198000 },
  { name: "Sylvie Ndong", role: "Serveuse", orders: 134, revenue: 2340000, tips: 167000 },
  { name: "Jean-Pierre Ondo", role: "Cuisinier", orders: 198, revenue: 0, tips: 0 },
];

export default function RapportsPage() {
  const [period, setPeriod] = useState("week");
  const maxRevenue = Math.max(...dailyRevenue.map((d) => d.amount));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Rapports & Analyses</h1>
        <div className="flex gap-1 bg-surface rounded-lg p-1">
          {[{ id: "day", l: "Jour" }, { id: "week", l: "Semaine" }, { id: "month", l: "Mois" }].map((p) => (
            <button key={p.id} onClick={() => setPeriod(p.id)} className={`px-3 py-1.5 rounded-md text-sm font-medium ${period === p.id ? "bg-gold/15 text-gold" : "text-text-muted"}`}>
              {p.l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="glass rounded-xl p-4">
              <Icon size={16} className="text-gold mb-2" />
              <p className="text-xl font-bold">{kpi.value}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-text-muted">{kpi.label}</span>
                <span className="text-[10px] text-success">{kpi.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-4">
          <h3 className="font-semibold mb-4">Revenus de la semaine</h3>
          <div className="flex items-end gap-3 h-48">
            {dailyRevenue.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-text-dim">{(d.amount / 1000000).toFixed(1)}M</span>
                <div className="w-full bg-gradient-gold rounded-t-md" style={{ height: `${(d.amount / maxRevenue) * 100}%`, minHeight: 4 }} />
                <span className="text-xs text-text-muted">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-4">
          <h3 className="font-semibold mb-4">Répartition paiements</h3>
          <div className="flex items-center justify-center py-8">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="20" className="text-success" strokeDasharray="113 252" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="20" className="text-gold" strokeDasharray="100.5 252" strokeDashoffset="-113" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="20" className="text-info" strokeDasharray="38 252" strokeDashoffset="-213.5" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold">100%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-6">
            <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded-full bg-success" /> Cash 45%</span>
            <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded-full bg-gold" /> Mobile 40%</span>
            <span className="flex items-center gap-1.5 text-xs"><span className="w-3 h-3 rounded-full bg-info" /> Carte 15%</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="font-semibold">Top 10 produits</h3></div>
          <table className="w-full">
            <thead><tr className="border-b border-border text-xs text-text-dim"><th className="px-4 py-2 text-left">#</th><th className="px-4 py-2 text-left">Produit</th><th className="px-4 py-2 text-right">Qté</th><th className="px-4 py-2 text-right">Revenu</th></tr></thead>
            <tbody className="divide-y divide-border">
              {topProducts.map((p) => (
                <tr key={p.rank} className="text-sm"><td className="px-4 py-2 text-gold font-bold">#{p.rank}</td><td className="px-4 py-2">{p.name}</td><td className="px-4 py-2 text-right text-text-muted">{p.qty}</td><td className="px-4 py-2 text-right">{(p.revenue / 1000).toFixed(0)}k F</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border"><h3 className="font-semibold">Performance personnel</h3></div>
          <table className="w-full">
            <thead><tr className="border-b border-border text-xs text-text-dim"><th className="px-4 py-2 text-left">Nom</th><th className="px-4 py-2 text-right">Commandes</th><th className="px-4 py-2 text-right">CA</th><th className="px-4 py-2 text-right">Pourboires</th></tr></thead>
            <tbody className="divide-y divide-border">
              {staffPerf.map((s) => (
                <tr key={s.name} className="text-sm"><td className="px-4 py-2"><div><span className="font-medium">{s.name}</span><br /><span className="text-xs text-text-dim">{s.role}</span></div></td><td className="px-4 py-2 text-right text-text-muted">{s.orders}</td><td className="px-4 py-2 text-right">{s.revenue > 0 ? `${(s.revenue / 1000000).toFixed(1)}M` : "—"}</td><td className="px-4 py-2 text-right text-gold">{s.tips > 0 ? `${(s.tips / 1000).toFixed(0)}k` : "—"}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
