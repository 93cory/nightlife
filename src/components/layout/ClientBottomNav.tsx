"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Star,
  Ticket,
  User,
} from "lucide-react";

const navItems = [
  { label: "Accueil", href: "/mon-compte", icon: Home },
  { label: "Explorer", href: "/explorer", icon: Search },
  { label: "Fidélité", href: "/mon-compte/fidelite", icon: Star },
  { label: "Tickets", href: "/mon-compte/tickets", icon: Ticket },
  { label: "Profil", href: "/mon-compte/profil", icon: User },
];

export default function ClientBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/mon-compte") return pathname === "/mon-compte";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                active ? "text-gold" : "text-text-dim"
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
