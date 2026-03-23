"use client";

import Link from "next/link";
import { Bell, ShoppingBag, CalendarDays, Ticket, MapPin, Star, Clock, ArrowRight } from "lucide-react";

const quickActions = [
  { emoji: "🍹", label: "Commander", href: "/explorer", color: "from-gold/20 to-amber-900/20" },
  { emoji: "📋", label: "Réserver", href: "/explorer", color: "from-info/20 to-blue-900/20" },
  { emoji: "🎫", label: "Tickets", href: "/mon-compte/tickets", color: "from-purple-500/20 to-purple-900/20" },
  { emoji: "📍", label: "Proches", href: "/explorer", color: "from-success/20 to-green-900/20" },
];

const upcomingEvents = [
  { name: "Soirée Afrobeats", venue: "Club 241", date: "Sam 28 Mars", price: "5 000 F", gradient: "from-purple-800/40 to-pink-900/40" },
  { name: "Ladies Night", venue: "Club 241", date: "Ven 3 Avril", price: "Gratuit", gradient: "from-pink-800/40 to-red-900/40" },
  { name: "Concert Mink's", venue: "Club 241", date: "Sam 11 Avril", price: "10 000 F", gradient: "from-gold/30 to-amber-900/30" },
];

const recentOrders = [
  { id: "CMD-041", venue: "Le Privilège", items: "2x Mojito, 1x Plantain", amount: 9500, status: "Servi", time: "Hier" },
  { id: "CMD-035", venue: "Chez Mama Rose", items: "1x Poulet braisé, 2x Bissap", amount: 7000, status: "Payé", time: "Mar 18" },
  { id: "CMD-028", venue: "Le Privilège", items: "3x Heineken", amount: 6000, status: "Payé", time: "Sam 15" },
];

export default function ClientHomePage() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Bonjour, Jean-Baptiste 👋</h1>
          <p className="text-sm text-text-muted">Bienvenue sur NightLife</p>
        </div>
        <button className="relative p-2 rounded-xl bg-surface-light">
          <Bell size={20} className="text-text-muted" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
        </button>
      </div>

      {/* Loyalty Card */}
      <div className="relative rounded-2xl p-5 bg-gradient-to-br from-gold/20 via-amber-900/20 to-bordeaux/20 border border-gold/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-[60px]" />
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gold tracking-wider">NIGHTLIFE MEMBER</span>
            <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full font-bold">GOLD</span>
          </div>
          <p className="text-3xl font-black text-gold">2 450</p>
          <p className="text-xs text-text-muted">points de fidélité</p>
          <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gold rounded-full" style={{ width: "72%" }} />
          </div>
          <p className="text-[10px] text-text-dim mt-1">550 points avant le niveau VIP</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((a) => (
          <Link key={a.label} href={a.href} className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br ${a.color} border border-white/5 hover:border-white/15 transition-all`}>
            <span className="text-2xl">{a.emoji}</span>
            <span className="text-[10px] font-medium text-text-muted">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Événements à venir</h2>
          <Link href="/explorer" className="text-xs text-gold">Tout voir</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {upcomingEvents.map((evt) => (
            <div key={evt.name} className={`shrink-0 w-48 rounded-xl p-4 bg-gradient-to-br ${evt.gradient} border border-white/5`}>
              <p className="font-bold text-sm">{evt.name}</p>
              <p className="text-xs text-text-muted mt-0.5">{evt.venue}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-text-dim">{evt.date}</span>
                <span className="text-xs font-bold text-gold">{evt.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">Commandes récentes</h2>
          <Link href="/mon-compte/commandes" className="text-xs text-gold flex items-center gap-1">Tout voir <ArrowRight size={12} /></Link>
        </div>
        <div className="space-y-2">
          {recentOrders.map((o) => (
            <div key={o.id} className="glass rounded-xl p-3 flex items-center justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gold">{o.id}</span>
                  <span className="text-xs text-text-dim">{o.venue}</span>
                </div>
                <p className="text-xs text-text-muted truncate mt-0.5">{o.items}</p>
              </div>
              <div className="text-right ml-3">
                <p className="text-sm font-bold">{o.amount.toLocaleString("fr-FR")} F</p>
                <p className="text-[10px] text-text-dim">{o.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
