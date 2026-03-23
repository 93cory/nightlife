"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Zap,
  Package,
  Heart,
  Smartphone,
  Bot,
  Download,
  ArrowRight,
  Check,
  MessageCircle,
  Wine,
  UtensilsCrossed,
  Music,
  BarChart3,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const establishmentTypes = [
  {
    emoji: "🍺",
    title: "Bars & Lounges",
    desc: "Caisse rapide, stock boissons, happy hours automatiques, pourboires intégrés",
    gradient: "from-amber-900/20 to-yellow-900/20",
  },
  {
    emoji: "🍽️",
    title: "Restaurants",
    desc: "Menu digital, tickets cuisine KDS, Click & Collect, livraison, réservations",
    gradient: "from-red-900/20 to-orange-900/20",
  },
  {
    emoji: "🎵",
    title: "Boîtes de nuit",
    desc: "Billetterie, carrés VIP, sécurité, DJ planning, compteur d'entrées",
    gradient: "from-purple-900/20 to-pink-900/20",
  },
  {
    emoji: "📊",
    title: "Multi-établissements",
    desc: "Un cockpit pour toute votre chaîne, rapports consolidés, gestion centralisée",
    gradient: "from-blue-900/20 to-cyan-900/20",
  },
];

const features = [
  { icon: Zap, title: "Caisse POS ultra-rapide", desc: "Encaissez en 2 clics, même en plein rush" },
  { icon: Package, title: "Stock en temps réel", desc: "Alertes automatiques, marge par produit" },
  { icon: Heart, title: "Programme fidélité", desc: "Points, tiers, carte membre digitale QR" },
  { icon: Smartphone, title: "Paiement mobile", desc: "Airtel Money, Moov Money via PVit" },
  { icon: Bot, title: "Assistant IA", desc: "\"Quel est mon CA ce soir ?\" — réponse instantanée" },
  { icon: Download, title: "PWA installable", desc: "Fonctionne comme une app native, même hors-ligne" },
];

const demoEstablishments = [
  { name: "Le Privilège Lounge", type: "Bar Lounge", slug: "le-privilege", gradient: "from-gold/30 to-amber-900/30", emoji: "🍸" },
  { name: "Chez Mama Rose", type: "Restaurant", slug: "chez-mama-rose", gradient: "from-red-800/30 to-orange-900/30", emoji: "🍽️" },
  { name: "Club 241", type: "Boîte de nuit", slug: "club-241", gradient: "from-purple-800/30 to-pink-900/30", emoji: "🎵" },
];

const plans = [
  {
    name: "Starter",
    price: "Gratuit",
    period: "30 jours",
    features: ["1 établissement", "Caisse POS", "Menu digital", "5 tables max", "Support email"],
    cta: "Essayer gratuitement",
    popular: false,
  },
  {
    name: "Essentiel",
    price: "35 000",
    period: "FCFA/mois",
    features: ["1 établissement", "Caisse + Stock", "Menu digital illimité", "Tables illimitées", "Rapports basiques", "Support prioritaire"],
    cta: "Choisir Essentiel",
    popular: false,
  },
  {
    name: "Pro",
    price: "55 000",
    period: "FCFA/mois",
    features: ["Multi-établissements", "Tout Essentiel +", "Assistant IA", "Rapports avancés", "Billetterie", "Programme fidélité", "API accès"],
    cta: "Choisir Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    period: "",
    features: ["Sites illimités", "Tout Pro +", "Support dédié 24/7", "Formation sur site", "Intégration custom", "SLA garanti"],
    cta: "Nous contacter",
    popular: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-bordeaux/8 rounded-full blur-[120px]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-6">
              <span className="text-gradient-gold">NightLife</span>
            </h1>
            <p className="text-xl sm:text-2xl text-text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
              La plateforme intelligente pour gérer votre{" "}
              <span className="text-foreground font-semibold">bar</span>,{" "}
              <span className="text-foreground font-semibold">restaurant</span> ou{" "}
              <span className="text-foreground font-semibold">boîte de nuit</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href="/login"
              className="bg-gradient-gold text-black font-semibold px-8 py-3.5 rounded-xl text-lg hover:opacity-90 transition-all active:scale-[0.97] shadow-lg shadow-gold/20"
            >
              Commencer gratuitement
            </Link>
            <a
              href="#demo"
              className="border border-gold/30 text-gold font-semibold px-8 py-3.5 rounded-xl text-lg hover:bg-gold/5 transition-all"
            >
              Voir la démo
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 text-sm text-text-muted"
          >
            {[
              { value: "500+", label: "établissements" },
              { value: "98%", label: "satisfaction" },
              { value: "24/7", label: "support" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-2xl font-bold text-foreground">{s.value}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Establishment Types */}
      <Section id="features" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Une plateforme, <span className="text-gradient-gold">tous les métiers</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Que vous gériez un bar, un restaurant ou une boîte de nuit, NightLife s&apos;adapte à votre activité
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {establishmentTypes.map((type) => (
              <div
                key={type.title}
                className={`glass rounded-2xl p-6 hover:glow-gold transition-all duration-300 group cursor-pointer bg-gradient-to-br ${type.gradient}`}
              >
                <div className="text-4xl mb-4">{type.emoji}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-gold transition-colors">{type.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Key Features */}
      <Section className="py-24 px-4 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Tout ce qu&apos;il vous faut pour <span className="text-gradient-gold">réussir</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="glass rounded-xl p-6 hover:border-gold/20 transition-all">
                  <div className="p-3 rounded-xl bg-gold/10 w-fit mb-4">
                    <Icon size={24} className="text-gold" />
                  </div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-text-muted">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Demo */}
      <Section id="demo" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Découvrez NightLife <span className="text-gradient-gold">en action</span>
            </h2>
            <p className="text-text-muted">Explorez nos 3 établissements de démonstration</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {demoEstablishments.map((e) => (
              <Link
                key={e.slug}
                href={`/bienvenue?e=${e.slug}`}
                className={`group rounded-2xl p-8 bg-gradient-to-br ${e.gradient} border border-white/5 hover:border-gold/30 transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="text-5xl mb-4">{e.emoji}</div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-gold transition-colors">{e.name}</h3>
                <span className="text-sm text-text-muted">{e.type}</span>
                <div className="mt-4 flex items-center gap-1 text-sm text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  Découvrir <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="py-24 px-4 bg-surface/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Des tarifs <span className="text-gradient-gold">adaptés</span> à votre activité
            </h2>
            <p className="text-text-muted">Commencez gratuitement, évoluez selon vos besoins</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 transition-all ${
                  plan.popular ? "glass border-gold/30 glow-gold scale-[1.02]" : "glass"
                }`}
              >
                {plan.popular && (
                  <span className="inline-block bg-gradient-gold text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
                    POPULAIRE
                  </span>
                )}
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <div className="mt-3 mb-6">
                  <span className="text-3xl font-black">{plan.price}</span>
                  {plan.period && <span className="text-sm text-text-muted ml-1">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-text-muted">
                      <Check size={16} className="text-gold mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-gold text-black hover:opacity-90"
                      : "border border-border text-foreground hover:border-gold/30 hover:text-gold"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Prêt à transformer votre établissement ?</h2>
          <p className="text-text-muted mb-8 max-w-lg mx-auto">
            Rejoignez les centaines d&apos;établissements qui font confiance à NightLife
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-gradient-gold text-black font-semibold px-8 py-3.5 rounded-xl text-lg hover:opacity-90 transition-all shadow-lg shadow-gold/20"
          >
            Commencer gratuitement <ArrowRight size={20} />
          </Link>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xl font-black text-gradient-gold">NightLife</span>
              <p className="text-xs text-text-dim mt-1">Fait avec ❤️ à Libreville, Gabon</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-text-muted">
              <a href="#features" className="hover:text-foreground transition-colors">Fonctionnalités</a>
              <a href="#pricing" className="hover:text-foreground transition-colors">Tarifs</a>
              <a href="#demo" className="hover:text-foreground transition-colors">Démo</a>
              <a href="https://wa.me/24174000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-success transition-colors">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-text-dim">
            © 2026 NightLife. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* WhatsApp floating */}
      <a
        href="https://wa.me/24174000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-success rounded-full flex items-center justify-center shadow-lg shadow-success/30 hover:scale-110 transition-transform"
      >
        <MessageCircle size={24} className="text-white" />
      </a>
    </div>
  );
}
