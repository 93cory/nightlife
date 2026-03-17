"use client";

import { usePathname, useRouter } from "next/navigation";
import { useOrdersStore } from "@/lib/store/ordersStore";
import { useTablesStore } from "@/lib/store/tablesStore";

const tabs = [
  { href: "/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/commandes", icon: "🧾", label: "Commandes" },
  { href: "/tables", icon: "🗺️", label: "Tables" },
  { href: "/caisse", icon: "💰", label: "Caisse" },
  { href: "/staff-gestion", icon: "👥", label: "Plus" },
];

export default function BottomNavStaff() {
  const pathname = usePathname();
  const router = useRouter();
  const pendingCount = useOrdersStore((s) => s.orders.filter((o) => o.status === "pending").length);
  const callingCount = useTablesStore((s) => s.tables.filter((t) => t.status === "calling").length);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md glass border-t border-accent/10 safe-bottom">
        <div className="flex justify-around items-center py-2">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            const showBadge = (tab.href === "/commandes" && pendingCount > 0) || (tab.href === "/tables" && callingCount > 0);
            const badgeCount = tab.href === "/tables" ? callingCount : pendingCount;
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
                    <span className="text-[7px] text-white font-bold">{badgeCount}</span>
                  </div>
                )}
                <span className={`text-[8px] tracking-wider ${active ? "text-accent font-medium" : "text-muted/50"}`}>
                  {tab.label}
                </span>
                {active && (
                  <div className="w-4 h-0.5 rounded-full bg-accent" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
