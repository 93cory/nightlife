"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Minus, ShoppingBag, Trash2, MapPin, Clock, Check } from "lucide-react";
import { establishments, menuCategories, menuItems } from "@/lib/demo/data";

function CommanderContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("e") || "chez-mama-rose";
  const mode = searchParams.get("mode") || "collect"; // collect or delivery
  const est = establishments.find((e) => e.slug === slug) || establishments[1];
  const categories = menuCategories.filter((c) => c.establishmentId === est.id);
  const items = menuItems.filter((i) => i.establishmentId === est.id && i.isAvailable);

  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [step, setStep] = useState<"menu" | "cart" | "info" | "confirmed">("menu");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const filteredItems = items.filter((i) => !activeCategory || i.categoryId === activeCategory);
  const cartItems = Object.entries(cart).filter(([, qty]) => qty > 0);
  const cartTotal = cartItems.reduce((sum, [id, qty]) => {
    const item = items.find((i) => i.id === id);
    return sum + (item?.price || 0) * qty;
  }, 0);
  const cartCount = cartItems.reduce((sum, [, qty]) => sum + qty, 0);

  function addToCart(id: string) {
    setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
  }
  function removeFromCart(id: string) {
    const newQty = (cart[id] || 0) - 1;
    if (newQty <= 0) {
      const { [id]: _, ...rest } = cart;
      setCart(rest);
    } else {
      setCart({ ...cart, [id]: newQty });
    }
  }

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Commande confirmée !</h2>
          <p className="text-text-muted mb-2">
            {mode === "delivery" ? "Livraison estimée : 30-45 min" : "Prête dans ~20 min"}
          </p>
          <p className="text-2xl font-bold text-gold mb-6">{cartTotal.toLocaleString("fr-FR")} FCFA</p>
          <p className="text-sm text-text-dim mb-8">
            Un SMS de confirmation sera envoyé au {phone}
          </p>
          <Link href={`/bienvenue?e=${slug}`} className="inline-block bg-gradient-gold text-black font-semibold px-6 py-3 rounded-xl">
            Retour
          </Link>
        </div>
      </div>
    );
  }

  if (step === "info") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-8">
          <button onClick={() => setStep("cart")} className="flex items-center gap-2 text-sm text-gold mb-6">
            <ArrowLeft size={14} /> Retour au panier
          </button>
          <h2 className="text-xl font-bold mb-6">{mode === "delivery" ? "Livraison" : "Click & Collect"}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-muted mb-1">Nom complet</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jean-Baptiste MBA" className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50" />
            </div>
            <div>
              <label className="block text-sm text-text-muted mb-1">Téléphone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+241 77 00 00 00" className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50" />
            </div>
            {mode === "delivery" && (
              <div>
                <label className="block text-sm text-text-muted mb-1">Adresse de livraison</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2} placeholder="Quartier, rue, repère..." className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm resize-none focus:outline-none focus:border-gold/50" />
              </div>
            )}
            {mode === "collect" && (
              <div className="glass rounded-xl p-4">
                <p className="text-sm font-medium flex items-center gap-2"><MapPin size={14} className="text-gold" /> Retrait à</p>
                <p className="text-xs text-text-muted mt-1">{est.name} — {est.address}</p>
                <p className="text-xs text-text-dim mt-1 flex items-center gap-1"><Clock size={12} /> Prêt dans ~20 minutes</p>
              </div>
            )}
            <div className="glass rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-muted">Sous-total</span>
                <span>{cartTotal.toLocaleString("fr-FR")} F</span>
              </div>
              {mode === "delivery" && (
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-text-muted">Livraison</span>
                  <span>1 500 F</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gold border-t border-border pt-2 mt-2">
                <span>Total</span>
                <span>{(cartTotal + (mode === "delivery" ? 1500 : 0)).toLocaleString("fr-FR")} FCFA</span>
              </div>
            </div>
            <button
              onClick={() => setStep("confirmed")}
              disabled={!name || !phone || (mode === "delivery" && !address)}
              className="w-full py-3.5 bg-gradient-gold text-black font-semibold rounded-xl disabled:opacity-40"
            >
              Confirmer la commande
            </button>
            <p className="text-[10px] text-text-dim text-center">Paiement via Airtel Money / Moov Money à la réception</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === "cart") {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-8">
          <button onClick={() => setStep("menu")} className="flex items-center gap-2 text-sm text-gold mb-6">
            <ArrowLeft size={14} /> Modifier la commande
          </button>
          <h2 className="text-xl font-bold mb-4">Votre panier</h2>
          <div className="space-y-3 mb-6">
            {cartItems.map(([id, qty]) => {
              const item = items.find((i) => i.id === id);
              if (!item) return null;
              return (
                <div key={id} className="glass rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gold">{item.price.toLocaleString("fr-FR")} F</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => removeFromCart(id)} className="w-8 h-8 rounded-lg bg-surface-light flex items-center justify-center text-text-muted"><Minus size={14} /></button>
                    <span className="w-6 text-center font-bold text-sm">{qty}</span>
                    <button onClick={() => addToCart(id)} className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold"><Plus size={14} /></button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="glass rounded-xl p-4 mb-4">
            <div className="flex justify-between font-bold text-gold">
              <span>Total</span>
              <span>{cartTotal.toLocaleString("fr-FR")} FCFA</span>
            </div>
          </div>
          <button onClick={() => setStep("info")} className="w-full py-3.5 bg-gradient-gold text-black font-semibold rounded-xl">
            Continuer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-gold/10 to-transparent">
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <Link href={`/bienvenue?e=${slug}`} className="p-2 rounded-lg bg-surface border border-border text-text-muted">
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="text-xl font-bold">{mode === "delivery" ? "Livraison" : "Click & Collect"}</h1>
              <p className="text-xs text-text-muted">{est.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeCategory === cat.id ? "bg-gold/20 text-gold border border-gold/30" : "bg-surface border border-border text-text-muted"}`}>
                <span>{cat.emoji}</span>{cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface/50 border border-border">
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-text-dim">{item.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gold whitespace-nowrap">{item.price.toLocaleString("fr-FR")} F</span>
                {cart[item.id] ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-lg bg-surface-light flex items-center justify-center text-text-muted"><Minus size={12} /></button>
                    <span className="w-5 text-center text-sm font-bold">{cart[item.id]}</span>
                    <button onClick={() => addToCart(item.id)} className="w-7 h-7 rounded-lg bg-gold/20 flex items-center justify-center text-gold"><Plus size={12} /></button>
                  </div>
                ) : (
                  <button onClick={() => addToCart(item.id)} className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold hover:bg-gold/20 transition-all">
                    <Plus size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/95 backdrop-blur-lg border-t border-border">
          <div className="max-w-2xl mx-auto">
            <button onClick={() => setStep("cart")} className="w-full py-3.5 bg-gradient-gold text-black font-semibold rounded-xl flex items-center justify-center gap-2">
              <ShoppingBag size={18} /> Voir le panier ({cartCount}) — {cartTotal.toLocaleString("fr-FR")} F
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CommanderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-text-muted">Chargement...</div>}>
      <CommanderContent />
    </Suspense>
  );
}
