import { create } from "zustand";

export interface Referral {
  id: string;
  name: string;
  status: "registered" | "first_order" | "active";
  joinedAt: Date;
  pointsEarned: number;
}

export interface Promo {
  code: string;
  discount: number;
  type: "percent" | "fixed";
  expiresAt: Date;
  usageCount: number;
  maxUsage: number;
  category: "bienvenue" | "fidelite" | "evenement" | "parrainage";
  description: string;
}

interface ReferralStore {
  referralCode: string;
  referrals: Referral[];
  promos: Promo[];
  addReferral: (name: string) => void;
  applyPromo: (code: string) => Promo | null;
  totalPointsFromReferrals: () => number;
}

export const useReferralStore = create<ReferralStore>((set, get) => ({
  referralCode: "NL-JP2026",

  referrals: [
    { id: "r1", name: "Marie Obame", status: "active", joinedAt: new Date(Date.now() - 30 * 86400000), pointsEarned: 500 },
    { id: "r2", name: "Patrick Ndong", status: "first_order", joinedAt: new Date(Date.now() - 12 * 86400000), pointsEarned: 200 },
    { id: "r3", name: "Carine Mba", status: "registered", joinedAt: new Date(Date.now() - 3 * 86400000), pointsEarned: 100 },
  ],

  promos: [
    { code: "WELCOME25", discount: 25, type: "percent", expiresAt: new Date(Date.now() + 30 * 86400000), usageCount: 0, maxUsage: 1, category: "bienvenue", description: "25% sur votre première commande" },
    { code: "FIDELE10", discount: 10, type: "percent", expiresAt: new Date(Date.now() + 60 * 86400000), usageCount: 2, maxUsage: 5, category: "fidelite", description: "10% pour les membres Silver+" },
    { code: "SOIREE5K", discount: 5000, type: "fixed", expiresAt: new Date(Date.now() + 7 * 86400000), usageCount: 0, maxUsage: 1, category: "evenement", description: "5 000 XAF offerts — Soirée Afro House" },
    { code: "PARRAIN15", discount: 15, type: "percent", expiresAt: new Date(Date.now() + 90 * 86400000), usageCount: 1, maxUsage: 10, category: "parrainage", description: "15% de réduction parrainage" },
  ],

  addReferral: (name) => {
    set((state) => ({
      referrals: [
        ...state.referrals,
        {
          id: `r${state.referrals.length + 1}`,
          name,
          status: "registered",
          joinedAt: new Date(),
          pointsEarned: 100,
        },
      ],
    }));
  },

  applyPromo: (code) => {
    const promo = get().promos.find((p) => p.code === code.toUpperCase());
    if (!promo) return null;
    if (promo.usageCount >= promo.maxUsage) return null;
    if (promo.expiresAt < new Date()) return null;
    set((state) => ({
      promos: state.promos.map((p) =>
        p.code === code.toUpperCase() ? { ...p, usageCount: p.usageCount + 1 } : p
      ),
    }));
    return promo;
  },

  totalPointsFromReferrals: () =>
    get().referrals.reduce((sum, r) => sum + r.pointsEarned, 0),
}));
