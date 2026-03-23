// ========== ENUMS ==========
export type EstablishmentType = "bar" | "restaurant" | "snack" | "nightclub";
export type StaffRole = "owner" | "manager" | "barman" | "serveur" | "cuisinier" | "securite" | "dj" | "comptable";
export type OrderStatus = "pending" | "preparing" | "ready" | "served" | "paid" | "cancelled";
export type PaymentMode = "cash" | "mobile_money" | "card" | "loyalty";
export type TableStatus = "free" | "occupied" | "reserved" | "cleaning";
export type TicketType = "normal" | "vip" | "vvip";
export type SubscriptionPlan = "starter" | "essential" | "pro" | "enterprise";
export type SubscriptionStatus = "trial" | "active" | "expired" | "suspended";
export type LoyaltyTier = "bronze" | "silver" | "gold" | "vip";
export type VipAreaStatus = "available" | "reserved" | "occupied";
export type IngredientUnit = "kg" | "g" | "l" | "ml" | "unit";
export type DeliveryStatus = "pending" | "preparing" | "picked_up" | "delivered" | "cancelled";

// ========== TABLES ==========
export interface Establishment {
  id: string;
  name: string;
  slug: string;
  type: EstablishmentType;
  description: string | null;
  address: string | null;
  city: string;
  country: string;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  logo_url: string | null;
  cover_url: string | null;
  latitude: number | null;
  longitude: number | null;
  opening_hours: Record<string, string>;
  theme_colors: { primary: string; secondary: string };
  max_capacity: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  establishment_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  trial_ends_at: string | null;
  current_period_start: string | null;
  current_period_end: string | null;
  amount: number;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  role: string;
  loyalty_points: number;
  loyalty_tier: LoyaltyTier;
  total_spent: number;
  created_at: string;
}

export interface Staff {
  id: string;
  profile_id: string | null;
  establishment_id: string;
  role: StaffRole;
  display_name: string;
  pin_code: string | null;
  is_active: boolean;
  hired_at: string;
  created_at: string;
}

export interface MenuCategory {
  id: string;
  establishment_id: string;
  name: string;
  emoji: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface MenuItem {
  id: string;
  establishment_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  cost_price: number;
  image_url: string | null;
  emoji: string | null;
  is_available: boolean;
  is_drink: boolean;
  sort_order: number;
  created_at: string;
}

export interface Stock {
  id: string;
  establishment_id: string;
  menu_item_id: string;
  quantity_current: number;
  quantity_min: number;
  unit: IngredientUnit;
  last_restock_at: string | null;
  updated_at: string;
}

export interface StockMovement {
  id: string;
  stock_id: string;
  quantity: number;
  reason: string | null;
  staff_id: string | null;
  created_at: string;
}

export interface VenueTable {
  id: string;
  establishment_id: string;
  number: number;
  label: string | null;
  capacity: number;
  status: TableStatus;
  position_x: number;
  position_y: number;
  is_vip: boolean;
}

export interface Order {
  id: string;
  establishment_id: string;
  table_id: string | null;
  client_id: string | null;
  staff_id: string | null;
  order_number: number;
  status: OrderStatus;
  total_amount: number;
  payment_mode: PaymentMode | null;
  notes: string | null;
  is_delivery: boolean;
  is_takeaway: boolean;
  created_at: string;
  prepared_at: string | null;
  served_at: string | null;
  paid_at: string | null;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string | null;
  name: string;
  price: number;
  quantity: number;
  notes: string | null;
}

export interface CaisseSession {
  id: string;
  establishment_id: string;
  opened_by: string | null;
  closed_by: string | null;
  shift_label: string | null;
  opening_amount: number;
  closing_amount: number | null;
  total_sales: number;
  total_cash: number;
  total_mobile: number;
  total_card: number;
  transaction_count: number;
  status: "open" | "closed";
  opened_at: string;
  closed_at: string | null;
}

export interface Transaction {
  id: string;
  caisse_session_id: string | null;
  order_id: string | null;
  amount: number;
  payment_mode: PaymentMode;
  staff_id: string | null;
  tip_amount: number;
  created_at: string;
}

export interface Event {
  id: string;
  establishment_id: string;
  name: string;
  description: string | null;
  date: string;
  end_date: string | null;
  poster_url: string | null;
  price_normal: number;
  price_vip: number;
  price_vvip: number;
  max_tickets: number | null;
  tickets_sold: number;
  is_active: boolean;
  created_at: string;
}

export interface Ticket {
  id: string;
  event_id: string;
  client_id: string | null;
  type: TicketType;
  price: number;
  qr_code: string | null;
  is_scanned: boolean;
  scanned_at: string | null;
  purchased_at: string;
}

export interface VipArea {
  id: string;
  establishment_id: string;
  name: string;
  capacity: number;
  min_spend: number;
  status: VipAreaStatus;
  position_x: number;
  position_y: number;
}

export interface VipReservation {
  id: string;
  vip_area_id: string;
  client_id: string | null;
  event_id: string | null;
  date: string;
  guest_count: number;
  status: string;
  notes: string | null;
  created_at: string;
}

export interface DjSlot {
  id: string;
  establishment_id: string;
  event_id: string | null;
  dj_name: string;
  start_time: string;
  end_time: string;
  genre: string | null;
}

export interface Reservation {
  id: string;
  establishment_id: string;
  client_id: string | null;
  table_id: string | null;
  date: string;
  guest_count: number;
  status: string;
  client_name: string | null;
  client_phone: string | null;
  notes: string | null;
  created_at: string;
}

export interface Review {
  id: string;
  establishment_id: string;
  client_id: string | null;
  order_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface LoyaltyEntry {
  id: string;
  profile_id: string;
  establishment_id: string | null;
  points: number;
  type: "earn" | "redeem";
  description: string | null;
  order_id: string | null;
  created_at: string;
}

export interface Ingredient {
  id: string;
  establishment_id: string;
  name: string;
  quantity_current: number;
  quantity_min: number;
  unit: IngredientUnit;
  cost_per_unit: number;
  updated_at: string;
}

export interface RecipeIngredient {
  id: string;
  menu_item_id: string;
  ingredient_id: string;
  quantity: number;
}

export interface HappyHour {
  id: string;
  establishment_id: string;
  day_of_week: number | null;
  start_time: string;
  end_time: string;
  discount_percent: number;
  applies_to: string[] | null;
  is_active: boolean;
}

export interface SecurityIncident {
  id: string;
  establishment_id: string;
  reported_by: string | null;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  resolved: boolean;
  created_at: string;
}

export interface StaffShift {
  id: string;
  staff_id: string;
  clock_in: string;
  clock_out: string | null;
  scheduled_start: string | null;
  scheduled_end: string | null;
}

export interface Delivery {
  id: string;
  order_id: string;
  driver_name: string | null;
  driver_phone: string | null;
  status: DeliveryStatus;
  address: string | null;
  estimated_time: number | null;
  delivered_at: string | null;
  created_at: string;
}
