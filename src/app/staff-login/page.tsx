"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Hash, Wine, ChefHat, Shield, Music } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";

export default function StaffLoginPage() {
  const router = useRouter();
  const { login, loginAsDemo, loading } = useAuthStore();
  const [mode, setMode] = useState<"email" | "pin">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (mode === "email") {
      const success = await login(email, password);
      if (success) {
        router.push("/dashboard");
      } else {
        setError("Identifiants incorrects");
      }
    } else {
      // PIN mode — demo only
      if (pin === "1234") {
        loginAsDemo("manager");
        router.push("/dashboard");
      } else if (pin === "5678") {
        loginAsDemo("barman");
        router.push("/dashboard");
      } else {
        setError("Code PIN incorrect");
      }
    }
  }

  function handleQuickAccess(role: "manager" | "barman") {
    loginAsDemo(role);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-info/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight">
            <span className="text-gradient-gold">NightLife</span>
          </h1>
          <p className="text-text-muted mt-2 text-sm">Espace personnel</p>
        </div>

        <div className="glass rounded-2xl p-6 space-y-6">
          {/* Mode tabs */}
          <div className="flex gap-1 bg-surface rounded-lg p-1">
            <button
              onClick={() => setMode("email")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                mode === "email"
                  ? "bg-gold/15 text-gold"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              <Mail size={16} />
              Email
            </button>
            <button
              onClick={() => setMode("pin")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${
                mode === "pin"
                  ? "bg-gold/15 text-gold"
                  : "text-text-muted hover:text-foreground"
              }`}
            >
              <Hash size={16} />
              Code PIN
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "email" ? (
              <>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-muted">
                    Email professionnel
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@etablissement.com"
                    className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-text-muted">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-text-muted">
                  Code PIN (4 chiffres)
                </label>
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-bold transition-all ${
                        pin[i]
                          ? "border-gold bg-gold/10 text-gold"
                          : "border-border bg-surface-light text-text-dim"
                      }`}
                    >
                      {pin[i] ? "•" : ""}
                    </div>
                  ))}
                </div>
                <input
                  type="number"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.slice(0, 4))}
                  className="sr-only"
                  autoFocus
                />
                {/* Number pad */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map(
                    (key, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (key === "del") setPin(pin.slice(0, -1));
                          else if (key !== null && pin.length < 4)
                            setPin(pin + key);
                        }}
                        className={`h-14 rounded-xl text-lg font-semibold transition-all ${
                          key === null
                            ? "invisible"
                            : key === "del"
                            ? "bg-surface-light text-text-muted hover:bg-danger/10 hover:text-danger text-sm"
                            : "bg-surface-light text-foreground hover:bg-gold/10 hover:text-gold active:scale-95"
                        }`}
                      >
                        {key === "del" ? "←" : key}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {error && (
              <p className="text-sm text-danger bg-danger/10 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={
                loading ||
                (mode === "email" ? !email || !password : pin.length < 4)
              }
              className="w-full bg-gradient-gold text-black font-semibold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion..." : "Accéder au dashboard"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-dim">Accès rapide démo</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Quick access */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleQuickAccess("manager")}
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-gold/30 hover:bg-gold/5 transition-all"
            >
              <div className="p-2 rounded-lg bg-gold/10">
                <Shield size={18} className="text-gold" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Manager</p>
                <p className="text-[10px] text-text-dim">Alain Obiang</p>
              </div>
            </button>
            <button
              onClick={() => handleQuickAccess("barman")}
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-info/30 hover:bg-info/5 transition-all"
            >
              <div className="p-2 rounded-lg bg-info/10">
                <Wine size={18} className="text-info" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Barman</p>
                <p className="text-[10px] text-text-dim">Patrick Mba</p>
              </div>
            </button>
          </div>
        </div>

        {/* Client login link */}
        <div className="text-center mt-6">
          <a
            href="/login"
            className="text-sm text-text-dim hover:text-gold transition-colors"
          >
            ← Espace client
          </a>
        </div>
      </div>
    </div>
  );
}
