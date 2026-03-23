"use client";

import { useState } from "react";
import { Users, Clock, DollarSign } from "lucide-react";

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  free: { bg: "bg-success/15 border-success/30", text: "text-success", label: "Libre" },
  occupied: { bg: "bg-info/15 border-info/30", text: "text-info", label: "Occupée" },
  reserved: { bg: "bg-warning/15 border-warning/30", text: "text-warning", label: "Réservée" },
  cleaning: { bg: "bg-text-dim/15 border-text-dim/30", text: "text-text-dim", label: "Nettoyage" },
};

const initialTables = [
  { id: 1, num: 1, cap: 4, status: "occupied", guests: 3, time: 45, amount: 8000, order: "CMD-047" },
  { id: 2, num: 2, cap: 2, status: "free", guests: 0, time: 0, amount: 0, order: "" },
  { id: 3, num: 3, cap: 6, status: "occupied", guests: 5, time: 25, amount: 16000, order: "CMD-044" },
  { id: 4, num: 4, cap: 4, status: "reserved", guests: 0, time: 0, amount: 0, order: "M. Ndong — 21h00" },
  { id: 5, num: 5, cap: 4, status: "occupied", guests: 2, time: 12, amount: 9500, order: "CMD-046" },
  { id: 6, num: 6, cap: 8, status: "free", guests: 0, time: 0, amount: 0, order: "" },
  { id: 7, num: 7, cap: 4, status: "cleaning", guests: 0, time: 0, amount: 0, order: "" },
  { id: 8, num: 8, cap: 2, status: "free", guests: 0, time: 0, amount: 0, order: "" },
  { id: 9, num: 9, cap: 6, status: "occupied", guests: 4, time: 5, amount: 13000, order: "CMD-048" },
  { id: 10, num: 10, cap: 4, status: "free", guests: 0, time: 0, amount: 0, order: "" },
  { id: 11, num: 11, cap: 10, status: "reserved", guests: 0, time: 0, amount: 0, order: "Groupe Elf — 22h00", vip: true },
  { id: 12, num: 12, cap: 8, status: "free", guests: 0, time: 0, amount: 0, order: "", vip: true },
];

export default function TablesPage() {
  const [tables, setTables] = useState(initialTables);
  const counts = { free: 0, occupied: 0, reserved: 0, cleaning: 0 };
  tables.forEach((t) => { counts[t.status as keyof typeof counts]++; });

  const cycleStatus = (id: number) => {
    const flow: Record<string, string> = { free: "occupied", occupied: "cleaning", cleaning: "free", reserved: "occupied" };
    setTables((prev) => prev.map((t) => (t.id === id ? { ...t, status: flow[t.status] || "free" } : t)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Plan de salle</h1>
        <div className="flex gap-3 text-sm">
          {Object.entries(counts).map(([k, v]) => (
            <span key={k} className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${statusColors[k].bg.split(" ")[0].replace("/15", "")}`} />
              <span className="text-text-muted">{v} {statusColors[k].label.toLowerCase()}{v > 1 ? "s" : ""}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {tables.map((t) => {
          const cfg = statusColors[t.status];
          return (
            <button
              key={t.id}
              onClick={() => cycleStatus(t.id)}
              className={`relative rounded-2xl border-2 p-4 transition-all hover:scale-[1.03] ${cfg.bg} ${
                (t as { vip?: boolean }).vip ? "ring-1 ring-gold/30" : ""
              }`}
            >
              {(t as { vip?: boolean }).vip && (
                <span className="absolute top-2 right-2 text-[10px] bg-gold/20 text-gold px-1.5 py-0.5 rounded-full font-bold">VIP</span>
              )}
              <p className={`text-3xl font-black ${cfg.text}`}>{t.num}</p>
              <p className="text-xs text-text-muted mt-1">{t.cap} places</p>
              {t.status === "occupied" && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Users size={10} /> {t.guests} pers.
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <Clock size={10} /> {t.time} min
                  </div>
                  <p className="text-xs font-bold text-gold">{t.amount.toLocaleString("fr-FR")} F</p>
                </div>
              )}
              {t.status === "reserved" && (
                <p className="text-[10px] text-warning mt-2 truncate">{t.order}</p>
              )}
              <span className={`block text-[10px] font-medium mt-2 ${cfg.text}`}>{cfg.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3 text-xs text-text-dim">
        <span>Cliquez sur une table pour changer son statut</span>
      </div>
    </div>
  );
}
