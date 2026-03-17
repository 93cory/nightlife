import { Timestamp } from "firebase/firestore";

// ===== USER =====
export type LoyaltyTier = "bronze" | "silver" | "gold" | "vip";

export interface User {
  uid: string;
  phone: string;
  displayName: string;
  role: "client";
  createdAt: Timestamp;
  loyaltyPoints: number;
  loyaltyTier: LoyaltyTier;
  totalSpent: number;
}

export interface LoyaltyEntry {
  id: string;
  description: string;
  points: number;
  type: "earn" | "redeem";
  timestamp: Timestamp;
  orderId?: string;
}

// ===== STAFF =====
export type StaffRole = "manager" | "barman" | "serveur" | "securite" | "comptable";

export interface Staff {
  uid: string;
  username: string;
  displayName: string;
  email: string;
  role: StaffRole;
  isActive: boolean;
  venueId: string;
}

// ===== MENU =====
export type MenuCategory = "boissons" | "food" | "cocktails" | "bouteilles";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  emoji: string;
  available: boolean;
  venueId: string;
  sortOrder: number;
}

// ===== ORDERS =====
export type OrderStatus = "pending" | "preparing" | "served" | "paid" | "cancelled";
export type PaymentMode = "cash" | "mobile_money" | "card" | "loyalty";

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  venueId: string;
  tableNumber: number;
  clientId?: string;
  staffId?: string;
  staffName: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentMode?: PaymentMode;
  createdAt: Timestamp;
  servedAt?: Timestamp;
  paidAt?: Timestamp;
}

// ===== CAISSE =====
export interface PaymentBreakdown {
  cash: number;
  mobile_money: number;
  card: number;
  loyalty: number;
}

export interface CaisseSession {
  id: string;
  venueId: string;
  openedBy: string;
  openedAt: Timestamp;
  closedAt?: Timestamp;
  shiftLabel: string;
  totalCollected: number;
  breakdown: PaymentBreakdown;
  transactionCount: number;
  status: "open" | "closed";
}

export interface Transaction {
  id: string;
  caisseSessionId: string;
  orderId: string;
  amount: number;
  paymentMode: PaymentMode;
  tableNumber: number;
  staffName: string;
  timestamp: Timestamp;
}

// ===== EVENTS =====
export interface NightEvent {
  id: string;
  name: string;
  venue: string;
  date: Timestamp;
  price: number;
  emoji: string;
  gradient: string[];
  venueId: string;
}

// ===== CART =====
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
