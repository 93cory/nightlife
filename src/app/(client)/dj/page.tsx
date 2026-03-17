"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/Toast";

const GENRES = ["Afrobeat", "Amapiano", "Hip-Hop", "R&B", "Ndombolo", "Coupé-Décalé", "Reggae", "House"];

const TRENDING = [
  { id: "1", title: "Gasolina", artist: "Franko", emoji: "🇨🇲", votes: 47 },
  { id: "2", title: "Oyili", artist: "Mink's", emoji: "🎵", votes: 35 },
  { id: "3", title: "Peru", artist: "Fireboy DML", emoji: "🇳🇬", votes: 31 },
  { id: "4", title: "Calm Down", artist: "Rema", emoji: "🔥", votes: 28 },
  { id: "5", title: "Moto Moto", artist: "DJ Leo", emoji: "🇬🇦", votes: 24 },
  { id: "6", title: "Love Nwantiti", artist: "CKay", emoji: "💕", votes: 19 },
  { id: "7", title: "Essence", artist: "Wizkid ft Tems", emoji: "✨", votes: 16 },
  { id: "8", title: "Fontaine", artist: "Tenor", emoji: "🎤", votes: 12 },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function DJPage() {
  const [search, setSearch] = useState("");
  const [voted, setVoted] = useState<Set<string>>(new Set());
  const [customSong, setCustomSong] = useState("");
  const toast = useToast((s) => s.add);

  function handleVote(id: string, title: string) {
    if (voted.has(id)) return;
    setVoted(new Set(voted).add(id));
    toast(`Vote pour "${title}" envoyé !`, "gold", "🎵");
  }

  function handleRequest() {
    if (!customSong.trim()) return;
    toast(`"${customSong}" demandé au DJ !`, "success", "🎧");
    setCustomSong("");
  }

  const filtered = search
    ? TRENDING.filter((s) =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.artist.toLowerCase().includes(search.toLowerCase())
      )
    : TRENDING;

  return (
    <motion.div
      className="no-scrollbar pb-4"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={fadeUp} className="px-5 pt-5 pb-1">
        <h1 className="font-display text-[24px] tracking-[0.15em] text-cream">DJ Request</h1>
        <p className="text-[9px] text-muted mt-0.5">Votez ou demandez une chanson</p>
      </motion.div>

      {/* Now Playing */}
      <motion.div variants={fadeUp} className="px-5 mt-3 mb-4">
        <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-purple/15 via-purple/5 to-dark-2 border border-purple/20">
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-live" />
            <span className="text-[8px] text-success tracking-wider">LIVE</span>
          </div>
          <div className="flex items-center gap-4">
            <motion.div
              className="w-14 h-14 rounded-xl bg-purple/20 border border-purple/30 flex items-center justify-center text-3xl"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            >
              🎵
            </motion.div>
            <div>
              <p className="text-[8px] text-purple tracking-wider uppercase">En cours</p>
              <p className="text-[14px] font-semibold text-cream mt-0.5">Gasolina</p>
              <p className="text-[10px] text-muted">Franko · Afrobeat</p>
            </div>
          </div>
          {/* Audio visualizer */}
          <div className="flex items-end gap-[2px] h-5 mt-3">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-purple/40 rounded-t-sm min-w-[2px]"
                animate={{ height: [`${20 + Math.random() * 60}%`, `${20 + Math.random() * 60}%`] }}
                transition={{ repeat: Infinity, duration: 0.4 + Math.random() * 0.3, repeatType: "reverse" }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Request a song */}
      <motion.div variants={fadeUp} className="px-5 mb-4">
        <div className="card p-4">
          <p className="text-[11px] font-semibold text-cream mb-2">🎤 Demander une chanson</p>
          <div className="flex gap-2">
            <input
              className="input-dark flex-1 px-3 py-2.5 text-[11px] text-cream"
              placeholder="Titre ou artiste..."
              value={customSong}
              onChange={(e) => setCustomSong(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRequest()}
            />
            <button
              onClick={handleRequest}
              disabled={!customSong.trim()}
              className={`px-4 rounded-xl text-[10px] tracking-wider font-bold btn-press ${
                customSong.trim()
                  ? "bg-gradient-to-r from-gold to-gold-light text-night-black"
                  : "bg-dark-3 text-muted"
              }`}
            >
              ENVOYER
            </button>
          </div>
        </div>
      </motion.div>

      {/* Genres */}
      <motion.div variants={fadeUp} className="px-5 mb-4">
        <div className="flex gap-1.5 flex-wrap">
          {GENRES.map((g) => (
            <button
              key={g}
              className="px-3 py-1.5 rounded-full bg-dark-3 border border-white/[0.04] text-[8px] text-muted tracking-wider btn-press"
            >
              {g}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Trending / Vote */}
      <motion.div variants={fadeUp} className="px-5">
        <p className="text-[11px] font-semibold text-cream mb-2.5">🔥 Trending ce soir</p>
        <div className="space-y-2">
          {filtered.map((song, i) => {
            const hasVoted = voted.has(song.id);
            return (
              <motion.div
                key={song.id}
                variants={fadeUp}
                className="card p-3 flex items-center gap-3"
              >
                <div className={`w-7 text-center font-display text-sm ${i === 0 ? "text-gold" : "text-muted"}`}>
                  {i + 1}
                </div>
                <div className="w-9 h-9 rounded-xl bg-dark-3 flex items-center justify-center text-base">
                  {song.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-medium text-cream truncate">{song.title}</p>
                  <p className="text-[9px] text-muted">{song.artist}</p>
                </div>
                <button
                  onClick={() => handleVote(song.id, song.title)}
                  disabled={hasVoted}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] tracking-wider font-medium btn-press ${
                    hasVoted
                      ? "bg-gold/15 border border-gold/25 text-gold"
                      : "bg-dark-3 border border-white/[0.06] text-muted"
                  }`}
                >
                  <span>{hasVoted ? "✓" : "▲"}</span>
                  <span>{song.votes + (hasVoted ? 1 : 0)}</span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
