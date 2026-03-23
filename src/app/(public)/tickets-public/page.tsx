"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock, Users, Ticket, Check, Music } from "lucide-react";
import { establishments, events } from "@/lib/demo/data";

function TicketsContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("e") || "club-241";
  const est = establishments.find((e) => e.slug === slug) || establishments[2];
  const estEvents = events.filter((e) => e.establishmentId === est.id && e.isActive);

  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [ticketType, setTicketType] = useState<"normal" | "vip" | "vvip">("normal");
  const [quantity, setQuantity] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const event = estEvents.find((e) => e.id === selectedEvent);

  const ticketPrice = event
    ? ticketType === "vvip" ? event.priceVvip
    : ticketType === "vip" ? event.priceVip
    : event.priceNormal
    : 0;

  const total = ticketPrice * quantity;

  if (confirmed && event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Tickets achetés !</h2>
          <p className="text-text-muted mb-2">
            {quantity}x {ticketType.toUpperCase()} pour{" "}
            <span className="text-gold font-semibold">{event.name}</span>
          </p>
          <p className="text-2xl font-bold text-gold mb-6">{total.toLocaleString("fr-FR")} FCFA</p>
          <p className="text-sm text-text-dim mb-8">
            Vos tickets QR seront envoyés par SMS. Présentez-les à l&apos;entrée.
          </p>
          <Link
            href={`/bienvenue?e=${slug}`}
            className="inline-block bg-gradient-gold text-black font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all"
          >
            Retour
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-900/20 to-transparent">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href={`/bienvenue?e=${slug}`}
              className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-foreground"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Billetterie</h1>
              <p className="text-xs text-text-muted flex items-center gap-1">
                <Music size={12} /> {est.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pb-8">
        {/* Event selection */}
        {!selectedEvent ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Événements à venir</h2>
            {estEvents.map((evt) => {
              const eventDate = new Date(evt.date);
              const remaining = evt.maxTickets - evt.ticketsSold;
              const percentSold = Math.round((evt.ticketsSold / evt.maxTickets) * 100);
              return (
                <button
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt.id)}
                  className="w-full text-left p-5 rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/10 border border-white/5 hover:border-gold/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{evt.name}</h3>
                      <p className="text-sm text-text-muted mt-1">{evt.description}</p>
                    </div>
                    <Ticket size={24} className="text-gold shrink-0 ml-3" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {eventDate.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {eventDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} /> {remaining} places
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold rounded-full"
                          style={{ width: `${percentSold}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-text-dim mt-1">{percentSold}% vendus</p>
                    </div>
                    <span className="text-gold font-bold">
                      dès {evt.priceNormal.toLocaleString("fr-FR")} F
                    </span>
                  </div>
                </button>
              );
            })}

            {estEvents.length === 0 && (
              <div className="text-center py-12 text-text-muted">
                <Ticket size={40} className="mx-auto mb-3 text-text-dim" />
                <p>Aucun événement prévu pour le moment</p>
              </div>
            )}
          </div>
        ) : event ? (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedEvent(null)}
              className="text-sm text-gold flex items-center gap-1 hover:underline"
            >
              <ArrowLeft size={14} /> Tous les événements
            </button>

            <div className="glass rounded-xl p-5">
              <h2 className="text-xl font-bold mb-1">{event.name}</h2>
              <p className="text-sm text-text-muted mb-4">{event.description}</p>
              <div className="flex items-center gap-4 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(event.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(event.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>

            {/* Ticket type */}
            <div>
              <h3 className="text-sm font-medium mb-3">Type de ticket</h3>
              <div className="space-y-2">
                {[
                  { type: "normal" as const, label: "Normal", price: event.priceNormal, desc: "Entrée standard" },
                  { type: "vip" as const, label: "VIP", price: event.priceVip, desc: "Accès zone VIP + 1 boisson" },
                  ...(event.priceVvip > 0 ? [{ type: "vvip" as const, label: "VVIP", price: event.priceVvip, desc: "Carré privé + bouteille" }] : []),
                ].map((t) => (
                  <button
                    key={t.type}
                    onClick={() => setTicketType(t.type)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      ticketType === t.type
                        ? "border-gold/50 bg-gold/10"
                        : "border-border bg-surface hover:border-gold/20"
                    }`}
                  >
                    <div>
                      <span className="font-semibold">{t.label}</span>
                      <p className="text-xs text-text-muted">{t.desc}</p>
                    </div>
                    <span className="font-bold text-gold">{t.price.toLocaleString("fr-FR")} F</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium mb-3">Quantité</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl bg-surface border border-border text-foreground text-lg font-bold"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-12 h-12 rounded-xl bg-surface border border-border text-foreground text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-text-muted">Total</span>
                <span className="text-2xl font-bold text-gold">{total.toLocaleString("fr-FR")} FCFA</span>
              </div>
              <button
                onClick={() => setConfirmed(true)}
                className="w-full py-3.5 bg-gradient-gold text-black font-semibold rounded-xl hover:opacity-90 transition-all"
              >
                Acheter {quantity} ticket{quantity > 1 ? "s" : ""}
              </button>
              <p className="text-[10px] text-text-dim text-center mt-2">
                Paiement sécurisé via Airtel Money / Moov Money
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function TicketsPublicPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-text-muted">Chargement...</div>}>
      <TicketsContent />
    </Suspense>
  );
}
