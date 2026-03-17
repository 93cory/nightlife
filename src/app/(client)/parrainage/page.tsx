"use client";

import { motion } from "framer-motion";
import { useReferralStore } from "@/lib/store/referralStore";
import { useToast } from "@/components/ui/Toast";
import Badge from "@/components/ui/Badge";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  registered: { label: "Inscrit", color: "text-muted" },
  first_order: { label: "1ère commande", color: "text-gold" },
  active: { label: "Actif", color: "text-success" },
};

const STEPS = [
  { icon: "📤", title: "Partagez votre code", desc: "Envoyez votre code unique à vos amis" },
  { icon: "👋", title: "Ils s'inscrivent", desc: "Vos amis créent un compte avec votre code" },
  { icon: "🎁", title: "Gagnez des points", desc: "100 pts à l'inscription, 200 pts à la 1ère commande, 500 pts quand ils sont actifs" },
];

export default function ParrainagePage() {
  const { referralCode, referrals } = useReferralStore();
  const totalPoints = useReferralStore((s) => s.totalPointsFromReferrals());
  const toast = useToast((s) => s.add);

  function copyCode() {
    navigator.clipboard?.writeText(referralCode);
    toast("Code copié !", "success", "📋");
  }

  function shareWhatsApp() {
    const msg = encodeURIComponent(
      `Rejoins-moi sur NightLife Gabon ! Utilise mon code ${referralCode} pour gagner 25% sur ta première commande 🎉`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  }

  function shareSMS() {
    const msg = encodeURIComponent(
      `NightLife Gabon : utilise mon code ${referralCode} pour 25% de réduction ! Télécharge l'app maintenant.`
    );
    window.open(`sms:?body=${msg}`, "_blank");
  }

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[24px] tracking-[0.15em] text-cream">Parrainage</h1>
        <p className="text-[9px] text-muted mt-0.5">Invitez vos amis, gagnez des récompenses</p>
      </motion.div>

      {/* Referral Code Card */}
      <motion.div variants={fadeUp} className="px-5 mt-3">
        <div className="card-gold p-5 glow-gold text-center">
          <p className="text-[9px] text-gold/60 tracking-[0.3em] uppercase">Votre code de parrainage</p>
          <p className="font-display text-[36px] text-cream leading-none mt-2 tracking-[0.2em]">
            {referralCode}
          </p>
          <button
            onClick={copyCode}
            className="mt-3 px-5 py-2 rounded-xl bg-gold/15 border border-gold/25 text-[10px] text-gold tracking-wider btn-press"
          >
            📋 COPIER LE CODE
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2 px-5 mt-3">
        <div className="card p-3 text-center">
          <p className="font-display text-xl text-gold">{referrals.length}</p>
          <p className="text-[8px] text-muted">Filleuls</p>
        </div>
        <div className="card p-3 text-center">
          <p className="font-display text-xl text-success">{totalPoints}</p>
          <p className="text-[8px] text-muted">Points gagnés</p>
        </div>
        <div className="card p-3 text-center">
          <p className="font-display text-xl text-cream">#12</p>
          <p className="text-[8px] text-muted">Rang</p>
        </div>
      </motion.div>

      {/* Share Buttons */}
      <motion.div variants={fadeUp} className="px-5 mt-4">
        <p className="text-[11px] font-semibold text-cream mb-2">Partager</p>
        <div className="flex gap-2">
          <button onClick={shareWhatsApp} className="flex-1 card p-3 text-center btn-press border-green-500/15 bg-green-500/[0.04]">
            <span className="text-xl">💬</span>
            <p className="text-[9px] text-cream mt-1">WhatsApp</p>
          </button>
          <button onClick={shareSMS} className="flex-1 card p-3 text-center btn-press">
            <span className="text-xl">📱</span>
            <p className="text-[9px] text-cream mt-1">SMS</p>
          </button>
          <button onClick={copyCode} className="flex-1 card p-3 text-center btn-press">
            <span className="text-xl">🔗</span>
            <p className="text-[9px] text-cream mt-1">Copier lien</p>
          </button>
        </div>
      </motion.div>

      {/* How it works */}
      <motion.div variants={fadeUp} className="px-5 mt-5">
        <p className="text-[11px] font-semibold text-cream mb-3">Comment ça marche</p>
        <div className="space-y-2.5">
          {STEPS.map((step, i) => (
            <div key={i} className="card p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/15 flex items-center justify-center text-lg shrink-0">
                {step.icon}
              </div>
              <div>
                <p className="text-[11px] font-medium text-cream">{step.title}</p>
                <p className="text-[8px] text-muted mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Referrals List */}
      <motion.div variants={fadeUp} className="px-5 mt-5">
        <p className="text-[11px] font-semibold text-cream mb-2">Vos filleuls</p>
        {referrals.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-[10px] text-muted">Aucun filleul pour le moment</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {referrals.map((ref) => {
              const status = STATUS_MAP[ref.status];
              return (
                <div key={ref.id} className="card p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-dark-3 flex items-center justify-center text-[10px] font-bold text-muted">
                      {ref.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-[10px] text-cream font-medium">{ref.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant={ref.status === "active" ? "success" : ref.status === "first_order" ? "gold" : "muted"}>
                          {status.label}
                        </Badge>
                        <span className="text-[8px] text-gold">+{ref.pointsEarned} pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
