"use client";

import { useState } from "react";
import { CalendarDays, Clock, Users, Phone, Check, X, MessageCircle } from "lucide-react";

interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

const initialReservations: Reservation[] = [
  { id: "res-001", name: "Éric Moussavou", phone: "+241 77 12 34 56", date: "2026-03-23", time: "19:00", guests: 4, notes: "Anniversaire", status: "confirmed" },
  { id: "res-002", name: "Nathalie Ondo", phone: "+241 74 98 76 54", date: "2026-03-23", time: "20:30", guests: 2, notes: "", status: "pending" },
  { id: "res-003", name: "Pascal Diallo", phone: "+241 66 55 44 33", date: "2026-03-23", time: "19:30", guests: 6, notes: "Table près de la fenêtre", status: "confirmed" },
  { id: "res-004", name: "Sandra Mintsa", phone: "+241 77 11 22 33", date: "2026-03-23", time: "21:00", guests: 3, notes: "", status: "pending" },
  { id: "res-005", name: "Jean-Pierre Mba", phone: "+241 74 44 55 66", date: "2026-03-24", time: "12:30", guests: 8, notes: "Déjeuner d'affaires", status: "confirmed" },
  { id: "res-006", name: "Christelle Nzé", phone: "+241 66 77 88 99", date: "2026-03-22", time: "20:00", guests: 2, notes: "", status: "completed" },
  { id: "res-007", name: "Marc Akure", phone: "+241 77 00 11 22", date: "2026-03-22", time: "19:00", guests: 4, notes: "", status: "cancelled" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: "En attente", color: "text-warning", bg: "bg-warning/20" },
  confirmed: { label: "Confirmée", color: "text-success", bg: "bg-success/20" },
  cancelled: { label: "Annulée", color: "text-danger", bg: "bg-danger/20" },
  completed: { label: "Terminée", color: "text-text-dim", bg: "bg-surface-light" },
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState(initialReservations);
  const [filter, setFilter] = useState("all");

  const filtered = reservations.filter((r) => filter === "all" || r.status === filter);
  const todayCount = reservations.filter((r) => r.date === "2026-03-23" && r.status !== "cancelled").length;
  const pendingCount = reservations.filter((r) => r.status === "pending").length;
  const totalGuests = reservations.filter((r) => r.date === "2026-03-23" && r.status !== "cancelled").reduce((s, r) => s + r.guests, 0);

  function updateStatus(id: string, status: Reservation["status"]) {
    setReservations(reservations.map((r) => r.id === id ? { ...r, status } : r));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Réservations</h1>
          <p className="text-sm text-text-muted">Chez Mama Rose — Gestion des réservations</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <CalendarDays size={20} className="mx-auto mb-2 text-gold" />
          <p className="text-2xl font-bold">{todayCount}</p>
          <p className="text-xs text-text-muted">Aujourd&apos;hui</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <Clock size={20} className="mx-auto mb-2 text-warning" />
          <p className="text-2xl font-bold text-warning">{pendingCount}</p>
          <p className="text-xs text-text-muted">En attente</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <Users size={20} className="mx-auto mb-2 text-info" />
          <p className="text-2xl font-bold">{totalGuests}</p>
          <p className="text-xs text-text-muted">Couverts ce soir</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-1 bg-surface rounded-lg p-1 w-fit">
        {[
          { key: "all", label: "Toutes" },
          { key: "pending", label: "En attente" },
          { key: "confirmed", label: "Confirmées" },
          { key: "completed", label: "Terminées" },
          { key: "cancelled", label: "Annulées" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              filter === f.key ? "bg-gold/20 text-gold" : "text-text-muted hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Reservations */}
      <div className="space-y-3">
        {filtered.map((res) => {
          const status = statusConfig[res.status];
          const isToday = res.date === "2026-03-23";
          return (
            <div key={res.id} className={`glass rounded-xl p-4 transition-all ${isToday ? "border-gold/10" : ""}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{res.name}</h3>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                    {isToday && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gold/20 text-gold">Aujourd&apos;hui</span>}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    <span className="flex items-center gap-1"><CalendarDays size={14} /> {new Date(res.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {res.time}</span>
                    <span className="flex items-center gap-1"><Users size={14} /> {res.guests} pers.</span>
                    <span className="flex items-center gap-1"><Phone size={14} /> {res.phone}</span>
                  </div>
                  {res.notes && <p className="text-xs text-text-dim mt-1">💬 {res.notes}</p>}
                </div>
                <div className="flex items-center gap-1 ml-4">
                  {res.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(res.id, "confirmed")}
                        className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-all"
                        title="Confirmer"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => updateStatus(res.id, "cancelled")}
                        className="p-2 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-all"
                        title="Annuler"
                      >
                        <X size={16} />
                      </button>
                    </>
                  )}
                  {res.status === "confirmed" && (
                    <button
                      onClick={() => updateStatus(res.id, "completed")}
                      className="p-2 rounded-lg bg-gold/10 text-gold hover:bg-gold/20 transition-all"
                      title="Marquer terminée"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <a
                    href={`https://wa.me/${res.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-all"
                    title="WhatsApp"
                  >
                    <MessageCircle size={16} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
