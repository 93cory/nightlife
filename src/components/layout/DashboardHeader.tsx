"use client";

import { Bell, Search, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
}

export default function DashboardHeader({
  userName = "Alain Obiang",
  userRole = "Manager",
}: DashboardHeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [showProfile, setShowProfile] = useState(false);

  const displayName = user?.full_name || userName;
  const displayRole = user?.role === "superadmin" ? "Super Admin" : user?.role === "staff" ? "Manager" : userRole;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="h-16 border-b border-border bg-surface/80 backdrop-blur-lg sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6">
      {/* Search */}
      <div className="flex-1 max-w-md ml-12 lg:ml-0">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim"
          />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-surface-light border border-border rounded-lg text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-surface-light text-text-muted transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-surface-light transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
              <User size={16} className="text-gold" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-foreground">{displayName}</p>
              <p className="text-xs text-text-dim">{displayRole}</p>
            </div>
            <ChevronDown size={14} className="text-text-dim hidden sm:block" />
          </button>

          {showProfile && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfile(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl z-50 py-1">
                <a
                  href="/dashboard/parametres"
                  className="block px-4 py-2.5 text-sm text-text-muted hover:text-foreground hover:bg-surface-light"
                >
                  Paramètres
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-danger/5"
                >
                  Déconnexion
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
