"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export function useRequireAuth(requiredRole?: "client" | "staff" | "superadmin") {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (requiredRole && user?.role !== requiredRole) {
      if (user?.role === "client") {
        router.replace("/mon-compte");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isAuthenticated, user, requiredRole, router]);

  return { user, isAuthenticated };
}
