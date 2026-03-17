"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PWAInstallBanner() {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if already dismissed
    if (localStorage.getItem("nl_pwa_dismissed") === "1") return;

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Fallback: show banner after 5s on mobile browsers that don't fire the event
    const timer = setTimeout(() => {
      const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      if (isMobile && !isStandalone && !deferredPrompt) {
        setShow(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      clearTimeout(timer);
    };
  }, [deferredPrompt]);

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShow(false);
      }
    }
    setShow(false);
  }

  function handleDismiss() {
    localStorage.setItem("nl_pwa_dismissed", "1");
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[80] safe-top"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="mx-auto max-w-md bg-gradient-to-r from-gold/15 via-gold/10 to-gold/15 backdrop-blur-lg border-b border-gold/20 px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/20 border border-gold/25 flex items-center justify-center text-lg shrink-0">
              📲
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-cream">Installer NightLife</p>
              <p className="text-[8px] text-muted mt-0.5">Accès rapide depuis l'écran d'accueil</p>
            </div>
            <button
              onClick={handleInstall}
              className="px-3 py-1.5 rounded-lg bg-gold text-night-black text-[9px] font-bold tracking-wider shrink-0 btn-press"
            >
              INSTALLER
            </button>
            <button
              onClick={handleDismiss}
              className="text-muted/50 text-xs btn-press shrink-0"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
