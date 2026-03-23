import type { EstablishmentType } from "@/lib/types/database";

// ========== ESTABLISHMENTS ==========
export interface DemoEstablishment {
  id: string;
  name: string;
  slug: string;
  type: EstablishmentType;
  description: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  opening_hours: Record<string, string>;
  max_capacity: number;
}

export const establishments: DemoEstablishment[] = [
  {
    id: "est-001",
    name: "Le Privilège Lounge",
    slug: "le-privilege",
    type: "bar",
    description: "Le bar lounge le plus exclusif de Libreville. Cocktails signatures, ambiance feutrée et musique live.",
    address: "Boulevard de l'Indépendance, Quartier Louis, Libreville",
    city: "Libreville",
    phone: "+241 74 12 34 56",
    whatsapp: "+241 74 12 34 56",
    latitude: 0.3924,
    longitude: 9.4536,
    opening_hours: { "lun-jeu": "17h - 02h", "ven-sam": "17h - 05h", dim: "16h - 00h" },
    max_capacity: 120,
  },
  {
    id: "est-002",
    name: "Chez Mama Rose",
    slug: "chez-mama-rose",
    type: "restaurant",
    description: "Cuisine gabonaise authentique et plats africains dans une ambiance chaleureuse et familiale.",
    address: "Rue de la Mission, Quartier Glass, Libreville",
    city: "Libreville",
    phone: "+241 77 98 76 54",
    whatsapp: "+241 77 98 76 54",
    latitude: 0.3833,
    longitude: 9.4497,
    opening_hours: { "lun-sam": "11h - 23h", dim: "12h - 22h" },
    max_capacity: 80,
  },
  {
    id: "est-003",
    name: "Club 241",
    slug: "club-241",
    type: "nightclub",
    description: "La boîte de nuit #1 de Libreville. Soirées thématiques, DJs internationaux et carrés VIP.",
    address: "Avenue Léon Mba, Centre-ville, Libreville",
    city: "Libreville",
    phone: "+241 66 55 44 33",
    whatsapp: "+241 66 55 44 33",
    latitude: 0.3901,
    longitude: 9.4544,
    opening_hours: { "jeu-sam": "22h - 06h", dim: "Fermé", "lun-mer": "Fermé" },
    max_capacity: 500,
  },
];

// ========== MENU CATEGORIES ==========
export interface DemoCategory {
  id: string;
  establishmentId: string;
  name: string;
  emoji: string;
}

export const menuCategories: DemoCategory[] = [
  // Le Privilège
  { id: "cat-b01", establishmentId: "est-001", name: "Bières", emoji: "🍺" },
  { id: "cat-b02", establishmentId: "est-001", name: "Cocktails", emoji: "🍸" },
  { id: "cat-b03", establishmentId: "est-001", name: "Spiritueux", emoji: "🥃" },
  { id: "cat-b04", establishmentId: "est-001", name: "Softs", emoji: "🥤" },
  { id: "cat-b05", establishmentId: "est-001", name: "Tapas", emoji: "🍢" },
  // Chez Mama Rose
  { id: "cat-r01", establishmentId: "est-002", name: "Entrées", emoji: "🥗" },
  { id: "cat-r02", establishmentId: "est-002", name: "Plats", emoji: "🍽️" },
  { id: "cat-r03", establishmentId: "est-002", name: "Grillades", emoji: "🔥" },
  { id: "cat-r04", establishmentId: "est-002", name: "Desserts", emoji: "🍰" },
  { id: "cat-r05", establishmentId: "est-002", name: "Boissons", emoji: "🥤" },
  // Club 241
  { id: "cat-c01", establishmentId: "est-003", name: "Bouteilles", emoji: "🍾" },
  { id: "cat-c02", establishmentId: "est-003", name: "Cocktails", emoji: "🍸" },
  { id: "cat-c03", establishmentId: "est-003", name: "Softs", emoji: "🥤" },
  { id: "cat-c04", establishmentId: "est-003", name: "Chicha", emoji: "💨" },
];

// ========== MENU ITEMS ==========
export interface DemoMenuItem {
  id: string;
  establishmentId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  costPrice: number;
  emoji: string;
  isAvailable: boolean;
  isDrink: boolean;
}

export const menuItems: DemoMenuItem[] = [
  // ===== LE PRIVILÈGE LOUNGE =====
  // Bières
  { id: "mi-001", establishmentId: "est-001", categoryId: "cat-b01", name: "Castel", description: "Bière blonde locale 65cl", price: 1500, costPrice: 500, emoji: "🍺", isAvailable: true, isDrink: true },
  { id: "mi-002", establishmentId: "est-001", categoryId: "cat-b01", name: "Régab", description: "La fierté du Gabon 65cl", price: 1000, costPrice: 400, emoji: "🍺", isAvailable: true, isDrink: true },
  { id: "mi-003", establishmentId: "est-001", categoryId: "cat-b01", name: "Heineken", description: "Premium lager 33cl", price: 2000, costPrice: 800, emoji: "🍺", isAvailable: true, isDrink: true },
  { id: "mi-004", establishmentId: "est-001", categoryId: "cat-b01", name: "Flag", description: "Bière blonde 65cl", price: 1200, costPrice: 450, emoji: "🍺", isAvailable: true, isDrink: true },
  { id: "mi-005", establishmentId: "est-001", categoryId: "cat-b01", name: "Guinness", description: "Stout irlandaise 33cl", price: 2500, costPrice: 1000, emoji: "🍺", isAvailable: true, isDrink: true },
  { id: "mi-006", establishmentId: "est-001", categoryId: "cat-b01", name: "Corona", description: "Bière mexicaine 33cl", price: 3000, costPrice: 1200, emoji: "🍺", isAvailable: false, isDrink: true },
  // Cocktails
  { id: "mi-007", establishmentId: "est-001", categoryId: "cat-b02", name: "Mojito", description: "Rhum, menthe, citron vert, sucre", price: 4000, costPrice: 1200, emoji: "🍹", isAvailable: true, isDrink: true },
  { id: "mi-008", establishmentId: "est-001", categoryId: "cat-b02", name: "Piña Colada", description: "Rhum, coco, ananas", price: 4500, costPrice: 1400, emoji: "🍹", isAvailable: true, isDrink: true },
  { id: "mi-009", establishmentId: "est-001", categoryId: "cat-b02", name: "Margarita", description: "Tequila, triple sec, citron", price: 4000, costPrice: 1300, emoji: "🍹", isAvailable: true, isDrink: true },
  { id: "mi-010", establishmentId: "est-001", categoryId: "cat-b02", name: "Sex on the Beach", description: "Vodka, pêche, orange, canneberge", price: 4500, costPrice: 1500, emoji: "🍹", isAvailable: true, isDrink: true },
  { id: "mi-011", establishmentId: "est-001", categoryId: "cat-b02", name: "Cocktail Passion", description: "Rhum, fruit de la passion, citron", price: 5000, costPrice: 1600, emoji: "🍹", isAvailable: true, isDrink: true },
  // Spiritueux
  { id: "mi-012", establishmentId: "est-001", categoryId: "cat-b03", name: "Johnnie Walker Red", description: "Whisky écossais — verre", price: 5000, costPrice: 1500, emoji: "🥃", isAvailable: true, isDrink: true },
  { id: "mi-013", establishmentId: "est-001", categoryId: "cat-b03", name: "Hennessy VS", description: "Cognac — verre", price: 7000, costPrice: 2500, emoji: "🥃", isAvailable: true, isDrink: true },
  { id: "mi-014", establishmentId: "est-001", categoryId: "cat-b03", name: "Absolut Vodka", description: "Vodka suédoise — verre", price: 4000, costPrice: 1200, emoji: "🥃", isAvailable: true, isDrink: true },
  // Softs
  { id: "mi-015", establishmentId: "est-001", categoryId: "cat-b04", name: "Coca-Cola", description: "33cl", price: 800, costPrice: 300, emoji: "🥤", isAvailable: true, isDrink: true },
  { id: "mi-016", establishmentId: "est-001", categoryId: "cat-b04", name: "Red Bull", description: "Boisson énergisante 25cl", price: 3000, costPrice: 1200, emoji: "🥤", isAvailable: true, isDrink: true },
  { id: "mi-017", establishmentId: "est-001", categoryId: "cat-b04", name: "Eau minérale", description: "50cl", price: 500, costPrice: 150, emoji: "💧", isAvailable: true, isDrink: true },
  { id: "mi-018", establishmentId: "est-001", categoryId: "cat-b04", name: "Jus naturel", description: "Ananas, mangue ou passion", price: 1500, costPrice: 500, emoji: "🧃", isAvailable: true, isDrink: true },
  // Tapas
  { id: "mi-019", establishmentId: "est-001", categoryId: "cat-b05", name: "Brochettes bœuf", description: "3 pièces, sauce piment", price: 3000, costPrice: 1200, emoji: "🍢", isAvailable: true, isDrink: false },
  { id: "mi-020", establishmentId: "est-001", categoryId: "cat-b05", name: "Ailes de poulet", description: "6 pièces, sauce BBQ", price: 3500, costPrice: 1400, emoji: "🍗", isAvailable: true, isDrink: false },
  { id: "mi-021", establishmentId: "est-001", categoryId: "cat-b05", name: "Plantain frit", description: "Alloco croustillant", price: 1500, costPrice: 400, emoji: "🍌", isAvailable: true, isDrink: false },

  // ===== CHEZ MAMA ROSE =====
  // Entrées
  { id: "mi-030", establishmentId: "est-002", categoryId: "cat-r01", name: "Salade africaine", description: "Avocat, tomate, oignon, vinaigrette", price: 2500, costPrice: 800, emoji: "🥗", isAvailable: true, isDrink: false },
  { id: "mi-031", establishmentId: "est-002", categoryId: "cat-r01", name: "Beignets haricots", description: "Akara croustillants x5", price: 1500, costPrice: 400, emoji: "🧆", isAvailable: true, isDrink: false },
  // Plats
  { id: "mi-032", establishmentId: "est-002", categoryId: "cat-r02", name: "Poulet braisé", description: "Poulet entier braisé, plantain, piment", price: 5000, costPrice: 2000, emoji: "🍗", isAvailable: true, isDrink: false },
  { id: "mi-033", establishmentId: "est-002", categoryId: "cat-r02", name: "Poisson braisé", description: "Bar entier braisé, manioc", price: 6000, costPrice: 2500, emoji: "🐟", isAvailable: true, isDrink: false },
  { id: "mi-034", establishmentId: "est-002", categoryId: "cat-r02", name: "Ndolè", description: "Feuilles amères, crevettes, plantain", price: 4500, costPrice: 1800, emoji: "🥬", isAvailable: true, isDrink: false },
  { id: "mi-035", establishmentId: "est-002", categoryId: "cat-r02", name: "Riz sauce arachide", description: "Riz blanc, sauce arachide, viande", price: 3500, costPrice: 1200, emoji: "🍚", isAvailable: true, isDrink: false },
  { id: "mi-036", establishmentId: "est-002", categoryId: "cat-r02", name: "Nyembwé poulet", description: "Poulet sauce graine de palme", price: 5500, costPrice: 2200, emoji: "🍲", isAvailable: true, isDrink: false },
  { id: "mi-037", establishmentId: "est-002", categoryId: "cat-r02", name: "Odika poisson", description: "Poisson sauce chocolat", price: 6500, costPrice: 2800, emoji: "🍲", isAvailable: false, isDrink: false },
  // Grillades
  { id: "mi-038", establishmentId: "est-002", categoryId: "cat-r03", name: "Brochettes mixtes", description: "Bœuf et poulet, 6 pièces", price: 4000, costPrice: 1600, emoji: "🔥", isAvailable: true, isDrink: false },
  { id: "mi-039", establishmentId: "est-002", categoryId: "cat-r03", name: "Côtes de porc", description: "Marinées et grillées", price: 5000, costPrice: 2000, emoji: "🥩", isAvailable: true, isDrink: false },
  // Desserts
  { id: "mi-040", establishmentId: "est-002", categoryId: "cat-r04", name: "Banane flambée", description: "Banane, rhum, glace vanille", price: 2500, costPrice: 800, emoji: "🍌", isAvailable: true, isDrink: false },
  { id: "mi-041", establishmentId: "est-002", categoryId: "cat-r04", name: "Gâteau au chocolat", description: "Moelleux chocolat noir", price: 3000, costPrice: 1000, emoji: "🍫", isAvailable: true, isDrink: false },
  // Boissons
  { id: "mi-042", establishmentId: "est-002", categoryId: "cat-r05", name: "Jus de gingembre", description: "Fait maison, 33cl", price: 1000, costPrice: 300, emoji: "🧃", isAvailable: true, isDrink: true },
  { id: "mi-043", establishmentId: "est-002", categoryId: "cat-r05", name: "Bissap", description: "Jus d'hibiscus maison", price: 1000, costPrice: 250, emoji: "🧃", isAvailable: true, isDrink: true },
  { id: "mi-044", establishmentId: "est-002", categoryId: "cat-r05", name: "Castel", description: "Bière 65cl", price: 1500, costPrice: 500, emoji: "🍺", isAvailable: true, isDrink: true },
  { id: "mi-045", establishmentId: "est-002", categoryId: "cat-r05", name: "Eau minérale", description: "1.5L", price: 800, costPrice: 250, emoji: "💧", isAvailable: true, isDrink: true },

  // ===== CLUB 241 =====
  // Bouteilles
  { id: "mi-050", establishmentId: "est-003", categoryId: "cat-c01", name: "Hennessy VS", description: "Bouteille 70cl", price: 75000, costPrice: 35000, emoji: "🥃", isAvailable: true, isDrink: true },
  { id: "mi-051", establishmentId: "est-003", categoryId: "cat-c01", name: "Moët & Chandon", description: "Champagne 75cl", price: 120000, costPrice: 55000, emoji: "🍾", isAvailable: true, isDrink: true },
  { id: "mi-052", establishmentId: "est-003", categoryId: "cat-c01", name: "Johnnie Walker Black", description: "Bouteille 70cl", price: 55000, costPrice: 25000, emoji: "🥃", isAvailable: true, isDrink: true },
  { id: "mi-053", establishmentId: "est-003", categoryId: "cat-c01", name: "Belvedere Vodka", description: "Bouteille 70cl", price: 65000, costPrice: 30000, emoji: "🍸", isAvailable: true, isDrink: true },
  { id: "mi-054", establishmentId: "est-003", categoryId: "cat-c01", name: "Dom Pérignon", description: "Champagne 75cl", price: 350000, costPrice: 180000, emoji: "🍾", isAvailable: true, isDrink: true },
  // Cocktails
  { id: "mi-055", establishmentId: "est-003", categoryId: "cat-c02", name: "Long Island", description: "Le classique des clubs", price: 6000, costPrice: 2000, emoji: "🍹", isAvailable: true, isDrink: true },
  { id: "mi-056", establishmentId: "est-003", categoryId: "cat-c02", name: "Mojito", description: "Rhum, menthe fraîche", price: 5000, costPrice: 1500, emoji: "🍹", isAvailable: true, isDrink: true },
  // Softs
  { id: "mi-057", establishmentId: "est-003", categoryId: "cat-c03", name: "Red Bull", description: "25cl", price: 3000, costPrice: 1200, emoji: "🥤", isAvailable: true, isDrink: true },
  { id: "mi-058", establishmentId: "est-003", categoryId: "cat-c03", name: "Eau", description: "50cl", price: 1000, costPrice: 150, emoji: "💧", isAvailable: true, isDrink: true },
  // Chicha
  { id: "mi-059", establishmentId: "est-003", categoryId: "cat-c04", name: "Chicha classique", description: "Pomme, raisin ou menthe", price: 15000, costPrice: 5000, emoji: "💨", isAvailable: true, isDrink: false },
  { id: "mi-060", establishmentId: "est-003", categoryId: "cat-c04", name: "Chicha premium", description: "Saveurs exotiques", price: 20000, costPrice: 7000, emoji: "💨", isAvailable: true, isDrink: false },
];

// ========== STAFF ==========
export interface DemoStaff {
  id: string;
  establishmentId: string;
  displayName: string;
  role: string;
  isActive: boolean;
  phone: string;
}

export const staff: DemoStaff[] = [
  { id: "stf-001", establishmentId: "est-001", displayName: "Alain Obiang", role: "manager", isActive: true, phone: "+241 77 00 00 01" },
  { id: "stf-002", establishmentId: "est-001", displayName: "Marie-Claire Nzé", role: "serveur", isActive: true, phone: "+241 74 00 00 02" },
  { id: "stf-003", establishmentId: "est-001", displayName: "Patrick Mba", role: "barman", isActive: true, phone: "+241 77 00 00 03" },
  { id: "stf-004", establishmentId: "est-002", displayName: "Sylvie Ndong", role: "serveur", isActive: true, phone: "+241 74 00 00 04" },
  { id: "stf-005", establishmentId: "est-002", displayName: "Jean-Pierre Ondo", role: "cuisinier", isActive: true, phone: "+241 77 00 00 05" },
  { id: "stf-006", establishmentId: "est-002", displayName: "Christelle Mintsa", role: "serveur", isActive: false, phone: "+241 74 00 00 06" },
  { id: "stf-007", establishmentId: "est-003", displayName: "Fabrice Engonga", role: "securite", isActive: true, phone: "+241 66 00 00 07" },
  { id: "stf-008", establishmentId: "est-003", displayName: "DJ Maleek", role: "dj", isActive: true, phone: "+241 77 00 00 08" },
];

// ========== ORDERS ==========
export interface DemoOrder {
  id: string;
  establishmentId: string;
  tableNumber: number;
  staffName: string;
  items: { name: string; price: number; quantity: number }[];
  totalAmount: number;
  status: string;
  paymentMode: string | null;
  createdAt: string;
}

const now = new Date();
function hoursAgo(h: number) {
  return new Date(now.getTime() - h * 3600000).toISOString();
}

export const orders: DemoOrder[] = [
  { id: "ord-001", establishmentId: "est-001", tableNumber: 3, staffName: "Marie-Claire Nzé", items: [{ name: "Heineken", price: 2000, quantity: 2 }, { name: "Mojito", price: 4000, quantity: 1 }], totalAmount: 8000, status: "served", paymentMode: null, createdAt: hoursAgo(0.1) },
  { id: "ord-002", establishmentId: "est-001", tableNumber: 7, staffName: "Patrick Mba", items: [{ name: "Castel", price: 1500, quantity: 3 }, { name: "Brochettes bœuf", price: 3000, quantity: 1 }], totalAmount: 7500, status: "preparing", paymentMode: null, createdAt: hoursAgo(0.2) },
  { id: "ord-003", establishmentId: "est-001", tableNumber: 1, staffName: "Marie-Claire Nzé", items: [{ name: "Cocktail Passion", price: 5000, quantity: 2 }, { name: "Plantain frit", price: 1500, quantity: 1 }], totalAmount: 11500, status: "paid", paymentMode: "mobile_money", createdAt: hoursAgo(0.5) },
  { id: "ord-004", establishmentId: "est-001", tableNumber: 5, staffName: "Patrick Mba", items: [{ name: "Johnnie Walker Red", price: 5000, quantity: 2 }, { name: "Red Bull", price: 3000, quantity: 2 }], totalAmount: 16000, status: "served", paymentMode: null, createdAt: hoursAgo(0.3) },
  { id: "ord-005", establishmentId: "est-001", tableNumber: 2, staffName: "Marie-Claire Nzé", items: [{ name: "Régab", price: 1000, quantity: 4 }], totalAmount: 4000, status: "paid", paymentMode: "cash", createdAt: hoursAgo(1) },
  { id: "ord-006", establishmentId: "est-001", tableNumber: 9, staffName: "Patrick Mba", items: [{ name: "Heineken", price: 2000, quantity: 3 }, { name: "Ailes de poulet", price: 3500, quantity: 2 }], totalAmount: 13000, status: "pending", paymentMode: null, createdAt: hoursAgo(0.05) },
  // Restaurant
  { id: "ord-010", establishmentId: "est-002", tableNumber: 4, staffName: "Sylvie Ndong", items: [{ name: "Poulet braisé", price: 5000, quantity: 1 }, { name: "Bissap", price: 1000, quantity: 2 }], totalAmount: 7000, status: "preparing", paymentMode: null, createdAt: hoursAgo(0.15) },
  { id: "ord-011", establishmentId: "est-002", tableNumber: 2, staffName: "Sylvie Ndong", items: [{ name: "Ndolè", price: 4500, quantity: 2 }, { name: "Castel", price: 1500, quantity: 2 }], totalAmount: 12000, status: "served", paymentMode: null, createdAt: hoursAgo(0.4) },
  { id: "ord-012", establishmentId: "est-002", tableNumber: 6, staffName: "Sylvie Ndong", items: [{ name: "Poisson braisé", price: 6000, quantity: 1 }, { name: "Jus de gingembre", price: 1000, quantity: 1 }], totalAmount: 7000, status: "paid", paymentMode: "cash", createdAt: hoursAgo(1.5) },
  // Club
  { id: "ord-020", establishmentId: "est-003", tableNumber: 1, staffName: "Fabrice Engonga", items: [{ name: "Hennessy VS", price: 75000, quantity: 1 }, { name: "Red Bull", price: 3000, quantity: 4 }], totalAmount: 87000, status: "served", paymentMode: null, createdAt: hoursAgo(0.3) },
  { id: "ord-021", establishmentId: "est-003", tableNumber: 3, staffName: "Fabrice Engonga", items: [{ name: "Moët & Chandon", price: 120000, quantity: 1 }], totalAmount: 120000, status: "paid", paymentMode: "card", createdAt: hoursAgo(1) },
];

// ========== EVENTS ==========
export interface DemoEvent {
  id: string;
  establishmentId: string;
  name: string;
  description: string;
  date: string;
  endDate: string;
  priceNormal: number;
  priceVip: number;
  priceVvip: number;
  maxTickets: number;
  ticketsSold: number;
  isActive: boolean;
}

export const events: DemoEvent[] = [
  {
    id: "evt-001", establishmentId: "est-003", name: "Soirée Afrobeats",
    description: "Les meilleurs hits afrobeats avec DJ Maleek et DJ Black",
    date: "2026-03-28T23:00:00", endDate: "2026-03-29T05:00:00",
    priceNormal: 5000, priceVip: 15000, priceVvip: 30000,
    maxTickets: 300, ticketsSold: 180, isActive: true,
  },
  {
    id: "evt-002", establishmentId: "est-003", name: "Ladies Night",
    description: "Entrée gratuite pour les femmes, cocktails à -50%",
    date: "2026-04-03T22:00:00", endDate: "2026-04-04T04:00:00",
    priceNormal: 3000, priceVip: 10000, priceVvip: 0,
    maxTickets: 200, ticketsSold: 85, isActive: true,
  },
  {
    id: "evt-003", establishmentId: "est-003", name: "Concert Live: Mink's",
    description: "Le roi de l'afropop gabonais en concert exclusif",
    date: "2026-04-11T21:00:00", endDate: "2026-04-12T04:00:00",
    priceNormal: 10000, priceVip: 25000, priceVvip: 50000,
    maxTickets: 500, ticketsSold: 450, isActive: true,
  },
];

// ========== VIP AREAS ==========
export interface DemoVipArea {
  id: string;
  establishmentId: string;
  name: string;
  capacity: number;
  minSpend: number;
  status: string;
}

export const vipAreas: DemoVipArea[] = [
  { id: "vip-001", establishmentId: "est-003", name: "Carré Platine", capacity: 8, minSpend: 100000, status: "occupied" },
  { id: "vip-002", establishmentId: "est-003", name: "Carré Diamant", capacity: 12, minSpend: 200000, status: "reserved" },
  { id: "vip-003", establishmentId: "est-003", name: "Carré Gold", capacity: 6, minSpend: 75000, status: "available" },
  { id: "vip-004", establishmentId: "est-003", name: "Carré Prestige", capacity: 10, minSpend: 150000, status: "available" },
  { id: "vip-005", establishmentId: "est-003", name: "Carré Royal", capacity: 15, minSpend: 300000, status: "reserved" },
];

// ========== DJ SLOTS ==========
export interface DemoDjSlot {
  id: string;
  establishmentId: string;
  djName: string;
  genre: string;
  startTime: string;
  endTime: string;
  rate: number;
}

export const djSlots: DemoDjSlot[] = [
  { id: "dj-001", establishmentId: "est-003", djName: "DJ Maleek", genre: "Afrobeats / Amapiano", startTime: "22:00", endTime: "00:00", rate: 50000 },
  { id: "dj-002", establishmentId: "est-003", djName: "DJ Black", genre: "Hip-Hop / Trap", startTime: "00:00", endTime: "02:00", rate: 45000 },
  { id: "dj-003", establishmentId: "est-003", djName: "DJ Sanza", genre: "Ndombolo / Coupé-décalé", startTime: "02:00", endTime: "04:00", rate: 40000 },
];

// ========== REVIEWS ==========
export interface DemoReview {
  id: string;
  establishmentId: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
}

export const reviews: DemoReview[] = [
  { id: "rev-001", establishmentId: "est-001", clientName: "Éric M.", rating: 5, comment: "Meilleur lounge de Libreville, les cocktails sont incroyables !", date: "2026-03-15" },
  { id: "rev-002", establishmentId: "est-001", clientName: "Nathalie O.", rating: 4, comment: "Ambiance top, service un peu lent en soirée", date: "2026-03-10" },
  { id: "rev-003", establishmentId: "est-002", clientName: "Paul B.", rating: 5, comment: "Le meilleur poulet braisé de la ville, sans hésitation", date: "2026-03-18" },
  { id: "rev-004", establishmentId: "est-002", clientName: "Sandrine N.", rating: 4, comment: "Cuisine authentique, portions généreuses. Je recommande le Ndolè", date: "2026-03-12" },
  { id: "rev-005", establishmentId: "est-003", clientName: "Kevin A.", rating: 5, comment: "Les soirées au Club 241 sont les meilleures ! DJ Maleek assure", date: "2026-03-20" },
  { id: "rev-006", establishmentId: "est-003", clientName: "Lise E.", rating: 4, comment: "Bonne ambiance mais prix VIP un peu élevés", date: "2026-03-08" },
];
