"use client";

import { useState } from "react";
import { Clock, Percent, Wine, ToggleLeft, ToggleRight } from "lucide-react";

interface HappyHour {
  id: string;
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
  discount: number;
  products: string[];
  isActive: boolean;
}

const initialHappyHours: HappyHour[] = [
  {
    id: "hh-001",
    name: "After Work",
    days: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
    startTime: "17:00",
    endTime: "19:00",
    discount: 30,
    products: ["Bières", "Cocktails classiques", "Tapas"],
    isActive: true,
  },
  {
    id: "hh-002",
    name: "Ladies Night",
    days: ["Jeu"],
    startTime: "20:00",
    endTime: "23:00",
    discount: 50,
    products: ["Cocktails", "Champagne au verre"],
    isActive: true,
  },
  {
    id: "hh-003",
    name: "Weekend Vibes",
    days: ["Ven", "Sam"],
    startTime: "22:00",
    endTime: "00:00",
    discount: 20,
    products: ["Shots", "Long drinks"],
    isActive: false,
  },
];

export default function HappyHoursPage() {
  const [hours, setHours] = useState(initialHappyHours);

  function toggleActive(id: string) {
    setHours(hours.map((h) => h.id === id ? { ...h, isActive: !h.isActive } : h));
  }

  const activeCount = hours.filter((h) => h.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Happy Hours</h1>
          <p className="text-sm text-text-muted">Le Privilège Lounge — Promotions automatiques</p>
        </div>
        <button className="px-4 py-2 bg-gradient-gold text-black font-semibold rounded-xl text-sm hover:opacity-90 transition-all">
          + Nouveau Happy Hour
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gold">{hours.length}</p>
          <p className="text-xs text-text-muted">Happy Hours configurés</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-success">{activeCount}</p>
          <p className="text-xs text-text-muted">Actifs</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">-{hours.reduce((max, h) => Math.max(max, h.discount), 0)}%</p>
          <p className="text-xs text-text-muted">Réduction max</p>
        </div>
      </div>

      {/* Happy Hours list */}
      <div className="space-y-4">
        {hours.map((hh) => (
          <div
            key={hh.id}
            className={`glass rounded-xl p-5 transition-all ${
              hh.isActive ? "border-gold/20 glow-gold" : "opacity-60"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Wine size={18} className="text-gold" />
                  {hh.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {hh.days.map((day) => (
                    <span key={day} className="text-[10px] bg-surface-light px-2 py-0.5 rounded-full text-text-muted">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => toggleActive(hh.id)}
                className="text-text-muted hover:text-gold transition-colors"
              >
                {hh.isActive ? <ToggleRight size={28} className="text-gold" /> : <ToggleLeft size={28} />}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-text-dim" />
                <span className="text-text-muted">{hh.startTime} → {hh.endTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Percent size={14} className="text-text-dim" />
                <span className="text-gold font-bold">-{hh.discount}%</span>
              </div>
              <div className="text-text-muted">
                {hh.products.join(", ")}
              </div>
            </div>

            {hh.isActive && (
              <div className="mt-3 px-3 py-2 bg-gold/5 border border-gold/10 rounded-lg">
                <p className="text-xs text-gold">
                  🟢 Bannière automatique affichée sur la page publique pendant les heures actives
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
