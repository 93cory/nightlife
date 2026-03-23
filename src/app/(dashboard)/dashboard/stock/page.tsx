"use client";

import { useState } from "react";
import { Package, AlertTriangle, TrendingUp, Search, Plus, Minus } from "lucide-react";

const stockData = [
  { id: 1, name: "Castel", emoji: "🍺", cat: "Bières", qty: 45, min: 20, buy: 500, sell: 1500 },
  { id: 2, name: "Régab", emoji: "🍺", cat: "Bières", qty: 30, min: 15, buy: 400, sell: 1000 },
  { id: 3, name: "Heineken", emoji: "🍺", cat: "Bières", qty: 4, min: 12, buy: 800, sell: 2000 },
  { id: 4, name: "Flag", emoji: "🍺", cat: "Bières", qty: 25, min: 15, buy: 450, sell: 1200 },
  { id: 5, name: "Guinness", emoji: "🍺", cat: "Bières", qty: 18, min: 10, buy: 1000, sell: 2500 },
  { id: 6, name: "J. Walker Red", emoji: "🥃", cat: "Spiritueux", qty: 3, min: 5, buy: 15000, sell: 55000 },
  { id: 7, name: "Hennessy VS", emoji: "🥃", cat: "Spiritueux", qty: 2, min: 3, buy: 35000, sell: 75000 },
  { id: 8, name: "Absolut", emoji: "🥃", cat: "Spiritueux", qty: 8, min: 5, buy: 12000, sell: 45000 },
  { id: 9, name: "Coca-Cola", emoji: "🥤", cat: "Softs", qty: 48, min: 24, buy: 300, sell: 800 },
  { id: 10, name: "Red Bull", emoji: "🥤", cat: "Softs", qty: 6, min: 15, buy: 1200, sell: 3000 },
  { id: 11, name: "Eau minérale", emoji: "💧", cat: "Softs", qty: 60, min: 30, buy: 150, sell: 500 },
  { id: 12, name: "Jus naturel", emoji: "🧃", cat: "Softs", qty: 12, min: 8, buy: 500, sell: 1500 },
  { id: 13, name: "Citron vert", emoji: "🍋", cat: "Ingrédients", qty: 2, min: 10, buy: 200, sell: 0 },
  { id: 14, name: "Menthe", emoji: "🌿", cat: "Ingrédients", qty: 5, min: 8, buy: 300, sell: 0 },
  { id: 15, name: "Sirop sucre", emoji: "🍯", cat: "Ingrédients", qty: 3, min: 5, buy: 1500, sell: 0 },
];

const cats = ["Tout", "Bières", "Spiritueux", "Softs", "Ingrédients"];

export default function StockPage() {
  const [items, setItems] = useState(stockData);
  const [filter, setFilter] = useState("Tout");
  const [search, setSearch] = useState("");

  const filtered = items
    .filter((i) => filter === "Tout" || i.cat === filter)
    .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  const lowStock = items.filter((i) => i.qty <= i.min);
  const totalValue = items.reduce((s, i) => s + i.buy * i.qty, 0);
  const avgMargin = items.filter((i) => i.sell > 0).reduce((s, i, _, a) => s + ((i.sell - i.buy) / i.sell) * 100 / a.length, 0);

  const adjust = (id: number, delta: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestion du Stock</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2"><Package size={18} className="text-gold" /></div>
          <p className="text-2xl font-bold">{items.length}</p>
          <p className="text-xs text-text-muted">Total produits</p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2"><AlertTriangle size={18} className="text-danger" /></div>
          <p className="text-2xl font-bold text-danger">{lowStock.length}</p>
          <p className="text-xs text-text-muted">Alertes stock bas</p>
        </div>
        <div className="glass rounded-xl p-4">
          <p className="text-2xl font-bold">{totalValue.toLocaleString("fr-FR")}</p>
          <p className="text-xs text-text-muted">FCFA — Valeur du stock</p>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2"><TrendingUp size={18} className="text-success" /></div>
          <p className="text-2xl font-bold">{avgMargin.toFixed(0)}%</p>
          <p className="text-xs text-text-muted">Marge moyenne</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full pl-9 pr-4 py-2 bg-surface-light border border-border rounded-lg text-sm focus:outline-none focus:border-gold/50"
          />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                filter === c ? "bg-gold/15 text-gold" : "text-text-muted hover:bg-surface-light"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-medium text-text-dim">Produit</th>
                <th className="px-4 py-3 text-xs font-medium text-text-dim">Catégorie</th>
                <th className="px-4 py-3 text-xs font-medium text-text-dim">Stock</th>
                <th className="px-4 py-3 text-xs font-medium text-text-dim hidden sm:table-cell">Achat</th>
                <th className="px-4 py-3 text-xs font-medium text-text-dim hidden sm:table-cell">Vente</th>
                <th className="px-4 py-3 text-xs font-medium text-text-dim hidden md:table-cell">Marge</th>
                <th className="px-4 py-3 text-xs font-medium text-text-dim">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => {
                const level = item.qty <= item.min * 0.3 ? "danger" : item.qty <= item.min ? "warning" : "success";
                const margin = item.sell > 0 ? Math.round(((item.sell - item.buy) / item.sell) * 100) : 0;
                return (
                  <tr key={item.id} className="hover:bg-surface-light/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{item.emoji}</span>
                        <span className="font-medium text-sm">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-muted">{item.cat}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${level === "danger" ? "text-danger" : level === "warning" ? "text-warning" : "text-success"}`}>
                          {item.qty}
                        </span>
                        <span className="text-xs text-text-dim">/ {item.min}</span>
                      </div>
                      <div className="w-16 h-1 bg-surface-lighter rounded-full mt-1">
                        <div
                          className={`h-full rounded-full ${level === "danger" ? "bg-danger" : level === "warning" ? "bg-warning" : "bg-success"}`}
                          style={{ width: `${Math.min(100, (item.qty / item.min) * 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-text-muted hidden sm:table-cell">{item.buy.toLocaleString("fr-FR")} F</td>
                    <td className="px-4 py-3 text-sm text-text-muted hidden sm:table-cell">{item.sell > 0 ? `${item.sell.toLocaleString("fr-FR")} F` : "—"}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {margin > 0 && <span className="text-sm text-success font-medium">{margin}%</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => adjust(item.id, -1)} className="w-7 h-7 rounded bg-surface-light flex items-center justify-center text-text-muted hover:text-danger"><Minus size={14} /></button>
                        <button onClick={() => adjust(item.id, 5)} className="w-7 h-7 rounded bg-success/10 flex items-center justify-center text-success hover:bg-success/20"><Plus size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
