import { create } from "zustand";
import type { MenuItem, CartItem } from "@/lib/types";

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (menuItem: MenuItem) => {
    set((state) => {
      const existing = state.items.find((i) => i.menuItem.id === menuItem.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.menuItem.id === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { menuItem, quantity: 1 }] };
    });
  },

  removeItem: (itemId: string) => {
    set((state) => ({
      items: state.items.filter((i) => i.menuItem.id !== itemId),
    }));
  },

  updateQuantity: (itemId: string, qty: number) => {
    if (qty <= 0) {
      get().removeItem(itemId);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.menuItem.id === itemId ? { ...i, quantity: qty } : i
      ),
    }));
  },

  clear: () => set({ items: [] }),

  total: () => get().items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0),

  itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
