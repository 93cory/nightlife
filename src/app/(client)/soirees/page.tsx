"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils/format";
import { useToast } from "@/components/ui/Toast";

const EVENTS = [
  { id: "1", name: "AfroVibes Night", venue: "Luxury Lounge", date: "Ven 21 Mars", time: "22h00", emoji: "🎵", price: 5000, gradient: "from-[#1a0a2e]/80 to-[#3d1a5e]/40", description: "La meilleure soirée afrobeat de Libreville avec DJ Kwame en live. Ambiance garantie jusqu'à 5h.", spots: 28, capacity: 200, tags: ["Afrobeat", "Live DJ"] },
  { id: "2", name: "DJ Mix Master Live", venue: "Le Privilege", date: "Sam 22 Mars", time: "23h00", emoji: "🎧", price: 3000, gradient: "from-[#2e0a1a]/80 to-[#5e1a3d]/40", description: "Set exclusif de 4h. House, Amapiano & Deep Techno. Sound system Funktion One.", spots: 45, capacity: 150, tags: ["House", "Techno"] },
  { id: "3", name: "Soirée Champagne VIP", venue: "Duplex Club", date: "Ven 28 Mars", time: "21h00", emoji: "🍾", price: 15000, gradient: "from-[#1a1200]/80 to-[#3d2e00]/40", description: "Soirée ultra-exclusive. Champagne Moët & Dom Pérignon à volonté pour les VIP. Dress code exigé.", spots: 12, capacity: 80, tags: ["VIP", "Champagne"] },
  { id: "4", name: "Reggae Sunday", venue: "Le Jardin", date: "Dim 23 Mars", time: "18h00", emoji: "🌴", price: 0, gradient: "from-[#0a2e1a]/80 to-[#1a5e3d]/40", description: "Vibes reggae chill en plein air au bord de l'océan. Entrée gratuite. BBQ & cocktails.", spots: 120, capacity: 300, tags: ["Reggae", "Plein air"] },
  { id: "5", name: "Ladies Night", venue: "Crystal Bar", date: "Jeu 27 Mars", time: "22h00", emoji: "💃", price: 2000, gradient: "from-[#2e0a2e]/80 to-[#5e1a5e]/40", description: "Entrée gratuite pour les dames avant minuit. Cocktails spéciaux -50%. Show danseurs.", spots: 65, capacity: 180, tags: ["Ladies", "Cocktails"] },
  { id: "6", name: "Hip-Hop Fridays", venue: "Block Party", date: "Ven 4 Avr", time: "23h00", emoji: "🎤", price: 5000, gradient: "from-[#1a0a0a]/80 to-[#3d1a1a]/40", description: "Rap gabonais & international. Open mic, battles de freestyle, showcases artistes locaux.", spots: 90, capacity: 250, tags: ["Hip-Hop", "Rap"] },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function SoireesPage() {
  const [reserved, setReserved] = useState<Set<string>>(new Set());
  const toast = useToast((s) => s.add);

  function handleReserve(ev: typeof EVENTS[0]) {
    setReserved((prev) => new Set(prev).add(ev.id));
    toast(
      ev.price === 0 ? `Inscrit à ${ev.name} !` : `Place réservée pour ${ev.name}`,
      "gold",
      ev.emoji
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
        <h1 className="font-display text-[24px] tracking-[0.15em] text-cream">Soirées</h1>
        <p className="text-[10px] text-muted mt-0.5">{EVENTS.length} événements à venir à Libreville</p>
      </motion.div>

      {/* Featured */}
      <motion.div variants={fadeUp} className="px-5 mt-3">
        <div className={`relative overflow-hidden rounded-[22px] border border-white/[0.06] bg-gradient-to-br ${EVENTS[0].gradient}`}>
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-accent/20 border border-accent/30 text-[8px] text-accent tracking-wider font-medium">
              CE WEEK-END
            </span>
          </div>
          <div className="h-32 flex items-center justify-center">
            <span className="text-5xl animate-float">{EVENTS[0].emoji}</span>
          </div>
          <div className="px-5 pb-5">
            <h2 className="text-lg font-semibold text-cream">{EVENTS[0].name}</h2>
            <p className="text-[10px] text-muted mt-0.5">
              📍 {EVENTS[0].venue} · 🗓️ {EVENTS[0].date} · 🕐 {EVENTS[0].time}
            </p>
            <p className="text-[10px] text-muted/70 mt-2 leading-relaxed">{EVENTS[0].description}</p>
            <div className="flex items-center gap-1.5 mt-2">
              {EVENTS[0].tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[8px] text-muted tracking-wider">{tag}</span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="font-display text-2xl text-gold tracking-wider">{formatPrice(EVENTS[0].price)} XAF</p>
                <p className="text-[8px] text-success mt-0.5">{EVENTS[0].spots} places restantes</p>
              </div>
              <button
                onClick={() => handleReserve(EVENTS[0])}
                disabled={reserved.has(EVENTS[0].id)}
                className={`px-6 py-3 rounded-xl text-[11px] tracking-wider font-bold transition-all btn-press ${
                  reserved.has(EVENTS[0].id)
                    ? "bg-success/15 text-success border border-success/30"
                    : "bg-gradient-to-r from-gold to-gold-light text-night-black"
                }`}
              >
                {reserved.has(EVENTS[0].id) ? "✓ RÉSERVÉ" : "RÉSERVER"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* List */}
      <div className="px-5 mt-4 space-y-3">
        {EVENTS.slice(1).map((ev) => (
          <motion.div
            key={ev.id}
            variants={fadeUp}
            className={`card overflow-hidden bg-gradient-to-r ${ev.gradient} btn-press`}
          >
            <div className="flex items-stretch">
              <div className="w-20 flex items-center justify-center shrink-0">
                <span className="text-3xl">{ev.emoji}</span>
              </div>
              <div className="flex-1 py-3.5 pr-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[12px] font-semibold text-cream truncate">{ev.name}</h3>
                    <p className="text-[9px] text-muted mt-0.5">{ev.venue} · {ev.date} · {ev.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  {ev.tags.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded-full bg-white/[0.06] text-[7px] text-muted/70 tracking-wider">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2.5">
                  <div>
                    <p className="font-display text-sm text-gold tracking-wider">
                      {ev.price === 0 ? "GRATUIT" : `${formatPrice(ev.price)} XAF`}
                    </p>
                    <p className="text-[7px] text-muted">{ev.spots} places</p>
                  </div>
                  <button
                    onClick={() => handleReserve(ev)}
                    disabled={reserved.has(ev.id)}
                    className={`px-4 py-2 rounded-lg text-[9px] tracking-wider font-medium transition-all btn-press ${
                      reserved.has(ev.id)
                        ? "bg-success/15 text-success border border-success/30"
                        : "bg-gold/15 text-gold border border-gold/30"
                    }`}
                  >
                    {reserved.has(ev.id) ? "✓ RÉSERVÉ" : ev.price === 0 ? "PARTICIPER" : "RÉSERVER"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
