-- ============================================
-- NightLife Gabon — Schéma Supabase
-- Exécuter dans SQL Editor de Supabase
-- ============================================

-- Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT,
  display_name TEXT NOT NULL DEFAULT 'Client',
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client','waiter','barman','manager','security')),
  avatar_url TEXT,
  loyalty_points INTEGER NOT NULL DEFAULT 0,
  loyalty_tier TEXT NOT NULL DEFAULT 'Bronze',
  referral_code TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Establishments
CREATE TABLE IF NOT EXISTS establishments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Libreville',
  image_url TEXT,
  is_open BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tables
CREATE TABLE IF NOT EXISTS tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  establishment_id UUID NOT NULL REFERENCES establishments(id) ON DELETE CASCADE,
  number INTEGER NOT NULL,
  seats INTEGER NOT NULL DEFAULT 4,
  status TEXT NOT NULL DEFAULT 'free' CHECK (status IN ('free','occupied','reserved','calling')),
  zone TEXT NOT NULL DEFAULT 'Salle'
);

-- Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  establishment_id UUID NOT NULL REFERENCES establishments(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL,
  category TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '🍽️',
  tag TEXT,
  available BOOLEAN NOT NULL DEFAULT true,
  stock INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  establishment_id UUID NOT NULL REFERENCES establishments(id) ON DELETE CASCADE,
  table_id UUID REFERENCES tables(id),
  table_number INTEGER NOT NULL,
  client_id UUID REFERENCES profiles(id),
  waiter_id UUID REFERENCES profiles(id),
  waiter_name TEXT NOT NULL DEFAULT 'Staff',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','preparing','served','paid','cancelled')),
  total_amount INTEGER NOT NULL DEFAULT 0,
  client_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '🍽️',
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('airtel','moov','cash','card')),
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  transaction_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  establishment_id UUID NOT NULL REFERENCES establishments(id) ON DELETE CASCADE,
  table_number INTEGER NOT NULL,
  from_role TEXT NOT NULL CHECK (from_role IN ('client','staff')),
  sender_name TEXT NOT NULL,
  text TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Referrals
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES profiles(id),
  referred_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'registered',
  points_earned INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Promos
CREATE TABLE IF NOT EXISTS promos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount INTEGER NOT NULL,
  discount_type TEXT NOT NULL DEFAULT 'percent' CHECK (discount_type IN ('percent','fixed')),
  max_usage INTEGER NOT NULL DEFAULT 1,
  usage_count INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'bienvenue',
  description TEXT NOT NULL DEFAULT '',
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE establishments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE promos ENABLE ROW LEVEL SECURITY;

-- Public read for most tables (app uses anon key)
CREATE POLICY "Public read establishments" ON establishments FOR SELECT USING (true);
CREATE POLICY "Public read tables" ON tables FOR SELECT USING (true);
CREATE POLICY "Public read menu_items" ON menu_items FOR SELECT USING (true);
CREATE POLICY "Public read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public read order_items" ON order_items FOR SELECT USING (true);
CREATE POLICY "Public read chat_messages" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "Public read promos" ON promos FOR SELECT USING (true);
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read payments" ON payments FOR SELECT USING (true);
CREATE POLICY "Public read referrals" ON referrals FOR SELECT USING (true);

-- Public insert/update for demo (in production, restrict to authenticated users)
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update orders" ON orders FOR UPDATE USING (true);
CREATE POLICY "Public insert order_items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert payments" ON payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update payments" ON payments FOR UPDATE USING (true);
CREATE POLICY "Public insert chat_messages" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update chat_messages" ON chat_messages FOR UPDATE USING (true);
CREATE POLICY "Public update tables" ON tables FOR UPDATE USING (true);
CREATE POLICY "Public update promos" ON promos FOR UPDATE USING (true);

-- ============================================
-- Enable Realtime
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE order_items;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE tables;

-- ============================================
-- Seed Data
-- ============================================

-- Establishment
INSERT INTO establishments (id, name, address, city, is_open) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'NightLife Libreville', 'Bord de mer, Quartier Louis', 'Libreville', true);

-- Tables (12)
INSERT INTO tables (establishment_id, number, seats, status, zone) VALUES
  ('a0000000-0000-0000-0000-000000000001', 1, 4, 'occupied', 'Terrasse'),
  ('a0000000-0000-0000-0000-000000000001', 2, 4, 'free', 'Terrasse'),
  ('a0000000-0000-0000-0000-000000000001', 3, 6, 'occupied', 'Salle'),
  ('a0000000-0000-0000-0000-000000000001', 4, 2, 'free', 'Bar'),
  ('a0000000-0000-0000-0000-000000000001', 5, 4, 'free', 'Salle'),
  ('a0000000-0000-0000-0000-000000000001', 6, 8, 'reserved', 'VIP'),
  ('a0000000-0000-0000-0000-000000000001', 7, 4, 'occupied', 'Terrasse'),
  ('a0000000-0000-0000-0000-000000000001', 8, 2, 'free', 'Bar'),
  ('a0000000-0000-0000-0000-000000000001', 9, 6, 'occupied', 'Salle'),
  ('a0000000-0000-0000-0000-000000000001', 10, 4, 'free', 'Terrasse'),
  ('a0000000-0000-0000-0000-000000000001', 11, 10, 'reserved', 'VIP'),
  ('a0000000-0000-0000-0000-000000000001', 12, 4, 'free', 'Salle');

-- Menu Items (30)
INSERT INTO menu_items (establishment_id, name, description, price, category, emoji, tag) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Régab Pression', 'La bière locale incontournable', 1000, 'Bières', '🍺', 'Populaire'),
  ('a0000000-0000-0000-0000-000000000001', 'Castel Beer', 'Blonde rafraîchissante', 1000, 'Bières', '🍺', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Heineken', 'Premium importée', 1500, 'Bières', '🍺', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Corona Extra', 'Avec citron vert', 2000, 'Bières', '🍺', 'Nouveau'),
  ('a0000000-0000-0000-0000-000000000001', 'Whisky JB', 'J&B Rare Blend', 4500, 'Spiritueux', '🥃', 'Populaire'),
  ('a0000000-0000-0000-0000-000000000001', 'Hennessy VS', 'Cognac premium', 35000, 'Spiritueux', '🥃', 'Premium'),
  ('a0000000-0000-0000-0000-000000000001', 'Jack Daniels', 'Tennessee whiskey', 5000, 'Spiritueux', '🥃', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Chivas 12 ans', 'Scotch whisky premium', 8000, 'Spiritueux', '🥃', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Moët & Chandon', 'Champagne Brut Impérial', 45000, 'Champagne', '🍾', 'Premium'),
  ('a0000000-0000-0000-0000-000000000001', 'Veuve Clicquot', 'Champagne Yellow Label', 55000, 'Champagne', '🍾', 'Premium'),
  ('a0000000-0000-0000-0000-000000000001', 'Mojito Africain', 'Rhum, citron vert, menthe, gingembre', 4000, 'Cocktails', '🍸', 'Populaire'),
  ('a0000000-0000-0000-0000-000000000001', 'Tropical Sunset', 'Vodka, mangue, passion, grenadine', 3500, 'Cocktails', '🍹', 'Nouveau'),
  ('a0000000-0000-0000-0000-000000000001', 'Piña Colada', 'Rhum, coco, ananas', 4000, 'Cocktails', '🍹', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Margarita', 'Tequila, citron vert, triple sec', 4500, 'Cocktails', '🍸', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Long Island', 'Le classique des soirées', 5000, 'Cocktails', '🍹', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Jus d''orange frais', 'Pressé maison', 1000, 'Softs', '🍊', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Jus de gingembre', 'Recette maison pimentée', 800, 'Softs', '🫚', 'Populaire'),
  ('a0000000-0000-0000-0000-000000000001', 'Coca-Cola', 'Canette 33cl', 500, 'Softs', '🥤', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Red Bull', 'Energy drink', 1500, 'Softs', '⚡', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Eau Minérale', 'Plate ou gazeuse', 500, 'Softs', '💧', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Brochettes mixtes', 'Bœuf, poulet, poivrons', 2500, 'Food', '🍗', 'Populaire'),
  ('a0000000-0000-0000-0000-000000000001', 'Plantain frit', 'Alloco croustillant', 1500, 'Food', '🍌', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Ailes de poulet', 'Sauce pili-pili', 3000, 'Food', '🍗', 'Nouveau'),
  ('a0000000-0000-0000-0000-000000000001', 'Poisson braisé', 'Bar entier, sauce tomate', 5000, 'Food', '🐟', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Assiette de frites', 'Frites maison croustillantes', 1500, 'Food', '🍟', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Manioc braisé', 'Accompagnement traditionnel', 1000, 'Food', '🥖', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Cacahuètes grillées', 'En-cas salé', 500, 'Food', '🥜', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Salade composée', 'Fraîche et légère', 2000, 'Food', '🥗', NULL),
  ('a0000000-0000-0000-0000-000000000001', 'Chicha Premium', 'Parfums variés', 8000, 'Chicha', '💨', 'Populaire'),
  ('a0000000-0000-0000-0000-000000000001', 'Chicha Double', 'Double tuyau, double plaisir', 12000, 'Chicha', '💨', 'Premium');

-- Demo Orders
INSERT INTO orders (establishment_id, table_number, waiter_name, status, total_amount, client_name, created_at) VALUES
  ('a0000000-0000-0000-0000-000000000001', 3, 'Moussa', 'preparing', 11500, NULL, NOW() - INTERVAL '18 minutes'),
  ('a0000000-0000-0000-0000-000000000001', 7, 'Éva', 'served', 7500, 'Jean-Pierre', NOW() - INTERVAL '5 minutes'),
  ('a0000000-0000-0000-0000-000000000001', 1, 'Kevin', 'pending', 45000, NULL, NOW() - INTERVAL '2 minutes'),
  ('a0000000-0000-0000-0000-000000000001', 5, 'Éva', 'paid', 5000, NULL, NOW() - INTERVAL '30 minutes'),
  ('a0000000-0000-0000-0000-000000000001', 9, 'Kevin', 'paid', 40000, NULL, NOW() - INTERVAL '45 minutes'),
  ('a0000000-0000-0000-0000-000000000001', 2, 'Moussa', 'paid', 9500, NULL, NOW() - INTERVAL '60 minutes');

-- Promos
INSERT INTO promos (code, discount, discount_type, max_usage, usage_count, category, description, expires_at) VALUES
  ('WELCOME25', 25, 'percent', 1, 0, 'bienvenue', '25% sur votre première commande', NOW() + INTERVAL '30 days'),
  ('FIDELE10', 10, 'percent', 5, 2, 'fidelite', '10% pour les membres Silver+', NOW() + INTERVAL '60 days'),
  ('SOIREE5K', 5000, 'fixed', 1, 0, 'evenement', '5 000 XAF offerts — Soirée Afro House', NOW() + INTERVAL '7 days'),
  ('PARRAIN15', 15, 'percent', 10, 1, 'parrainage', '15% de réduction parrainage', NOW() + INTERVAL '90 days');
