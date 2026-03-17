"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HappyHourBanner() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0, active: false });

  useEffect(() => {
    function calc() {
      const now = new Date();
      const hour = now.getHours();

      // Happy hour: 18h-20h
      if (hour >= 18 && hour < 20) {
        // Active - time until end
        const end = new Date();
        end.setHours(20, 0, 0, 0);
        const diff = end.getTime() - now.getTime();
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft({ h, m, s, active: true });
      } else if (hour < 18) {
        // Upcoming - time until start
        const start = new Date();
        start.setHours(18, 0, 0, 0);
        const diff = start.getTime() - now.getTime();
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft({ h, m, s, active: false });
      } else {
        // Past - show for demo as if it's coming tomorrow
        setTimeLeft({ h: 0, m: 0, s: 0, active: false });
      }
    }

    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  // For demo: always show as active with fake countdown
  const [demoTime, setDemoTime] = useState({ m: 47, s: 23 });
  useEffect(() => {
    const interval = setInterval(() => {
      setDemoTime((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { m: prev.m - 1, s: 59 };
        return { m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r from-accent/[0.08] via-gold/[0.05] to-accent/[0.08] border border-accent/15"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle,rgba(255,75,110,0.1)_0%,transparent_60%)]" />

      <div className="flex items-center gap-4">
        <div className="relative">
          <motion.span
            className="text-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🍹
          </motion.span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[12px] font-semibold text-cream">Happy Hour</p>
            <span className="px-2 py-0.5 rounded-full bg-accent/20 border border-accent/30 text-[7px] text-accent tracking-wider font-bold">
              -30%
            </span>
          </div>
          <p className="text-[9px] text-muted mt-0.5">Sur toutes les boissons · 18h-20h</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            <div className="bg-dark-3 rounded-lg px-2 py-1.5 min-w-[28px] text-center">
              <span className="font-display text-base text-accent">1</span>
            </div>
            <span className="text-accent text-xs">:</span>
            <div className="bg-dark-3 rounded-lg px-2 py-1.5 min-w-[28px] text-center">
              <span className="font-display text-base text-accent">{String(demoTime.m).padStart(2, "0")}</span>
            </div>
            <span className="text-accent text-xs">:</span>
            <div className="bg-dark-3 rounded-lg px-2 py-1.5 min-w-[28px] text-center">
              <span className="font-display text-base text-accent">{String(demoTime.s).padStart(2, "0")}</span>
            </div>
          </div>
          <p className="text-[7px] text-muted mt-1 text-center">restant</p>
        </div>
      </div>
    </motion.div>
  );
}
