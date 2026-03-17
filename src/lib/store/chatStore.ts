import { create } from "zustand";

export interface ChatMessage {
  id: string;
  from: "client" | "staff";
  name: string;
  text: string;
  timestamp: Date;
  table: number;
  read: boolean;
}

interface ChatStore {
  messages: ChatMessage[];
  addMessage: (msg: Omit<ChatMessage, "id" | "timestamp" | "read">) => void;
  getMessagesByTable: (table: number) => ChatMessage[];
  getActiveTables: () => number[];
  getUnreadCountByTable: (table: number, side: "client" | "staff") => number;
  markRead: (table: number, side: "client" | "staff") => void;
}

let counter = 5;

const AUTO_REPLIES = [
  "Bien reçu ! Un serveur arrive dans 2 minutes 👍",
  "Noté, on s'en occupe tout de suite !",
  "Merci pour votre patience, c'est en cours 🙏",
  "Votre serveur est prévenu, il arrive !",
  "Parfait, on prépare ça pour vous ✨",
];

const INITIAL: ChatMessage[] = [
  { id: "c1", from: "client", name: "Jean-Pierre", text: "Bonsoir ! On peut avoir la carte des vins ?", timestamp: new Date(Date.now() - 15 * 60000), table: 7, read: true },
  { id: "c2", from: "staff", name: "Éva", text: "Bien sûr ! Je vous l'apporte avec les suggestions du sommelier 🍷", timestamp: new Date(Date.now() - 14 * 60000), table: 7, read: true },
  { id: "c3", from: "client", name: "Jean-Pierre", text: "Merci ! Et est-ce possible d'avoir de la glace en plus ?", timestamp: new Date(Date.now() - 10 * 60000), table: 7, read: true },
  { id: "c4", from: "staff", name: "Éva", text: "Absolument, je vous amène ça tout de suite 🧊", timestamp: new Date(Date.now() - 9 * 60000), table: 7, read: true },
  { id: "c5", from: "client", name: "Marie", text: "La musique est super ce soir ! Qui est le DJ ?", timestamp: new Date(Date.now() - 5 * 60000), table: 3, read: false },
];

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: INITIAL,

  addMessage: (msg) => {
    const id = `c${++counter}`;
    set((state) => ({
      messages: [...state.messages, { ...msg, id, timestamp: new Date(), read: false }],
    }));

    // Auto-reply from staff when client sends
    if (msg.from === "client") {
      setTimeout(() => {
        const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
        const replyId = `c${++counter}`;
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: replyId,
              from: "staff",
              name: "Éva",
              text: reply,
              timestamp: new Date(),
              table: msg.table,
              read: false,
            },
          ],
        }));
      }, 2000);
    }
  },

  getMessagesByTable: (table) => get().messages.filter((m) => m.table === table),

  getActiveTables: () => {
    const tables = new Set(get().messages.map((m) => m.table));
    return Array.from(tables).sort((a, b) => a - b);
  },

  getUnreadCountByTable: (table, side) => {
    const opposite = side === "client" ? "staff" : "client";
    return get().messages.filter((m) => m.table === table && m.from === opposite && !m.read).length;
  },

  markRead: (table, side) => {
    const opposite = side === "client" ? "staff" : "client";
    set((state) => ({
      messages: state.messages.map((m) =>
        m.table === table && m.from === opposite ? { ...m, read: true } : m
      ),
    }));
  },
}));
