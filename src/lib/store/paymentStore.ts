import { create } from "zustand";

export type PaymentMethod = "airtel" | "moov" | "cash" | "card";
export type PaymentStatus = "pending" | "processing" | "success" | "failed";

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  phone?: string;
  status: PaymentStatus;
  transactionId: string;
  timestamp: Date;
}

interface PaymentStore {
  payments: Payment[];
  addPayment: (payment: Omit<Payment, "id" | "timestamp" | "transactionId">) => string;
  updateStatus: (id: string, status: PaymentStatus) => void;
  getPaymentsByOrder: (orderId: string) => Payment[];
}

let counter = 0;

function generateTxnId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `NL-TXN-2026-${code}`;
}

export const usePaymentStore = create<PaymentStore>((set, get) => ({
  payments: [
    {
      id: "pay-1",
      orderId: "demo-4",
      amount: 5000,
      method: "airtel",
      phone: "+241 06 12 34 56",
      status: "success",
      transactionId: "NL-TXN-2026-A7K2",
      timestamp: new Date(Date.now() - 30 * 60000),
    },
    {
      id: "pay-2",
      orderId: "demo-5",
      amount: 40000,
      method: "cash",
      status: "success",
      transactionId: "NL-TXN-2026-B3M8",
      timestamp: new Date(Date.now() - 45 * 60000),
    },
    {
      id: "pay-3",
      orderId: "demo-6",
      amount: 9500,
      method: "moov",
      phone: "+241 05 98 76 54",
      status: "success",
      transactionId: "NL-TXN-2026-C9P1",
      timestamp: new Date(Date.now() - 60 * 60000),
    },
  ],

  addPayment: (payment) => {
    const id = `pay-${++counter + 3}`;
    const transactionId = generateTxnId();
    set((state) => ({
      payments: [{ ...payment, id, transactionId, timestamp: new Date() }, ...state.payments],
    }));
    return id;
  },

  updateStatus: (id, status) => {
    set((state) => ({
      payments: state.payments.map((p) => (p.id === id ? { ...p, status } : p)),
    }));
  },

  getPaymentsByOrder: (orderId) => get().payments.filter((p) => p.orderId === orderId),
}));
