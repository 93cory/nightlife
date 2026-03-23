"use client";

import { useState } from "react";
import { Ticket, QrCode, Users, DollarSign, TrendingUp, Check, X, Search, Calendar } from "lucide-react";
import { events } from "@/lib/demo/data";

interface TicketEntry {
  id: string;
  eventId: string;
  buyerName: string;
  buyerPhone: string;
  type: "normal" | "vip" | "vvip";
  quantity: number;
  total: number;
  status: "valid" | "used" | "cancelled";
  purchasedAt: string;
  qrCode: string;
}

const demoTickets: TicketEntry[] = [
  { id: "tkt-001", eventId: "evt-001", buyerName: "Kevin Akure", buyerPhone: "+241 77 12 34 56", type: "vip", quantity: 2, total: 30000, status: "valid", purchasedAt: "2026-03-22T14:30:00", qrCode: "NL-EVT001-VIP-001" },
  { id: "tkt-002", eventId: "evt-001", buyerName: "Sandra Mintsa", buyerPhone: "+241 74 98 76 54", type: "normal", quantity: 4, total: 20000, status: "valid", purchasedAt: "2026-03-22T16:00:00", qrCode: "NL-EVT001-NRM-002" },
  { id: "tkt-003", eventId: "evt-001", buyerName: "Junior Moussavou", buyerPhone: "+241 66 55 44 33", type: "vvip", quantity: 1, total: 30000, status: "used", purchasedAt: "2026-03-21T20:00:00", qrCode: "NL-EVT001-VVIP-003" },
  { id: "tkt-004", eventId: "evt-001", buyerName: "Lise Engonga", buyerPhone: "+241 77 11 22 33", type: "normal", quantity: 2, total: 10000, status: "cancelled", purchasedAt: "2026-03-20T10:00:00", qrCode: "NL-EVT001-NRM-004" },
  { id: "tkt-005", eventId: "evt-001", buyerName: "Marc Ondo", buyerPhone: "+241 74 44 55 66", type: "vip", quantity: 3, total: 45000, status: "valid", purchasedAt: "2026-03-23T09:00:00", qrCode: "NL-EVT001-VIP-005" },
  { id: "tkt-006", eventId: "evt-002", buyerName: "Nathalie Nzé", buyerPhone: "+241 66 77 88 99", type: "normal", quantity: 2, total: 6000, status: "valid", purchasedAt: "2026-03-23T11:00:00", qrCode: "NL-EVT002-NRM-006" },
];

const typeColors: Record<string, { label: string; color: string; bg: string }> = {
  normal: { label: "Normal", color: "text-text-muted", bg: "bg-surface-light" },
  vip: { label: "VIP", color: "text-gold", bg: "bg-gold/20" },
  vvip: { label: "VVIP", color: "text-purple-400", bg: "bg-purple-500/20" },
};

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  valid: { label: "Valide", color: "text-success", bg: "bg-success/20" },
  used: { label: "Utilisé", color: "text-text-dim", bg: "bg-surface-light" },
  cancelled: { label: "Annulé", color: "text-danger", bg: "bg-danger/20" },
};

export default function BilletteriePage() {
  const [tickets, setTickets] = useState(demoTickets);
  const [selectedEvent, setSelectedEvent] = useState("evt-001");
  const [scanInput, setScanInput] = useState("");
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null);

  const eventTickets = tickets.filter((t) => t.eventId === selectedEvent);
  const event = events.find((e) => e.id === selectedEvent);
  const totalRevenue = eventTickets.filter((t) => t.status !== "cancelled").reduce((s, t) => s + t.total, 0);
  const totalTickets = eventTickets.filter((t) => t.status !== "cancelled").reduce((s, t) => s + t.quantity, 0);
  const usedTickets = eventTickets.filter((t) => t.status === "used").reduce((s, t) => s + t.quantity, 0);

  function handleScan() {
    const ticket = tickets.find((t) => t.qrCode === scanInput);
    if (!ticket) {
      setScanResult({ success: false, message: "Ticket non trouvé" });
    } else if (ticket.status === "used") {
      setScanResult({ success: false, message: "Ticket déjà utilisé !" });
    } else if (ticket.status === "cancelled") {
      setScanResult({ success: false, message: "Ticket annulé" });
    } else {
      setTickets(tickets.map((t) => t.id === ticket.id ? { ...t, status: "used" } : t));
      setScanResult({ success: true, message: `✓ ${ticket.buyerName} — ${ticket.quantity}x ${typeColors[ticket.type].label}` });
    }
    setScanInput("");
    setTimeout(() => setScanResult(null), 4000);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Billetterie</h1>
          <p className="text-sm text-text-muted">Club 241 — Vente et contrôle des tickets</p>
        </div>
      </div>

      {/* Event selector */}
      <div className="flex gap-2 overflow-x-auto">
        {events.map((evt) => (
          <button
            key={evt.id}
            onClick={() => setSelectedEvent(evt.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              selectedEvent === evt.id
                ? "bg-gold/20 text-gold border border-gold/30"
                : "bg-surface border border-border text-text-muted hover:text-foreground"
            }`}
          >
            {evt.name}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <DollarSign size={20} className="mx-auto mb-2 text-gold" />
          <p className="text-2xl font-bold text-gold">{totalRevenue.toLocaleString("fr-FR")}</p>
          <p className="text-xs text-text-muted">Recettes (FCFA)</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <Ticket size={20} className="mx-auto mb-2 text-info" />
          <p className="text-2xl font-bold">{totalTickets}</p>
          <p className="text-xs text-text-muted">Tickets vendus</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <Check size={20} className="mx-auto mb-2 text-success" />
          <p className="text-2xl font-bold text-success">{usedTickets}</p>
          <p className="text-xs text-text-muted">Entrées validées</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <Users size={20} className="mx-auto mb-2 text-text-muted" />
          <p className="text-2xl font-bold">{event ? `${Math.round((event.ticketsSold / event.maxTickets) * 100)}%` : "—"}</p>
          <p className="text-xs text-text-muted">Remplissage</p>
        </div>
      </div>

      {/* Scanner */}
      <div className="glass rounded-xl p-5">
        <h2 className="font-semibold flex items-center gap-2 mb-4">
          <QrCode size={18} className="text-gold" /> Scanner un ticket
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={scanInput}
            onChange={(e) => setScanInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleScan()}
            placeholder="Scannez le QR code ou entrez le code..."
            className="flex-1 px-4 py-3 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50"
          />
          <button
            onClick={handleScan}
            disabled={!scanInput}
            className="px-6 py-3 bg-gradient-gold text-black font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-40"
          >
            Valider
          </button>
        </div>
        {scanResult && (
          <div className={`mt-3 p-3 rounded-lg text-sm font-medium ${
            scanResult.success ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          }`}>
            {scanResult.message}
          </div>
        )}
      </div>

      {/* Tickets list */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">Tickets vendus</h2>
          <span className="text-xs text-text-muted">{eventTickets.length} tickets</span>
        </div>
        <div className="divide-y divide-border">
          {eventTickets.map((ticket) => {
            const type = typeColors[ticket.type];
            const status = statusConfig[ticket.status];
            return (
              <div key={ticket.id} className="flex items-center justify-between p-4 hover:bg-surface-light/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${type.bg}`}>
                    <Ticket size={16} className={type.color} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{ticket.buyerName}</p>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <span>{ticket.quantity}x {type.label}</span>
                      <span>•</span>
                      <span>{ticket.buyerPhone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{ticket.total.toLocaleString("fr-FR")} F</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                    {status.label}
                  </span>
                  <code className="text-[10px] text-text-dim font-mono">{ticket.qrCode}</code>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
