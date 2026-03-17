/**
 * Seed script for Firestore demo data
 *
 * Usage:
 * 1. Set Firebase credentials in .env.local
 * 2. Run: npx tsx scripts/seed.ts
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const VENUE_ID = "venue_001";

async function seedMenu() {
  const items = [
    { id: "whisky-jb", name: "Whisky JB", description: "Verre · 4cl · Avec ou sans glace", price: 4500, category: "boissons", emoji: "🥃", sortOrder: 1 },
    { id: "regab", name: "Régab Pression", description: "Bière locale · 50cl · Bien fraîche", price: 1000, category: "boissons", emoji: "🍺", sortOrder: 2 },
    { id: "heineken", name: "Heineken", description: "Bière importée · 33cl", price: 1500, category: "boissons", emoji: "🍺", sortOrder: 3 },
    { id: "castel", name: "Castel Beer", description: "Bière locale · 65cl", price: 800, category: "boissons", emoji: "🍺", sortOrder: 4 },
    { id: "moet", name: "Moët & Chandon", description: "Champagne · Bouteille 75cl", price: 45000, category: "bouteilles", emoji: "🍾", sortOrder: 5 },
    { id: "hennessy", name: "Hennessy VS", description: "Cognac · Bouteille 70cl", price: 35000, category: "bouteilles", emoji: "🥃", sortOrder: 6 },
    { id: "chivas", name: "Chivas Regal", description: "Whisky 12 ans · Bouteille 70cl", price: 40000, category: "bouteilles", emoji: "🥃", sortOrder: 7 },
    { id: "brochettes", name: "Brochettes mixtes", description: "Bœuf + poulet · Sauce piment", price: 2500, category: "food", emoji: "🍗", sortOrder: 8 },
    { id: "poisson", name: "Poisson braisé", description: "Tilapia entier · Attiéké ou frites", price: 5000, category: "food", emoji: "🐟", sortOrder: 9 },
    { id: "plantain", name: "Plantain frit", description: "Alloco · Sauce tomate pimentée", price: 1500, category: "food", emoji: "🍌", sortOrder: 10 },
    { id: "tropical", name: "Tropical Sunset", description: "Rhum, mangue, passion, citron", price: 3500, category: "cocktails", emoji: "🍹", sortOrder: 11 },
    { id: "mojito", name: "Mojito Africain", description: "Rhum, menthe, gingembre, citron vert", price: 4000, category: "cocktails", emoji: "🍸", sortOrder: 12 },
    { id: "virgin", name: "Virgin Colada", description: "Sans alcool · Coco, ananas, citron", price: 2000, category: "cocktails", emoji: "🥥", sortOrder: 13 },
    { id: "jus-orange", name: "Jus d'orange", description: "Pressé frais · Grand verre", price: 1000, category: "cocktails", emoji: "🍊", sortOrder: 14 },
  ];

  for (const item of items) {
    await setDoc(doc(db, "menuItems", item.id), {
      ...item,
      available: true,
      venueId: VENUE_ID,
    });
    console.log(`  ✓ Menu: ${item.name}`);
  }
}

async function seedEvents() {
  const events = [
    { id: "afrovibes", name: "AfroVibes Night", venue: "Luxury Lounge", date: Timestamp.fromDate(new Date("2026-03-20T22:00:00")), price: 5000, emoji: "🎵", gradient: ["#1a0a2e", "#3d1a5e"] },
    { id: "djmix", name: "DJ Mix Master Live", venue: "Le Privilege", date: Timestamp.fromDate(new Date("2026-03-21T23:00:00")), price: 3000, emoji: "🎧", gradient: ["#2e0a1a", "#5e1a3d"] },
    { id: "champagne", name: "Soirée Champagne VIP", venue: "Duplex Club", date: Timestamp.fromDate(new Date("2026-03-27T21:00:00")), price: 15000, emoji: "🍾", gradient: ["#1a1200", "#3d2e00"] },
    { id: "reggae", name: "Reggae Sunday", venue: "Le Jardin", date: Timestamp.fromDate(new Date("2026-03-22T18:00:00")), price: 0, emoji: "🌴", gradient: ["#0a2e1a", "#1a5e3d"] },
    { id: "ladies", name: "Ladies Night", venue: "Luxury Lounge", date: Timestamp.fromDate(new Date("2026-03-26T22:00:00")), price: 2000, emoji: "💃", gradient: ["#2e0a2e", "#5e1a5e"] },
  ];

  for (const event of events) {
    await setDoc(doc(db, "events", event.id), {
      ...event,
      venueId: VENUE_ID,
    });
    console.log(`  ✓ Event: ${event.name}`);
  }
}

async function seedVenue() {
  await setDoc(doc(db, "venues", VENUE_ID), {
    name: "Luxury Lounge",
    city: "Libreville",
    tables: Array.from({ length: 15 }, (_, i) => i + 1),
  });
  console.log("  ✓ Venue: Luxury Lounge");
}

async function main() {
  console.log("🌱 Seeding NightLife Gabon...\n");

  console.log("📍 Venue:");
  await seedVenue();

  console.log("\n🍽️  Menu:");
  await seedMenu();

  console.log("\n🎵 Events:");
  await seedEvents();

  console.log("\n✅ Seed terminé !");
  console.log("\n💡 N'oubliez pas de créer les comptes staff dans Firebase Auth :");
  console.log("   - alain.obiang@nightlife.ga (Manager)");
  console.log("   - eva.ndong@nightlife.ga (Serveuse)");
  console.log("   - kevin.ondo@nightlife.ga (Barman)");
  console.log("   Puis créez les docs dans la collection 'staff' avec les mêmes UIDs.");

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Erreur:", err);
  process.exit(1);
});
