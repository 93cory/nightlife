"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useChatStore } from "@/lib/store/chatStore";

const TABLE = 7;

export default function ClientChatPage() {
  const messages = useChatStore((s) => s.getMessagesByTable(TABLE));
  const addMessage = useChatStore((s) => s.addMessage);
  const markRead = useChatStore((s) => s.markRead);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markRead(TABLE, "client");
  }, [messages.length, markRead]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  function send() {
    if (!text.trim()) return;
    addMessage({ from: "client", name: "Jean-Pierre", text: text.trim(), table: TABLE });
    setText("");
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/[0.04] flex items-center justify-between">
        <div>
          <h1 className="font-display text-[18px] tracking-[0.15em] text-cream">Chat</h1>
          <p className="text-[9px] text-muted">Table {TABLE} · NightLife Libreville</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse-live" />
          <span className="text-[9px] text-success tracking-wider">En ligne</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-3 space-y-2.5">
        {messages.map((msg, i) => {
          const isClient = msg.from === "client";
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex ${isClient ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] ${isClient ? "order-1" : ""}`}>
                {!isClient && (
                  <p className="text-[8px] text-muted mb-0.5 ml-1">👤 {msg.name}</p>
                )}
                <div
                  className={`px-3.5 py-2.5 rounded-2xl ${
                    isClient
                      ? "bg-gold/15 border border-gold/20 rounded-br-md"
                      : "bg-dark-3 border border-white/[0.06] rounded-bl-md"
                  }`}
                >
                  <p className={`text-[11px] leading-relaxed ${isClient ? "text-gold" : "text-cream"}`}>
                    {msg.text}
                  </p>
                </div>
                <p className={`text-[7px] text-muted/50 mt-0.5 ${isClient ? "text-right mr-1" : "ml-1"}`}>
                  {msg.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/[0.04] bg-dark-1/80 backdrop-blur-lg">
        <div className="flex items-center gap-2">
          <input
            className="flex-1 input-dark px-4 py-2.5 text-[11px] text-cream"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Écrivez un message..."
            autoFocus
          />
          <button
            onClick={send}
            disabled={!text.trim()}
            className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center btn-press disabled:opacity-30"
          >
            <span className="text-gold text-sm">➤</span>
          </button>
        </div>
      </div>
    </div>
  );
}
