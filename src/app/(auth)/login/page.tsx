"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/shared/Logo";
import Button from "@/components/ui/Button";
import { signInWithPhone, verifyOTP } from "@/lib/supabase/hooks";
import { useAuth } from "@/lib/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { isDemo } = useAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  async function handleSendOTP() {
    if (!phone || phone.length < 8) {
      setError("Entrez un numéro valide");
      return;
    }
    if (isDemo) {
      setStep("otp");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const fullPhone = `+241${phone.replace(/\s/g, "")}`;
      const { error: err } = await signInWithPhone(fullPhone);
      if (err) throw err;
      setStep("otp");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur d'envoi");
    } finally {
      setLoading(false);
    }
  }

  function handleOtpChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    if (newOtp.every((d) => d !== "")) handleVerifyOTP(newOtp.join(""));
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  }

  async function handleVerifyOTP(code?: string) {
    const otpCode = code || otp.join("");
    if (isDemo) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      router.replace("/accueil");
      return;
    }
    if (otpCode.length < 4) {
      setError("Entrez le code reçu par SMS");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const fullPhone = `+241${phone.replace(/\s/g, "")}`;
      const { error: err } = await verifyOTP(fullPhone, otpCode);
      if (err) throw err;
      router.replace("/accueil");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Code invalide");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0010] via-night-black to-dark-1" />
      <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_60%)]" />
      <div className="absolute bottom-[-100px] right-[-50px] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,75,110,0.06)_0%,transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <Logo size="md" className="mb-10 mx-auto" />

          <AnimatePresence mode="wait">
            {step === "phone" ? (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <h1 className="font-serif text-2xl font-semibold text-cream text-center">Bienvenue</h1>
                <p className="text-[11px] text-muted text-center mt-1 mb-8">
                  Connectez-vous pour commander, gagner des points et vivre la nuit.
                </p>

                {/* Phone Input */}
                <div className="relative mb-4">
                  <div className="absolute left-0 top-0 h-full flex items-center pl-4 pr-3 border-r border-white/[0.06]">
                    <span className="text-[11px] text-muted flex items-center gap-1.5">
                      🇬🇦 +241
                    </span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setError(""); }}
                    placeholder="06 XX XX XX"
                    className="w-full input-dark py-4 pl-24 pr-4 text-cream text-base tracking-wider"
                  />
                </div>

                <Button variant="gold" size="lg" onClick={handleSendOTP} disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-night-black/30 border-t-night-black rounded-full animate-spin" />
                      ENVOI EN COURS...
                    </span>
                  ) : "RECEVOIR LE CODE"}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-white/[0.06]" />
                  <span className="text-[8px] text-muted/50 tracking-[0.3em]">OU</span>
                  <div className="flex-1 h-px bg-white/[0.06]" />
                </div>

                {/* Demo access */}
                <button
                  onClick={() => router.replace("/accueil")}
                  className="w-full card py-3 flex items-center justify-center gap-2 text-[10px] text-gold tracking-wider btn-press"
                >
                  ✨ ACCÈS DÉMO RAPIDE
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔐</span>
                </div>
                <h2 className="font-serif text-xl font-semibold text-cream">Vérification</h2>
                <p className="text-[11px] text-muted mt-1 mb-6">
                  Code envoyé au <span className="text-gold">+241 {phone}</span>
                </p>

                {/* OTP Grid */}
                <div className="flex gap-2 justify-center mb-6">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`w-12 h-14 rounded-xl text-center text-xl font-display tracking-wider transition-all ${
                        digit
                          ? "bg-gold/10 border-2 border-gold/40 text-gold"
                          : "bg-dark-3 border-2 border-white/[0.06] text-cream"
                      } focus:outline-none focus:border-gold/60 focus:bg-gold/10`}
                    />
                  ))}
                </div>

                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => handleVerifyOTP()}
                  disabled={loading || otp.some((d) => !d)}
                >
                  {loading ? (
                    <span className="flex items-center gap-2 justify-center">
                      <span className="w-4 h-4 border-2 border-night-black/30 border-t-night-black rounded-full animate-spin" />
                      CONNEXION...
                    </span>
                  ) : "VÉRIFIER"}
                </Button>

                <div className="flex items-center justify-center gap-4 mt-4">
                  <button
                    className="text-[10px] text-muted hover:text-cream transition-colors"
                    onClick={() => { setStep("phone"); setOtp(["","","","","",""]); }}
                  >
                    ← Changer de numéro
                  </button>
                  <span className="text-muted/30">|</span>
                  <button className="text-[10px] text-gold/60 hover:text-gold transition-colors">
                    Renvoyer le code
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-[11px] text-accent text-center bg-accent/10 border border-accent/20 rounded-xl py-2 px-4"
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        {/* Staff access */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-[10px] text-muted/40 hover:text-gold/60 transition-colors tracking-wider"
          onClick={() => router.push("/staff-login")}
        >
          🔐 ACCÈS STAFF
        </motion.button>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-8 text-center">
        <p className="text-[7px] text-muted/30 tracking-[0.2em]">
          NIGHTLIFE GABON © 2026 · LIBREVILLE
        </p>
      </div>
    </div>
  );
}
