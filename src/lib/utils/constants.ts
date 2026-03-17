import { LoyaltyTier, StaffRole } from "@/lib/types";

export const TIER_THRESHOLDS: Record<LoyaltyTier, number> = {
  bronze: 0,
  silver: 2000,
  gold: 3000,
  vip: 5000,
};

export const TIER_BENEFITS: Record<LoyaltyTier, { discount: number; label: string; perks: string }> = {
  bronze: { discount: 0, label: "Bronze", perks: "Accès standard" },
  silver: { discount: 5, label: "Silver", perks: "-5% sur commandes · Accès VIP events" },
  gold: { discount: 10, label: "Gold", perks: "-10% · Table réservée · Bouteille offerte" },
  vip: { discount: 15, label: "VIP", perks: "-15% · Entrée gratuite · Accès salon privé" },
};

export const TIER_ORDER: LoyaltyTier[] = ["bronze", "silver", "gold", "vip"];
export const TIER_EMOJIS: Record<LoyaltyTier, string> = {
  bronze: "🥉",
  silver: "🥈",
  gold: "🥇",
  vip: "💎",
};

export const STAFF_ROLES: { value: StaffRole; label: string; emoji: string }[] = [
  { value: "manager", label: "Manager", emoji: "👑" },
  { value: "barman", label: "Barman", emoji: "🍸" },
  { value: "serveur", label: "Serveur", emoji: "🍽️" },
  { value: "securite", label: "Sécurité", emoji: "🛡️" },
  { value: "comptable", label: "Comptable", emoji: "📊" },
];

export const MENU_CATEGORIES = [
  { value: "all", label: "Tout" },
  { value: "boissons", label: "Boissons" },
  { value: "food", label: "Food" },
  { value: "cocktails", label: "Cocktails" },
  { value: "bouteilles", label: "Bouteilles" },
] as const;

export const POINTS_PER_XAF = 100; // 1 point for every 100 XAF spent
