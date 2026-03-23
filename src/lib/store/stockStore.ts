"use client";

import { create } from "zustand";

export interface StockItem {
  id: string;
  menuItemId: string;
  name: string;
  emoji: string;
  category: string;
  currentQty: number;
  minQty: number;
  unit: string;
  costPrice: number;
  sellPrice: number;
}

const initialStock: StockItem[] = [
  { id: "stk-001", menuItemId: "mi-001", name: "Castel", emoji: "🍺", category: "Bières", currentQty: 45, minQty: 20, unit: "bouteilles", costPrice: 500, sellPrice: 1500 },
  { id: "stk-002", menuItemId: "mi-002", name: "Régab", emoji: "🍺", category: "Bières", currentQty: 30, minQty: 15, unit: "bouteilles", costPrice: 400, sellPrice: 1000 },
  { id: "stk-003", menuItemId: "mi-003", name: "Heineken", emoji: "🍺", category: "Bières", currentQty: 4, minQty: 12, unit: "bouteilles", costPrice: 800, sellPrice: 2000 },
  { id: "stk-004", menuItemId: "mi-004", name: "Flag", emoji: "🍺", category: "Bières", currentQty: 25, minQty: 15, unit: "bouteilles", costPrice: 450, sellPrice: 1200 },
  { id: "stk-005", menuItemId: "mi-005", name: "Guinness", emoji: "🍺", category: "Bières", currentQty: 18, minQty: 10, unit: "bouteilles", costPrice: 1000, sellPrice: 2500 },
  { id: "stk-006", menuItemId: "mi-012", name: "Johnnie Walker Red", emoji: "🥃", category: "Spiritueux", currentQty: 3, minQty: 5, unit: "bouteilles", costPrice: 15000, sellPrice: 55000 },
  { id: "stk-007", menuItemId: "mi-013", name: "Hennessy VS", emoji: "🥃", category: "Spiritueux", currentQty: 2, minQty: 3, unit: "bouteilles", costPrice: 35000, sellPrice: 75000 },
  { id: "stk-008", menuItemId: "mi-014", name: "Absolut Vodka", emoji: "🥃", category: "Spiritueux", currentQty: 8, minQty: 5, unit: "bouteilles", costPrice: 12000, sellPrice: 45000 },
  { id: "stk-009", menuItemId: "mi-015", name: "Coca-Cola", emoji: "🥤", category: "Softs", currentQty: 48, minQty: 24, unit: "canettes", costPrice: 300, sellPrice: 800 },
  { id: "stk-010", menuItemId: "mi-016", name: "Red Bull", emoji: "🥤", category: "Softs", currentQty: 6, minQty: 15, unit: "canettes", costPrice: 1200, sellPrice: 3000 },
  { id: "stk-011", menuItemId: "mi-017", name: "Eau minérale", emoji: "💧", category: "Softs", currentQty: 60, minQty: 30, unit: "bouteilles", costPrice: 150, sellPrice: 500 },
  { id: "stk-012", menuItemId: "mi-018", name: "Jus naturel", emoji: "🧃", category: "Softs", currentQty: 12, minQty: 8, unit: "bouteilles", costPrice: 500, sellPrice: 1500 },
];

interface StockState {
  items: StockItem[];
  updateQty: (id: string, delta: number) => void;
  getLowStock: () => StockItem[];
}

export const useStockStore = create<StockState>((set, get) => ({
  items: initialStock,

  updateQty: (id, delta) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, currentQty: Math.max(0, item.currentQty + delta) }
          : item
      ),
    })),

  getLowStock: () =>
    get().items.filter((item) => item.currentQty <= item.minQty),
}));
