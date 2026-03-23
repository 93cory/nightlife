"use client";

import { useState } from "react";
import { Search, Plus, ToggleLeft, ToggleRight, Edit, Trash2 } from "lucide-react";

const categories = ["Tout", "🍺 Bières", "🍸 Cocktails", "🥃 Spiritueux", "🥤 Softs", "🍽️ Food"];

const initialItems = [
  { id: 1, emoji: "🍺", name: "Castel", desc: "Bière blonde locale 65cl", price: 1500, cost: 500, cat: "🍺 Bières", available: true },
  { id: 2, emoji: "🍺", name: "Régab", desc: "La fierté du Gabon 65cl", price: 1000, cost: 400, cat: "🍺 Bières", available: true },
  { id: 3, emoji: "🍺", name: "Heineken", desc: "Premium lager 33cl", price: 2000, cost: 800, cat: "🍺 Bières", available: true },
  { id: 4, emoji: "🍺", name: "Flag", desc: "Bière blonde 65cl", price: 1200, cost: 450, cat: "🍺 Bières", available: true },
  { id: 5, emoji: "🍺", name: "Guinness", desc: "Stout irlandaise 33cl", price: 2500, cost: 1000, cat: "🍺 Bières", available: true },
  { id: 6, emoji: "🍺", name: "Corona", desc: "Bière mexicaine 33cl", price: 3000, cost: 1200, cat: "🍺 Bières", available: false },
  { id: 7, emoji: "🍹", name: "Mojito", desc: "Rhum, menthe, citron vert", price: 4000, cost: 1200, cat: "🍸 Cocktails", available: true },
  { id: 8, emoji: "🍹", name: "Piña Colada", desc: "Rhum, coco, ananas", price: 4500, cost: 1400, cat: "🍸 Cocktails", available: true },
  { id: 9, emoji: "🍹", name: "Margarita", desc: "Tequila, triple sec, citron", price: 4000, cost: 1300, cat: "🍸 Cocktails", available: true },
  { id: 10, emoji: "🍹", name: "Passion", desc: "Rhum, fruit de la passion", price: 5000, cost: 1600, cat: "🍸 Cocktails", available: true },
  { id: 11, emoji: "🥃", name: "J. Walker Red", desc: "Whisky écossais — verre", price: 5000, cost: 1500, cat: "🥃 Spiritueux", available: true },
  { id: 12, emoji: "🥃", name: "Hennessy VS", desc: "Cognac — verre", price: 7000, cost: 2500, cat: "🥃 Spiritueux", available: true },
  { id: 13, emoji: "🥤", name: "Coca-Cola", desc: "33cl", price: 800, cost: 300, cat: "🥤 Softs", available: true },
  { id: 14, emoji: "🥤", name: "Red Bull", desc: "25cl", price: 3000, cost: 1200, cat: "🥤 Softs", available: true },
  { id: 15, emoji: "💧", name: "Eau minérale", desc: "50cl", price: 500, cost: 150, cat: "🥤 Softs", available: true },
  { id: 16, emoji: "🍢", name: "Brochettes bœuf", desc: "3 pièces, sauce piment", price: 3000, cost: 1200, cat: "🍽️ Food", available: true },
  { id: 17, emoji: "🍗", name: "Ailes de poulet", desc: "6 pièces, sauce BBQ", price: 3500, cost: 1400, cat: "🍽️ Food", available: true },
  { id: 18, emoji: "🍌", name: "Plantain frit", desc: "Alloco croustillant", price: 1500, cost: 400, cat: "🍽️ Food", available: true },
];

export default function MenuPage() {
  const [items, setItems] = useState(initialItems);
  const [cat, setCat] = useState("Tout");
  const [search, setSearch] = useState("");

  const filtered = items
    .filter((i) => cat === "Tout" || i.cat === cat)
    .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  const toggle = (id: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, available: !i.available } : i)));
  };

  const available = items.filter((i) => i.available).length;
  const unavailable = items.length - available;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Menu / Carte</h1>
          <p className="text-sm text-text-muted">{available} disponibles · {unavailable} épuisés</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-gold text-black px-4 py-2 rounded-xl text-sm font-semibold">
          <Plus size={16} /> Ajouter un produit
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Rechercher..." className="w-full pl-9 pr-4 py-2 bg-surface-light border border-border rounded-lg text-sm focus:outline-none focus:border-gold/50" />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${cat === c ? "bg-gold/15 text-gold" : "text-text-muted hover:bg-surface-light"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((item) => {
          const margin = Math.round(((item.price - item.cost) / item.price) * 100);
          return (
            <div key={item.id} className={`glass rounded-xl p-4 transition-all ${!item.available ? "opacity-50" : "hover:border-gold/20"}`}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl">{item.emoji}</span>
                <button onClick={() => toggle(item.id)} className="text-text-muted">
                  {item.available ? <ToggleRight size={24} className="text-success" /> : <ToggleLeft size={24} />}
                </button>
              </div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-xs text-text-muted mt-0.5">{item.desc}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-gold">{item.price.toLocaleString("fr-FR")} F</span>
                <span className="text-xs text-success">{margin}% marge</span>
              </div>
              <p className="text-[10px] text-text-dim mt-1">Coût: {item.cost.toLocaleString("fr-FR")} F</p>
              {!item.available && <span className="inline-block mt-2 text-xs text-danger bg-danger/10 px-2 py-0.5 rounded-full">Épuisé</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
