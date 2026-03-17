"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import type { StaffRole } from "@/lib/types";

interface AuthState {
  firebaseUser: FirebaseUser | null;
  role: "client" | StaffRole | null;
  displayName: string;
  loading: boolean;
  isDemo: boolean;
}

const AuthContext = createContext<AuthState>({
  firebaseUser: null,
  role: null,
  displayName: "",
  loading: true,
  isDemo: false,
});

function isFirebaseConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  return !!key && key !== "your_api_key_here" && key.length > 10;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    firebaseUser: null,
    role: null,
    displayName: "",
    loading: true,
    isDemo: false,
  });

  useEffect(() => {
    // If Firebase is not configured, run in demo mode
    if (!isFirebaseConfigured()) {
      setState({
        firebaseUser: null,
        role: null,
        displayName: "",
        loading: false,
        isDemo: true,
      });
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setState({ firebaseUser: null, role: null, displayName: "", loading: false, isDemo: false });
        return;
      }

      try {
        // Check if staff
        const staffSnap = await getDoc(doc(db, "staff", firebaseUser.uid));
        if (staffSnap.exists()) {
          const data = staffSnap.data();
          setState({
            firebaseUser,
            role: data.role as StaffRole,
            displayName: data.displayName || "",
            loading: false,
            isDemo: false,
          });
          return;
        }

        // Check if client
        const userSnap = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userSnap.exists()) {
          const data = userSnap.data();
          setState({
            firebaseUser,
            role: "client",
            displayName: data.displayName || firebaseUser.phoneNumber || "",
            loading: false,
            isDemo: false,
          });
          return;
        }
      } catch {
        // Firestore error, continue with basic auth
      }

      setState({
        firebaseUser,
        role: "client",
        displayName: firebaseUser.phoneNumber || "",
        loading: false,
        isDemo: false,
      });
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
