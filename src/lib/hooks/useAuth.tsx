"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
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
}

const AuthContext = createContext<AuthState>({
  user: null,
  firebaseUser: null,
  role: null,
  displayName: "",
  loading: true,
  isDemo: false,
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
  });

  useEffect(() => {
    // Check if user opted into demo mode (no phone provider configured)
    const demoFlag = typeof window !== "undefined" && sessionStorage.getItem("nightlife_demo");

    if (!isSupabaseConfigured() || demoFlag) {
      setState({
        user: null,
        firebaseUser: null,
        role: null,
        displayName: "",
        loading: false,
        isDemo: true,
      });
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile(session.user);
      } else {
        setState((prev) => ({ ...prev, loading: false, isDemo: false }));
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          loadProfile(session.user);
        } else {
          setState({
            user: null,
            firebaseUser: null,
            role: null,
            displayName: "",
            loading: false,
            isDemo: false,
          });
        }
      }
    );

    return () => subscription.unsubscribe();
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
        setState({
          user,
          firebaseUser: user,
          role: (profile.role || "client") as "client" | StaffRole,
          displayName: profile.display_name || user.phone || "",
          loading: false,
          isDemo: false,
        });
      } else {
        setState({
          user,
          firebaseUser: user,
          role: "client",
          displayName: user.phone || "",
          loading: false,
          isDemo: false,
        });
      }
    } catch {
      setState({
        user,
        firebaseUser: user,
        role: "client",
        displayName: user.phone || "",
        loading: false,
        isDemo: false,
      });
    }
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
