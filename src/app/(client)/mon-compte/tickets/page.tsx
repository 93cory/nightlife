"use client";

import { Ticket, QrCode, Calendar, MapPin } from "lucide-react";

const tickets = [
  { id: "TKT-001", event: "Soirée Afrobeats", venue: "Club 241", date: "Sam 28 Mars 23h", type: "VIP", price: 15000, active: true, qr: "NL-EVT001-VIP-001" },
  { id: "TKT-002", event: "Soirée Champagne", venue: "Club 241", date: "Sam 21 Mars", type: "Normal", price: 5000, active: false, qr: "NL-EVT004-NRM-042" },
  { id: "TKT-003", event: "DJ Night Spéciale", venue: "Club 241", date: "Ven 7 Mars", type: "Normal", price: 3000, active: false, qr: "NL-EVT005-NRM-018" },
];

const typeBadge: Record<string, string> = {
  Normal: "bg-white/10 text-text-muted",
  VIP: "bg-gold/15 text-gold",
  VVIP: "bg-bordeaux/30 text-red-300",
};

export default function MesTicketsPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Mes Tickets</h1>

      <div className="space-y-4">
        {tickets.map((t) => (
          <div key={t.id} className={`glass rounded-2xl overflow-hidden ${!t.active ? "opacity-50" : ""}`}>
            <div className={`p-4 ${t.active ? "bg-gradient-to-r from-purple-900/20 to-pink-900/20" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">{t.event}</h3>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeBadge[t.type]}`}>{t.type}</span>
              </div>
              <div className="flex gap-4 text-xs text-text-muted">
                <span className="flex items-center gap-1"><MapPin size={12} /> {t.venue}</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {t.date}</span>
              </div>
            </div>
            {t.active && (
              <div className="p-4 border-t border-border flex flex-col items-center">
                <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center mb-3">
                  <div className="text-center">
                    <QrCode size={80} className="text-black mx-auto" />
                    <p className="text-[8px] text-black/50 mt-1 font-mono">{t.qr}</p>
                  </div>
                </div>
                <p className="text-xs text-text-muted">Montrez ce QR code à l&apos;entrée</p>
              </div>
            )}
            <div className="px-4 py-3 border-t border-border flex items-center justify-between">
              <span className="text-xs text-text-dim font-mono">{t.id}</span>
              <span className="font-bold text-gold">{t.price.toLocaleString("fr-FR")} F</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
