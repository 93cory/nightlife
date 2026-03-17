"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/hooks/useAuth";
import { useOrdersStore } from "@/lib/store/ordersStore";
import { useToast } from "@/components/ui/Toast";
import { signOut } from "@/lib/firebase/auth";
import Badge from "@/components/ui/Badge";
import QRCodeModal from "@/components/client/QRCodeModal";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const MENU_ITEMS = [
  { icon: "👤", label: "Modifier le profil", desc: "Nom, photo, préférences" },
  { icon: "📍", label: "Mes établissements", desc: "Favoris et récents", href: "/etablissements" },
  { icon: "🧾", label: "Historique commandes", desc: "Toutes vos commandes passées", href: "/mes-commandes" },
  { icon: "💳", label: "Paiement", desc: "Airtel Money, Moov Money, carte", href: "/paiement" },
  { icon: "⭐", label: "Ma fidélité", desc: "Points, niveaux, avantages", href: "/fidelite" },
  { icon: "🎁", label: "Parrainage", desc: "Inviter des amis, gagner des points", href: "/parrainage" },
  { icon: "🏷️", label: "Codes promo", desc: "Vos réductions et offres actives", href: "/promos" },
  { icon: "🎵", label: "Soirées & événements", desc: "Programme et réservations", href: "/soirees" },
  { icon: "🎧", label: "DJ Request", desc: "Demander une chanson au DJ", href: "/dj" },
  { icon: "📋", label: "Réserver une table", desc: "Planifier votre prochaine soirée", href: "/reservation" },
  { icon: "💬", label: "Chat avec le staff", desc: "Demandes spéciales, questions", href: "/chat" },
  { icon: "⭐", label: "Donner un avis", desc: "Notez votre expérience", href: "/avis" },
  { icon: "📸", label: "Galerie photos", desc: "Découvrez nos espaces", href: "/galerie" },
  { icon: "🔔", label: "Notifications", desc: "Alertes soirées et promos" },
  { icon: "🌙", label: "Apparence", desc: "Thème sombre activé" },
  { icon: "🔒", label: "Confidentialité", desc: "Données personnelles et sécurité" },
  { icon: "❓", label: "Aide & Support", desc: "FAQ, contact, signaler un problème" },
];

export default function ProfilPage() {
  const { firebaseUser, displayName, isDemo } = useAuth();
  const router = useRouter();
  const toast = useToast((s) => s.add);
  const orders = useOrdersStore((s) => s.orders);
  const orderCount = orders.filter((o) => o.status !== "cancelled").length;
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState(displayName || "Jean-Pierre O.");
  const [showQR, setShowQR] = useState(false);

  async function handleSignOut() {
    if (!isDemo) await signOut();
    router.replace("/login");
  }

  function handleMenuClick(item: typeof MENU_ITEMS[0]) {
    if (item.href) {
      router.push(item.href);
    } else {
      toast("Bientôt disponible", "info", item.icon);
    }
  }

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[24px] tracking-[0.15em] text-cream">Profil</h1>
      </motion.div>

      {/* Avatar & Info */}
      <motion.div variants={fadeUp} className="px-5 mt-3 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/25 flex items-center justify-center shrink-0">
          <span className="font-display text-2xl text-gold">{name[0].toUpperCase()}</span>
        </div>
        <div className="flex-1 min-w-0">
          {editName ? (
            <div className="flex items-center gap-2">
              <input
                className="input-dark px-3 py-1.5 text-sm text-cream w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && setEditName(false)}
              />
              <button
                onClick={() => { setEditName(false); toast("Nom modifié", "success", "✓"); }}
                className="text-[9px] text-gold tracking-wider btn-press"
              >
                OK
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="font-serif text-xl font-semibold text-cream truncate">{name}</p>
              <button onClick={() => setEditName(true)} className="text-muted text-xs btn-press">✏️</button>
            </div>
          )}
          <p className="text-[10px] text-muted mt-0.5">{firebaseUser?.phoneNumber || "+241 06 XX XX XX"}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <Badge variant="gold">CLIENT</Badge>
            <Badge variant="muted">SILVER</Badge>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2 px-5 mt-4 mb-4">
        <div className="card-gold p-3 text-center">
          <p className="font-display text-xl text-gold">2 840</p>
          <p className="text-[8px] text-gold/50">Points</p>
        </div>
        <div className="card p-3 text-center">
          <p className="font-display text-xl text-cream">{orderCount}</p>
          <p className="text-[8px] text-muted">Commandes</p>
        </div>
        <div className="card p-3 text-center">
          <p className="font-display text-xl text-success">12</p>
          <p className="text-[8px] text-muted">Soirées</p>
        </div>
      </motion.div>

      {/* QR Code Card */}
      <motion.div variants={fadeUp} className="px-5 mb-4">
        <div className="card-gold p-4 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-2xl shrink-0">
            📱
          </div>
          <div className="flex-1">
            <p className="text-[12px] font-medium text-cream">Ma carte QR</p>
            <p className="text-[9px] text-muted mt-0.5">Scannez pour cumuler des points et payer</p>
          </div>
          <button
            onClick={() => setShowQR(true)}
            className="px-3 py-2 rounded-xl bg-gold/15 border border-gold/25 text-[9px] text-gold tracking-wider btn-press"
          >
            AFFICHER
          </button>
        </div>
      </motion.div>

      {/* Menu Items */}
      <div className="px-5 space-y-1">
        {MENU_ITEMS.map((item) => (
          <motion.button
            key={item.label}
            variants={fadeUp}
            onClick={() => handleMenuClick(item)}
            className="w-full card p-3.5 flex items-center gap-3 text-left btn-press"
          >
            <div className="w-9 h-9 rounded-xl bg-dark-3 flex items-center justify-center text-base shrink-0">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-cream">{item.label}</p>
              <p className="text-[8px] text-muted mt-0.5">{item.desc}</p>
            </div>
            <span className="text-muted/30 text-sm">›</span>
          </motion.button>
        ))}
      </div>

      {/* Logout */}
      <motion.div variants={fadeUp} className="px-5 mt-6">
        <button
          onClick={handleSignOut}
          className="w-full py-3.5 rounded-xl border border-accent/20 bg-accent/[0.04] text-[11px] text-accent tracking-wider font-medium btn-press"
        >
          DÉCONNEXION
        </button>
      </motion.div>

      <motion.p variants={fadeUp} className="text-center text-[7px] text-muted/30 mt-4 tracking-[0.15em]">
        NIGHTLIFE GABON v1.0 · LIBREVILLE
      </motion.p>

      <QRCodeModal
        open={showQR}
        onClose={() => setShowQR(false)}
        name={name}
        memberId="NL-GA-2026-0847"
      />
    </motion.div>
  );
}
