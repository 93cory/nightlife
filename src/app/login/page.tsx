"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sparkles, User, Shield, Crown } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginAsDemo, loading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (success) {
      const store = useAuthStore.getState();
      if (store.user?.role === "client") {
        router.push("/mon-compte");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError("Email ou mot de passe incorrect");
    }
  }

  function handleDemoLogin(type: "client" | "manager" | "admin") {
    loginAsDemo(type);
    if (type === "client") {
      router.push("/mon-compte");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-bordeaux/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight">
            <span className="text-gradient-gold">NightLife</span>
          </h1>
          <p className="text-text-muted mt-2 text-sm">
            Connectez-vous à votre espace
          </p>
        </div>

        {/* Login form */}
        <div className="glass rounded-2xl p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-muted">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-muted">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-light border border-border rounded-xl px-4 py-3 pr-12 text-sm text-foreground placeholder:text-text-dim focus:outline-none focus:border-gold/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text-muted"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-danger bg-danger/10 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-gradient-gold text-black font-semibold py-3 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-text-dim">Accès rapide démo</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Demo quick access */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleDemoLogin("client")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gold/20 hover:bg-gold/5 hover:border-gold/40 transition-all group"
            >
              <div className="p-2 rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-colors">
                <User size={20} className="text-gold" />
              </div>
              <span className="text-xs font-medium text-text-muted group-hover:text-gold transition-colors">
                Client
              </span>
            </button>

            <button
              onClick={() => handleDemoLogin("manager")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border border-info/20 hover:bg-info/5 hover:border-info/40 transition-all group"
            >
              <div className="p-2 rounded-lg bg-info/10 group-hover:bg-info/20 transition-colors">
                <Shield size={20} className="text-info" />
              </div>
              <span className="text-xs font-medium text-text-muted group-hover:text-info transition-colors">
                Manager
              </span>
            </button>

            <button
              onClick={() => handleDemoLogin("admin")}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border border-bordeaux/30 hover:bg-bordeaux/5 hover:border-bordeaux/50 transition-all group"
            >
              <div className="p-2 rounded-lg bg-bordeaux/20 group-hover:bg-bordeaux/30 transition-colors">
                <Crown size={20} className="text-red-400" />
              </div>
              <span className="text-xs font-medium text-text-muted group-hover:text-red-400 transition-colors">
                Admin
              </span>
            </button>
          </div>
        </div>

        {/* Staff login link */}
        <div className="text-center mt-6">
          <a
            href="/staff-login"
            className="text-sm text-text-dim hover:text-gold transition-colors"
          >
            Accès personnel →
          </a>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-text-dim mt-8">
          © 2026 NightLife. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
