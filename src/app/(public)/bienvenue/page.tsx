"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, Clock, Star, ArrowRight, UtensilsCrossed, Navigation } from "lucide-react";

const data: Record<string, { name: string; type: string; emoji: string; desc: string; address: string; phone: string; hours: Record<string, string>; rating: number; reviews: number; gradient: string; menuHighlights: { emoji: string; name: string; price: number }[]; reviewsList: { name: string; rating: number; text: string }[] }> = {
  "le-privilege": {
    name: "Le Privilège Lounge", type: "Bar Lounge", emoji: "🍸",
    desc: "Le bar lounge le plus exclusif de Libreville. Cocktails signatures, ambiance feutrée et musique live.",
    address: "Boulevard de l'Indépendance, Quartier Louis, Libreville", phone: "+241 74 12 34 56",
    hours: { "Lun-Jeu": "17h - 02h", "Ven-Sam": "17h - 05h", Dim: "16h - 00h" },
    rating: 4.7, reviews: 128, gradient: "from-gold/30 to-amber-900/30",
    menuHighlights: [
      { emoji: "🍹", name: "Mojito", price: 4000 }, { emoji: "🍺", name: "Heineken", price: 2000 },
      { emoji: "🥃", name: "Hennessy VS", price: 7000 }, { emoji: "🍹", name: "Passion", price: 5000 },
      { emoji: "🍢", name: "Brochettes", price: 3000 }, { emoji: "🍗", name: "Ailes poulet", price: 3500 },
    ],
    reviewsList: [
      { name: "Éric M.", rating: 5, text: "Meilleur lounge de Libreville, les cocktails sont incroyables !" },
      { name: "Nathalie O.", rating: 4, text: "Ambiance top, service un peu lent en soirée" },
      { name: "Pascal D.", rating: 5, text: "L'endroit parfait pour se détendre après le boulot" },
    ],
  },
  "chez-mama-rose": {
    name: "Chez Mama Rose", type: "Restaurant", emoji: "🍽️",
    desc: "Cuisine gabonaise authentique et plats africains dans une ambiance chaleureuse et familiale.",
    address: "Rue de la Mission, Quartier Glass, Libreville", phone: "+241 77 98 76 54",
    hours: { "Lun-Sam": "11h - 23h", Dim: "12h - 22h" },
    rating: 4.8, reviews: 215, gradient: "from-red-800/30 to-orange-900/30",
    menuHighlights: [
      { emoji: "🍗", name: "Poulet braisé", price: 5000 }, { emoji: "🐟", name: "Poisson braisé", price: 6000 },
      { emoji: "🥬", name: "Ndolè", price: 4500 }, { emoji: "🍲", name: "Nyembwé", price: 5500 },
      { emoji: "🔥", name: "Brochettes mixtes", price: 4000 }, { emoji: "🍫", name: "Gâteau chocolat", price: 3000 },
    ],
    reviewsList: [
      { name: "Paul B.", rating: 5, text: "Le meilleur poulet braisé de la ville, sans hésitation" },
      { name: "Sandrine N.", rating: 4, text: "Cuisine authentique, portions généreuses" },
      { name: "Marc A.", rating: 5, text: "Les plats de Mama Rose me rappellent ceux de ma grand-mère" },
    ],
  },
  "club-241": {
    name: "Club 241", type: "Boîte de nuit", emoji: "🎵",
    desc: "La boîte de nuit #1 de Libreville. Soirées thématiques, DJs internationaux et carrés VIP.",
    address: "Avenue Léon Mba, Centre-ville, Libreville", phone: "+241 66 55 44 33",
    hours: { "Jeu-Sam": "22h - 06h", "Dim-Mer": "Fermé" },
    rating: 4.5, reviews: 89, gradient: "from-purple-800/30 to-pink-900/30",
    menuHighlights: [
      { emoji: "🍾", name: "Moët & Chandon", price: 120000 }, { emoji: "🥃", name: "Hennessy VS", price: 75000 },
      { emoji: "🍸", name: "Belvedere", price: 65000 }, { emoji: "🍹", name: "Long Island", price: 6000 },
      { emoji: "💨", name: "Chicha premium", price: 20000 }, { emoji: "🥤", name: "Red Bull", price: 3000 },
    ],
    reviewsList: [
      { name: "Kevin A.", rating: 5, text: "Les soirées au Club 241 sont les meilleures ! DJ Maleek assure" },
      { name: "Lise E.", rating: 4, text: "Bonne ambiance mais prix VIP un peu élevés" },
      { name: "Junior M.", rating: 5, text: "La sono est incroyable, meilleur son de Libreville" },
    ],
  },
};

function BienvenueContent() {
  const params = useSearchParams();
  const slug = params.get("e") ?? "le-privilege";
  const venue = data[slug] ?? data["le-privilege"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className={`relative bg-gradient-to-br ${venue.gradient} py-16 px-4 text-center`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-lg mx-auto">
          <span className="text-6xl">{venue.emoji}</span>
          <h1 className="text-3xl font-black mt-4">{venue.name}</h1>
          <span className="inline-block mt-2 text-xs bg-gold/20 text-gold px-3 py-1 rounded-full font-medium">{venue.type}</span>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Star size={14} className="text-gold fill-gold" />
            <span className="text-sm font-bold">{venue.rating}</span>
            <span className="text-xs text-text-muted">({venue.reviews} avis)</span>
          </div>
          <p className="text-sm text-text-muted mt-3 max-w-md mx-auto">{venue.desc}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Action buttons */}
        <div className="grid grid-cols-4 gap-3">
          <a href={`tel:${venue.phone}`} className="flex flex-col items-center gap-1 p-3 glass rounded-xl hover:border-gold/20">
            <Phone size={18} className="text-gold" /><span className="text-[10px] text-text-muted">Appeler</span>
          </a>
          <a href={`https://wa.me/${venue.phone.replace(/[^0-9]/g, "")}`} className="flex flex-col items-center gap-1 p-3 glass rounded-xl hover:border-success/20">
            <MessageCircle size={18} className="text-success" /><span className="text-[10px] text-text-muted">WhatsApp</span>
          </a>
          <button className="flex flex-col items-center gap-1 p-3 glass rounded-xl hover:border-info/20">
            <Navigation size={18} className="text-info" /><span className="text-[10px] text-text-muted">Itinéraire</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3 glass rounded-xl hover:border-white/20">
            <MapPin size={18} className="text-text-muted" /><span className="text-[10px] text-text-muted">Partager</span>
          </button>
        </div>

        {/* Hours */}
        <div className="glass rounded-xl p-4">
          <h3 className="font-semibold flex items-center gap-2 mb-3"><Clock size={16} className="text-gold" /> Horaires</h3>
          <div className="space-y-1.5">
            {Object.entries(venue.hours).map(([day, time]) => (
              <div key={day} className="flex justify-between text-sm">
                <span className="text-text-muted">{day}</span>
                <span className={time === "Fermé" ? "text-danger" : ""}>{time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Menu highlights */}
        <div>
          <h3 className="font-semibold mb-3">Notre carte</h3>
          <div className="grid grid-cols-2 gap-3">
            {venue.menuHighlights.map((item) => (
              <div key={item.name} className="glass rounded-xl p-3 flex items-center gap-3">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gold font-bold">{item.price.toLocaleString("fr-FR")} F</p>
                </div>
              </div>
            ))}
          </div>
          <Link href={`/menu-public?e=${slug}`} className="flex items-center justify-center gap-1 mt-3 text-sm text-gold hover:underline">
            Voir le menu complet <ArrowRight size={14} />
          </Link>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="font-semibold mb-3">Avis clients</h3>
          <div className="space-y-3">
            {venue.reviewsList.map((r) => (
              <div key={r.name} className="glass rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{r.name}</span>
                  <div className="flex">{Array.from({ length: r.rating }, (_, i) => <Star key={i} size={12} className="text-gold fill-gold" />)}</div>
                </div>
                <p className="text-xs text-text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="glass rounded-xl p-4">
          <h3 className="font-semibold flex items-center gap-2 mb-2"><MapPin size={16} className="text-gold" /> Adresse</h3>
          <p className="text-sm text-text-muted">{venue.address}</p>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-xs text-text-dim">Powered by <span className="text-gradient-gold font-bold">NightLife</span></p>
        </div>
      </div>
    </div>
  );
}

export default function BienvenuePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><span className="text-gradient-gold text-2xl font-black">NightLife</span></div>}>
      <BienvenueContent />
    </Suspense>
  );
}
