"use client";

import { useAuthStore } from "@/lib/store/authStore";

export function useAuth() {
  const store = useAuthStore();

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isDemo: store.isDemo,
    loading: store.loading,
    role: store.user?.role ?? null,
    login: store.login,
    loginAsDemo: store.loginAsDemo,
    logout: store.logout,
  };
}
