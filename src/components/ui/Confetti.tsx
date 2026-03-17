"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMOJIS = ["🎉", "✨", "🌟", "💫", "🎊", "⭐", "🔥"];
const COLORS = ["#d4af37", "#ff4b6e", "#3498db", "#2ecc71", "#9b59b6"];

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  delay: number;
  duration: number;
  endX: number;
  endY: number;
  rotation: number;
  scale: number;
}

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

export default function Confetti({ active, duration = 2000 }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const newParticles: Particle[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: 30 + Math.random() * 40,
      y: 40 + Math.random() * 20,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      delay: Math.random() * 0.3,
      duration: 0.8 + Math.random() * 0.6,
      endX: -30 + Math.random() * 60,
      endY: -60 - Math.random() * 40,
      rotation: -180 + Math.random() * 360,
      scale: 0.6 + Math.random() * 0.8,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), duration);
    return () => clearTimeout(timer);
  }, [active, duration]);

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              initial={{ opacity: 1, scale: 0 }}
              animate={{
                opacity: [1, 1, 0],
                scale: [0, p.scale, p.scale * 0.5],
                x: p.endX,
                y: p.endY,
                rotate: p.rotation,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: "easeOut",
              }}
            >
              <span className="text-2xl">{p.emoji}</span>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
