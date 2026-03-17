"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

const TIME_SLOTS = ["18h00", "19h00", "20h00", "21h00", "22h00", "23h00"];
const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 8, 10];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function ReservationPage() {
  const toast = useToast((s) => s.add);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("Jean-Pierre O.");
  const [phone, setPhone] = useState("+241 06");
  const [note, setNote] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    return {
      value: d.toISOString().split("T")[0],
      day: dayNames[d.getDay()],
      num: d.getDate(),
      isToday: i === 0,
      isWeekend: d.getDay() === 5 || d.getDay() === 6,
    };
  });

  function handleConfirm() {
    setConfirmed(true);
    toast("Réservation confirmée !", "gold", "📋");
  }

  if (confirmed) {
    return (
      <motion.div
        className="no-scrollbar flex flex-col items-center justify-center min-h-[70vh] px-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6 }}
        >
          🎉
        </motion.div>
        <h2 className="font-display text-[28px] tracking-[0.15em] text-gold">CONFIRMÉ !</h2>
        <p className="text-[12px] text-cream mt-2">Votre table est réservée</p>

        <div className="card-gold p-5 mt-6 w-full max-w-[260px] text-left space-y-2">
          <div className="flex justify-between text-[10px]">
            <span className="text-muted">Date</span>
            <span className="text-cream font-medium">{dates.find((d) => d.value === date)?.day} {dates.find((d) => d.value === date)?.num}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted">Heure</span>
            <span className="text-cream font-medium">{time}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted">Personnes</span>
            <span className="text-cream font-medium">{guests}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted">Nom</span>
            <span className="text-cream font-medium">{name}</span>
          </div>
        </div>

        <p className="text-[9px] text-muted mt-4">Un SMS de confirmation a été envoyé</p>

        <button
          onClick={() => router.push("/accueil")}
          className="mt-6 px-8 py-3 rounded-xl bg-gold/15 border border-gold/25 text-[11px] text-gold tracking-wider font-medium btn-press"
        >
          RETOUR À L'ACCUEIL
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[24px] tracking-[0.15em] text-cream">Réserver</h1>
        <p className="text-[9px] text-muted mt-0.5">Luxury Lounge · Libreville</p>
      </motion.div>

      {/* Progress */}
      <motion.div variants={fadeUp} className="px-5 mt-3 mb-4">
        <div className="flex gap-1.5">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${step >= s ? "bg-gold" : "bg-white/[0.06]"}`} />
          ))}
        </div>
        <p className="text-[8px] text-muted mt-1.5">
          Étape {step}/3 · {step === 1 ? "Date & heure" : step === 2 ? "Nombre de personnes" : "Informations"}
        </p>
      </motion.div>

      {/* Step 1: Date & Time */}
      {step === 1 && (
        <>
          <motion.div variants={fadeUp} className="px-5 mb-4">
            <p className="text-[11px] font-semibold text-cream mb-2.5">📅 Choisir une date</p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {dates.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDate(d.value)}
                  className={`min-w-[60px] py-3 rounded-xl text-center transition-all btn-press ${
                    date === d.value
                      ? "card-gold glow-gold"
                      : "card"
                  }`}
                >
                  <p className={`text-[8px] ${date === d.value ? "text-gold" : "text-muted"}`}>
                    {d.isToday ? "Auj." : d.day}
                  </p>
                  <p className={`font-display text-lg mt-0.5 ${date === d.value ? "text-gold" : "text-cream"}`}>
                    {d.num}
                  </p>
                  {d.isWeekend && <div className="w-1 h-1 rounded-full bg-accent mx-auto mt-1" />}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="px-5 mb-4">
            <p className="text-[11px] font-semibold text-cream mb-2.5">🕐 Choisir une heure</p>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`py-3 rounded-xl text-center text-[12px] font-display tracking-wider transition-all btn-press ${
                    time === t ? "card-gold text-gold glow-gold" : "card text-cream"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="px-5">
            <button
              onClick={() => date && time && setStep(2)}
              disabled={!date || !time}
              className={`w-full py-3.5 rounded-xl text-[11px] tracking-wider font-bold transition-all btn-press ${
                date && time
                  ? "bg-gradient-to-r from-gold to-gold-light text-night-black"
                  : "bg-dark-3 text-muted"
              }`}
            >
              CONTINUER
            </button>
          </motion.div>
        </>
      )}

      {/* Step 2: Guests */}
      {step === 2 && (
        <>
          <motion.div variants={fadeUp} className="px-5 mb-4">
            <p className="text-[11px] font-semibold text-cream mb-2.5">👥 Nombre de personnes</p>
            <div className="grid grid-cols-4 gap-2">
              {GUEST_OPTIONS.map((g) => (
                <button
                  key={g}
                  onClick={() => setGuests(g)}
                  className={`py-4 rounded-xl text-center transition-all btn-press ${
                    guests === g ? "card-gold glow-gold" : "card"
                  }`}
                >
                  <p className={`font-display text-2xl ${guests === g ? "text-gold" : "text-cream"}`}>{g}</p>
                  <p className="text-[8px] text-muted mt-0.5">pers.</p>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="px-5 mb-3">
            <p className="text-[11px] font-semibold text-cream mb-2">💬 Note (optionnel)</p>
            <textarea
              className="input-dark w-full px-3 py-2.5 text-[11px] text-cream min-h-[60px] resize-none"
              placeholder="Ex: Anniversaire, place en terrasse, fauteuil roulant..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </motion.div>

          <motion.div variants={fadeUp} className="px-5 flex gap-2">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-3.5 rounded-xl border border-white/[0.06] text-[10px] text-muted tracking-wider btn-press"
            >
              ← RETOUR
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-[2] py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-night-black text-[11px] tracking-wider font-bold btn-press"
            >
              CONTINUER
            </button>
          </motion.div>
        </>
      )}

      {/* Step 3: Contact */}
      {step === 3 && (
        <>
          <motion.div variants={fadeUp} className="px-5 space-y-3 mb-4">
            <div>
              <p className="text-[10px] text-muted mb-1.5">Nom complet</p>
              <input
                className="input-dark w-full px-3 py-2.5 text-[12px] text-cream"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <p className="text-[10px] text-muted mb-1.5">Téléphone</p>
              <input
                className="input-dark w-full px-3 py-2.5 text-[12px] text-cream"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div variants={fadeUp} className="px-5 mb-4">
            <div className="card-gold p-4">
              <p className="text-[9px] text-gold/60 tracking-wider uppercase mb-2">Récapitulatif</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">📅 Date</span>
                  <span className="text-cream">{dates.find((d) => d.value === date)?.day} {dates.find((d) => d.value === date)?.num}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">🕐 Heure</span>
                  <span className="text-cream">{time}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">👥 Personnes</span>
                  <span className="text-cream">{guests}</span>
                </div>
                {note && (
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted">💬 Note</span>
                    <span className="text-cream truncate max-w-[150px]">{note}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="px-5 flex gap-2">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-3.5 rounded-xl border border-white/[0.06] text-[10px] text-muted tracking-wider btn-press"
            >
              ← RETOUR
            </button>
            <button
              onClick={handleConfirm}
              className="flex-[2] py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-night-black text-[11px] tracking-wider font-bold btn-press"
            >
              ✓ CONFIRMER
            </button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
