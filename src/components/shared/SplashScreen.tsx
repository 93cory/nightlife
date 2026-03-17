"use client";

import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  show: boolean;
}

export default function SplashScreen({ show }: SplashScreenProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-night-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Radial glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <motion.div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,75,110,0.08) 0%, transparent 70%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
            />
          </div>

          {/* Logo */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="font-display text-[52px] leading-none tracking-[0.25em] text-glow-gold"
              initial={{ letterSpacing: "0.5em", opacity: 0 }}
              animate={{ letterSpacing: "0.25em", opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-gold-gradient">NIGHT</span>
              <span className="text-accent">LIFE</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-3 justify-center mt-2"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
              <span className="text-[9px] text-gold/60 tracking-[0.4em] font-light">GABON</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
            </motion.div>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-dark-3 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1.3, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            className="absolute bottom-16 text-[8px] text-muted/40 tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            L&apos;APP DES SORTIES AU GABON
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
