"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/Toast";
import { useOrdersStore } from "@/lib/store/ordersStore";

const STAFF = [
  { id: "1", name: "Alain Obiang", role: "Manager", initials: "AO", status: "active", tip: 0 },
  { id: "2", name: "Éva Ndong", role: "Serveuse", initials: "EN", status: "active", tip: 12500 },
  { id: "3", name: "Moussa Bongo", role: "Serveur", initials: "MB", status: "active", tip: 8000 },
  { id: "4", name: "Kevin Ondo", role: "Barman", initials: "KO", status: "active", tip: 15000 },
  { id: "5", name: "Paul Mba", role: "Sécurité", initials: "PM", status: "active", tip: 0 },
];

const MENU_ITEMS = [
  { icon: "📈", label: "Rapports", desc: "CA, produits, tendances", href: "/rapports" },
  { icon: "📦", label: "Inventaire", desc: "Stock et alertes", href: "/inventaire" },
  { icon: "📱", label: "Scanner QR", desc: "Fidélité client", href: "/scanner" },
  { icon: "🎵", label: "Soirées", desc: "Gérer les événements" },
  { icon: "⚙️", label: "Paramètres", desc: "Établissement et compte" },
  { icon: "🚪", label: "Déconnexion", desc: "Quitter l'interface staff", href: "/staff-login" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function StaffGestionPage() {
  const toast = useToast((s) => s.add);
  const router = useRouter();
  const orders = useOrdersStore((s) => s.orders);
  const orderCount = orders.filter((o) => o.status !== "cancelled").length;
  const activeCount = STAFF.filter((s) => s.status === "active").length;
  const totalTips = STAFF.reduce((sum, s) => sum + s.tip, 0);

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[22px] tracking-[0.15em] text-cream">Plus</h1>
        <p className="text-[9px] text-muted mt-0.5">Gestion · Rapports · Paramètres</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2 px-5 mt-3 mb-4">
        <div className="card p-3 text-center">
          <p className="font-display text-lg text-success">{activeCount}</p>
          <p className="text-[8px] text-muted">En service</p>
        </div>
        <div className="card p-3 text-center">
          <p className="font-display text-lg text-cream">{orderCount}</p>
          <p className="text-[8px] text-muted">Commandes</p>
        </div>
        <div className="card p-3 text-center">
          <p className="font-display text-lg text-gold">{(totalTips / 1000).toFixed(1)}K</p>
          <p className="text-[8px] text-muted">Pourboires</p>
        </div>
      </motion.div>

      {/* Staff on duty */}
      <motion.div variants={fadeUp} className="px-5 mb-4">
        <p className="text-[11px] font-semibold text-cream mb-2">👥 Équipe en service</p>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {STAFF.filter((s) => s.status === "active").map((member) => (
            <div key={member.id} className="flex flex-col items-center gap-1.5 min-w-[56px]">
              <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/25 flex items-center justify-center text-[10px] font-bold text-accent">
                {member.initials}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-dark-1" />
              </div>
              <p className="text-[8px] text-muted text-center">{member.role}</p>
            </div>
          ))}
          <button
            onClick={() => toast("Bientôt disponible", "info", "👤")}
            className="flex flex-col items-center gap-1.5 min-w-[56px]"
          >
            <div className="w-11 h-11 rounded-full bg-dark-3 border border-dashed border-white/10 flex items-center justify-center text-muted text-lg">
              +
            </div>
            <p className="text-[8px] text-muted">Ajouter</p>
          </button>
        </div>
      </motion.div>

      {/* Menu */}
      <div className="px-5 space-y-1.5">
        {MENU_ITEMS.map((item) => (
          <motion.button
            key={item.label}
            variants={fadeUp}
            onClick={() => {
              if (item.href) router.push(item.href);
              else toast("Bientôt disponible", "info", item.icon);
            }}
            className="w-full card p-3.5 flex items-center gap-3 text-left btn-press"
          >
            <div className="w-10 h-10 rounded-xl bg-dark-3 flex items-center justify-center text-lg shrink-0">
              {item.icon}
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-medium text-cream">{item.label}</p>
              <p className="text-[8px] text-muted mt-0.5">{item.desc}</p>
            </div>
            <span className="text-muted/30 text-sm">›</span>
          </motion.button>
        ))}
      </div>

      <motion.p variants={fadeUp} className="text-center text-[7px] text-muted/30 mt-6 tracking-[0.15em]">
        NIGHTLIFE STAFF v1.0 · LIBREVILLE
      </motion.p>
    </motion.div>
  );
}
