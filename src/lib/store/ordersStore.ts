import { create } from "zustand";
import type { OrderStatus, PaymentMode } from "@/lib/types";

export interface DemoOrder {
  id: string;
  table: number;
  items: { name: string; quantity: number; price: number; emoji: string }[];
  waiter: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  clientName?: string;
}

interface OrdersStore {
  orders: DemoOrder[];
  addOrder: (order: Omit<DemoOrder, "id" | "createdAt">) => string;
  updateStatus: (orderId: string, status: OrderStatus) => void;
  getActiveOrders: () => DemoOrder[];
  getPaidOrders: () => DemoOrder[];
  getOrdersByStatus: (status: OrderStatus) => DemoOrder[];
  getTotalCA: () => number;
  getOrderCount: () => number;
}

let orderCounter = 7;

const INITIAL_ORDERS: DemoOrder[] = [
  {
    id: "demo-1",
    table: 3,
    items: [
      { name: "Whisky JB", quantity: 2, price: 4500, emoji: "🥃" },
      { name: "Brochettes mixtes", quantity: 1, price: 2500, emoji: "🍗" },
    ],
    waiter: "Moussa",
    totalAmount: 11500,
    status: "preparing",
    createdAt: new Date(Date.now() - 18 * 60000),
  },
  {
    id: "demo-2",
    table: 7,
    items: [
      { name: "Régab Pression", quantity: 4, price: 1000, emoji: "🍺" },
      { name: "Tropical Sunset", quantity: 1, price: 3500, emoji: "🍹" },
    ],
    waiter: "Éva",
    totalAmount: 7500,
    status: "served",
    createdAt: new Date(Date.now() - 5 * 60000),
  },
  {
    id: "demo-3",
    table: 1,
    items: [{ name: "Moët & Chandon", quantity: 1, price: 45000, emoji: "🍾" }],
    waiter: "Kevin",
    totalAmount: 45000,
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 60000),
  },
  {
    id: "demo-4",
    table: 5,
    items: [
      { name: "Régab Pression", quantity: 3, price: 1000, emoji: "🍺" },
      { name: "Jus d'orange", quantity: 2, price: 1000, emoji: "🍊" },
    ],
    waiter: "Éva",
    totalAmount: 5000,
    status: "paid",
    createdAt: new Date(Date.now() - 30 * 60000),
  },
  {
    id: "demo-5",
    table: 9,
    items: [
      { name: "Hennessy VS", quantity: 1, price: 35000, emoji: "🥃" },
      { name: "Brochettes mixtes", quantity: 2, price: 2500, emoji: "🍗" },
    ],
    waiter: "Kevin",
    totalAmount: 40000,
    status: "paid",
    createdAt: new Date(Date.now() - 45 * 60000),
  },
  {
    id: "demo-6",
    table: 2,
    items: [
      { name: "Mojito Africain", quantity: 2, price: 4000, emoji: "🍸" },
      { name: "Plantain frit", quantity: 1, price: 1500, emoji: "🍌" },
    ],
    waiter: "Moussa",
    totalAmount: 9500,
    status: "paid",
    createdAt: new Date(Date.now() - 60 * 60000),
  },
];

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: INITIAL_ORDERS,

  addOrder: (order) => {
    const id = `order-${++orderCounter}`;
    set((state) => ({
      orders: [
        { ...order, id, createdAt: new Date() },
        ...state.orders,
      ],
    }));
    return id;
  },

  updateStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status } : o
      ),
    }));
  },

  getActiveOrders: () =>
    get().orders.filter((o) => ["pending", "preparing", "served"].includes(o.status)),

  getPaidOrders: () =>
    get().orders.filter((o) => o.status === "paid"),

  getOrdersByStatus: (status) =>
    get().orders.filter((o) => o.status === status),

  getTotalCA: () =>
    get().orders
      .filter((o) => o.status === "paid")
      .reduce((sum, o) => sum + o.totalAmount, 0),

  getOrderCount: () =>
    get().orders.filter((o) => o.status !== "cancelled").length,
}));
