"use client";

import { create } from "zustand";
import { orders as demoOrders, type DemoOrder } from "@/lib/demo/data";

interface OrdersState {
  orders: DemoOrder[];
  addOrder: (order: DemoOrder) => void;
  updateStatus: (orderId: string, status: string) => void;
  getByStatus: (status: string) => DemoOrder[];
  getByEstablishment: (estId: string) => DemoOrder[];
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: demoOrders,

  addOrder: (order) =>
    set((state) => ({ orders: [order, ...state.orders] })),

  updateStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status } : o
      ),
    })),

  getByStatus: (status) =>
    get().orders.filter((o) => o.status === status),

  getByEstablishment: (estId) =>
    get().orders.filter((o) => o.establishmentId === estId),
}));
