"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const suggestions = [
  "Quel est mon CA ce soir ?",
  "Quels sont mes produits les plus vendus ?",
  "Combien de commandes en attente ?",
  "Quel est mon stock de Heineken ?",
  "Compare mes ventes cette semaine vs la semaine dernière",
];

const demoResponses: Record<string, string> = {
  "quel est mon ca ce soir": "📊 **CA ce soir : 847 500 FCFA**\n\n• 43 commandes traitées\n• Ticket moyen : 19 710 FCFA\n• +12.5% vs samedi dernier\n\nLes heures de rush sont entre 21h-23h avec un pic à 22h (215 000 FCFA).",
  "quels sont mes produits les plus vendus": "🏆 **Top 5 produits ce soir :**\n\n1. Heineken — 48 vendues (96 000 F)\n2. Castel — 35 vendues (52 500 F)\n3. Mojito — 22 vendus (88 000 F)\n4. Red Bull — 18 vendues (54 000 F)\n5. Régab — 15 vendues (15 000 F)\n\n💡 Le Mojito a le meilleur ratio marge/volume. Pensez à le promouvoir en happy hour !",
  "combien de commandes en attente": "⏳ **3 commandes en attente actuellement :**\n\n• CMD-046 — Table 7 (en préparation, 12 min)\n• CMD-048 — Table 9 (en attente, 3 min)\n• CMD-049 — Carré VIP 1 (en attente, 1 min)\n\n⚠️ La CMD-046 dépasse le temps moyen. Je recommande de vérifier avec le barman.",
  "quel est mon stock de heineken": "🍺 **Stock Heineken :**\n\n• En stock : 4 bouteilles (33cl)\n• Seuil minimum : 12\n• ⚠️ **ALERTE STOCK BAS**\n\nAu rythme actuel (48 vendues ce soir), vous serez en rupture dans ~30 minutes.\n\n💡 Recommandation : commander 2 caisses (48 bouteilles) dès demain matin.",
  "compare mes ventes cette semaine vs la semaine dernière": "📈 **Comparaison hebdomadaire :**\n\n| Jour | Semaine actuelle | Semaine précédente |\n|------|-----------------|-------------------|\n| Lun | 245 000 F | 210 000 F (+17%) |\n| Mar | 312 000 F | 280 000 F (+11%) |\n| Mer | 287 000 F | 295 000 F (-3%) |\n| Jeu | 425 000 F | 380 000 F (+12%) |\n| Ven | 1 250 000 F | 1 100 000 F (+14%) |\n| Sam | 847 500 F* | 750 000 F (+13%) |\n\n*En cours\n\n✅ Tendance positive : +10.7% en moyenne. Le vendredi reste votre meilleure soirée.",
};

function now() {
  return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "assistant", content: "Bonjour ! Je suis l'assistant IA de NightLife. Posez-moi n'importe quelle question sur votre établissement : CA, stock, commandes, tendances... 🤖", timestamp: now() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(text?: string) {
    const msg = text || input;
    if (!msg.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msg, timestamp: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const key = msg.toLowerCase().replace(/[?!.,]/g, "").trim();
      const response = demoResponses[key] || `Je comprends votre question "${msg}". Dans la version complète, je pourrai analyser vos données en temps réel via l'IA Claude.\n\n💡 Essayez une des questions suggérées pour voir une démo !`;
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: response, timestamp: now() };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 1200);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles size={24} className="text-gold" /> Assistant IA
          </h1>
          <p className="text-sm text-text-muted">Posez vos questions en langage naturel</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-gold" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === "user"
                ? "bg-gold/20 text-foreground"
                : "glass"
            }`}>
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              <p className="text-[10px] text-text-dim mt-1">{msg.timestamp}</p>
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center shrink-0">
                <User size={16} className="text-text-muted" />
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
              <Bot size={16} className="text-gold" />
            </div>
            <div className="glass rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => handleSend(s)}
              className="shrink-0 px-3 py-2 bg-surface border border-border rounded-xl text-xs text-text-muted hover:text-gold hover:border-gold/30 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Posez votre question..."
          className="flex-1 px-4 py-3 bg-surface border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50 placeholder:text-text-dim"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="px-4 py-3 bg-gradient-gold text-black rounded-xl hover:opacity-90 transition-all disabled:opacity-40"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
