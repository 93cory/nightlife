export const DEMO_ACCOUNTS = {
  client: {
    id: "demo-client-001",
    email: "client@nightlife.demo",
    password: "demo2026",
    profile: {
      full_name: "Jean-Baptiste Moussavou",
      phone: "+241 74 00 00 01",
      role: "client" as const,
      loyalty_points: 2450,
      loyalty_tier: "gold" as const,
      total_spent: 485000,
    },
  },
  manager: {
    id: "demo-staff-001",
    email: "manager@nightlife.demo",
    password: "staff2026",
    profile: {
      full_name: "Alain Obiang",
      phone: "+241 77 00 00 01",
      role: "staff" as const,
    },
  },
  barman: {
    id: "demo-staff-002",
    email: "barman@nightlife.demo",
    password: "staff2026",
    profile: {
      full_name: "Patrick Mba",
      phone: "+241 77 00 00 02",
      role: "staff" as const,
    },
  },
  admin: {
    id: "demo-admin-001",
    email: "admin@nightlife.demo",
    password: "admin2026",
    profile: {
      full_name: "Admin NightLife",
      phone: "+241 74 00 00 00",
      role: "superadmin" as const,
    },
  },
};

export type DemoAccountType = keyof typeof DEMO_ACCOUNTS;
