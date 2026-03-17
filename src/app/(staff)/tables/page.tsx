"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTablesStore, TableInfo, TableStatus } from "@/lib/store/tablesStore";
import { useToast } from "@/components/ui/Toast";

const STATUS_CONFIG: Record<TableStatus, { label: string; color: string; bg: string; border: string }> = {
  free: { label: "Libre", color: "text-success", bg: "bg-success/15", border: "border-success/30" },
  occupied: { label: "Occupée", color: "text-info", bg: "bg-info/15", border: "border-info/30" },
  reserved: { label: "Réservée", color: "text-gold", bg: "bg-gold/15", border: "border-gold/30" },
  calling: { label: "Appel !", color: "text-accent", bg: "bg-accent/20", border: "border-accent/40" },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function TablesPage() {
  const tables = useTablesStore((s) => s.tables);
  const setStatus = useTablesStore((s) => s.setStatus);
  const dismissCall = useTablesStore((s) => s.dismissCall);
  const toast = useToast((s) => s.add);
  const [selected, setSelected] = useState<TableInfo | null>(null);

  const freeCount = tables.filter((t) => t.status === "free").length;
  const occupiedCount = tables.filter((t) => t.status === "occupied").length;
  const callingCount = tables.filter((t) => t.status === "calling").length;
  const reservedCount = tables.filter((t) => t.status === "reserved").length;

  function handleTableAction(table: TableInfo, action: string) {
    switch (action) {
      case "occupy":
        setStatus(table.id, "occupied", { waiter: "Éva" });
        toast(`Table ${table.id} occupée`, "success", "🍽️");
        break;
      case "free":
        setStatus(table.id, "free", { waiter: undefined, clientName: undefined });
        toast(`Table ${table.id} libérée`, "success", "✅");
        break;
      case "dismiss":
        dismissCall(table.id);
        toast(`Appel table ${table.id} pris en charge`, "success", "👍");
        break;
    }
    setSelected(null);
  }

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1 flex items-center justify-between">
        <div>
          <h1 className="font-display text-[22px] tracking-[0.15em] text-cream">Plan de Salle</h1>
          <p className="text-[9px] text-muted mt-0.5">{tables.length} tables · {freeCount} libres</p>
        </div>
        {callingCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 animate-pulse">
            <span className="text-xs">🔔</span>
            <span className="text-[9px] text-accent font-bold">{callingCount} APPEL{callingCount > 1 ? "S" : ""}</span>
          </div>
        )}
      </motion.div>

      {/* Legend */}
      <motion.div variants={fadeUp} className="flex gap-3 px-5 mt-2 mb-3">
        {[
          { status: "free", count: freeCount },
          { status: "occupied", count: occupiedCount },
          { status: "reserved", count: reservedCount },
          { status: "calling", count: callingCount },
        ].map(({ status, count }) => {
          const cfg = STATUS_CONFIG[status as TableStatus];
          return (
            <div key={status} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${cfg.bg} border ${cfg.border}`} />
              <span className="text-[8px] text-muted">{cfg.label} ({count})</span>
            </div>
          );
        })}
      </motion.div>

      {/* Floor Map */}
      <motion.div variants={fadeUp} className="mx-5 mb-4">
        <div className="relative aspect-[4/3] bg-dark-2 border border-white/[0.06] rounded-2xl overflow-hidden">
          {/* Decorations */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-dark-3 border border-white/[0.04]">
            <span className="text-[7px] text-muted tracking-wider">🎵 BAR / DJ</span>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-dark-3 border border-white/[0.04]">
            <span className="text-[7px] text-muted tracking-wider">🚪 ENTRÉE</span>
          </div>
          <div className="absolute top-1/2 left-1 -translate-y-1/2 px-1 py-3 rounded-r bg-dark-3 border border-white/[0.04] border-l-0">
            <span className="text-[6px] text-muted tracking-wider [writing-mode:vertical-rl] rotate-180">WC</span>
          </div>

          {/* Tables */}
          {tables.map((table) => {
            const cfg = STATUS_CONFIG[table.status];
            const isCalling = table.status === "calling";
            return (
              <motion.button
                key={table.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-xl ${cfg.bg} border ${cfg.border} flex flex-col items-center justify-center transition-all btn-press ${
                  isCalling ? "animate-pulse z-10 shadow-lg shadow-accent/20" : ""
                }`}
                style={{ left: `${table.x}%`, top: `${table.y}%` }}
                onClick={() => setSelected(table)}
                whileTap={{ scale: 0.9 }}
              >
                <span className={`font-display text-[11px] ${cfg.color}`}>{table.id}</span>
                <span className="text-[6px] text-muted">{table.seats}p</span>
                {isCalling && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    <span className="text-[7px]">🔔</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Calling alerts list */}
      {callingCount > 0 && (
        <motion.div variants={fadeUp} className="px-5 mb-4">
          <p className="text-[11px] font-semibold text-accent mb-2">🔔 Appels en attente</p>
          <div className="space-y-2">
            {tables.filter((t) => t.status === "calling").map((table) => (
              <div key={table.id} className="card-accent p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center font-display text-sm text-accent">
                    T{table.id}
                  </div>
                  <div>
                    <p className="text-[10px] text-cream font-medium">{table.callReason || "Appel serveur"}</p>
                    <p className="text-[8px] text-muted">{table.clientName || `Table ${table.id}`} · {table.waiter || "Non assigné"}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleTableAction(table, "dismiss")}
                  className="px-3 py-2 rounded-xl bg-success/15 border border-success/25 text-[9px] text-success tracking-wider font-medium btn-press"
                >
                  ✓ PRIS
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Table Detail Sheet */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50" onClick={() => setSelected(null)}>
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 max-w-md mx-auto bg-dark-1 border-t border-white/[0.06] rounded-t-3xl p-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-center mb-4">
                <div className="w-10 h-1 bg-white/10 rounded-full" />
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl ${STATUS_CONFIG[selected.status].bg} border ${STATUS_CONFIG[selected.status].border} flex items-center justify-center`}>
                  <span className="font-display text-2xl text-cream">{selected.id}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl tracking-[0.1em] text-cream">Table {selected.id}</h3>
                  <p className="text-[10px] text-muted">{selected.seats} places · {STATUS_CONFIG[selected.status].label}</p>
                  {selected.waiter && <p className="text-[9px] text-info mt-0.5">👤 {selected.waiter}</p>}
                  {selected.clientName && <p className="text-[9px] text-gold mt-0.5">{selected.clientName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                {selected.status === "free" && (
                  <button
                    onClick={() => handleTableAction(selected, "occupy")}
                    className="w-full py-3 rounded-xl bg-info/15 border border-info/25 text-[11px] text-info tracking-wider font-medium btn-press"
                  >
                    🍽️ INSTALLER DES CLIENTS
                  </button>
                )}
                {(selected.status === "occupied" || selected.status === "calling") && (
                  <>
                    {selected.status === "calling" && (
                      <button
                        onClick={() => handleTableAction(selected, "dismiss")}
                        className="w-full py-3 rounded-xl bg-success/15 border border-success/25 text-[11px] text-success tracking-wider font-medium btn-press"
                      >
                        ✅ APPEL PRIS EN CHARGE
                      </button>
                    )}
                    <button
                      onClick={() => handleTableAction(selected, "free")}
                      className="w-full py-3 rounded-xl bg-accent/10 border border-accent/20 text-[11px] text-accent tracking-wider font-medium btn-press"
                    >
                      🧹 LIBÉRER LA TABLE
                    </button>
                  </>
                )}
                {selected.status === "reserved" && (
                  <button
                    onClick={() => handleTableAction(selected, "occupy")}
                    className="w-full py-3 rounded-xl bg-gold/15 border border-gold/25 text-[11px] text-gold tracking-wider font-medium btn-press"
                  >
                    ✓ CLIENT ARRIVÉ
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelected(null)}
                className="w-full mt-3 py-3 rounded-xl border border-white/[0.06] text-[10px] text-muted tracking-wider btn-press"
              >
                FERMER
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
