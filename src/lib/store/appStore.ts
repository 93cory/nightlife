"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { establishments, type DemoEstablishment } from "@/lib/demo/data";

interface AppState {
  currentEstablishment: DemoEstablishment;
  setEstablishment: (id: string) => void;
  isDemo: boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentEstablishment: establishments[0],
      isDemo: true,

      setEstablishment: (id: string) => {
        const est = establishments.find((e) => e.id === id) ?? establishments[0];
        set({ currentEstablishment: est });
      },
    }),
    {
      name: "nl-app",
      partialize: (state) => ({
        currentEstablishment: state.currentEstablishment,
      }),
    }
  )
);
