"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store/cartStore";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils/format";
import CartDrawer from "@/components/client/CartDrawer";
import type { MenuItem, MenuCategory } from "@/lib/types";

const MENU: MenuItem[] = [
  // Boissons
  { id: "b1", name: "Régab Pression", description: "La fierté du Gabon · 50cl · Bien fraîche", price: 1000, category: "boissons", emoji: "🍺", available: true, venueId: "v1", sortOrder: 1 },
  { id: "b2", name: "Castel Beer", description: "Blonde légère · 33cl", price: 800, category: "boissons", emoji: "🍺", available: true, venueId: "v1", sortOrder: 2 },
  { id: "b3", name: "Heineken", description: "Importée · 33cl", price: 1500, category: "boissons", emoji: "🍺", available: true, venueId: "v1", sortOrder: 3 },
  { id: "b4", name: "Whisky JB", description: "Verre · 4cl · Glace en option", price: 4500, category: "boissons", emoji: "🥃", available: true, venueId: "v1", sortOrder: 4 },
  { id: "b5", name: "Whisky Red Label", description: "Verre · 4cl", price: 3500, category: "boissons", emoji: "🥃", available: true, venueId: "v1", sortOrder: 5 },
  { id: "b6", name: "Rhum Bacardi", description: "Blanc · 4cl", price: 3000, category: "boissons", emoji: "🥃", available: true, venueId: "v1", sortOrder: 6 },
  { id: "b7", name: "Coca-Cola", description: "Bouteille · 50cl", price: 500, category: "boissons", emoji: "🥤", available: true, venueId: "v1", sortOrder: 7 },
  { id: "b8", name: "Jus de Mangue", description: "Frais pressé · Local", price: 1000, category: "boissons", emoji: "🥭", available: true, venueId: "v1", sortOrder: 8 },
  { id: "b9", name: "Eau Minérale", description: "50cl", price: 300, category: "boissons", emoji: "💧", available: true, venueId: "v1", sortOrder: 9 },
  // Food
  { id: "f1", name: "Brochettes Mixtes", description: "Bœuf + Poulet · Sauce piment maison", price: 2500, category: "food", emoji: "🍗", available: true, venueId: "v1", sortOrder: 10 },
  { id: "f2", name: "Poisson Braisé", description: "Tilapia entier · Attiéké ou frites", price: 5000, category: "food", emoji: "🐟", available: true, venueId: "v1", sortOrder: 11 },
  { id: "f3", name: "Plantain Frit (Alloco)", description: "Croustillant · Sauce tomate pimentée", price: 1500, category: "food", emoji: "🍌", available: true, venueId: "v1", sortOrder: 12 },
  { id: "f4", name: "Poulet DG", description: "Poulet directeur général · Plantain", price: 4500, category: "food", emoji: "🍗", available: true, venueId: "v1", sortOrder: 13 },
  { id: "f5", name: "Crevettes Grillées", description: "6 pièces · Ail & beurre citronné", price: 6000, category: "food", emoji: "🦐", available: true, venueId: "v1", sortOrder: 14 },
  { id: "f6", name: "Wings Buffalo", description: "8 pièces · Sauce piquante", price: 3000, category: "food", emoji: "🍗", available: true, venueId: "v1", sortOrder: 15 },
  { id: "f7", name: "Frites Maison", description: "Portion généreuse · Ketchup", price: 1000, category: "food", emoji: "🍟", available: true, venueId: "v1", sortOrder: 16 },
  { id: "f8", name: "Salade Caesar", description: "Poulet grillé · Parmesan · Croutons", price: 3500, category: "food", emoji: "🥗", available: true, venueId: "v1", sortOrder: 17 },
  // Cocktails
  { id: "c1", name: "Mojito Africain", description: "Rhum · Menthe · Gingembre · Citron vert", price: 4000, category: "cocktails", emoji: "🍸", available: true, venueId: "v1", sortOrder: 18 },
  { id: "c2", name: "Tropical Sunset", description: "Rhum · Mangue · Passion · Citron", price: 3500, category: "cocktails", emoji: "🍹", available: true, venueId: "v1", sortOrder: 19 },
  { id: "c3", name: "Gabon Sour", description: "Whisky · Citron · Sucre de canne · Safou", price: 4500, category: "cocktails", emoji: "🥃", available: true, venueId: "v1", sortOrder: 20 },
  { id: "c4", name: "Piña Colada", description: "Rhum · Coco · Ananas", price: 3500, category: "cocktails", emoji: "🍹", available: true, venueId: "v1", sortOrder: 21 },
  { id: "c5", name: "Caïpirinha", description: "Cachaça · Citron vert · Sucre", price: 3500, category: "cocktails", emoji: "🍸", available: true, venueId: "v1", sortOrder: 22 },
  { id: "c6", name: "Virgin Mojito", description: "Sans alcool · Menthe · Citron · Gingembre", price: 2000, category: "cocktails", emoji: "🌿", available: true, venueId: "v1", sortOrder: 23 },
  { id: "c7", name: "Cocktail Maison", description: "Création du barman · Surprise", price: 5000, category: "cocktails", emoji: "✨", available: true, venueId: "v1", sortOrder: 24 },
  // Bouteilles
  { id: "bt1", name: "Moët & Chandon", description: "Champagne · 75cl · Brut Impérial", price: 45000, category: "bouteilles", emoji: "🍾", available: true, venueId: "v1", sortOrder: 25 },
  { id: "bt2", name: "Hennessy VS", description: "Cognac · 70cl", price: 35000, category: "bouteilles", emoji: "🥃", available: true, venueId: "v1", sortOrder: 26 },
  { id: "bt3", name: "Chivas Regal 12", description: "Whisky · 70cl · 12 ans d'âge", price: 40000, category: "bouteilles", emoji: "🥃", available: true, venueId: "v1", sortOrder: 27 },
  { id: "bt4", name: "Grey Goose", description: "Vodka premium · 70cl", price: 38000, category: "bouteilles", emoji: "🍸", available: true, venueId: "v1", sortOrder: 28 },
  { id: "bt5", name: "Dom Pérignon", description: "Champagne · 75cl · Vintage", price: 120000, category: "bouteilles", emoji: "🍾", available: true, venueId: "v1", sortOrder: 29 },
  { id: "bt6", name: "Belaire Rosé", description: "Vin mousseux · 75cl", price: 25000, category: "bouteilles", emoji: "🌹", available: true, venueId: "v1", sortOrder: 30 },
];

const CATEGORIES = [
  { value: "all", label: "Tout", emoji: "🔥" },
  { value: "boissons", label: "Boissons", emoji: "🍺" },
  { value: "food", label: "Food", emoji: "🍗" },
  { value: "cocktails", label: "Cocktails", emoji: "🍸" },
  { value: "bouteilles", label: "Bouteilles", emoji: "🍾" },
];

const TAGS: Record<string, { label: string; color: string }> = {
  b1: { label: "Populaire", color: "bg-gold/15 text-gold" },
  c1: { label: "Populaire", color: "bg-gold/15 text-gold" },
  c7: { label: "Nouveau", color: "bg-purple/15 text-purple" },
  bt5: { label: "Premium", color: "bg-info/15 text-info" },
  f2: { label: "Chef", color: "bg-success/15 text-success" },
  f4: { label: "Populaire", color: "bg-gold/15 text-gold" },
};

const categoryBg: Record<string, string> = {
  boissons: "bg-gold/8",
  food: "bg-success/8",
  cocktails: "bg-purple/8",
  bouteilles: "bg-info/8",
};

const categoryLabels: Record<string, string> = {
  boissons: "🥃 Alcools & Bières",
  food: "🍗 Food & Snacks",
  cocktails: "🍸 Cocktails & Soft",
  bouteilles: "🍾 Bouteilles Premium",
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const addItem = useCartStore((s) => s.addItem);
  const items = useCartStore((s) => s.items);
  const cartTotal = items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const toast = useToast((s) => s.add);

  const filtered = useMemo(() => {
    let list = MENU.filter((i) => i.available);
    if (activeCategory !== "all") list = list.filter((i) => i.category === activeCategory);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }
    return list;
  }, [activeCategory, search]);

  const grouped = useMemo(() => {
    const g: Record<string, MenuItem[]> = {};
    filtered.forEach((item) => {
      if (!g[item.category]) g[item.category] = [];
      g[item.category].push(item);
    });
    return g;
  }, [filtered]);

  function handleAdd(item: MenuItem) {
    addItem(item);
    setAddedId(item.id);
    toast(`${item.name} ajouté`, "gold", item.emoji);
    setTimeout(() => setAddedId(null), 600);
  }

  return (
    <div className="no-scrollbar">
      {/* Header */}
      <div className="px-5 pt-5 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-[24px] tracking-[0.15em] text-cream">Menu</h1>
            <p className="text-[9px] text-muted">{MENU.length} articles disponibles</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-gold tracking-wider font-display">TABLE 7</p>
            <p className="text-[8px] text-muted">Service continu</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 pb-3">
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm opacity-40">🔍</span>
          <input
            className="w-full input-dark py-3 pl-10 pr-4 text-[12px] text-cream placeholder:text-muted/40"
            placeholder="Rechercher un article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 px-5 pb-3 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`relative px-3.5 py-2 rounded-xl text-[10px] tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 btn-press ${
              activeCategory === cat.value
                ? "bg-gold/15 border border-gold/30 text-gold font-medium"
                : "bg-dark-3 border border-white/[0.04] text-muted"
            }`}
          >
            <span className="text-xs">{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="px-5 pb-28">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <p className="text-[11px] font-semibold text-cream tracking-wider mt-4 mb-2.5">
              {categoryLabels[category] || category}
            </p>
            <div className="space-y-2">
              {items.map((item) => {
                const tag = TAGS[item.id];
                const isAdded = addedId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    className="card p-3.5 flex items-center gap-3"
                    animate={isAdded ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 ${categoryBg[item.category] || "bg-dark-3"}`}>
                      {item.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-[11px] font-medium text-cream truncate">{item.name}</p>
                        {tag && (
                          <span className={`px-1.5 py-0.5 rounded-full text-[7px] tracking-wider shrink-0 ${tag.color}`}>
                            {tag.label}
                          </span>
                        )}
                      </div>
                      <p className="text-[8px] text-muted mt-0.5 truncate">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <p className="font-display text-sm text-cream tracking-wider">
                        {formatPrice(item.price)}
                      </p>
                      <button
                        onClick={() => handleAdd(item)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all btn-press ${
                          isAdded
                            ? "bg-success/20 text-success scale-110"
                            : "bg-gold/12 text-gold hover:bg-gold/20"
                        }`}
                      >
                        {isAdded ? "✓" : "+"}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3 opacity-20">🔍</div>
            <p className="text-[11px] text-muted">Aucun résultat pour &quot;{search}&quot;</p>
          </div>
        )}
      </div>

      {/* Cart FAB */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-24 left-5 right-5 z-40 max-w-[calc(28rem-40px)] mx-auto"
          >
            <button
              onClick={() => setCartOpen(true)}
              className="w-full bg-gradient-to-r from-gold to-gold-light rounded-2xl py-3.5 px-5 flex items-center justify-between shadow-lg shadow-gold/20 btn-press"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-night-black/20 flex items-center justify-center">
                  <span className="text-base">🛒</span>
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-night-black">{cartCount} article{cartCount > 1 ? "s" : ""}</p>
                  <p className="text-[8px] text-night-black/60">Voir le panier</p>
                </div>
              </div>
              <p className="font-display text-lg text-night-black">{formatPrice(cartTotal)} XAF</p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
