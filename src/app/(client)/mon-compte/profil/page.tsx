"use client";

import { User, Award, ShoppingBag, MapPin, Bell, Globe, HelpCircle, LogOut, ChevronRight } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="p-4 space-y-6">
      {/* Profile header */}
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center text-2xl font-bold text-gold mb-3">JB</div>
        <h1 className="text-xl font-bold">Jean-Baptiste Moussavou</h1>
        <p className="text-sm text-text-muted">+241 74 00 00 01</p>
        <p className="text-xs text-text-dim mt-1">Membre depuis Mars 2025</p>
      </div>

      {/* Loyalty */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Niveau Gold</span>
          <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full font-bold">2 450 pts</span>
        </div>
        <div className="h-2 bg-surface-lighter rounded-full overflow-hidden">
          <div className="h-full bg-gold rounded-full" style={{ width: "82%" }} />
        </div>
        <p className="text-xs text-text-dim mt-1.5">550 points avant VIP</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Dépensé", value: "485k", unit: "F" },
          { label: "Commandes", value: "34", unit: "" },
          { label: "Visites", value: "22", unit: "" },
          { label: "Lieux", value: "3", unit: "" },
        ].map((s) => (
          <div key={s.label} className="glass rounded-xl p-3 text-center">
            <p className="text-lg font-bold">{s.value}<span className="text-xs text-text-dim">{s.unit}</span></p>
            <p className="text-[10px] text-text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="glass rounded-xl divide-y divide-border overflow-hidden">
        {[
          { icon: User, label: "Modifier le profil", href: "#" },
          { icon: Bell, label: "Notifications", href: "#" },
          { icon: Globe, label: "Langue", href: "#", extra: "Français" },
          { icon: HelpCircle, label: "Aide & Support", href: "#" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <a key={item.label} href={item.href} className="flex items-center gap-3 px-4 py-3.5 hover:bg-surface-light transition-colors">
              <Icon size={18} className="text-text-muted" />
              <span className="flex-1 text-sm">{item.label}</span>
              {item.extra && <span className="text-xs text-text-dim">{item.extra}</span>}
              <ChevronRight size={16} className="text-text-dim" />
            </a>
          );
        })}
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-danger/20 text-danger text-sm hover:bg-danger/5 transition-colors">
        <LogOut size={16} /> Déconnexion
      </button>
    </div>
  );
}
