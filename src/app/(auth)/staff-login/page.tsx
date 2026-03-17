"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/shared/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAuth } from "@/lib/hooks/useAuth";
import { STAFF_ROLES } from "@/lib/utils/constants";
import type { StaffRole } from "@/lib/types";

const DEMO_STAFF = [
  { name: "Alain Obiang", role: "Manager", initials: "AO", username: "alain", password: "1234" },
  { name: "Éva Ndong", role: "Serveuse", initials: "EN", username: "eva", password: "1234" },
  { name: "Kevin Ondo", role: "Barman", initials: "KO", username: "kevin", password: "1234" },
];

export default function StaffLoginPage() {
  const router = useRouter();
  const { enterDemo } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<StaffRole>("manager");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function enterDemoMode() {
    sessionStorage.setItem("nightlife_demo", "1");
    enterDemo();
    setLoading(true);
    setTimeout(() => router.replace("/dashboard"), 300);
  }

  function handleLogin() {
    enterDemoMode();
  }

  function quickLogin(staff: typeof DEMO_STAFF[0]) {
    sessionStorage.setItem("nightlife_demo", "1");
    sessionStorage.setItem("nightlife_staff", staff.name);
    enterDemo();
    setLoading(true);
    setTimeout(() => router.replace("/dashboard"), 500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#100008] via-dark-1 to-[#0A0A0F] flex flex-col items-center justify-center px-6 relative">
      {/* Red glow */}
      <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(255,75,110,0.1)_0%,transparent_70%)]" />

      <Logo size="md" color="accent" className="mb-4 relative z-10" />
      <p className="text-[8px] tracking-[0.4em] text-muted uppercase mb-5">
        Staff · Accès Sécurisé
      </p>

      {/* Quick Staff Accounts */}
      <div className="w-full mb-5">
        <p className="text-[8px] text-muted/50 tracking-[0.2em] uppercase text-center mb-2">CONNEXION RAPIDE</p>
        <div className="space-y-1.5">
          {DEMO_STAFF.map((staff) => (
            <button
              key={staff.username}
              onClick={() => quickLogin(staff)}
              className="w-full bg-dark-2 border border-white/[0.04] rounded-xl p-3 flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center text-[10px] font-bold text-accent">
                {staff.initials}
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-cream font-medium">{staff.name}</p>
                <p className="text-[9px] text-muted">{staff.role}</p>
              </div>
              <span className="text-[9px] text-accent/50">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-4 w-full">
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-[7px] text-muted/40 tracking-[0.2em]">OU</span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>

      <div className="w-full space-y-3">
        <Input
          label="Identifiant"
          icon="👤"
          placeholder="alain.obiang"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Mot de passe"
          icon="🔑"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mt-4 w-full">
        <Button variant="accent" size="lg" onClick={handleLogin} disabled={loading}>
          {loading ? (
            <span className="flex items-center gap-2 justify-center">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              CONNEXION...
            </span>
          ) : "ACCÈS STAFF"}
        </Button>
      </div>

      {error && (
        <p className="mt-3 text-[10px] text-accent">{error}</p>
      )}

      <button
        className="mt-6 text-[10px] text-muted hover:text-cream transition-colors"
        onClick={() => router.push("/login")}
      >
        ← Retour connexion client
      </button>

      <p className="mt-4 text-[7px] text-muted/20 tracking-[0.15em]">
        NIGHTLIFE STAFF v1.0
      </p>
    </div>
  );
}
