"use client";

import { Calendar, Ticket, DollarSign, Users, Music, Plus } from "lucide-react";

const events = [
  { id: 1, name: "Soirée Afrobeats", date: "Sam 28 Mars", time: "23h - 05h", normal: 5000, vip: 15000, vvip: 30000, sold: 180, max: 300, revenue: 1350000, djs: ["DJ Maleek", "DJ Black"], active: true, gradient: "from-purple-900/30 to-pink-900/30" },
  { id: 2, name: "Ladies Night", date: "Ven 3 Avril", time: "22h - 04h", normal: 3000, vip: 10000, vvip: 0, sold: 85, max: 200, revenue: 425000, djs: ["DJ Sanza"], active: true, gradient: "from-pink-900/30 to-red-900/30" },
  { id: 3, name: "Concert Live: Mink's", date: "Sam 11 Avril", time: "21h - 04h", normal: 10000, vip: 25000, vvip: 50000, sold: 450, max: 500, revenue: 8750000, djs: ["Mink's Live", "DJ Maleek"], active: true, gradient: "from-gold/20 to-amber-900/30" },
  { id: 4, name: "Soirée Champagne", date: "Sam 21 Mars", time: "Terminé", normal: 5000, vip: 15000, vvip: 0, sold: 250, max: 250, revenue: 1875000, djs: ["DJ Black"], active: false, gradient: "from-gray-800/30 to-gray-900/30" },
];

export default function EvenementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Événements</h1>
        <button className="flex items-center gap-2 bg-gradient-gold text-black px-4 py-2 rounded-xl text-sm font-semibold">
          <Plus size={16} /> Créer un événement
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4"><Calendar size={18} className="text-gold mb-2" /><p className="text-2xl font-bold">3</p><p className="text-xs text-text-muted">À venir</p></div>
        <div className="glass rounded-xl p-4"><Ticket size={18} className="text-info mb-2" /><p className="text-2xl font-bold">715</p><p className="text-xs text-text-muted">Tickets vendus</p></div>
        <div className="glass rounded-xl p-4"><DollarSign size={18} className="text-success mb-2" /><p className="text-2xl font-bold">12.4M</p><p className="text-xs text-text-muted">FCFA revenus</p></div>
        <div className="glass rounded-xl p-4"><Users size={18} className="text-warning mb-2" /><p className="text-2xl font-bold">90%</p><p className="text-xs text-text-muted">Taux remplissage</p></div>
      </div>

      <div className="space-y-4">
        {events.map((evt) => (
          <div key={evt.id} className={`rounded-2xl bg-gradient-to-r ${evt.gradient} border border-white/5 p-6 ${!evt.active ? "opacity-60" : ""}`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold">{evt.name}</h2>
                  {!evt.active && <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">Terminé</span>}
                  {evt.active && evt.sold >= evt.max && <span className="text-xs bg-danger/20 text-danger px-2 py-0.5 rounded-full">COMPLET</span>}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-text-muted">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {evt.date}</span>
                  <span>{evt.time}</span>
                  <span className="flex items-center gap-1"><Music size={14} /> {evt.djs.join(", ")}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="text-center">
                  <p className="text-xs text-text-dim">Normal</p>
                  <p className="font-bold text-gold">{evt.normal.toLocaleString("fr-FR")} F</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-text-dim">VIP</p>
                  <p className="font-bold text-gold">{evt.vip.toLocaleString("fr-FR")} F</p>
                </div>
                {evt.vvip > 0 && (
                  <div className="text-center">
                    <p className="text-xs text-text-dim">VVIP</p>
                    <p className="font-bold text-gold">{evt.vvip.toLocaleString("fr-FR")} F</p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span>{evt.sold} / {evt.max} tickets</span>
                  <span>{Math.round((evt.sold / evt.max) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gold rounded-full" style={{ width: `${(evt.sold / evt.max) * 100}%` }} />
                </div>
              </div>
              <p className="text-lg font-bold text-gold">{(evt.revenue / 1000000).toFixed(1)}M FCFA</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
