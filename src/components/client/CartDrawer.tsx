"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { useOrdersStore } from "@/lib/store/ordersStore";
import { formatPrice } from "@/lib/utils/format";
import Button from "@/components/ui/Button";
import Confetti from "@/components/ui/Confetti";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const WAITERS = ["Éva", "Moussa", "Kevin"];

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, clear, total, itemCount } = useCartStore();
  const addOrder = useOrdersStore((s) => s.addOrder);
  const [tableNumber, setTableNumber] = useState(7);
  const [ordered, setOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!open) return null;

  function handleOrder() {
    const waiter = WAITERS[Math.floor(Math.random() * WAITERS.length)];
    const id = addOrder({
      table: tableNumber,
      items: items.map((i) => ({
        name: i.menuItem.name,
        quantity: i.quantity,
        price: i.menuItem.price,
        emoji: i.menuItem.emoji,
      })),
      waiter,
      totalAmount: total(),
      status: "pending",
      clientName: "Jean-Pierre",
    });
    setOrderId(id);
    setOrdered(true);
    setTimeout(() => {
      clear();
      setOrdered(false);
      onClose();
    }, 2500);
  }

  return (
    <div className="fixed inset-0 z-[60]" onClick={onClose}>
      <Confetti active={ordered} />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="absolute bottom-0 left-0 right-0 max-w-md mx-auto bg-dark-1 border-t border-gold/20 rounded-t-3xl max-h-[85vh] flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-white/10 rounded-full" />
        </div>

        <div className="px-5 pb-3 flex items-center justify-between border-b border-white/[0.04]">
          <div>
            <h2 className="font-display text-lg tracking-[0.15em] text-cream">Mon Panier</h2>
            <p className="text-[9px] text-muted">{itemCount()} article{itemCount() > 1 ? "s" : ""}</p>
          </div>
          {items.length > 0 && (
            <button onClick={clear} className="text-[9px] text-accent tracking-wider">
              VIDER
            </button>
          )}
        </div>

        {ordered ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-5">
            <div className="text-5xl mb-4 animate-bounce">✅</div>
            <p className="font-display text-xl text-gold tracking-wider">COMMANDE ENVOYÉE !</p>
            <p className="text-xs text-muted mt-2">Table {tableNumber} · {formatPrice(total())} XAF</p>
            <p className="text-[9px] text-muted mt-1">Un serveur prend en charge votre commande</p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[9px] text-gold tracking-wider">En attente de préparation</span>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-5">
            <div className="text-4xl mb-3 opacity-30">🛒</div>
            <p className="text-xs text-muted">Votre panier est vide</p>
            <p className="text-[9px] text-muted/50 mt-1">Ajoutez des articles depuis le menu</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-3 space-y-2">
              {items.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="bg-dark-2 border border-white/[0.04] rounded-xl p-3 flex items-center gap-3"
                >
                  <span className="text-xl">{item.menuItem.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-cream">{item.menuItem.name}</p>
                    <p className="text-[9px] text-gold font-display tracking-wider">
                      {formatPrice(item.menuItem.price * item.quantity)} XAF
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-dark-3 border border-white/[0.06] text-cream text-xs flex items-center justify-center active:scale-90 transition-transform"
                    >
                      −
                    </button>
                    <span className="text-xs text-cream font-medium w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-gold/15 text-gold text-xs flex items-center justify-center active:scale-90 transition-transform"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.menuItem.id)}
                    className="text-muted/50 text-xs hover:text-accent transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-white/[0.04] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted">Numéro de table</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTableNumber(Math.max(1, tableNumber - 1))}
                    className="w-7 h-7 rounded-lg bg-dark-3 border border-white/[0.06] text-cream text-xs flex items-center justify-center"
                  >
                    −
                  </button>
                  <span className="font-display text-lg text-gold w-8 text-center">{tableNumber}</span>
                  <button
                    onClick={() => setTableNumber(Math.min(20, tableNumber + 1))}
                    className="w-7 h-7 rounded-lg bg-dark-3 border border-white/[0.06] text-cream text-xs flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Total</span>
                <span className="font-display text-2xl text-gold">{formatPrice(total())} XAF</span>
              </div>

              <Button variant="gold" size="lg" onClick={handleOrder}>
                COMMANDER · TABLE {tableNumber}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
