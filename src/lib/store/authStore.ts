"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEMO_ACCOUNTS, type DemoAccountType } from "@/lib/auth/demo-accounts";

interface UserProfile {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  role: string;
  loyalty_points?: number;
  loyalty_tier?: string;
  total_spent?: number;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isDemo: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsDemo: (type: DemoAccountType) => void;
  logout: () => void;
  setLoading: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isDemo: false,
      loading: false,

      login: async (email: string, password: string) => {
        set({ loading: true });

        // Check demo accounts first
        const demoEntry = Object.values(DEMO_ACCOUNTS).find(
          (a) => a.email === email && a.password === password
        );

        if (demoEntry) {
          set({
            user: {
              id: demoEntry.id,
              full_name: demoEntry.profile.full_name,
              phone: demoEntry.profile.phone,
              email: demoEntry.email,
              role: demoEntry.profile.role,
              ...("loyalty_points" in demoEntry.profile
                ? {
                    loyalty_points: demoEntry.profile.loyalty_points,
                    loyalty_tier: demoEntry.profile.loyalty_tier,
                    total_spent: demoEntry.profile.total_spent,
                  }
                : {}),
            },
            isAuthenticated: true,
            isDemo: true,
            loading: false,
          });
          return true;
        }

        // TODO: Supabase auth
        set({ loading: false });
        return false;
      },

      loginAsDemo: (type: DemoAccountType) => {
        const account = DEMO_ACCOUNTS[type];
        set({
          user: {
            id: account.id,
            full_name: account.profile.full_name,
            phone: account.profile.phone,
            email: account.email,
            role: account.profile.role,
            ...("loyalty_points" in account.profile
              ? {
                  loyalty_points: account.profile.loyalty_points,
                  loyalty_tier: account.profile.loyalty_tier,
                  total_spent: account.profile.total_spent,
                }
              : {}),
          },
          isAuthenticated: true,
          isDemo: true,
          loading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isDemo: false,
          loading: false,
        });
      },

      setLoading: (v: boolean) => set({ loading: v }),
    }),
    {
      name: "nl-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isDemo: state.isDemo,
      }),
    }
  )
);
