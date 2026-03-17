import type { Metadata, Viewport } from "next";
import { DM_Sans, Bebas_Neue, Cormorant_Garamond } from "next/font/google";
import { AuthProvider } from "@/lib/hooks/useAuth";
import { ToastContainer } from "@/components/ui/Toast";
import PWAInstallBanner from "@/components/shared/PWAInstallBanner";
import ServiceWorkerRegistrar from "@/components/shared/ServiceWorkerRegistrar";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "NightLife Gabon | L'App des Sorties",
  description: "Commandez, gagnez des points, vivez la nuit gabonaise comme jamais. L'application de référence pour les bars, clubs et restaurants de Libreville.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NightLife",
  },
  keywords: ["nightlife", "gabon", "libreville", "bar", "club", "restaurant", "commande", "fidélité"],
};

export const viewport: Viewport = {
  themeColor: "#070709",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${dmSans.variable} ${bebasNeue.variable} ${cormorantGaramond.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <PWAInstallBanner />
          <div className="mx-auto max-w-md min-h-screen relative">
            {children}
          </div>
          <ToastContainer />
          <ServiceWorkerRegistrar />
        </AuthProvider>
      </body>
    </html>
  );
}
