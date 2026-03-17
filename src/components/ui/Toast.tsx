"use client";

import { create } from "zustand";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastType = "success" | "error" | "info" | "gold";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  icon?: string;
}

interface ToastStore {
  toasts: Toast[];
  add: (message: string, type?: ToastType, icon?: string) => void;
  remove: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  add: (message, type = "success", icon) => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, message, type, icon }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3000);
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

const STYLES: Record<ToastType, string> = {
  success: "bg-success/15 border-success/30 text-success",
  error: "bg-accent/15 border-accent/30 text-accent",
  info: "bg-info/15 border-info/30 text-info",
  gold: "bg-gold/15 border-gold/30 text-gold",
};

const DEFAULT_ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
  gold: "★",
};

export function ToastContainer() {
  const toasts = useToast((s) => s.toasts);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl ${STYLES[toast.type]}`}
          >
            <span className="text-base">{toast.icon || DEFAULT_ICONS[toast.type]}</span>
            <span className="text-[11px] font-medium tracking-wide">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
