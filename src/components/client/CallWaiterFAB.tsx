"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/Toast";
import { useTablesStore } from "@/lib/store/tablesStore";

export default function CallWaiterFAB() {
  const [calling, setCalling] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const toast = useToast((s) => s.add);
  const callWaiter = useTablesStore((s) => s.callWaiter);

  function handleCall() {
    if (calling || confirmed) return;
    setCalling(true);
  }

  function handleConfirm(reason: string) {
    setCalling(false);
    setConfirmed(true);
    // Table 5 = client's demo table (Jean-Pierre)
    callWaiter(5, reason);
    toast("Un serveur arrive à votre table !", "success", "🙋‍♂️");
    setTimeout(() => setConfirmed(false), 8000);
  }

  function handleCancel() {
    setCalling(false);
  }

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={handleCall}
        className={`fixed right-4 bottom-20 z-40 w-12 h-12 rounded-full shadow-lg flex items-center justify-center btn-press ${
          confirmed
            ? "bg-success/20 border border-success/30"
            : "bg-gradient-to-br from-accent to-accent/80 border border-accent/30"
        }`}
        whileTap={{ scale: 0.9 }}
        animate={confirmed ? { scale: [1, 1.1, 1] } : {}}
        transition={confirmed ? { repeat: 2, duration: 0.4 } : {}}
      >
        {confirmed ? (
          <span className="text-lg">✅</span>
        ) : (
          <span className="text-lg">🙋</span>
        )}
      </motion.button>

      {/* Confirmation Sheet */}
      <AnimatePresence>
        {calling && (
          <div className="fixed inset-0 z-50" onClick={handleCancel}>
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
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

              <div className="text-center mb-6">
                <motion.div
                  className="text-5xl mb-3"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🙋‍♂️
                </motion.div>
                <h3 className="font-display text-xl tracking-[0.15em] text-cream">Appeler un serveur</h3>
                <p className="text-[10px] text-muted mt-1.5">Un membre de l'équipe sera notifié et viendra à votre table</p>
              </div>

              <div className="space-y-2">
                {[
                  { emoji: "🍽️", label: "Commander / Ajouter", desc: "Je veux passer ou modifier une commande" },
                  { emoji: "💰", label: "Demander l'addition", desc: "Je souhaite régler et partir" },
                  { emoji: "❓", label: "Autre demande", desc: "Question, problème, besoin d'aide" },
                ].map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleConfirm(option.label)}
                    className="w-full card p-3.5 flex items-center gap-3 text-left btn-press"
                  >
                    <div className="w-10 h-10 rounded-xl bg-dark-3 flex items-center justify-center text-lg shrink-0">
                      {option.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-medium text-cream">{option.label}</p>
                      <p className="text-[8px] text-muted mt-0.5">{option.desc}</p>
                    </div>
                    <span className="text-muted/30 text-sm">→</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleCancel}
                className="w-full mt-4 py-3 rounded-xl border border-white/[0.06] text-[10px] text-muted tracking-wider btn-press"
              >
                ANNULER
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
