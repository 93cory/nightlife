-- NightLife — Complete Database Schema
-- Supabase PostgreSQL

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========== ENUMS ==========
CREATE TYPE establishment_type AS ENUM ('bar', 'restaurant', 'snack', 'nightclub');
CREATE TYPE staff_role AS ENUM ('owner', 'manager', 'barman', 'serveur', 'cuisinier', 'securite', 'dj', 'comptable');
CREATE TYPE order_status AS ENUM ('pending', 'preparing', 'ready', 'served', 'paid', 'cancelled');
CREATE TYPE payment_mode AS ENUM ('cash', 'mobile_money', 'card', 'loyalty');
CREATE TYPE table_status AS ENUM ('free', 'occupied', 'reserved', 'cleaning');
CREATE TYPE ticket_type AS ENUM ('normal', 'vip', 'vvip');
CREATE TYPE subscription_plan AS ENUM ('starter', 'essential', 'pro', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('trial', 'active', 'expired', 'suspended');
CREATE TYPE loyalty_tier AS ENUM ('bronze', 'silver', 'gold', 'vip');
CREATE TYPE vip_area_status AS ENUM ('available', 'reserved', 'occupied');
CREATE TYPE ingredient_unit AS ENUM ('kg', 'g', 'l', 'ml', 'unit');
CREATE TYPE delivery_status AS ENUM ('pending', 'preparing', 'picked_up', 'delivered', 'cancelled');

-- ========== ESTABLISHMENTS ==========
CREATE TABLE establishments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type establishment_type NOT NULL,
  description TEXT,
  address TEXT,
  city TEXT DEFAULT 'Libreville',
  country TEXT DEFAULT 'Gabon',
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  logo_url TEXT,
  cover_url TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  opening_hours JSONB DEFAULT '{}',
  theme_colors JSONB DEFAULT '{"primary": "#d4a843", "secondary": "#7f1d1d"}',
  max_capacity INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== SUBSCRIPTIONS ==========
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  plan subscription_plan DEFAULT 'starter',
  status subscription_status DEFAULT 'trial',
  trial_ends_at TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  amount INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== PROFILES ==========
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'client',
  loyalty_points INTEGER DEFAULT 0,
  loyalty_tier loyalty_tier DEFAULT 'bronze',
  total_spent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== STAFF ==========
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  role staff_role NOT NULL,
  display_name TEXT NOT NULL,
  pin_code TEXT,
  is_active BOOLEAN DEFAULT true,
  hired_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== MENU ==========
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  emoji TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  category_id UUID REFERENCES menu_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  cost_price INTEGER DEFAULT 0,
  image_url TEXT,
  emoji TEXT,
  is_available BOOLEAN DEFAULT true,
  is_drink BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== STOCK ==========
CREATE TABLE stock (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  quantity_current DOUBLE PRECISION DEFAULT 0,
  quantity_min DOUBLE PRECISION DEFAULT 5,
  unit ingredient_unit DEFAULT 'unit',
  last_restock_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE stock_movements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stock_id UUID REFERENCES stock(id) ON DELETE CASCADE,
  quantity DOUBLE PRECISION NOT NULL,
  reason TEXT,
  staff_id UUID REFERENCES staff(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== TABLES ==========
CREATE TABLE venue_tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  number INTEGER NOT NULL,
  label TEXT,
  capacity INTEGER DEFAULT 4,
  status table_status DEFAULT 'free',
  position_x DOUBLE PRECISION DEFAULT 0,
  position_y DOUBLE PRECISION DEFAULT 0,
  is_vip BOOLEAN DEFAULT false
);

-- ========== ORDERS ==========
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  table_id UUID REFERENCES venue_tables(id),
  client_id UUID REFERENCES profiles(id),
  staff_id UUID REFERENCES staff(id),
  order_number SERIAL,
  status order_status DEFAULT 'pending',
  total_amount INTEGER DEFAULT 0,
  payment_mode payment_mode,
  notes TEXT,
  is_delivery BOOLEAN DEFAULT false,
  is_takeaway BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  prepared_at TIMESTAMPTZ,
  served_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id),
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  quantity INTEGER DEFAULT 1,
  notes TEXT
);

-- ========== CAISSE ==========
CREATE TABLE caisse_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  opened_by UUID REFERENCES staff(id),
  closed_by UUID REFERENCES staff(id),
  shift_label TEXT,
  opening_amount INTEGER DEFAULT 0,
  closing_amount INTEGER,
  total_sales INTEGER DEFAULT 0,
  total_cash INTEGER DEFAULT 0,
  total_mobile INTEGER DEFAULT 0,
  total_card INTEGER DEFAULT 0,
  transaction_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'open',
  opened_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ
);

CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  caisse_session_id UUID REFERENCES caisse_sessions(id),
  order_id UUID REFERENCES orders(id),
  amount INTEGER NOT NULL,
  payment_mode payment_mode NOT NULL,
  staff_id UUID REFERENCES staff(id),
  tip_amount INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== EVENTS ==========
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  poster_url TEXT,
  price_normal INTEGER DEFAULT 0,
  price_vip INTEGER DEFAULT 0,
  price_vvip INTEGER DEFAULT 0,
  max_tickets INTEGER,
  tickets_sold INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id),
  type ticket_type DEFAULT 'normal',
  price INTEGER NOT NULL,
  qr_code TEXT UNIQUE,
  is_scanned BOOLEAN DEFAULT false,
  scanned_at TIMESTAMPTZ,
  purchased_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== VIP AREAS ==========
CREATE TABLE vip_areas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  capacity INTEGER DEFAULT 10,
  min_spend INTEGER DEFAULT 0,
  status vip_area_status DEFAULT 'available',
  position_x DOUBLE PRECISION DEFAULT 0,
  position_y DOUBLE PRECISION DEFAULT 0
);

CREATE TABLE vip_reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vip_area_id UUID REFERENCES vip_areas(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id),
  event_id UUID REFERENCES events(id),
  date TIMESTAMPTZ NOT NULL,
  guest_count INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== DJ ==========
CREATE TABLE dj_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id),
  dj_name TEXT NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  genre TEXT
);

-- ========== RESERVATIONS ==========
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id),
  table_id UUID REFERENCES venue_tables(id),
  date TIMESTAMPTZ NOT NULL,
  guest_count INTEGER DEFAULT 2,
  status TEXT DEFAULT 'pending',
  client_name TEXT,
  client_phone TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== REVIEWS ==========
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id),
  order_id UUID REFERENCES orders(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== LOYALTY ==========
CREATE TABLE loyalty_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  establishment_id UUID REFERENCES establishments(id),
  points INTEGER NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  order_id UUID REFERENCES orders(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== INGREDIENTS ==========
CREATE TABLE ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity_current DOUBLE PRECISION DEFAULT 0,
  quantity_min DOUBLE PRECISION DEFAULT 1,
  unit ingredient_unit DEFAULT 'kg',
  cost_per_unit INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
  quantity DOUBLE PRECISION NOT NULL
);

-- ========== HAPPY HOURS ==========
CREATE TABLE happy_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  day_of_week INTEGER,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  discount_percent INTEGER DEFAULT 30,
  applies_to JSONB,
  is_active BOOLEAN DEFAULT true
);

-- ========== SECURITY ==========
CREATE TABLE security_incidents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  establishment_id UUID REFERENCES establishments(id) ON DELETE CASCADE,
  reported_by UUID REFERENCES staff(id),
  description TEXT NOT NULL,
  severity TEXT DEFAULT 'low',
  resolved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== SHIFTS ==========
CREATE TABLE staff_shifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  staff_id UUID REFERENCES staff(id) ON DELETE CASCADE,
  clock_in TIMESTAMPTZ NOT NULL,
  clock_out TIMESTAMPTZ,
  scheduled_start TIMESTAMPTZ,
  scheduled_end TIMESTAMPTZ
);

-- ========== DELIVERIES ==========
CREATE TABLE deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  driver_name TEXT,
  driver_phone TEXT,
  status delivery_status DEFAULT 'pending',
  address TEXT,
  estimated_time INTEGER,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========== INDEXES ==========
CREATE INDEX idx_orders_establishment ON orders(establishment_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_menu_items_establishment ON menu_items(establishment_id);
CREATE INDEX idx_stock_establishment ON stock(establishment_id);
CREATE INDEX idx_transactions_session ON transactions(caisse_session_id);
CREATE INDEX idx_events_establishment ON events(establishment_id);
CREATE INDEX idx_tickets_event ON tickets(event_id);
CREATE INDEX idx_staff_establishment ON staff(establishment_id);
CREATE INDEX idx_reservations_establishment ON reservations(establishment_id);

-- ========== TRIGGERS ==========
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_establishments_updated BEFORE UPDATE ON establishments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_stock_updated BEFORE UPDATE ON stock FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_ingredients_updated BEFORE UPDATE ON ingredients FOR EACH ROW EXECUTE FUNCTION update_updated_at();
