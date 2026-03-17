"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/shared/Logo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/lib/hooks/useAuth";
import { STAFF_ROLES } from "@/lib/utils/constants";
import type { StaffRole } from "@/lib/types";

export default function StaffLoginPage() {
  const router = useRouter();
  const { isDemo } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<StaffRole>("manager");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (isDemo) {
      // In demo mode, go straight to dashboard
      router.replace("/dashboard");
      return;
    }
    if (!username || !password) {
      setError("Remplissez tous les champs");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: `${username}@nightlife.ga`,
        password,
      });
      if (err) throw err;
      router.replace("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Identifiants invalides";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#100008] via-dark-1 to-[#0A0A0F] flex flex-col items-center justify-center px-6 relative">
      {/* Red glow */}
      <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(255,75,110,0.1)_0%,transparent_70%)]" />

      <Logo size="md" color="accent" className="mb-4 relative z-10" />
      <p className="text-[8px] tracking-[0.4em] text-muted uppercase mb-5">
        Staff · Accès Sécurisé
      </p>

      {/* Security notice */}
      <div className="w-full bg-accent/[0.08] border border-accent/20 rounded-xl px-3.5 py-2 mb-5 text-[9px] text-accent/80 tracking-wider flex items-center gap-2">
        🔒 {isDemo ? "Mode démo · Remplissez les champs librement" : "Connexion réservée au personnel autorisé"}
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
          {loading ? "CONNEXION..." : "ACCÈS STAFF"}
        </Button>
      </div>

      {error && (
        <p className="mt-3 text-[10px] text-accent">{error}</p>
      )}

      <div className="mt-5 text-[9px] text-muted tracking-[0.2em]">— Sélection du rôle —</div>

      <div className="flex gap-1.5 mt-3 flex-wrap justify-center">
        {STAFF_ROLES.map((r) => (
          <button
            key={r.value}
            onClick={() => setSelectedRole(r.value)}
            className={`px-2.5 py-1 rounded-full border text-[8px] tracking-wider transition-all ${
              selectedRole === r.value
                ? "border-accent/40 text-accent bg-accent/[0.08]"
                : "border-white/[0.08] text-muted"
            }`}
          >
            {r.emoji} {r.label}
          </button>
        ))}
      </div>

      <button
        className="mt-6 text-[10px] text-muted hover:text-cream transition-colors"
        onClick={() => router.push("/login")}
      >
        ← Retour connexion client
      </button>
    </div>
  );
}
