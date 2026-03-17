"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "@/lib/store/chatStore";

export default function StaffChatPage() {
  const messages = useChatStore((s) => s.messages);
  const addMessage = useChatStore((s) => s.addMessage);
  const markRead = useChatStore((s) => s.markRead);
  const activeTables = useChatStore((s) => s.getActiveTables());

  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const tableMessages = selectedTable !== null
    ? messages.filter((m) => m.table === selectedTable)
    : [];

  useEffect(() => {
    if (selectedTable !== null) {
      markRead(selectedTable, "staff");
    }
  }, [selectedTable, messages.length, markRead]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tableMessages.length]);

  function send() {
    if (!text.trim() || selectedTable === null) return;
    addMessage({ from: "staff", name: "Éva", text: text.trim(), table: selectedTable });
    setText("");
  }

  function getUnread(table: number) {
    return messages.filter((m) => m.table === table && m.from === "client" && !m.read).length;
  }

  function getLastMessage(table: number) {
    const msgs = messages.filter((m) => m.table === table);
    return msgs[msgs.length - 1];
  }

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/[0.04] flex items-center justify-between">
        <div>
          {selectedTable !== null ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedTable(null)}
                className="text-[10px] text-accent btn-press"
              >
                ← Retour
              </button>
              <h1 className="font-display text-[16px] tracking-[0.15em] text-cream">
                Table {selectedTable}
              </h1>
            </div>
          ) : (
            <h1 className="font-display text-[20px] tracking-[0.15em] text-cream">Chat Clients</h1>
          )}
          <p className="text-[9px] text-muted mt-0.5">
            {selectedTable !== null
              ? `${tableMessages.length} messages`
              : `${activeTables.length} conversation${activeTables.length > 1 ? "s" : ""} active${activeTables.length > 1 ? "s" : ""}`}
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse-live" />
          <span className="text-[9px] text-success tracking-wider">LIVE</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedTable === null ? (
          /* Table List */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto no-scrollbar px-5 py-3 space-y-2"
          >
            {activeTables.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3 opacity-20">💬</div>
                <p className="text-[11px] text-muted">Aucune conversation</p>
                <p className="text-[9px] text-muted/50 mt-1">Les messages clients apparaîtront ici</p>
              </div>
            ) : (
              activeTables.map((table) => {
                const unread = getUnread(table);
                const last = getLastMessage(table);
                return (
                  <motion.button
                    key={table}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedTable(table)}
                    className={`w-full card p-4 flex items-center gap-3.5 text-left btn-press ${
                      unread > 0 ? "border-accent/15 bg-accent/[0.03]" : ""
                    }`}
                  >
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center font-display text-sm ${
                      unread > 0 ? "bg-accent/15 border-accent/30 text-accent" : "bg-dark-3 border-white/[0.06] text-muted"
                    }`}>
                      T{table}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-medium text-cream">Table {table}</p>
                        {last && (
                          <span className="text-[8px] text-muted">
                            {last.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        )}
                      </div>
                      {last && (
                        <p className="text-[9px] text-muted truncate mt-0.5">
                          {last.from === "staff" ? "Vous: " : ""}{last.text}
                        </p>
                      )}
                    </div>
                    {unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0">
                        <span className="text-[8px] text-white font-bold">{unread}</span>
                      </div>
                    )}
                  </motion.button>
                );
              })
            )}
          </motion.div>
        ) : (
          /* Chat View */
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-3 space-y-2.5">
              {tableMessages.map((msg) => {
                const isStaff = msg.from === "staff";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${isStaff ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[80%]">
                      {!isStaff && (
                        <p className="text-[8px] text-muted mb-0.5 ml-1">👤 {msg.name}</p>
                      )}
                      <div
                        className={`px-3.5 py-2.5 rounded-2xl ${
                          isStaff
                            ? "bg-accent/15 border border-accent/20 rounded-br-md"
                            : "bg-dark-3 border border-white/[0.06] rounded-bl-md"
                        }`}
                      >
                        <p className={`text-[11px] leading-relaxed ${isStaff ? "text-accent" : "text-cream"}`}>
                          {msg.text}
                        </p>
                      </div>
                      <p className={`text-[7px] text-muted/50 mt-0.5 ${isStaff ? "text-right mr-1" : "ml-1"}`}>
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
                  placeholder="Répondre..."
                  autoFocus
                />
                <button
                  onClick={send}
                  disabled={!text.trim()}
                  className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center btn-press disabled:opacity-30"
                >
                  <span className="text-accent text-sm">➤</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
