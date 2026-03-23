"use client";

import { useState } from "react";
import { Clock, LogIn, LogOut, User, Calendar, Timer } from "lucide-react";
import { staff } from "@/lib/demo/data";

interface PointageEntry {
  staffId: string;
  staffName: string;
  role: string;
  clockIn: string | null;
  clockOut: string | null;
  status: "present" | "absent" | "late" | "off";
}

const today = "2026-03-23";

const initialPointage: PointageEntry[] = [
  { staffId: "stf-001", staffName: "Alain Obiang", role: "Manager", clockIn: "16:45", clockOut: null, status: "present" },
  { staffId: "stf-002", staffName: "Marie-Claire Nzé", role: "Serveur", clockIn: "17:02", clockOut: null, status: "late" },
  { staffId: "stf-003", staffName: "Patrick Mba", role: "Barman", clockIn: "16:55", clockOut: null, status: "present" },
  { staffId: "stf-004", staffName: "Sylvie Ndong", role: "Serveur", clockIn: null, clockOut: null, status: "absent" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  present: { label: "Présent", color: "text-success", bg: "bg-success/20" },
  late: { label: "En retard", color: "text-warning", bg: "bg-warning/20" },
  absent: { label: "Absent", color: "text-danger", bg: "bg-danger/20" },
  off: { label: "Repos", color: "text-text-dim", bg: "bg-surface-light" },
};

function getHoursWorked(clockIn: string | null): string {
  if (!clockIn) return "—";
  const [h, m] = clockIn.split(":").map(Number);
  const now = new Date();
  const start = new Date();
  start.setHours(h, m, 0);
  const diff = Math.max(0, now.getTime() - start.getTime());
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return `${hours}h${mins.toString().padStart(2, "0")}`;
}

export default function PointagePage() {
  const [entries, setEntries] = useState(initialPointage);

  const presentCount = entries.filter((e) => e.status === "present" || e.status === "late").length;
  const lateCount = entries.filter((e) => e.status === "late").length;
  const absentCount = entries.filter((e) => e.status === "absent").length;

  function clockIn(staffId: string) {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setEntries(entries.map((e) =>
      e.staffId === staffId ? { ...e, clockIn: time, status: "present" } : e
    ));
  }

  function clockOut(staffId: string) {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setEntries(entries.map((e) =>
      e.staffId === staffId ? { ...e, clockOut: time } : e
    ));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pointage</h1>
          <p className="text-sm text-text-muted">
            <Calendar size={14} className="inline mr-1" />
            Samedi 23 mars 2026 — Shift du soir
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-success">{presentCount}</p>
          <p className="text-xs text-text-muted">Présents</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-warning">{lateCount}</p>
          <p className="text-xs text-text-muted">En retard</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-danger">{absentCount}</p>
          <p className="text-xs text-text-muted">Absents</p>
        </div>
      </div>

      {/* Staff list */}
      <div className="space-y-3">
        {entries.map((entry) => {
          const status = statusConfig[entry.status];
          return (
            <div key={entry.staffId} className="glass rounded-xl p-4 hover:border-gold/10 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <User size={18} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{entry.staffName}</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-text-muted">{entry.role}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Times */}
                  <div className="text-right text-sm">
                    <div className="flex items-center gap-2 text-text-muted">
                      <LogIn size={14} className="text-success" />
                      <span>{entry.clockIn || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-muted">
                      <LogOut size={14} className="text-danger" />
                      <span>{entry.clockOut || "—"}</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="text-right w-16">
                    <div className="flex items-center gap-1 text-sm text-text-muted">
                      <Timer size={14} />
                      <span>{getHoursWorked(entry.clockIn)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {!entry.clockIn && (
                      <button
                        onClick={() => clockIn(entry.staffId)}
                        className="px-3 py-2 bg-success/10 text-success text-sm font-medium rounded-lg hover:bg-success/20 transition-all flex items-center gap-1"
                      >
                        <LogIn size={14} /> Arrivée
                      </button>
                    )}
                    {entry.clockIn && !entry.clockOut && (
                      <button
                        onClick={() => clockOut(entry.staffId)}
                        className="px-3 py-2 bg-danger/10 text-danger text-sm font-medium rounded-lg hover:bg-danger/20 transition-all flex items-center gap-1"
                      >
                        <LogOut size={14} /> Départ
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
