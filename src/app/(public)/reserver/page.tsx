"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Users, Phone, Check, MapPin } from "lucide-react";
import { establishments } from "@/lib/demo/data";

const timeSlots = [
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

function ReserverContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("e") || "chez-mama-rose";
  const est = establishments.find((e) => e.slug === slug) || establishments[1];

  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Réservation confirmée !</h2>
          <p className="text-text-muted mb-6">
            Votre table pour {guests} personnes est réservée le{" "}
            {new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}{" "}
            à {time} chez <span className="text-gold font-semibold">{est.name}</span>.
          </p>
          <p className="text-sm text-text-dim mb-8">
            Un SMS de confirmation sera envoyé au {phone}
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
      <div className="bg-gradient-to-b from-gold/10 to-transparent">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href={`/bienvenue?e=${slug}`}
              className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-foreground"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-xl font-bold">Réserver une table</h1>
              <p className="text-xs text-text-muted flex items-center gap-1">
                <MapPin size={12} /> {est.name}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 pb-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? "bg-gold text-black" : "bg-surface border border-border text-text-dim"
                }`}
              >
                {s}
              </div>
              {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? "bg-gold" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Date & Time */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-gold" /> Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground focus:outline-none focus:border-gold/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Clock size={16} className="text-gold" /> Heure
              </label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                      time === t
                        ? "bg-gold/20 text-gold border border-gold/30"
                        : "bg-surface border border-border text-text-muted hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Users size={16} className="text-gold" /> Nombre de personnes
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-12 h-12 rounded-xl bg-surface border border-border text-foreground text-lg font-bold"
                >
                  -
                </button>
                <span className="text-2xl font-bold w-12 text-center">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(20, guests + 1))}
                  className="w-12 h-12 rounded-xl bg-surface border border-border text-foreground text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => date && time && setStep(2)}
              disabled={!date || !time}
              className="w-full py-3.5 bg-gradient-gold text-black font-semibold rounded-xl disabled:opacity-40 hover:opacity-90 transition-all"
            >
              Continuer
            </button>
          </div>
        )}

        {/* Step 2: Contact */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nom complet</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jean-Baptiste MBA"
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-text-dim focus:outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Phone size={16} className="text-gold" /> Téléphone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+241 77 00 00 00"
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-text-dim focus:outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Notes (optionnel)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Anniversaire, allergies, demandes spéciales..."
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground placeholder:text-text-dim focus:outline-none focus:border-gold/50 resize-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-surface transition-all"
              >
                Retour
              </button>
              <button
                onClick={() => name && phone && setStep(3)}
                disabled={!name || !phone}
                className="flex-1 py-3.5 bg-gradient-gold text-black font-semibold rounded-xl disabled:opacity-40 hover:opacity-90 transition-all"
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="glass rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-gold">Récapitulatif</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Restaurant</span>
                  <span className="font-medium">{est.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Date</span>
                  <span className="font-medium">
                    {new Date(date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Heure</span>
                  <span className="font-medium">{time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Personnes</span>
                  <span className="font-medium">{guests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Nom</span>
                  <span className="font-medium">{name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Téléphone</span>
                  <span className="font-medium">{phone}</span>
                </div>
                {notes && (
                  <div className="flex justify-between">
                    <span className="text-text-muted">Notes</span>
                    <span className="font-medium text-right max-w-[60%]">{notes}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3.5 border border-border text-foreground font-semibold rounded-xl hover:bg-surface transition-all"
              >
                Modifier
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3.5 bg-gradient-gold text-black font-semibold rounded-xl hover:opacity-90 transition-all"
              >
                Confirmer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReserverPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-text-muted">Chargement...</div>}>
      <ReserverContent />
    </Suspense>
  );
}
