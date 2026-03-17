"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import SplashScreen from "@/components/shared/SplashScreen";
import Onboarding from "@/components/shared/Onboarding";

export default function RootPage() {
  const router = useRouter();
  const { role, loading, isDemo } = useAuth();
  const [phase, setPhase] = useState<"splash" | "onboarding" | "redirect">("splash");

  // Check if onboarding was already seen
  const hasSeenOnboarding = typeof window !== "undefined" && localStorage.getItem("nl_onboarded") === "1";

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase(hasSeenOnboarding ? "redirect" : "onboarding");
    }, 3200);
    return () => clearTimeout(timer);
  }, [hasSeenOnboarding]);

  useEffect(() => {
    if (phase !== "redirect" || loading) return;

    if (isDemo || !role) {
      router.replace("/login");
    } else if (role === "client") {
      router.replace("/accueil");
    } else {
      router.replace("/dashboard");
    }
  }, [phase, loading, role, isDemo, router]);

  function handleOnboardingComplete() {
    localStorage.setItem("nl_onboarded", "1");
    setPhase("redirect");
  }

  return (
    <>
      <SplashScreen show={phase === "splash"} />
      {phase === "onboarding" && <Onboarding onComplete={handleOnboardingComplete} />}
    </>
  );
}
