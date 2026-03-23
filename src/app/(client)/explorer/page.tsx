"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Clock, Star, ArrowRight } from "lucide-react";

const filters = ["Tout", "Bars", "Restaurants", "Clubs"];

const venues = [
  { slug: "le-privilege", name: "Le Privilège Lounge", type: "Bar Lounge", cat: "Bars", rating: 4.7, reviews: 128, address: "Blvd de l'Indépendance, Quartier Louis", hours: "17h - 02h", open: true, distance: "1.2 km", gradient: "from-gold/20 to-amber-900/20", emoji: "🍸" },
  { slug: "chez-mama-rose", name: "Chez Mama Rose", type: "Restaurant", cat: "Restaurants", rating: 4.8, reviews: 215, address: "Rue de la Mission, Quartier Glass", hours: "11h - 23h", open: true, distance: "2.5 km", gradient: "from-red-800/20 to-orange-900/20", emoji: "🍽️" },
  { slug: "club-241", name: "Club 241", type: "Boîte de nuit", cat: "Clubs", rating: 4.5, reviews: 89, address: "Avenue Léon Mba, Centre-ville", hours: "22h - 06h", open: false, distance: "3.1 km", gradient: "from-purple-800/20 to-pink-900/20", emoji: "🎵" },
];

export default function ExplorerPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tout");

  const filtered = venues
    .filter((v) => filter === "Tout" || v.cat === filter)
    .filter((v) => v.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-4 space-y-4">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher un établissement..." className="w-full pl-10 pr-4 py-3 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50" />
      </div>

      <div className="flex gap-2">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-full text-sm font-medium ${filter === f ? "bg-gold/15 text-gold" : "bg-surface-light text-text-muted"}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((v) => (
          <Link key={v.slug} href={`/bienvenue?e=${v.slug}`} className="block glass rounded-2xl overflow-hidden hover:border-gold/20 transition-all">
            <div className={`h-24 bg-gradient-to-r ${v.gradient} flex items-center justify-center`}>
              <span className="text-5xl">{v.emoji}</span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold">{v.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${v.open ? "bg-success/15 text-success" : "bg-white/5 text-text-dim"}`}>
                  {v.open ? "Ouvert" : "Fermé"}
                </span>
              </div>
              <span className="text-xs text-gold">{v.type}</span>
              <div className="flex flex-wrap gap-3 mt-2 text-xs text-text-muted">
                <span className="flex items-center gap-1"><Star size={12} className="text-gold" /> {v.rating} ({v.reviews})</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {v.distance}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {v.hours}</span>
              </div>
              <p className="text-xs text-text-dim mt-1">{v.address}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
