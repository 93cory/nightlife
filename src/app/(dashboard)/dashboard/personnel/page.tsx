"use client";

import { Users, UserCheck, UserX, DollarSign } from "lucide-react";

const staffList = [
  { id: 1, name: "Alain Obiang", role: "Manager", online: true, orders: 0, ca: 287000, tips: 0, shift: "17h - 02h", color: "bg-gold/20 text-gold" },
  { id: 2, name: "Marie-Claire Nzé", role: "Serveuse", online: true, orders: 18, ca: 145000, tips: 12500, shift: "17h - 02h", color: "bg-info/20 text-info" },
  { id: 3, name: "Patrick Mba", role: "Barman", online: true, orders: 25, ca: 198000, tips: 8000, shift: "17h - 02h", color: "bg-success/20 text-success" },
  { id: 4, name: "Sylvie Ndong", role: "Serveuse", online: true, orders: 14, ca: 132000, tips: 9500, shift: "18h - 01h", color: "bg-info/20 text-info" },
  { id: 5, name: "Jean-Pierre Ondo", role: "Cuisinier", online: true, orders: 22, ca: 0, tips: 0, shift: "16h - 00h", color: "bg-warning/20 text-warning" },
  { id: 6, name: "Fabrice Engonga", role: "Sécurité", online: false, orders: 0, ca: 0, tips: 0, shift: "22h - 06h", color: "bg-bordeaux/30 text-red-400" },
  { id: 7, name: "Christelle Mintsa", role: "Serveuse", online: false, orders: 0, ca: 0, tips: 0, shift: "Repos", color: "bg-info/20 text-info" },
  { id: 8, name: "DJ Maleek", role: "DJ", online: false, orders: 0, ca: 0, tips: 0, shift: "22h - 02h", color: "bg-purple-500/20 text-purple-400" },
];

export default function PersonnelPage() {
  const online = staffList.filter((s) => s.online).length;
  const totalCA = staffList.reduce((s, p) => s + p.ca, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Personnel</h1>
        <button className="flex items-center gap-2 bg-gradient-gold text-black px-4 py-2 rounded-xl text-sm font-semibold">
          Ajouter un employé
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <Users size={18} className="text-gold mb-2" />
          <p className="text-2xl font-bold">{staffList.length}</p>
          <p className="text-xs text-text-muted">Total personnel</p>
        </div>
        <div className="glass rounded-xl p-4">
          <UserCheck size={18} className="text-success mb-2" />
          <p className="text-2xl font-bold text-success">{online}</p>
          <p className="text-xs text-text-muted">En service</p>
        </div>
        <div className="glass rounded-xl p-4">
          <UserX size={18} className="text-text-dim mb-2" />
          <p className="text-2xl font-bold">{staffList.length - online}</p>
          <p className="text-xs text-text-muted">Absents</p>
        </div>
        <div className="glass rounded-xl p-4">
          <DollarSign size={18} className="text-gold mb-2" />
          <p className="text-2xl font-bold">{totalCA.toLocaleString("fr-FR")}</p>
          <p className="text-xs text-text-muted">FCFA CA total</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffList.map((person) => (
          <div key={person.id} className="glass rounded-xl p-4 hover:border-gold/20 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm ${person.color}`}>
                {person.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{person.name}</h3>
                  <span className={`w-2 h-2 rounded-full ${person.online ? "bg-success" : "bg-text-dim"}`} />
                </div>
                <span className="text-xs text-text-muted">{person.role}</span>
              </div>
            </div>
            <div className="text-xs text-text-dim mb-2">Shift: {person.shift}</div>
            {person.online && (person.ca > 0 || person.orders > 0) && (
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                <div>
                  <p className="text-sm font-bold">{person.orders}</p>
                  <p className="text-[10px] text-text-dim">Commandes</p>
                </div>
                <div>
                  <p className="text-sm font-bold">{(person.ca / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-text-dim">CA (FCFA)</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-gold">{person.tips > 0 ? `${(person.tips / 1000).toFixed(1)}k` : "—"}</p>
                  <p className="text-[10px] text-text-dim">Pourboires</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
