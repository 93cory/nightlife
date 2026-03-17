"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";

const VENUES = [
  {
    id: "luxury",
    name: "Luxury Lounge",
    type: "Bar Lounge",
    address: "Bd du Bord de Mer, Libreville",
    rating: 4.8,
    reviews: 342,
    emoji: "🍸",
    gradient: "from-gold/15 to-gold/5",
    status: "open",
    distance: "0.3 km",
    hours: "18h → 03h",
    features: ["VIP", "DJ Live", "Terrasse"],
  },
  {
    id: "privilege",
    name: "Le Privilege",
    type: "Club & Bar",
    address: "Quartier Glass, Libreville",
    rating: 4.6,
    reviews: 218,
    emoji: "🎵",
    gradient: "from-purple/15 to-purple/5",
    status: "open",
    distance: "1.2 km",
    hours: "20h → 05h",
    features: ["Dancefloor", "Bottle Service"],
  },
  {
    id: "duplex",
    name: "Duplex Club",
    type: "Nightclub",
    address: "Av. de l'Indépendance, Libreville",
    rating: 4.4,
    reviews: 156,
    emoji: "🎧",
    gradient: "from-info/15 to-info/5",
    status: "open",
    distance: "2.5 km",
    hours: "22h → 06h",
    features: ["3 Salles", "Fumoir"],
  },
  {
    id: "crystal",
    name: "Crystal Bar",
    type: "Cocktail Bar",
    address: "Centre-ville, Libreville",
    rating: 4.7,
    reviews: 89,
    emoji: "✨",
    gradient: "from-accent/15 to-accent/5",
    status: "closed",
    distance: "3.1 km",
    hours: "17h → 01h",
    features: ["Cocktails", "Rooftop"],
  },
  {
    id: "jardin",
    name: "Le Jardin",
    type: "Bar Restaurant",
    address: "La Sablière, Libreville",
    rating: 4.5,
    reviews: 203,
    emoji: "🌴",
    gradient: "from-success/15 to-success/5",
    status: "open",
    distance: "4.0 km",
    hours: "12h → 00h",
    features: ["Plein air", "BBQ", "Reggae"],
  },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function EtablissementsPage() {
  const router = useRouter();
  const toast = useToast((s) => s.add);
  const [search, setSearch] = useState("");

  const filtered = search
    ? VENUES.filter((v) =>
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.type.toLowerCase().includes(search.toLowerCase())
      )
    : VENUES;

  function handleSelect(venue: typeof VENUES[0]) {
    if (venue.status === "closed") {
      toast(`${venue.name} est actuellement fermé`, "info", "🔒");
      return;
    }
    toast(`${venue.name} sélectionné`, "gold", venue.emoji);
    router.push("/accueil");
  }

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <p className="text-[10px] text-muted/60 tracking-[0.2em] uppercase">Bienvenue</p>
        <h1 className="font-display text-[26px] tracking-[0.12em] text-cream mt-0.5">Où sortez-vous ?</h1>
        <p className="text-[10px] text-muted mt-1">{VENUES.filter((v) => v.status === "open").length} établissements ouverts à Libreville</p>
      </motion.div>

      {/* Search */}
      <motion.div variants={fadeUp} className="px-5 mt-3 mb-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">🔍</span>
          <input
            className="input-dark w-full pl-9 pr-4 py-3 text-[11px] text-cream"
            placeholder="Rechercher un bar, club, restaurant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Near You */}
      <motion.div variants={fadeUp} className="px-5 mb-2">
        <p className="text-[11px] font-semibold text-cream">📍 Près de vous</p>
      </motion.div>

      {/* Venues */}
      <div className="px-5 space-y-2.5">
        {filtered.map((venue) => (
          <motion.button
            key={venue.id}
            variants={fadeUp}
            onClick={() => handleSelect(venue)}
            className={`w-full text-left card overflow-hidden bg-gradient-to-r ${venue.gradient} btn-press ${
              venue.status === "closed" ? "opacity-50" : ""
            }`}
          >
            <div className="p-4 flex items-start gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-dark-3/50 border border-white/[0.06] flex items-center justify-center text-2xl shrink-0">
                {venue.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[13px] font-semibold text-cream truncate">{venue.name}</h3>
                  {venue.status === "open" ? (
                    <span className="px-1.5 py-0.5 rounded-full bg-success/15 border border-success/25 text-[7px] text-success tracking-wider">OUVERT</span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded-full bg-dark-3 border border-white/[0.06] text-[7px] text-muted tracking-wider">FERMÉ</span>
                  )}
                </div>
                <p className="text-[9px] text-muted mt-0.5">{venue.type} · {venue.address}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px]">⭐</span>
                    <span className="text-[9px] text-gold font-display">{venue.rating}</span>
                    <span className="text-[8px] text-muted">({venue.reviews})</span>
                  </div>
                  <span className="text-[8px] text-muted">📍 {venue.distance}</span>
                  <span className="text-[8px] text-muted">🕐 {venue.hours}</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {venue.features.map((f) => (
                    <span key={f} className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.04] text-[7px] text-muted/70 tracking-wider">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-muted/20 text-sm mt-1">›</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
