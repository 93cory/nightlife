"use client";

import { create } from "zustand";

export interface CaisseTransaction {
  id: string;
  orderId: string;
  amount: number;
  paymentMode: string;
  staffName: string;
  tip: number;
  timestamp: string;
}

interface CaisseState {
  isOpen: boolean;
  openingAmount: number;
  totalSales: number;
  totalCash: number;
  totalMobile: number;
  totalCard: number;
  transactionCount: number;
  transactions: CaisseTransaction[];
  openSession: (amount: number) => void;
  closeSession: () => void;
  addTransaction: (tx: Omit<CaisseTransaction, "id" | "timestamp">) => void;
}

export const useCaisseStore = create<CaisseState>((set) => ({
  isOpen: true,
  openingAmount: 50000,
  totalSales: 847500,
  totalCash: 385000,
  totalMobile: 340000,
  totalCard: 122500,
  transactionCount: 43,
  transactions: [
    { id: "tx-001", orderId: "ord-003", amount: 11500, paymentMode: "mobile_money", staffName: "Marie-Claire Nzé", tip: 500, timestamp: new Date(Date.now() - 1800000).toISOString() },
    { id: "tx-002", orderId: "ord-005", amount: 4000, paymentMode: "cash", staffName: "Marie-Claire Nzé", tip: 0, timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: "tx-003", orderId: "ord-021", amount: 120000, paymentMode: "card", staffName: "Fabrice Engonga", tip: 5000, timestamp: new Date(Date.now() - 3600000).toISOString() },
  ],

  openSession: (amount) =>
    set({
      isOpen: true,
      openingAmount: amount,
      totalSales: 0,
      totalCash: 0,
      totalMobile: 0,
      totalCard: 0,
      transactionCount: 0,
      transactions: [],
    }),

  closeSession: () => set({ isOpen: false }),

  addTransaction: (tx) =>
    set((state) => {
      const newTx: CaisseTransaction = {
        ...tx,
        id: `tx-${Date.now()}`,
        timestamp: new Date().toISOString(),
      };
      const modeKey =
        tx.paymentMode === "cash"
          ? "totalCash"
          : tx.paymentMode === "mobile_money"
          ? "totalMobile"
          : "totalCard";
      return {
        transactions: [newTx, ...state.transactions],
        totalSales: state.totalSales + tx.amount,
        [modeKey]: (state[modeKey] as number) + tx.amount,
        transactionCount: state.transactionCount + 1,
      };
    }),
}));
