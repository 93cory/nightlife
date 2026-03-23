"use client";

import { useState } from "react";
import { Minus, Plus, Trash2, CreditCard, Smartphone, Banknote, X, Clock, Hash } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  emoji: string;
  price: number;
  qty: number;
}

const categories = [
  { id: "bieres", label: "🍺 Bières" },
  { id: "cocktails", label: "🍸 Cocktails" },
  { id: "spiritueux", label: "🥃 Spiritueux" },
  { id: "softs", label: "🥤 Softs" },
  { id: "food", label: "🍽️ Food" },
];

const products: Record<string, { id: string; name: string; emoji: string; price: number; stock: number }[]> = {
  bieres: [
    { id: "p1", name: "Castel", emoji: "🍺", price: 1500, stock: 45 },
    { id: "p2", name: "Régab", emoji: "🍺", price: 1000, stock: 30 },
    { id: "p3", name: "Heineken", emoji: "🍺", price: 2000, stock: 4 },
    { id: "p4", name: "Flag", emoji: "🍺", price: 1200, stock: 25 },
    { id: "p5", name: "Guinness", emoji: "🍺", price: 2500, stock: 18 },
    { id: "p6", name: "Corona", emoji: "🍺", price: 3000, stock: 0 },
    { id: "p7", name: "33 Export", emoji: "🍺", price: 1200, stock: 22 },
    { id: "p8", name: "Skol", emoji: "🍺", price: 1000, stock: 35 },
  ],
  cocktails: [
    { id: "p10", name: "Mojito", emoji: "🍹", price: 4000, stock: 99 },
    { id: "p11", name: "Piña Colada", emoji: "🍹", price: 4500, stock: 99 },
    { id: "p12", name: "Margarita", emoji: "🍹", price: 4000, stock: 99 },
    { id: "p13", name: "Sex on the Beach", emoji: "🍹", price: 4500, stock: 99 },
    { id: "p14", name: "Passion", emoji: "🍹", price: 5000, stock: 99 },
    { id: "p15", name: "Long Island", emoji: "🍹", price: 5500, stock: 99 },
  ],
  spiritueux: [
    { id: "p20", name: "J. Walker Red", emoji: "🥃", price: 5000, stock: 3 },
    { id: "p21", name: "Hennessy VS", emoji: "🥃", price: 7000, stock: 2 },
    { id: "p22", name: "Absolut", emoji: "🥃", price: 4000, stock: 8 },
    { id: "p23", name: "Chivas 12", emoji: "🥃", price: 6000, stock: 5 },
  ],
  softs: [
    { id: "p30", name: "Coca-Cola", emoji: "🥤", price: 800, stock: 48 },
    { id: "p31", name: "Red Bull", emoji: "🥤", price: 3000, stock: 6 },
    { id: "p32", name: "Eau", emoji: "💧", price: 500, stock: 60 },
    { id: "p33", name: "Jus naturel", emoji: "🧃", price: 1500, stock: 12 },
    { id: "p34", name: "Sprite", emoji: "🥤", price: 800, stock: 30 },
    { id: "p35", name: "Tonic", emoji: "🥤", price: 1000, stock: 20 },
  ],
  food: [
    { id: "p40", name: "Brochettes", emoji: "🍢", price: 3000, stock: 20 },
    { id: "p41", name: "Ailes poulet", emoji: "🍗", price: 3500, stock: 15 },
    { id: "p42", name: "Plantain frit", emoji: "🍌", price: 1500, stock: 25 },
    { id: "p43", name: "Cacahuètes", emoji: "🥜", price: 500, stock: 40 },
  ],
};

export default function CaissePage() {
  const [category, setCategory] = useState("bieres");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [table, setTable] = useState(1);
  const [orderNum] = useState(48);

  const addToCart = (product: { id: string; name: string; emoji: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)).filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartQtyMap = Object.fromEntries(cart.map((i) => [i.id, i.qty]));

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-4 lg:-m-6">
      {/* LEFT: Products */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border">
        {/* Categories */}
        <div className="flex gap-1 p-3 border-b border-border overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                category === c.id ? "bg-gold/15 text-gold" : "text-text-muted hover:bg-surface-light"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {(products[category] ?? []).map((p) => {
              const inCart = cartQtyMap[p.id] ?? 0;
              const outOfStock = p.stock === 0;
              return (
                <button
                  key={p.id}
                  onClick={() => !outOfStock && addToCart(p)}
                  disabled={outOfStock}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all min-h-[100px] ${
                    outOfStock
                      ? "opacity-40 cursor-not-allowed border-border bg-surface"
                      : "border-border hover:border-gold/30 hover:bg-gold/5 active:scale-95 bg-surface-light"
                  }`}
                >
                  <span className="text-3xl mb-2">{p.emoji}</span>
                  <span className="text-sm font-medium text-center">{p.name}</span>
                  <span className="text-sm font-bold text-gold mt-1">
                    {p.price.toLocaleString("fr-FR")} F
                  </span>
                  {p.stock <= 5 && p.stock > 0 && (
                    <span className="text-[10px] text-warning mt-1">Stock: {p.stock}</span>
                  )}
                  {outOfStock && (
                    <span className="text-[10px] text-danger mt-1">Épuisé</span>
                  )}
                  {inCart > 0 && (
                    <span className="absolute top-2 right-2 w-6 h-6 bg-gold text-black text-xs font-bold rounded-full flex items-center justify-center">
                      {inCart}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: Cart */}
      <div className="w-80 lg:w-96 flex flex-col bg-surface">
        {/* Header */}
        <div className="p-3 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Hash size={16} className="text-gold" />
              <span className="font-bold text-gold">CMD-{String(orderNum).padStart(3, "0")}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-text-dim">
              <Clock size={12} />
              {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </div>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setTable(n)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                  table === n ? "bg-gold text-black" : "bg-surface-light text-text-muted hover:text-foreground"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-dim">
              <span className="text-4xl mb-2">🛒</span>
              <p className="text-sm">Panier vide</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg bg-surface-light">
                <span className="text-xl">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <p className="text-xs text-gold">{(item.price * item.qty).toLocaleString("fr-FR")} F</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center text-text-muted hover:text-foreground">
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg bg-surface flex items-center justify-center text-text-muted hover:text-foreground">
                    <Plus size={14} />
                  </button>
                </div>
                <button onClick={() => removeItem(item.id)} className="p-1 text-text-dim hover:text-danger">
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-text-muted">Total</span>
            <span className="text-2xl font-black text-gold">{total.toLocaleString("fr-FR")} F</span>
          </div>

          {cart.length > 0 && (
            <>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border hover:border-success/30 hover:bg-success/5 transition-all">
                  <Banknote size={20} className="text-success" />
                  <span className="text-[10px] font-medium text-text-muted">Cash</span>
                </button>
                <button className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border hover:border-gold/30 hover:bg-gold/5 transition-all">
                  <Smartphone size={20} className="text-gold" />
                  <span className="text-[10px] font-medium text-text-muted">Mobile</span>
                </button>
                <button className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border hover:border-info/30 hover:bg-info/5 transition-all">
                  <CreditCard size={20} className="text-info" />
                  <span className="text-[10px] font-medium text-text-muted">Carte</span>
                </button>
              </div>
              <button className="w-full bg-gradient-gold text-black font-bold py-3.5 rounded-xl text-lg hover:opacity-90 transition-all active:scale-[0.98]">
                Encaisser — {total.toLocaleString("fr-FR")} F
              </button>
              <button onClick={clearCart} className="w-full py-2 text-sm text-text-dim hover:text-danger transition-colors">
                Annuler la commande
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
