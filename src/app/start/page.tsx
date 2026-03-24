"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import SplashScreen from "@/components/shared/SplashScreen";
import Onboarding from "@/components/shared/Onboarding";

export default function StartPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [phase, setPhase] = useState<"splash" | "onboarding" | "redirect">("splash");

  const hasSeenOnboarding =
    typeof window !== "undefined" && localStorage.getItem("nl_onboarded") === "1";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        setPhase("redirect");
      } else if (hasSeenOnboarding) {
        setPhase("redirect");
      } else {
        setPhase("onboarding");
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [isAuthenticated, hasSeenOnboarding]);

  useEffect(() => {
    if (phase !== "redirect") return;

    if (isAuthenticated) {
      if (user?.role === "client") {
        router.replace("/mon-compte");
      } else if (user?.role === "superadmin") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    } else {
      router.replace("/login");
    }
  }, [phase, isAuthenticated, user, router]);

  function handleOnboardingComplete() {
    localStorage.setItem("nl_onboarded", "1");
    setPhase("redirect");
  }

  return (
    <>
      <SplashScreen show={phase === "splash"} />
      {phase === "onboarding" && <Onboarding onComplete={handleOnboardingComplete} />}
      {phase === "redirect" && (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-black text-gradient-gold mb-2">NightLife</div>
            <p className="text-sm text-text-muted">Redirection...</p>
          </div>
        </div>
      )}
    </>
  );
}
