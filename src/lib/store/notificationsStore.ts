import { create } from "zustand";

export interface Notification {
  id: string;
  title: string;
  message: string;
  emoji: string;
  type: "order" | "promo" | "loyalty" | "system" | "event";
  read: boolean;
  createdAt: Date;
}

interface NotificationsStore {
  notifications: Notification[];
  add: (notif: Omit<Notification, "id" | "read" | "createdAt">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: () => number;
}

let counter = 10;

const INITIAL: Notification[] = [
  {
    id: "n1",
    title: "Commande servie",
    message: "Votre commande Table 7 est prête ! Bon appétit.",
    emoji: "✅",
    type: "order",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60000),
  },
  {
    id: "n2",
    title: "Happy Hour ce soir !",
    message: "-30% sur tous les cocktails de 18h à 20h. Ne manquez pas ça !",
    emoji: "🍹",
    type: "promo",
    read: false,
    createdAt: new Date(Date.now() - 30 * 60000),
  },
  {
    id: "n3",
    title: "+120 points fidélité",
    message: "Bravo ! Vous avez gagné 120 points sur votre dernière commande.",
    emoji: "⭐",
    type: "loyalty",
    read: false,
    createdAt: new Date(Date.now() - 2 * 3600000),
  },
  {
    id: "n4",
    title: "AfroVibes Night",
    message: "N'oubliez pas : AfroVibes Night ce vendredi au Luxury Lounge ! Réservez maintenant.",
    emoji: "🎵",
    type: "event",
    read: true,
    createdAt: new Date(Date.now() - 24 * 3600000),
  },
  {
    id: "n5",
    title: "Niveau Silver atteint !",
    message: "Félicitations ! Vous êtes maintenant membre Silver. Profitez de -10% permanent.",
    emoji: "🏆",
    type: "loyalty",
    read: true,
    createdAt: new Date(Date.now() - 3 * 24 * 3600000),
  },
];

export const useNotificationsStore = create<NotificationsStore>((set, get) => ({
  notifications: INITIAL,

  add: (notif) => {
    set((s) => ({
      notifications: [
        { ...notif, id: `n${++counter}`, read: false, createdAt: new Date() },
        ...s.notifications,
      ],
    }));
  },

  markRead: (id) => {
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllRead: () => {
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
