-- NightLife — Seed Data (3 établissements de démonstration)
-- À exécuter après schema.sql

-- ========== ESTABLISHMENTS ==========
INSERT INTO establishments (id, name, slug, type, description, address, city, phone, whatsapp, latitude, longitude, opening_hours, max_capacity) VALUES
  ('est-001', 'Le Privilège Lounge', 'le-privilege', 'bar', 'Le bar lounge le plus exclusif de Libreville. Cocktails signatures, ambiance feutrée et musique live.', 'Boulevard de l''Indépendance, Quartier Louis, Libreville', 'Libreville', '+241 74 12 34 56', '+241 74 12 34 56', 0.3924, 9.4536, '{"lun-jeu": "17h - 02h", "ven-sam": "17h - 05h", "dim": "16h - 00h"}', 120),
  ('est-002', 'Chez Mama Rose', 'chez-mama-rose', 'restaurant', 'Cuisine gabonaise authentique et plats africains dans une ambiance chaleureuse et familiale.', 'Rue de la Mission, Quartier Glass, Libreville', 'Libreville', '+241 77 98 76 54', '+241 77 98 76 54', 0.3833, 9.4497, '{"lun-sam": "11h - 23h", "dim": "12h - 22h"}', 80),
  ('est-003', 'Club 241', 'club-241', 'nightclub', 'La boîte de nuit #1 de Libreville. Soirées thématiques, DJs internationaux et carrés VIP.', 'Avenue Léon Mba, Centre-ville, Libreville', 'Libreville', '+241 66 55 44 33', '+241 66 55 44 33', 0.3901, 9.4544, '{"jeu-sam": "22h - 06h", "dim": "Fermé", "lun-mer": "Fermé"}', 500);

-- ========== SUBSCRIPTIONS ==========
INSERT INTO subscriptions (establishment_id, plan, status, trial_ends_at, current_period_end, amount) VALUES
  ('est-001', 'pro', 'active', NULL, '2026-05-15', 55000),
  ('est-002', 'essential', 'active', NULL, '2026-04-20', 35000),
  ('est-003', 'pro', 'active', NULL, '2026-06-01', 55000);

-- ========== STAFF ==========
INSERT INTO staff (id, establishment_id, role, display_name, pin_code, is_active) VALUES
  ('stf-001', 'est-001', 'manager', 'Alain Obiang', '1234', true),
  ('stf-002', 'est-001', 'serveur', 'Marie-Claire Nzé', '2345', true),
  ('stf-003', 'est-001', 'barman', 'Patrick Mba', '5678', true),
  ('stf-004', 'est-002', 'serveur', 'Sylvie Ndong', '3456', true),
  ('stf-005', 'est-002', 'cuisinier', 'Jean-Pierre Ondo', '4567', true),
  ('stf-006', 'est-002', 'serveur', 'Christelle Mintsa', NULL, false),
  ('stf-007', 'est-003', 'securite', 'Fabrice Engonga', '6789', true),
  ('stf-008', 'est-003', 'dj', 'DJ Maleek', NULL, true);

-- ========== MENU CATEGORIES ==========
INSERT INTO menu_categories (id, establishment_id, name, emoji, sort_order) VALUES
  -- Le Privilège
  ('cat-b01', 'est-001', 'Bières', '🍺', 1),
  ('cat-b02', 'est-001', 'Cocktails', '🍸', 2),
  ('cat-b03', 'est-001', 'Spiritueux', '🥃', 3),
  ('cat-b04', 'est-001', 'Softs', '🥤', 4),
  ('cat-b05', 'est-001', 'Tapas', '🍢', 5),
  -- Chez Mama Rose
  ('cat-r01', 'est-002', 'Entrées', '🥗', 1),
  ('cat-r02', 'est-002', 'Plats', '🍽️', 2),
  ('cat-r03', 'est-002', 'Grillades', '🔥', 3),
  ('cat-r04', 'est-002', 'Desserts', '🍰', 4),
  ('cat-r05', 'est-002', 'Boissons', '🥤', 5),
  -- Club 241
  ('cat-c01', 'est-003', 'Bouteilles', '🍾', 1),
  ('cat-c02', 'est-003', 'Cocktails', '🍸', 2),
  ('cat-c03', 'est-003', 'Softs', '🥤', 3),
  ('cat-c04', 'est-003', 'Chicha', '💨', 4);

-- ========== MENU ITEMS (sélection) ==========
INSERT INTO menu_items (id, establishment_id, category_id, name, description, price, cost_price, emoji, is_available, is_drink, sort_order) VALUES
  -- Le Privilège - Bières
  ('mi-001', 'est-001', 'cat-b01', 'Castel', 'Bière blonde locale 65cl', 1500, 500, '🍺', true, true, 1),
  ('mi-002', 'est-001', 'cat-b01', 'Régab', 'La fierté du Gabon 65cl', 1000, 400, '🍺', true, true, 2),
  ('mi-003', 'est-001', 'cat-b01', 'Heineken', 'Premium lager 33cl', 2000, 800, '🍺', true, true, 3),
  ('mi-005', 'est-001', 'cat-b01', 'Guinness', 'Stout irlandaise 33cl', 2500, 1000, '🍺', true, true, 5),
  -- Le Privilège - Cocktails
  ('mi-007', 'est-001', 'cat-b02', 'Mojito', 'Rhum, menthe, citron vert, sucre', 4000, 1200, '🍹', true, true, 1),
  ('mi-008', 'est-001', 'cat-b02', 'Piña Colada', 'Rhum, coco, ananas', 4500, 1400, '🍹', true, true, 2),
  ('mi-011', 'est-001', 'cat-b02', 'Cocktail Passion', 'Rhum, fruit de la passion, citron', 5000, 1600, '🍹', true, true, 5),
  -- Le Privilège - Spiritueux
  ('mi-012', 'est-001', 'cat-b03', 'Johnnie Walker Red', 'Whisky écossais — verre', 5000, 1500, '🥃', true, true, 1),
  ('mi-013', 'est-001', 'cat-b03', 'Hennessy VS', 'Cognac — verre', 7000, 2500, '🥃', true, true, 2),
  -- Le Privilège - Softs
  ('mi-015', 'est-001', 'cat-b04', 'Coca-Cola', '33cl', 800, 300, '🥤', true, true, 1),
  ('mi-016', 'est-001', 'cat-b04', 'Red Bull', 'Boisson énergisante 25cl', 3000, 1200, '🥤', true, true, 2),
  ('mi-017', 'est-001', 'cat-b04', 'Eau minérale', '50cl', 500, 150, '💧', true, true, 3),
  -- Le Privilège - Tapas
  ('mi-019', 'est-001', 'cat-b05', 'Brochettes bœuf', '3 pièces, sauce piment', 3000, 1200, '🍢', true, false, 1),
  ('mi-020', 'est-001', 'cat-b05', 'Ailes de poulet', '6 pièces, sauce BBQ', 3500, 1400, '🍗', true, false, 2),
  -- Chez Mama Rose
  ('mi-032', 'est-002', 'cat-r02', 'Poulet braisé', 'Poulet entier braisé, plantain, piment', 5000, 2000, '🍗', true, false, 1),
  ('mi-033', 'est-002', 'cat-r02', 'Poisson braisé', 'Bar entier braisé, manioc', 6000, 2500, '🐟', true, false, 2),
  ('mi-034', 'est-002', 'cat-r02', 'Ndolè', 'Feuilles amères, crevettes, plantain', 4500, 1800, '🥬', true, false, 3),
  ('mi-036', 'est-002', 'cat-r02', 'Nyembwé poulet', 'Poulet sauce graine de palme', 5500, 2200, '🍲', true, false, 5),
  ('mi-038', 'est-002', 'cat-r03', 'Brochettes mixtes', 'Bœuf et poulet, 6 pièces', 4000, 1600, '🔥', true, false, 1),
  ('mi-042', 'est-002', 'cat-r05', 'Jus de gingembre', 'Fait maison, 33cl', 1000, 300, '🧃', true, true, 1),
  ('mi-043', 'est-002', 'cat-r05', 'Bissap', 'Jus d''hibiscus maison', 1000, 250, '🧃', true, true, 2),
  -- Club 241
  ('mi-050', 'est-003', 'cat-c01', 'Hennessy VS', 'Bouteille 70cl', 75000, 35000, '🥃', true, true, 1),
  ('mi-051', 'est-003', 'cat-c01', 'Moët & Chandon', 'Champagne 75cl', 120000, 55000, '🍾', true, true, 2),
  ('mi-052', 'est-003', 'cat-c01', 'Johnnie Walker Black', 'Bouteille 70cl', 55000, 25000, '🥃', true, true, 3),
  ('mi-054', 'est-003', 'cat-c01', 'Dom Pérignon', 'Champagne 75cl', 350000, 180000, '🍾', true, true, 5),
  ('mi-055', 'est-003', 'cat-c02', 'Long Island', 'Le classique des clubs', 6000, 2000, '🍹', true, true, 1),
  ('mi-059', 'est-003', 'cat-c04', 'Chicha classique', 'Pomme, raisin ou menthe', 15000, 5000, '💨', true, false, 1);

-- ========== EVENTS ==========
INSERT INTO events (id, establishment_id, name, description, date, end_date, price_normal, price_vip, price_vvip, max_tickets, tickets_sold, is_active) VALUES
  ('evt-001', 'est-003', 'Soirée Afrobeats', 'Les meilleurs hits afrobeats avec DJ Maleek et DJ Black', '2026-03-28 23:00:00', '2026-03-29 05:00:00', 5000, 15000, 30000, 300, 180, true),
  ('evt-002', 'est-003', 'Ladies Night', 'Entrée gratuite pour les femmes, cocktails à -50%', '2026-04-03 22:00:00', '2026-04-04 04:00:00', 3000, 10000, 0, 200, 85, true),
  ('evt-003', 'est-003', 'Concert Live: Mink''s', 'Le roi de l''afropop gabonais en concert exclusif', '2026-04-11 21:00:00', '2026-04-12 04:00:00', 10000, 25000, 50000, 500, 450, true);

-- ========== VIP AREAS ==========
INSERT INTO vip_areas (id, establishment_id, name, capacity, min_spend, status) VALUES
  ('vip-001', 'est-003', 'Carré Platine', 8, 100000, 'occupied'),
  ('vip-002', 'est-003', 'Carré Diamant', 12, 200000, 'reserved'),
  ('vip-003', 'est-003', 'Carré Gold', 6, 75000, 'available'),
  ('vip-004', 'est-003', 'Carré Prestige', 10, 150000, 'available'),
  ('vip-005', 'est-003', 'Carré Royal', 15, 300000, 'reserved');

-- ========== DJ SLOTS ==========
INSERT INTO dj_slots (establishment_id, dj_name, genre, start_time, end_time) VALUES
  ('est-003', 'DJ Maleek', 'Afrobeats / Amapiano', '22:00', '00:00'),
  ('est-003', 'DJ Black', 'Hip-Hop / Trap', '00:00', '02:00'),
  ('est-003', 'DJ Sanza', 'Ndombolo / Coupé-décalé', '02:00', '04:00');

-- ========== VENUE TABLES ==========
INSERT INTO venue_tables (establishment_id, number, capacity, status, position_x, position_y, is_vip) VALUES
  -- Le Privilège (15 tables)
  ('est-001', 1, 4, 'occupied', 10, 10, false),
  ('est-001', 2, 2, 'free', 10, 30, false),
  ('est-001', 3, 6, 'occupied', 10, 50, false),
  ('est-001', 4, 4, 'free', 30, 10, false),
  ('est-001', 5, 4, 'reserved', 30, 30, false),
  ('est-001', 6, 2, 'free', 30, 50, false),
  ('est-001', 7, 8, 'occupied', 50, 10, true),
  ('est-001', 8, 4, 'free', 50, 30, false),
  ('est-001', 9, 6, 'occupied', 50, 50, false),
  ('est-001', 10, 2, 'cleaning', 70, 10, false),
  -- Chez Mama Rose (10 tables)
  ('est-002', 1, 4, 'occupied', 10, 10, false),
  ('est-002', 2, 6, 'occupied', 10, 30, false),
  ('est-002', 3, 2, 'free', 30, 10, false),
  ('est-002', 4, 4, 'occupied', 30, 30, false),
  ('est-002', 5, 8, 'reserved', 50, 10, false),
  ('est-002', 6, 4, 'free', 50, 30, false);

-- ========== REVIEWS ==========
INSERT INTO reviews (establishment_id, rating, comment, created_at) VALUES
  ('est-001', 5, 'Meilleur lounge de Libreville, les cocktails sont incroyables !', '2026-03-15'),
  ('est-001', 4, 'Ambiance top, service un peu lent en soirée', '2026-03-10'),
  ('est-002', 5, 'Le meilleur poulet braisé de la ville, sans hésitation', '2026-03-18'),
  ('est-002', 4, 'Cuisine authentique, portions généreuses. Je recommande le Ndolè', '2026-03-12'),
  ('est-003', 5, 'Les soirées au Club 241 sont les meilleures ! DJ Maleek assure', '2026-03-20'),
  ('est-003', 4, 'Bonne ambiance mais prix VIP un peu élevés', '2026-03-08');

-- ========== HAPPY HOURS ==========
INSERT INTO happy_hours (establishment_id, day_of_week, start_time, end_time, discount_percent, applies_to, is_active) VALUES
  ('est-001', 1, '17:00', '19:00', 30, '{"Bières", "Cocktails", "Tapas"}', true),
  ('est-001', 2, '17:00', '19:00', 30, '{"Bières", "Cocktails", "Tapas"}', true),
  ('est-001', 3, '17:00', '19:00', 30, '{"Bières", "Cocktails", "Tapas"}', true),
  ('est-001', 4, '17:00', '19:00', 30, '{"Bières", "Cocktails", "Tapas"}', true),
  ('est-001', 5, '17:00', '19:00', 30, '{"Bières", "Cocktails", "Tapas"}', true);
