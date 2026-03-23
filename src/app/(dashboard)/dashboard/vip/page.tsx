"use client";

import { useState } from "react";
import { Crown, Users, DollarSign, Check, X, Clock } from "lucide-react";
import { vipAreas } from "@/lib/demo/data";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  available: { label: "Disponible", color: "text-success", bg: "bg-success/20" },
  reserved: { label: "Réservé", color: "text-warning", bg: "bg-warning/20" },
  occupied: { label: "Occupé", color: "text-danger", bg: "bg-danger/20" },
};

export default function VipPage() {
  const [areas, setAreas] = useState(vipAreas);

  const available = areas.filter((a) => a.status === "available").length;
  const reserved = areas.filter((a) => a.status === "reserved").length;
  const occupied = areas.filter((a) => a.status === "occupied").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Carrés VIP</h1>
          <p className="text-sm text-text-muted">Club 241 — Gestion des espaces VIP</p>
        </div>
        <button className="px-4 py-2 bg-gradient-gold text-black font-semibold rounded-xl text-sm hover:opacity-90 transition-all">
          + Ajouter un carré
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-success">{available}</p>
          <p className="text-xs text-text-muted">Disponibles</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-warning">{reserved}</p>
          <p className="text-xs text-text-muted">Réservés</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-danger">{occupied}</p>
          <p className="text-xs text-text-muted">Occupés</p>
        </div>
      </div>

      {/* VIP Areas Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {areas.map((area) => {
          const status = statusConfig[area.status] || statusConfig.available;
          return (
            <div key={area.id} className="glass rounded-xl p-5 hover:glow-gold transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{area.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <Crown size={24} className="text-gold" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-text-muted">
                  <span className="flex items-center gap-1"><Users size={14} /> Capacité</span>
                  <span className="font-medium text-foreground">{area.capacity} pers.</span>
                </div>
                <div className="flex items-center justify-between text-text-muted">
                  <span className="flex items-center gap-1"><DollarSign size={14} /> Minimum</span>
                  <span className="font-medium text-gold">{area.minSpend.toLocaleString("fr-FR")} F</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                {area.status === "available" && (
                  <button
                    onClick={() => setAreas(areas.map((a) => a.id === area.id ? { ...a, status: "reserved" } : a))}
                    className="flex-1 py-2 bg-gold/10 text-gold text-sm font-medium rounded-lg hover:bg-gold/20 transition-all"
                  >
                    Réserver
                  </button>
                )}
                {area.status === "reserved" && (
                  <>
                    <button
                      onClick={() => setAreas(areas.map((a) => a.id === area.id ? { ...a, status: "occupied" } : a))}
                      className="flex-1 py-2 bg-success/10 text-success text-sm font-medium rounded-lg hover:bg-success/20 transition-all flex items-center justify-center gap-1"
                    >
                      <Check size={14} /> Occuper
                    </button>
                    <button
                      onClick={() => setAreas(areas.map((a) => a.id === area.id ? { ...a, status: "available" } : a))}
                      className="py-2 px-3 bg-danger/10 text-danger text-sm rounded-lg hover:bg-danger/20 transition-all"
                    >
                      <X size={14} />
                    </button>
                  </>
                )}
                {area.status === "occupied" && (
                  <button
                    onClick={() => setAreas(areas.map((a) => a.id === area.id ? { ...a, status: "available" } : a))}
                    className="flex-1 py-2 bg-surface-light text-text-muted text-sm font-medium rounded-lg hover:bg-surface-lighter transition-all"
                  >
                    Libérer
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
