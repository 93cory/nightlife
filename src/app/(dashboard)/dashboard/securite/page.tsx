"use client";

import { useState } from "react";
import { Shield, Users, AlertTriangle, Clock, ArrowUp, ArrowDown, Plus } from "lucide-react";

const initialLog = [
  { id: 1, time: "23:15", type: "entry", count: 12, note: "Groupe VIP arrivé" },
  { id: 2, time: "23:30", type: "entry", count: 8, note: "" },
  { id: 3, time: "23:45", type: "entry", count: 15, note: "Début affluence" },
  { id: 4, time: "00:00", type: "exit", count: 3, note: "" },
  { id: 5, time: "00:15", type: "entry", count: 20, note: "Peak" },
  { id: 6, time: "00:30", type: "incident", count: 0, note: "Altercation mineure — résolue par sécurité" },
  { id: 7, time: "01:00", type: "exit", count: 8, note: "" },
];

export default function SecuritePage() {
  const [log] = useState(initialLog);
  const maxCapacity = 500;
  const totalIn = log.filter((l) => l.type === "entry").reduce((s, l) => s + l.count, 0);
  const totalOut = log.filter((l) => l.type === "exit").reduce((s, l) => s + l.count, 0);
  const currentCount = totalIn - totalOut;
  const incidents = log.filter((l) => l.type === "incident").length;
  const fillPercent = Math.round((currentCount / maxCapacity) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sécurité</h1>
          <p className="text-sm text-text-muted">Club 241 — Contrôle des entrées</p>
        </div>
        <button className="px-4 py-2 bg-gradient-gold text-black font-semibold rounded-xl text-sm hover:opacity-90 transition-all flex items-center gap-1">
          <Plus size={16} /> Nouveau log
        </button>
      </div>

      {/* Capacity gauge */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Jauge de capacité</h2>
          <span className={`text-sm font-bold ${fillPercent > 80 ? "text-danger" : fillPercent > 60 ? "text-warning" : "text-success"}`}>
            {fillPercent}%
          </span>
        </div>
        <div className="h-4 bg-surface-lighter rounded-full overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              fillPercent > 80 ? "bg-danger" : fillPercent > 60 ? "bg-warning" : "bg-success"
            }`}
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-text-muted">
          <span>{currentCount} personnes</span>
          <span>Max: {maxCapacity}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <Users size={20} className="mx-auto mb-2 text-gold" />
          <p className="text-2xl font-bold">{currentCount}</p>
          <p className="text-xs text-text-muted">Présents</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <ArrowUp size={20} className="mx-auto mb-2 text-success" />
          <p className="text-2xl font-bold text-success">{totalIn}</p>
          <p className="text-xs text-text-muted">Entrées</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <ArrowDown size={20} className="mx-auto mb-2 text-info" />
          <p className="text-2xl font-bold text-info">{totalOut}</p>
          <p className="text-xs text-text-muted">Sorties</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <AlertTriangle size={20} className="mx-auto mb-2 text-danger" />
          <p className="text-2xl font-bold text-danger">{incidents}</p>
          <p className="text-xs text-text-muted">Incidents</p>
        </div>
      </div>

      {/* Log */}
      <div className="glass rounded-xl">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold">Journal de la soirée</h2>
        </div>
        <div className="divide-y divide-border">
          {log.map((entry) => (
            <div key={entry.id} className="flex items-center gap-4 p-4 hover:bg-surface-light/50 transition-colors">
              <span className="text-sm font-mono text-text-dim w-12">{entry.time}</span>
              <div className={`p-1.5 rounded-lg ${
                entry.type === "entry" ? "bg-success/10" : entry.type === "exit" ? "bg-info/10" : "bg-danger/10"
              }`}>
                {entry.type === "entry" ? <ArrowUp size={16} className="text-success" /> :
                 entry.type === "exit" ? <ArrowDown size={16} className="text-info" /> :
                 <AlertTriangle size={16} className="text-danger" />}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium">
                  {entry.type === "entry" ? `+${entry.count} entrées` :
                   entry.type === "exit" ? `-${entry.count} sorties` :
                   "Incident"}
                </span>
                {entry.note && <p className="text-xs text-text-muted">{entry.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
