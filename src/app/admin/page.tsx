"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2, Users, DollarSign, AlertTriangle, TrendingUp,
  BarChart3, Shield, Check, X, Clock, Eye, LogOut, Search,
} from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import { establishments } from "@/lib/demo/data";

const allEstablishments = [
  { ...establishments[0], owner: "MBA NDONG J Baptiste", plan: "Pro", mrr: 55000, status: "active", users: 3, orders: 847, expiresAt: "2026-05-15" },
  { ...establishments[1], owner: "Sylvie Ndong", plan: "Essentiel", mrr: 35000, status: "active", users: 4, orders: 1230, expiresAt: "2026-04-20" },
  { ...establishments[2], owner: "Fabrice Engonga", plan: "Pro", mrr: 55000, status: "active", users: 5, orders: 562, expiresAt: "2026-06-01" },
  { id: "est-004", name: "Chez Tonton", slug: "chez-tonton", type: "snack" as const, owner: "Pierre Ondo", plan: "Starter", mrr: 0, status: "trial", users: 1, orders: 23, expiresAt: "2026-04-05", description: "", address: "", city: "Libreville", phone: "", whatsapp: "", latitude: 0, longitude: 0, opening_hours: {}, max_capacity: 40 },
  { id: "est-005", name: "Le Sunset Bar", slug: "sunset-bar", type: "bar" as const, owner: "Marc Akure", plan: "Essentiel", mrr: 35000, status: "suspended", users: 2, orders: 0, expiresAt: "2026-03-10", description: "", address: "", city: "Port-Gentil", phone: "", whatsapp: "", latitude: 0, longitude: 0, opening_hours: {}, max_capacity: 60 },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: "Actif", color: "text-success", bg: "bg-success/20" },
  trial: { label: "Essai", color: "text-info", bg: "bg-info/20" },
  suspended: { label: "Suspendu", color: "text-danger", bg: "bg-danger/20" },
  expired: { label: "Expiré", color: "text-warning", bg: "bg-warning/20" },
};

const planColors: Record<string, string> = {
  Starter: "text-text-muted",
  Essentiel: "text-info",
  Pro: "text-gold",
  Enterprise: "text-purple-400",
};

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = allEstablishments.filter((e) => {
    const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.owner.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || e.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalMRR = allEstablishments.filter((e) => e.status === "active").reduce((s, e) => s + e.mrr, 0);
  const totalUsers = allEstablishments.reduce((s, e) => s + e.users, 0);
  const activeCount = allEstablishments.filter((e) => e.status === "active").length;
  const trialCount = allEstablishments.filter((e) => e.status === "trial").length;

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="h-16 border-b border-border bg-surface/80 backdrop-blur-lg sticky top-0 z-30 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Shield size={20} className="text-gold" />
          <span className="text-lg font-bold text-gradient-gold">NightLife Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-muted">{user?.full_name || "Admin"}</span>
          <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-surface-light text-text-muted hover:text-danger transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Building2 size={20} className="text-gold" />
              <TrendingUp size={14} className="text-success" />
            </div>
            <p className="text-2xl font-bold">{allEstablishments.length}</p>
            <p className="text-xs text-text-muted">Établissements</p>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Users size={20} className="text-info" />
              <span className="text-xs text-success">+3 ce mois</span>
            </div>
            <p className="text-2xl font-bold">{totalUsers}</p>
            <p className="text-xs text-text-muted">Utilisateurs</p>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign size={20} className="text-success" />
            </div>
            <p className="text-2xl font-bold">{totalMRR.toLocaleString("fr-FR")}</p>
            <p className="text-xs text-text-muted">MRR (FCFA)</p>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle size={20} className="text-warning" />
            </div>
            <p className="text-2xl font-bold text-warning">{trialCount}</p>
            <p className="text-xs text-text-muted">En période d&apos;essai</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un établissement ou propriétaire..."
              className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border rounded-xl text-sm placeholder:text-text-dim focus:outline-none focus:border-gold/50"
            />
          </div>
          <div className="flex gap-1 bg-surface rounded-lg p-1">
            {[
              { key: "all", label: "Tous" },
              { key: "active", label: "Actifs" },
              { key: "trial", label: "Essai" },
              { key: "suspended", label: "Suspendus" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterStatus(f.key)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  filterStatus === f.key ? "bg-gold/20 text-gold" : "text-text-muted hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs font-medium text-text-muted">Établissement</th>
                  <th className="text-left p-4 text-xs font-medium text-text-muted">Propriétaire</th>
                  <th className="text-left p-4 text-xs font-medium text-text-muted">Plan</th>
                  <th className="text-left p-4 text-xs font-medium text-text-muted">Statut</th>
                  <th className="text-right p-4 text-xs font-medium text-text-muted">MRR</th>
                  <th className="text-right p-4 text-xs font-medium text-text-muted">Commandes</th>
                  <th className="text-left p-4 text-xs font-medium text-text-muted">Expiration</th>
                  <th className="text-center p-4 text-xs font-medium text-text-muted">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((est) => {
                  const status = statusConfig[est.status] || statusConfig.active;
                  const daysLeft = Math.ceil((new Date(est.expiresAt).getTime() - Date.now()) / 86400000);
                  return (
                    <tr key={est.id} className="hover:bg-surface-light/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-sm">{est.name}</p>
                          <p className="text-xs text-text-dim capitalize">{est.type} — {est.city}</p>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-text-muted">{est.owner}</td>
                      <td className="p-4">
                        <span className={`text-sm font-medium ${planColors[est.plan] || ""}`}>{est.plan}</span>
                      </td>
                      <td className="p-4">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="p-4 text-right text-sm font-medium">
                        {est.mrr > 0 ? `${est.mrr.toLocaleString("fr-FR")} F` : "—"}
                      </td>
                      <td className="p-4 text-right text-sm text-text-muted">{est.orders}</td>
                      <td className="p-4">
                        <span className={`text-xs ${daysLeft < 7 ? "text-danger" : daysLeft < 30 ? "text-warning" : "text-text-muted"}`}>
                          {daysLeft > 0 ? `${daysLeft}j restants` : "Expiré"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-surface-light text-text-muted hover:text-gold transition-colors" title="Voir">
                            <Eye size={16} />
                          </button>
                          {est.status === "suspended" ? (
                            <button className="p-1.5 rounded-lg hover:bg-success/10 text-text-muted hover:text-success transition-colors" title="Réactiver">
                              <Check size={16} />
                            </button>
                          ) : (
                            <button className="p-1.5 rounded-lg hover:bg-danger/10 text-text-muted hover:text-danger transition-colors" title="Suspendre">
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
