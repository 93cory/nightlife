"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import BottomNavStaff from "@/components/staff/BottomNavStaff";
import PageTransition from "@/components/shared/PageTransition";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  const { firebaseUser, role, loading, isDemo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading || isDemo) return;
    if (!firebaseUser) {
      router.replace("/staff-login");
    } else if (role === "client") {
      router.replace("/accueil");
    }
  }, [firebaseUser, role, loading, isDemo, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-night-black">
        <div className="animate-pulse text-accent font-display text-2xl tracking-widest">NIGHTLIFE</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-night-black pb-20">
      <PageTransition>{children}</PageTransition>
      <BottomNavStaff />
    </div>
  );
}
