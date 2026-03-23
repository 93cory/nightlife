"use client";

import { useState } from "react";
import { Clock, RotateCcw, Star } from "lucide-react";

const tabs = [{ id: "all", l: "Toutes" }, { id: "active", l: "En cours" }, { id: "done", l: "Terminées" }];

const orders = [
  { id: "CMD-047", venue: "Le Privilège Lounge", date: "Aujourd'hui 21:15", items: ["2x Heineken", "1x Mojito"], total: 8000, status: "served", active: true },
  { id: "CMD-041", venue: "Le Privilège Lounge", date: "Hier 20:30", items: ["2x Mojito", "1x Plantain frit"], total: 9500, status: "paid", active: false },
  { id: "CMD-035", venue: "Chez Mama Rose", date: "Mar 18 Mars", items: ["1x Poulet braisé", "2x Bissap"], total: 7000, status: "paid", active: false },
  { id: "CMD-028", venue: "Le Privilège Lounge", date: "Sam 15 Mars", items: ["3x Heineken"], total: 6000, status: "paid", active: false },
  { id: "CMD-022", venue: "Club 241", date: "Ven 14 Mars", items: ["1x Hennessy VS", "4x Red Bull"], total: 87000, status: "paid", active: false },
  { id: "CMD-018", venue: "Chez Mama Rose", date: "Mer 12 Mars", items: ["1x Ndolè", "1x Castel"], total: 6000, status: "paid", active: false },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "En attente", color: "bg-warning/15 text-warning" },
  preparing: { label: "En préparation", color: "bg-info/15 text-info" },
  served: { label: "Servi", color: "bg-success/15 text-success" },
  paid: { label: "Payé", color: "bg-white/5 text-text-dim" },
};

export default function MesCommandesPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? orders : filter === "active" ? orders.filter((o) => o.active) : orders.filter((o) => !o.active);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Mes Commandes</h1>
      <div className="flex gap-1">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setFilter(t.id)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${filter === t.id ? "bg-gold/15 text-gold" : "text-text-muted"}`}>{t.l}</button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((o) => {
          const s = statusLabels[o.status];
          return (
            <div key={o.id} className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-gold text-sm">{o.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
                </div>
                <span className="text-xs text-text-dim">{o.date}</span>
              </div>
              <p className="text-xs text-text-muted mb-1">{o.venue}</p>
              <p className="text-sm">{o.items.join(", ")}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="font-bold">{o.total.toLocaleString("fr-FR")} F</span>
                {!o.active && (
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-xs text-gold hover:underline"><RotateCcw size={12} /> Recommander</button>
                    <button className="flex items-center gap-1 text-xs text-text-muted hover:text-gold"><Star size={12} /> Avis</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
