"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOrdersStore } from "@/lib/store/ordersStore";
import { usePaymentStore, PaymentMethod } from "@/lib/store/paymentStore";
import { useToast } from "@/components/ui/Toast";
import Confetti from "@/components/ui/Confetti";
import { formatPrice } from "@/lib/utils/format";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const METHODS: { id: PaymentMethod; name: string; icon: string; desc: string; color: string }[] = [
  { id: "airtel", name: "Airtel Money", icon: "📲", desc: "Paiement via Airtel Money", color: "border-red-500/30 bg-red-500/[0.06]" },
  { id: "moov", name: "Moov Money", icon: "📱", desc: "Paiement via Moov Africa", color: "border-blue-500/30 bg-blue-500/[0.06]" },
  { id: "cash", name: "Espèces", icon: "💵", desc: "Paiement en cash au serveur", color: "border-success/30 bg-success/[0.06]" },
  { id: "card", name: "Carte Bancaire", icon: "💳", desc: "Visa, Mastercard", color: "border-purple-500/30 bg-purple-500/[0.06]" },
];

type Step = "select" | "details" | "processing" | "success";

export default function PaiementPage() {
  const toast = useToast((s) => s.add);
  const orders = useOrdersStore((s) => s.orders);
  const addPayment = usePaymentStore((s) => s.addPayment);
  const updateStatus = usePaymentStore((s) => s.updateStatus);
  const payments = usePaymentStore((s) => s.payments);

  const servedOrders = orders.filter((o) => o.status === "served");
  const totalDue = servedOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  const [step, setStep] = useState<Step>("select");
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [phone, setPhone] = useState("+241 06 ");
  const [paymentId, setPaymentId] = useState("");

  const lastPayment = payments.find((p) => p.id === paymentId);

  function handleSelectMethod(m: PaymentMethod) {
    setMethod(m);
    if (m === "cash") {
      processPayment(m);
    } else {
      setStep("details");
    }
  }

  function processPayment(m: PaymentMethod) {
    const id = addPayment({
      orderId: servedOrders[0]?.id || "manual",
      amount: totalDue,
      method: m,
      phone: m === "airtel" || m === "moov" ? phone : undefined,
      status: "processing",
    });
    setPaymentId(id);
    setStep("processing");

    setTimeout(() => {
      updateStatus(id, "success");
      setStep("success");
      toast("Paiement réussi !", "success", "✅");
    }, 2500);
  }

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <Confetti active={step === "success"} />

      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[24px] tracking-[0.15em] text-cream">Paiement</h1>
        <p className="text-[9px] text-muted mt-0.5">
          {servedOrders.length} commande{servedOrders.length > 1 ? "s" : ""} à régler
        </p>
      </motion.div>

      {/* Order Summary */}
      <motion.div variants={fadeUp} className="px-5 mt-3">
        <div className="card-gold p-4 glow-gold text-center">
          <p className="text-[9px] text-gold/60 tracking-[0.3em] uppercase">Montant à payer</p>
          <p className="font-display text-[40px] text-cream leading-none mt-1">
            {formatPrice(totalDue)}
          </p>
          <p className="text-[10px] text-gold mt-1">XAF</p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-5 mt-4"
          >
            <p className="text-[11px] font-semibold text-cream mb-3">Choisir un mode de paiement</p>
            <div className="space-y-2">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectMethod(m.id)}
                  className={`w-full card p-4 flex items-center gap-4 text-left btn-press border ${
                    method === m.id ? m.color : "border-white/[0.04]"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-dark-3 flex items-center justify-center text-2xl shrink-0">
                    {m.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-medium text-cream">{m.name}</p>
                    <p className="text-[9px] text-muted mt-0.5">{m.desc}</p>
                  </div>
                  <span className="text-muted/30 text-sm">›</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "details" && method && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="px-5 mt-4"
          >
            <button onClick={() => setStep("select")} className="text-[10px] text-muted mb-3 btn-press">
              ← Retour
            </button>

            <div className="card p-5 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{METHODS.find((m) => m.id === method)?.icon}</span>
                <p className="text-[13px] font-medium text-cream">
                  {METHODS.find((m) => m.id === method)?.name}
                </p>
              </div>

              {(method === "airtel" || method === "moov") && (
                <div>
                  <label className="text-[9px] text-muted tracking-wider block mb-1.5">
                    NUMÉRO DE TÉLÉPHONE
                  </label>
                  <input
                    className="input-dark w-full px-4 py-3 text-cream text-sm font-medium tracking-wider"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+241 06 XX XX XX"
                    autoFocus
                  />
                  <p className="text-[8px] text-muted mt-1.5">
                    Un SMS de confirmation sera envoyé à ce numéro
                  </p>
                </div>
              )}

              {method === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-[9px] text-muted tracking-wider block mb-1.5">NUMÉRO DE CARTE</label>
                    <input className="input-dark w-full px-4 py-3 text-cream text-sm tracking-[0.15em]" placeholder="4XXX XXXX XXXX XXXX" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] text-muted tracking-wider block mb-1.5">EXPIRATION</label>
                      <input className="input-dark w-full px-4 py-3 text-cream text-sm" placeholder="MM/AA" />
                    </div>
                    <div>
                      <label className="text-[9px] text-muted tracking-wider block mb-1.5">CVV</label>
                      <input className="input-dark w-full px-4 py-3 text-cream text-sm" placeholder="•••" type="password" />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-[10px] text-muted">Montant</span>
                <span className="font-display text-lg text-gold">{formatPrice(totalDue)} XAF</span>
              </div>

              <button
                onClick={() => processPayment(method)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/25 text-[12px] text-gold tracking-wider font-medium btn-press"
              >
                PAYER {formatPrice(totalDue)} XAF
              </button>
            </div>
          </motion.div>
        )}

        {step === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="px-5 mt-8 text-center"
          >
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-3xl">
                {METHODS.find((m) => m.id === method)?.icon}
              </div>
            </div>
            <p className="font-display text-[18px] text-cream tracking-wider">Traitement en cours...</p>
            <p className="text-[10px] text-muted mt-2">
              {method === "airtel" || method === "moov"
                ? "Validez la transaction sur votre téléphone"
                : "Vérification du paiement"}
            </p>
            <div className="mt-4 flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gold animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === "success" && lastPayment && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 mt-6"
          >
            <div className="card p-6 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-success/15 border border-success/25 flex items-center justify-center text-3xl mb-3">
                ✅
              </div>
              <p className="font-display text-[20px] text-cream tracking-wider">Paiement Réussi !</p>
              <p className="text-[10px] text-success mt-1">Transaction confirmée</p>

              <div className="mt-4 space-y-2 text-left">
                <div className="flex justify-between text-[10px] py-1.5 border-b border-white/[0.04]">
                  <span className="text-muted">Montant</span>
                  <span className="text-cream font-medium">{formatPrice(lastPayment.amount)} XAF</span>
                </div>
                <div className="flex justify-between text-[10px] py-1.5 border-b border-white/[0.04]">
                  <span className="text-muted">Méthode</span>
                  <span className="text-cream">{METHODS.find((m) => m.id === lastPayment.method)?.name}</span>
                </div>
                {lastPayment.phone && (
                  <div className="flex justify-between text-[10px] py-1.5 border-b border-white/[0.04]">
                    <span className="text-muted">Téléphone</span>
                    <span className="text-cream">{lastPayment.phone}</span>
                  </div>
                )}
                <div className="flex justify-between text-[10px] py-1.5 border-b border-white/[0.04]">
                  <span className="text-muted">Transaction ID</span>
                  <span className="text-gold font-display tracking-wider">{lastPayment.transactionId}</span>
                </div>
              </div>

              <button
                onClick={() => { setStep("select"); setMethod(null); }}
                className="w-full mt-4 py-3 rounded-xl bg-dark-3 border border-white/[0.06] text-[10px] text-cream tracking-wider btn-press"
              >
                TERMINÉ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Payments */}
      {step === "select" && payments.filter((p) => p.status === "success").length > 0 && (
        <motion.div variants={fadeUp} className="px-5 mt-5">
          <p className="text-[11px] font-semibold text-cream mb-2">Paiements récents</p>
          <div className="space-y-1.5">
            {payments
              .filter((p) => p.status === "success")
              .slice(0, 5)
              .map((p) => (
                <div key={p.id} className="card p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{METHODS.find((m) => m.id === p.method)?.icon}</span>
                    <div>
                      <p className="text-[10px] text-cream">{METHODS.find((m) => m.id === p.method)?.name}</p>
                      <p className="text-[8px] text-muted">{p.transactionId}</p>
                    </div>
                  </div>
                  <p className="font-display text-sm text-cream">{formatPrice(p.amount)}</p>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
