"use client";

import { useState, useEffect } from "react";
import { ChefHat, Clock, Check, Bell, AlertTriangle } from "lucide-react";

interface KdsOrder {
  id: string;
  tableNumber: number;
  staffName: string;
  items: { name: string; quantity: number; notes?: string }[];
  status: "new" | "preparing" | "ready";
  createdAt: Date;
}

const initialOrders: KdsOrder[] = [
  { id: "KDS-001", tableNumber: 4, staffName: "Sylvie", items: [{ name: "Poulet braisé", quantity: 2 }, { name: "Plantain frit", quantity: 2 }], status: "preparing", createdAt: new Date(Date.now() - 720000) },
  { id: "KDS-002", tableNumber: 2, staffName: "Sylvie", items: [{ name: "Ndolè", quantity: 1 }, { name: "Riz blanc", quantity: 1 }, { name: "Poisson braisé", quantity: 1, notes: "Bien cuit" }], status: "preparing", createdAt: new Date(Date.now() - 480000) },
  { id: "KDS-003", tableNumber: 6, staffName: "Christelle", items: [{ name: "Brochettes mixtes", quantity: 2 }, { name: "Salade africaine", quantity: 1 }], status: "new", createdAt: new Date(Date.now() - 180000) },
  { id: "KDS-004", tableNumber: 1, staffName: "Sylvie", items: [{ name: "Nyembwé poulet", quantity: 1 }, { name: "Banane flambée", quantity: 2 }], status: "new", createdAt: new Date(Date.now() - 60000) },
  { id: "KDS-005", tableNumber: 8, staffName: "Christelle", items: [{ name: "Côtes de porc", quantity: 1 }, { name: "Gâteau chocolat", quantity: 1 }], status: "ready", createdAt: new Date(Date.now() - 900000) },
];

function timeAgo(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  return mins < 1 ? "< 1 min" : `${mins} min`;
}

const statusConfig = {
  new: { label: "Nouveau", color: "text-warning", bg: "bg-warning/20", border: "border-warning/30" },
  preparing: { label: "En préparation", color: "text-info", bg: "bg-info/20", border: "border-info/30" },
  ready: { label: "Prêt !", color: "text-success", bg: "bg-success/20", border: "border-success/30" },
};

export default function KdsPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [, setTick] = useState(0);

  // Update timer every 30s
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  function advance(id: string) {
    setOrders(orders.map((o) => {
      if (o.id !== id) return o;
      if (o.status === "new") return { ...o, status: "preparing" };
      if (o.status === "preparing") return { ...o, status: "ready" };
      return o;
    }));
  }

  function dismiss(id: string) {
    setOrders(orders.filter((o) => o.id !== id));
  }

  const newOrders = orders.filter((o) => o.status === "new");
  const preparingOrders = orders.filter((o) => o.status === "preparing");
  const readyOrders = orders.filter((o) => o.status === "ready");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ChefHat size={24} className="text-gold" /> Cuisine (KDS)
          </h1>
          <p className="text-sm text-text-muted">Chez Mama Rose — Tickets en cours</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="px-3 py-1 bg-warning/20 text-warning rounded-full font-medium">{newOrders.length} nouveaux</span>
          <span className="px-3 py-1 bg-info/20 text-info rounded-full font-medium">{preparingOrders.length} en cours</span>
          <span className="px-3 py-1 bg-success/20 text-success rounded-full font-medium">{readyOrders.length} prêts</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* New */}
        <div>
          <h2 className="text-sm font-bold text-warning mb-3 flex items-center gap-2"><Bell size={16} /> NOUVEAUX</h2>
          <div className="space-y-3">
            {newOrders.map((order) => {
              const mins = Math.floor((Date.now() - order.createdAt.getTime()) / 60000);
              return (
                <div key={order.id} className={`rounded-xl p-4 border-2 ${statusConfig.new.border} bg-warning/5`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-bold text-lg">Table {order.tableNumber}</span>
                      <span className="text-xs text-text-dim ml-2">({order.staffName})</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <Clock size={12} />
                      {timeAgo(order.createdAt)}
                      {mins > 5 && <AlertTriangle size={12} className="text-danger ml-1" />}
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {order.items.map((item, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="font-bold text-gold">{item.quantity}x</span>
                        <div>
                          <span>{item.name}</span>
                          {item.notes && <p className="text-xs text-warning">⚠ {item.notes}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => advance(order.id)} className="w-full py-2.5 bg-info/20 text-info font-semibold rounded-lg hover:bg-info/30 transition-all text-sm">
                    Commencer la préparation
                  </button>
                </div>
              );
            })}
            {newOrders.length === 0 && <p className="text-sm text-text-dim text-center py-8">Aucun nouveau ticket</p>}
          </div>
        </div>

        {/* Preparing */}
        <div>
          <h2 className="text-sm font-bold text-info mb-3 flex items-center gap-2"><ChefHat size={16} /> EN PRÉPARATION</h2>
          <div className="space-y-3">
            {preparingOrders.map((order) => {
              const mins = Math.floor((Date.now() - order.createdAt.getTime()) / 60000);
              return (
                <div key={order.id} className={`rounded-xl p-4 border-2 ${statusConfig.preparing.border} bg-info/5`}>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-bold text-lg">Table {order.tableNumber}</span>
                      <span className="text-xs text-text-dim ml-2">({order.staffName})</span>
                    </div>
                    <div className={`flex items-center gap-1 text-xs ${mins > 10 ? "text-danger" : "text-text-muted"}`}>
                      <Clock size={12} />
                      {timeAgo(order.createdAt)}
                      {mins > 10 && <AlertTriangle size={12} className="text-danger ml-1" />}
                    </div>
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {order.items.map((item, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="font-bold text-gold">{item.quantity}x</span>
                        <div>
                          <span>{item.name}</span>
                          {item.notes && <p className="text-xs text-warning">⚠ {item.notes}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => advance(order.id)} className="w-full py-2.5 bg-success/20 text-success font-semibold rounded-lg hover:bg-success/30 transition-all text-sm flex items-center justify-center gap-1">
                    <Check size={16} /> Marquer PRÊT
                  </button>
                </div>
              );
            })}
            {preparingOrders.length === 0 && <p className="text-sm text-text-dim text-center py-8">Rien en préparation</p>}
          </div>
        </div>

        {/* Ready */}
        <div>
          <h2 className="text-sm font-bold text-success mb-3 flex items-center gap-2"><Check size={16} /> PRÊTS À SERVIR</h2>
          <div className="space-y-3">
            {readyOrders.map((order) => (
              <div key={order.id} className={`rounded-xl p-4 border-2 ${statusConfig.ready.border} bg-success/5 animate-pulse`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-lg">Table {order.tableNumber}</span>
                  <span className="text-xs text-text-dim">({order.staffName})</span>
                </div>
                <ul className="space-y-1 mb-4">
                  {order.items.map((item, i) => (
                    <li key={i} className="text-sm"><span className="font-bold text-gold">{item.quantity}x</span> {item.name}</li>
                  ))}
                </ul>
                <button onClick={() => dismiss(order.id)} className="w-full py-2.5 bg-surface-light text-text-muted font-semibold rounded-lg hover:bg-surface-lighter transition-all text-sm">
                  Servi ✓
                </button>
              </div>
            ))}
            {readyOrders.length === 0 && <p className="text-sm text-text-dim text-center py-8">Rien de prêt</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
