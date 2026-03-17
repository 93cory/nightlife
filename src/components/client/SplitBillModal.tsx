"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DemoOrder } from "@/lib/store/ordersStore";
import { useToast } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils/format";

interface SplitBillModalProps {
  order: DemoOrder | null;
  onClose: () => void;
}

type SplitMode = "equal" | "custom";

export default function SplitBillModal({ order, onClose }: SplitBillModalProps) {
  const [mode, setMode] = useState<SplitMode>("equal");
  const [people, setPeople] = useState(2);
  const [sent, setSent] = useState(false);
  const toast = useToast((s) => s.add);

  if (!order) return null;

  const perPerson = Math.ceil(order.totalAmount / people);

  function handleSend() {
    setSent(true);
    toast(`Addition partagée en ${people} · ${formatPrice(perPerson)} XAF/pers`, "gold", "💸");
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2500);
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[65]" onClick={onClose}>
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 max-w-md mx-auto bg-dark-1 border-t border-white/[0.06] rounded-t-3xl p-6"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1 bg-white/10 rounded-full" />
          </div>

          {sent ? (
            <div className="text-center py-8">
              <motion.div
                className="text-5xl mb-3"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5 }}
              >
                ✅
              </motion.div>
              <p className="font-display text-xl text-gold tracking-wider">LIENS ENVOYÉS !</p>
              <p className="text-[10px] text-muted mt-2">{people} personnes · {formatPrice(perPerson)} XAF chacun</p>
            </div>
          ) : (
            <>
              <div className="text-center mb-5">
                <h3 className="font-display text-xl tracking-[0.15em] text-cream">Partager l'addition</h3>
                <p className="text-[10px] text-muted mt-1">
                  Total : <span className="text-gold font-display">{formatPrice(order.totalAmount)} XAF</span>
                </p>
              </div>

              {/* Mode selector */}
              <div className="flex gap-2 mb-4">
                {[
                  { key: "equal" as SplitMode, label: "Parts égales", emoji: "⚖️" },
                  { key: "custom" as SplitMode, label: "Par article", emoji: "📋" },
                ].map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMode(m.key)}
                    className={`flex-1 py-2.5 rounded-xl text-[10px] tracking-wider transition-all btn-press ${
                      mode === m.key
                        ? "card-gold text-gold font-medium"
                        : "card text-muted"
                    }`}
                  >
                    {m.emoji} {m.label}
                  </button>
                ))}
              </div>

              {mode === "equal" && (
                <>
                  {/* People selector */}
                  <div className="flex items-center justify-center gap-4 mb-5">
                    <button
                      onClick={() => setPeople(Math.max(2, people - 1))}
                      className="w-11 h-11 rounded-xl bg-dark-3 border border-white/[0.06] text-cream text-lg flex items-center justify-center btn-press"
                    >
                      −
                    </button>
                    <div className="text-center w-20">
                      <p className="font-display text-4xl text-cream">{people}</p>
                      <p className="text-[8px] text-muted">personnes</p>
                    </div>
                    <button
                      onClick={() => setPeople(Math.min(10, people + 1))}
                      className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/25 text-gold text-lg flex items-center justify-center btn-press"
                    >
                      +
                    </button>
                  </div>

                  {/* Per person */}
                  <div className="card-gold p-4 text-center mb-5">
                    <p className="text-[9px] text-gold/60 tracking-wider">PAR PERSONNE</p>
                    <p className="font-display text-3xl text-gold mt-1">{formatPrice(perPerson)} XAF</p>
                  </div>

                  {/* Visual split */}
                  <div className="flex justify-center gap-1.5 mb-5">
                    {Array.from({ length: people }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05, type: "spring" }}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center"
                      >
                        <span className="text-[9px] text-gold font-bold">{i + 1}</span>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}

              {mode === "custom" && (
                <div className="space-y-2 mb-5 max-h-[200px] overflow-y-auto no-scrollbar">
                  {order.items.map((item, i) => (
                    <div key={i} className="card p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.emoji}</span>
                        <div>
                          <p className="text-[10px] text-cream">{item.quantity}× {item.name}</p>
                          <p className="text-[8px] text-muted">{formatPrice(item.price * item.quantity)} XAF</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: Math.min(people, 4) }).map((_, j) => (
                          <div
                            key={j}
                            className="w-6 h-6 rounded-full bg-gold/15 border border-gold/20 flex items-center justify-center"
                          >
                            <span className="text-[7px] text-gold font-bold">{j + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleSend}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-night-black text-[11px] tracking-wider font-bold btn-press"
                >
                  💸 ENVOYER LES LIENS DE PAIEMENT
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl border border-white/[0.06] text-[10px] text-muted tracking-wider btn-press"
                >
                  ANNULER
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
