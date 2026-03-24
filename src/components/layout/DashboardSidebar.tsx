"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  UtensilsCrossed,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  Ticket,
  CalendarDays,
  Shield,
  Music,
  Armchair,
  Clock,
  CreditCard,
  Menu,
  X,
  Wine,
  Star,
  Wallet,
  Sparkles,
  MessageSquare,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  types?: string[]; // which establishment types show this
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Caisse POS", href: "/dashboard/caisse", icon: CreditCard },
  { label: "Commandes", href: "/dashboard/commandes", icon: ShoppingCart },
  { label: "Menu / Carte", href: "/dashboard/menu", icon: UtensilsCrossed },
  { label: "Stock", href: "/dashboard/stock", icon: Package },
  { label: "Tables", href: "/dashboard/tables", icon: Armchair },
  { label: "Réservations", href: "/dashboard/reservations", icon: CalendarDays, types: ["restaurant", "snack", "bar"] },
  { label: "Événements", href: "/dashboard/evenements", icon: Ticket, types: ["nightclub"] },
  { label: "Billetterie", href: "/dashboard/billetterie", icon: Ticket, types: ["nightclub"] },
  { label: "Carrés VIP", href: "/dashboard/vip", icon: Star, types: ["nightclub"] },
  { label: "DJ Planning", href: "/dashboard/dj", icon: Music, types: ["nightclub"] },
  { label: "Sécurité", href: "/dashboard/securite", icon: Shield, types: ["nightclub"] },
  { label: "Happy Hours", href: "/dashboard/happy-hours", icon: Wine, types: ["bar", "nightclub"] },
  { label: "Personnel", href: "/dashboard/personnel", icon: Users },
  { label: "Pointage", href: "/dashboard/pointage", icon: Clock },
  { label: "Rapports", href: "/dashboard/rapports", icon: BarChart3 },
  { label: "Comptabilité", href: "/dashboard/comptabilite", icon: Wallet },
  { label: "Assistant IA", href: "/dashboard/chat", icon: Sparkles },
  { label: "Contenu IA", href: "/dashboard/contenu-ia", icon: MessageSquare },
  { label: "Paramètres", href: "/dashboard/parametres", icon: Settings },
];

interface DashboardSidebarProps {
  establishmentName?: string;
  establishmentType?: string;
}

export default function DashboardSidebar({
  establishmentName = "Le Privilège Lounge",
  establishmentType = "bar",
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const filteredItems = navItems.filter(
    (item) => !item.types || item.types.includes(establishmentType)
  );

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const sidebar = (
    <div
      className={`flex flex-col h-full bg-surface border-r border-border transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-gold truncate">
              {establishmentName}
            </h2>
            <span className="text-xs text-text-dim capitalize">
              {establishmentType}
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-surface-light text-text-muted"
        >
          <ChevronLeft
            size={18}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg hover:bg-surface-light text-text-muted"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? "bg-gold/10 text-gold"
                  : "text-text-muted hover:text-foreground hover:bg-surface-light"
              }`}
            >
              <Icon size={20} className={active ? "text-gold" : ""} />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto text-xs bg-danger/20 text-danger px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-border">
        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-danger hover:bg-danger/5 transition-all">
          <LogOut size={20} />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-surface border border-border text-text-muted"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block h-screen sticky top-0">{sidebar}</div>
    </>
  );
}
