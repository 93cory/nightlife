-- NightLife — Row Level Security Policies
-- À exécuter après schema.sql

-- Enable RLS on all tables
ALTER TABLE establishments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE caisse_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE vip_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE vip_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE dj_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE happy_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_shifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;

-- ========== PUBLIC READ (pages publiques) ==========
-- Establishments, menus, events visibles par tous
CREATE POLICY "Public can view active establishments" ON establishments
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view menu categories" ON menu_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view menu items" ON menu_items
  FOR SELECT USING (true);

CREATE POLICY "Public can view active events" ON events
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Public can view happy hours" ON happy_hours
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view vip areas" ON vip_areas
  FOR SELECT USING (true);

CREATE POLICY "Public can view dj slots" ON dj_slots
  FOR SELECT USING (true);

-- ========== AUTHENTICATED CLIENT ==========
-- Profiles: users can read/update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Orders: clients see their own orders
CREATE POLICY "Clients can view own orders" ON orders
  FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Clients can create orders" ON orders
  FOR INSERT WITH CHECK (client_id = auth.uid());

-- Tickets: clients see their own tickets
CREATE POLICY "Clients can view own tickets" ON tickets
  FOR SELECT USING (client_id = auth.uid());

-- Reservations: clients see their own
CREATE POLICY "Clients can view own reservations" ON reservations
  FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "Clients can create reservations" ON reservations
  FOR INSERT WITH CHECK (true);

-- Reviews: clients can create
CREATE POLICY "Clients can create reviews" ON reviews
  FOR INSERT WITH CHECK (client_id = auth.uid());

-- Loyalty: clients see their own
CREATE POLICY "Clients can view own loyalty" ON loyalty_entries
  FOR SELECT USING (profile_id = auth.uid());

-- ========== STAFF (via establishment membership) ==========
-- Helper function to check staff membership
CREATE OR REPLACE FUNCTION is_staff_of(est_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM staff
    WHERE staff.profile_id = auth.uid()
    AND staff.establishment_id = est_id
    AND staff.is_active = true
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Staff can see their own establishment data
CREATE POLICY "Staff can view own establishment" ON establishments
  FOR SELECT USING (is_staff_of(id));

CREATE POLICY "Staff can manage orders" ON orders
  FOR ALL USING (is_staff_of(establishment_id));

CREATE POLICY "Staff can manage order items" ON order_items
  FOR ALL USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND is_staff_of(orders.establishment_id)));

CREATE POLICY "Staff can manage stock" ON stock
  FOR ALL USING (is_staff_of(establishment_id));

CREATE POLICY "Staff can manage tables" ON venue_tables
  FOR ALL USING (is_staff_of(establishment_id));

CREATE POLICY "Staff can manage caisse" ON caisse_sessions
  FOR ALL USING (is_staff_of(establishment_id));

CREATE POLICY "Staff can manage reservations" ON reservations
  FOR ALL USING (is_staff_of(establishment_id));

CREATE POLICY "Staff can view staff list" ON staff
  FOR SELECT USING (is_staff_of(establishment_id));

CREATE POLICY "Staff can manage events" ON events
  FOR ALL USING (is_staff_of(establishment_id));

CREATE POLICY "Staff can manage tickets" ON tickets
  FOR ALL USING (EXISTS (SELECT 1 FROM events WHERE events.id = tickets.event_id AND is_staff_of(events.establishment_id)));

CREATE POLICY "Staff can manage vip areas" ON vip_areas
  FOR ALL USING (is_staff_of(establishment_id));

CREATE POLICY "Staff can manage security" ON security_incidents
  FOR ALL USING (is_staff_of(establishment_id));

CREATE POLICY "Staff can manage shifts" ON staff_shifts
  FOR ALL USING (EXISTS (SELECT 1 FROM staff WHERE staff.id = staff_shifts.staff_id AND is_staff_of(staff.establishment_id)));

-- ========== SUPER ADMIN ==========
-- Super admins can do everything (role check in profiles)
CREATE POLICY "Super admin full access establishments" ON establishments
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'superadmin'));

CREATE POLICY "Super admin full access subscriptions" ON subscriptions
  FOR ALL USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'superadmin'));
