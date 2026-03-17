"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { StaffRole } from "@/lib/types";

interface AuthState {
  user: User | null;
  /** @deprecated Use `user` instead */
  firebaseUser: User | null;
  role: "client" | StaffRole | null;
  displayName: string;
  loading: boolean;
  isDemo: boolean;
  enterDemo: () => void;
}

const AuthContext = createContext<AuthState>({
  user: null,
  firebaseUser: null,
  role: null,
  displayName: "",
  loading: true,
  isDemo: false,
  enterDemo: () => {},
});

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && !url.includes("your_") && url.includes("supabase.co");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    firebaseUser: null,
    role: null,
    displayName: "",
    loading: true,
    isDemo: false,
    enterDemo: () => {},
  });

  const enterDemo = useCallback(() => {
    setState((prev) => ({
      ...prev,
      loading: false,
      isDemo: true,
    }));
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setState((prev) => ({
        ...prev,
        loading: false,
        isDemo: true,
        enterDemo,
      }));
      return;
    }

    // Check for existing demo flag
    if (typeof window !== "undefined" && sessionStorage.getItem("nightlife_demo")) {
      setState((prev) => ({
        ...prev,
        loading: false,
        isDemo: true,
        enterDemo,
      }));
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user);
      } else {
        setState((prev) => ({ ...prev, loading: false, isDemo: false, enterDemo }));
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          loadProfile(session.user);
        } else {
          setState((prev) => ({
            ...prev,
            user: null,
            firebaseUser: null,
            role: null,
            displayName: "",
            loading: false,
            isDemo: false,
            enterDemo,
          }));
        }
      }
    );

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadProfile(user: User) {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const profile = data as { role?: string; display_name?: string } | null;

      if (profile) {
        setState((prev) => ({
          ...prev,
          user,
          firebaseUser: user,
          role: (profile.role || "client") as "client" | StaffRole,
          displayName: profile.display_name || user.phone || "",
          loading: false,
          isDemo: false,
          enterDemo,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          user,
          firebaseUser: user,
          role: "client",
          displayName: user.phone || "",
          loading: false,
          isDemo: false,
          enterDemo,
        }));
      }
    } catch {
      setState((prev) => ({
        ...prev,
        user,
        firebaseUser: user,
        role: "client",
        displayName: user.phone || "",
        loading: false,
        isDemo: false,
        enterDemo,
      }));
    }
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
