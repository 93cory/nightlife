import {
  collection,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
  limit,
} from "firebase/firestore";
import { db } from "./config";
import type {
  MenuItem,
  Order,
  OrderItem,
  CaisseSession,
  Transaction,
  NightEvent,
  PaymentMode,
  LoyaltyEntry,
} from "@/lib/types";

// ===== MENU =====
export function subscribeToMenu(venueId: string, callback: (items: MenuItem[]) => void) {
  const q = query(
    collection(db, "menuItems"),
    where("venueId", "==", venueId),
    where("available", "==", true),
    orderBy("sortOrder")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as MenuItem)));
  });
}

// ===== ORDERS =====
export function subscribeToOrders(venueId: string, callback: (orders: Order[]) => void) {
  const q = query(
    collection(db, "orders"),
    where("venueId", "==", venueId),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order)));
  });
}

export function subscribeToActiveOrders(venueId: string, callback: (orders: Order[]) => void) {
  const q = query(
    collection(db, "orders"),
    where("venueId", "==", venueId),
    where("status", "in", ["pending", "preparing", "served"]),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order)));
  });
}

export async function createOrder(order: {
  venueId: string;
  tableNumber: number;
  clientId?: string;
  staffName: string;
  items: OrderItem[];
  totalAmount: number;
}) {
  return addDoc(collection(db, "orders"), {
    ...order,
    status: "pending",
    paymentMode: null,
    createdAt: serverTimestamp(),
  });
}

export async function updateOrderStatus(orderId: string, status: string, paymentMode?: PaymentMode) {
  const data: Record<string, unknown> = { status };
  if (status === "served") data.servedAt = serverTimestamp();
  if (status === "paid") {
    data.paidAt = serverTimestamp();
    if (paymentMode) data.paymentMode = paymentMode;
  }
  await updateDoc(doc(db, "orders", orderId), data);
}

// ===== CAISSE =====
export function subscribeToCaisse(venueId: string, callback: (session: CaisseSession | null) => void) {
  const q = query(
    collection(db, "caisseSessions"),
    where("venueId", "==", venueId),
    where("status", "==", "open"),
    limit(1)
  );
  return onSnapshot(q, (snap) => {
    if (snap.empty) return callback(null);
    const d = snap.docs[0];
    callback({ id: d.id, ...d.data() } as CaisseSession);
  });
}

export function subscribeToTransactions(sessionId: string, callback: (txns: Transaction[]) => void) {
  const q = query(
    collection(db, "transactions"),
    where("caisseSessionId", "==", sessionId),
    orderBy("timestamp", "desc"),
    limit(20)
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Transaction)));
  });
}

export async function addTransaction(txn: Omit<Transaction, "id" | "timestamp">) {
  return addDoc(collection(db, "transactions"), {
    ...txn,
    timestamp: serverTimestamp(),
  });
}

export async function closeCaisse(sessionId: string) {
  await updateDoc(doc(db, "caisseSessions", sessionId), {
    status: "closed",
    closedAt: serverTimestamp(),
  });
}

// ===== EVENTS =====
export function subscribeToEvents(venueId: string, callback: (events: NightEvent[]) => void) {
  const now = Timestamp.now();
  const q = query(
    collection(db, "events"),
    where("venueId", "==", venueId),
    where("date", ">=", now),
    orderBy("date"),
    limit(10)
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as NightEvent)));
  });
}

// ===== LOYALTY =====
export function subscribeToLoyaltyHistory(userId: string, callback: (entries: LoyaltyEntry[]) => void) {
  const q = query(
    collection(db, "users", userId, "loyaltyHistory"),
    orderBy("timestamp", "desc"),
    limit(20)
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as LoyaltyEntry)));
  });
}

// ===== STATS (for reports) =====
export async function getOrdersForPeriod(venueId: string, startDate: Date, endDate: Date) {
  const q = query(
    collection(db, "orders"),
    where("venueId", "==", venueId),
    where("status", "==", "paid"),
    where("paidAt", ">=", Timestamp.fromDate(startDate)),
    where("paidAt", "<=", Timestamp.fromDate(endDate)),
    orderBy("paidAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}
