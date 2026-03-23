"use client";

import { Music, Clock, DollarSign, Phone } from "lucide-react";
import { djSlots } from "@/lib/demo/data";

const genreColors: Record<string, string> = {
  "Afrobeats / Amapiano": "bg-gold/20 text-gold",
  "Hip-Hop / Trap": "bg-info/20 text-info",
  "Ndombolo / Coupé-décalé": "bg-success/20 text-success",
};

export default function DjPage() {
  const totalCost = djSlots.reduce((sum, dj) => sum + dj.rate, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">DJ Planning</h1>
          <p className="text-sm text-text-muted">Club 241 — Programme de la soirée</p>
        </div>
        <button className="px-4 py-2 bg-gradient-gold text-black font-semibold rounded-xl text-sm hover:opacity-90 transition-all">
          + Ajouter un DJ
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gold">{djSlots.length}</p>
          <p className="text-xs text-text-muted">DJs ce soir</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{djSlots[0]?.startTime} - {djSlots[djSlots.length - 1]?.endTime}</p>
          <p className="text-xs text-text-muted">Plage horaire</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gold">{totalCost.toLocaleString("fr-FR")} F</p>
          <p className="text-xs text-text-muted">Budget DJs</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="glass rounded-xl p-6">
        <h2 className="font-semibold mb-6">Timeline de la soirée</h2>
        <div className="space-y-0">
          {djSlots.map((slot, i) => (
            <div key={slot.id} className="relative flex gap-4">
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-gold border-2 border-gold/50 z-10" />
                {i < djSlots.length - 1 && (
                  <div className="w-0.5 flex-1 bg-gold/20 min-h-[80px]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="glass rounded-xl p-4 hover:border-gold/20 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Music size={18} className="text-gold" />
                        {slot.djName}
                      </h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${genreColors[slot.genre] || "bg-surface-light text-text-muted"}`}>
                        {slot.genre}
                      </span>
                    </div>
                    <span className="text-gold font-bold text-sm">
                      {slot.rate.toLocaleString("fr-FR")} F
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-text-muted">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {slot.startTime} → {slot.endTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
