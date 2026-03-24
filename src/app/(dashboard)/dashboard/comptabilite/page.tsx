"use client";

import { useState } from "react";
import {
  DollarSign, TrendingUp, TrendingDown, Wallet, Receipt,
  Users, Building2, ArrowUpRight, ArrowDownRight, Calendar,
} from "lucide-react";

interface Transaction {
  id: string;
  label: string;
  category: string;
  amount: number;
  type: "revenue" | "expense";
  date: string;
}

const transactions: Transaction[] = [
  { id: "tx-001", label: "Ventes du jour", category: "Ventes", amount: 847500, type: "revenue", date: "2026-03-23" },
  { id: "tx-002", label: "Salaires mars (5 employés)", category: "Salaires", amount: 425000, type: "expense", date: "2026-03-23" },
  { id: "tx-003", label: "Réapprovisionnement bières", category: "Stock", amount: 185000, type: "expense", date: "2026-03-22" },
  { id: "tx-004", label: "Ventes vendredi soir", category: "Ventes", amount: 1250000, type: "revenue", date: "2026-03-22" },
  { id: "tx-005", label: "Loyer mars", category: "Loyer", amount: 350000, type: "expense", date: "2026-03-20" },
  { id: "tx-006", label: "Électricité + eau", category: "Charges", amount: 85000, type: "expense", date: "2026-03-19" },
  { id: "tx-007", label: "Réapprovisionnement spiritueux", category: "Stock", amount: 320000, type: "expense", date: "2026-03-18" },
  { id: "tx-008", label: "Ventes jeudi soir", category: "Ventes", amount: 625000, type: "revenue", date: "2026-03-21" },
  { id: "tx-009", label: "DJ soirée spéciale", category: "Prestation", amount: 50000, type: "expense", date: "2026-03-22" },
  { id: "tx-010", label: "Maintenance climatisation", category: "Charges", amount: 45000, type: "expense", date: "2026-03-17" },
];

const monthlyData = [
  { month: "Oct", revenue: 3200000, expenses: 1800000 },
  { month: "Nov", revenue: 3800000, expenses: 2000000 },
  { month: "Déc", revenue: 5200000, expenses: 2500000 },
  { month: "Jan", revenue: 3500000, expenses: 1900000 },
  { month: "Fév", revenue: 4100000, expenses: 2100000 },
  { month: "Mar", revenue: 4800000, expenses: 2300000 },
];

export default function ComptabilitePage() {
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");

  const totalRevenue = transactions.filter((t) => t.type === "revenue").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const profit = totalRevenue - totalExpenses;
  const margin = Math.round((profit / totalRevenue) * 100);
  const maxMonthly = Math.max(...monthlyData.map((m) => m.revenue));

  const expensesByCategory: Record<string, number> = {};
  transactions.filter((t) => t.type === "expense").forEach((t) => {
    expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Comptabilité</h1>
          <p className="text-sm text-text-muted">Le Privilège Lounge — Mars 2026</p>
        </div>
        <div className="flex gap-1 bg-surface rounded-lg p-1">
          {(["week", "month", "year"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                period === p ? "bg-gold/20 text-gold" : "text-text-muted hover:text-foreground"
              }`}
            >
              {p === "week" ? "Semaine" : p === "month" ? "Mois" : "Année"}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-success/10"><TrendingUp size={18} className="text-success" /></div>
            <span className="text-xs text-success font-medium">+18%</span>
          </div>
          <p className="text-xl font-bold">{(totalRevenue / 1000).toFixed(0)}k</p>
          <p className="text-xs text-text-muted">Revenus (FCFA)</p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-danger/10"><TrendingDown size={18} className="text-danger" /></div>
            <span className="text-xs text-danger font-medium">+5%</span>
          </div>
          <p className="text-xl font-bold">{(totalExpenses / 1000).toFixed(0)}k</p>
          <p className="text-xs text-text-muted">Dépenses (FCFA)</p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-gold/10"><Wallet size={18} className="text-gold" /></div>
          </div>
          <p className="text-xl font-bold text-gold">{(profit / 1000).toFixed(0)}k</p>
          <p className="text-xs text-text-muted">Bénéfice net</p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-info/10"><Receipt size={18} className="text-info" /></div>
          </div>
          <p className="text-xl font-bold">{margin}%</p>
          <p className="text-xs text-text-muted">Marge nette</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 glass rounded-xl p-5">
          <h3 className="font-semibold mb-4">Évolution 6 mois</h3>
          <div className="space-y-3">
            {monthlyData.map((m) => (
              <div key={m.month} className="flex items-center gap-3">
                <span className="text-xs text-text-muted w-8">{m.month}</span>
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-surface-lighter rounded-full overflow-hidden">
                    <div className="h-full bg-success/60 rounded-full" style={{ width: `${(m.revenue / maxMonthly) * 100}%` }} />
                  </div>
                  <div className="h-3 bg-surface-lighter rounded-full overflow-hidden">
                    <div className="h-full bg-danger/40 rounded-full" style={{ width: `${(m.expenses / maxMonthly) * 100}%` }} />
                  </div>
                </div>
                <div className="text-right text-xs w-20">
                  <p className="text-success">{(m.revenue / 1000000).toFixed(1)}M</p>
                  <p className="text-danger">{(m.expenses / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-success/60 rounded" /> Revenus</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-danger/40 rounded" /> Dépenses</span>
          </div>
        </div>

        {/* Expenses breakdown */}
        <div className="glass rounded-xl p-5">
          <h3 className="font-semibold mb-4">Répartition dépenses</h3>
          <div className="space-y-3">
            {Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1]).map(([cat, amount]) => {
              const percent = Math.round((amount / totalExpenses) * 100);
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text-muted">{cat}</span>
                    <span className="font-medium">{(amount / 1000).toFixed(0)}k F</span>
                  </div>
                  <div className="h-1.5 bg-surface-lighter rounded-full overflow-hidden">
                    <div className="h-full bg-gold/60 rounded-full" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="glass rounded-xl">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold">Dernières transactions</h2>
        </div>
        <div className="divide-y divide-border">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-surface-light/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${tx.type === "revenue" ? "bg-success/10" : "bg-danger/10"}`}>
                  {tx.type === "revenue" ? <ArrowUpRight size={16} className="text-success" /> : <ArrowDownRight size={16} className="text-danger" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{tx.label}</p>
                  <p className="text-xs text-text-dim">{tx.category} • {new Date(tx.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</p>
                </div>
              </div>
              <span className={`font-bold text-sm ${tx.type === "revenue" ? "text-success" : "text-danger"}`}>
                {tx.type === "revenue" ? "+" : "-"}{tx.amount.toLocaleString("fr-FR")} F
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
