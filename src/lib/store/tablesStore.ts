import { create } from "zustand";

export type TableStatus = "free" | "occupied" | "reserved" | "calling";

export interface TableInfo {
  id: number;
  x: number; // % position
  y: number;
  seats: number;
  status: TableStatus;
  waiter?: string;
  clientName?: string;
  callReason?: string;
}

interface TablesStore {
  tables: TableInfo[];
  setStatus: (id: number, status: TableStatus, extra?: Partial<TableInfo>) => void;
  callWaiter: (tableId: number, reason: string) => void;
  dismissCall: (tableId: number) => void;
  getCallingTables: () => TableInfo[];
}

const INITIAL_TABLES: TableInfo[] = [
  { id: 1, x: 12, y: 15, seats: 2, status: "occupied", waiter: "Éva", clientName: "Marc O." },
  { id: 2, x: 38, y: 12, seats: 4, status: "occupied", waiter: "Moussa", clientName: "Famille Ndong" },
  { id: 3, x: 65, y: 15, seats: 2, status: "free" },
  { id: 4, x: 88, y: 12, seats: 6, status: "reserved", clientName: "Résa 22h - VIP" },
  { id: 5, x: 10, y: 42, seats: 4, status: "occupied", waiter: "Éva", clientName: "Jean-Pierre" },
  { id: 6, x: 35, y: 40, seats: 2, status: "free" },
  { id: 7, x: 62, y: 42, seats: 4, status: "occupied", waiter: "Kevin", clientName: "Groupe Asso" },
  { id: 8, x: 88, y: 40, seats: 2, status: "free" },
  { id: 9, x: 12, y: 68, seats: 6, status: "occupied", waiter: "Moussa" },
  { id: 10, x: 38, y: 70, seats: 2, status: "free" },
  { id: 11, x: 65, y: 68, seats: 4, status: "occupied", waiter: "Kevin" },
  { id: 12, x: 88, y: 70, seats: 8, status: "reserved", clientName: "Résa 23h - Anniv" },
];

export const useTablesStore = create<TablesStore>((set, get) => ({
  tables: INITIAL_TABLES,

  setStatus: (id, status, extra) => {
    set((s) => ({
      tables: s.tables.map((t) =>
        t.id === id ? { ...t, status, ...extra } : t
      ),
    }));
  },

  callWaiter: (tableId, reason) => {
    set((s) => ({
      tables: s.tables.map((t) =>
        t.id === tableId ? { ...t, status: "calling" as TableStatus, callReason: reason } : t
      ),
    }));
  },

  dismissCall: (tableId) => {
    set((s) => ({
      tables: s.tables.map((t) =>
        t.id === tableId ? { ...t, status: "occupied" as TableStatus, callReason: undefined } : t
      ),
    }));
  },

  getCallingTables: () => get().tables.filter((t) => t.status === "calling"),
}));
