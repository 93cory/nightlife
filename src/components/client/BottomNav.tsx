"use client";

import { usePathname, useRouter } from "next/navigation";
import { useOrdersStore } from "@/lib/store/ordersStore";

const tabs = [
  { href: "/accueil", icon: "🏠", label: "Accueil" },
  { href: "/menu", icon: "🍽️", label: "Menu" },
  { href: "/mes-commandes", icon: "🧾", label: "Commandes" },
  { href: "/fidelite", icon: "⭐", label: "Fidélité" },
  { href: "/profil", icon: "👤", label: "Profil" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const activeCount = useOrdersStore((s) => s.orders.filter((o) => ["pending", "preparing", "served"].includes(o.status)).length);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md glass border-t border-white/[0.04] safe-bottom">
        <div className="flex justify-around items-center py-2">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            const showBadge = tab.href === "/mes-commandes" && activeCount > 0;
            return (
              <button
                key={tab.href}
                onClick={() => router.push(tab.href)}
                className="flex flex-col items-center gap-0.5 py-1 px-3 transition-all relative btn-press"
              >
                <span className={`text-lg transition-transform ${active ? "scale-110" : "opacity-40"}`}>
                  {tab.icon}
                </span>
                {showBadge && (
                  <div className="absolute top-0 right-0.5 w-4.5 h-4.5 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-[7px] text-white font-bold">{activeCount}</span>
                  </div>
                )}
                <span className={`text-[8px] tracking-wider ${active ? "text-gold font-medium" : "text-muted/50"}`}>
                  {tab.label}
                </span>
                {active && (
                  <div className="w-4 h-0.5 rounded-full bg-gold" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
