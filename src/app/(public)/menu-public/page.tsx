"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, ShoppingBag, Star, Clock, MapPin, Phone } from "lucide-react";
import { establishments, menuCategories, menuItems, reviews } from "@/lib/demo/data";

function MenuContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("e") || "le-privilege";
  const est = establishments.find((e) => e.slug === slug) || establishments[0];
  const categories = menuCategories.filter((c) => c.establishmentId === est.id);
  const items = menuItems.filter((i) => i.establishmentId === est.id);
  const estReviews = reviews.filter((r) => r.establishmentId === est.id);
  const avgRating = estReviews.length
    ? (estReviews.reduce((s, r) => s + r.rating, 0) / estReviews.length).toFixed(1)
    : "0";

  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) => {
    const matchCat = !activeCategory || item.categoryId === activeCategory;
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-gold/10 to-transparent">
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href={`/bienvenue?e=${slug}`}
              className="p-2 rounded-lg bg-surface border border-border text-text-muted hover:text-foreground"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-xl font-bold">{est.name}</h1>
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-gold fill-gold" /> {avgRating}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} /> {est.city}
                </span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher dans le menu..."
              className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm placeholder:text-text-dim focus:outline-none focus:border-gold/50"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? "bg-gold/20 text-gold border border-gold/30"
                    : "bg-surface border border-border text-text-muted hover:text-foreground"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                item.isAvailable
                  ? "bg-surface/50 border-border hover:border-gold/20"
                  : "bg-surface/30 border-border/50 opacity-50"
              }`}
            >
              <div className="text-3xl">{item.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{item.description}</p>
                  </div>
                  <div className="text-right ml-3">
                    <p className="font-bold text-gold">{item.price.toLocaleString("fr-FR")} F</p>
                    {!item.isAvailable && (
                      <span className="text-[10px] text-danger font-medium">Épuisé</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            <ShoppingBag size={40} className="mx-auto mb-3 text-text-dim" />
            <p>Aucun produit trouvé</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <p className="text-xs text-text-dim">
          Menu fourni par <span className="text-gold font-semibold">NightLife</span>
        </p>
        <p className="text-[10px] text-text-dim mt-1">Prix en FCFA • Sous réserve de disponibilité</p>
      </div>
    </div>
  );
}

export default function MenuPublicPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-text-muted">Chargement du menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
