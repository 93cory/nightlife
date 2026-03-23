"use client";

import Link from "next/link";
import { Check, ArrowLeft, MessageCircle, Zap, Building2, Crown, Rocket } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    price: "Gratuit",
    period: "30 jours",
    description: "Parfait pour tester NightLife",
    features: [
      "1 établissement",
      "Caisse POS basique",
      "Menu digital",
      "5 tables max",
      "Support email",
    ],
    cta: "Essayer gratuitement",
    href: "/login",
    popular: false,
    gradient: "from-surface-light to-surface",
  },
  {
    name: "Essentiel",
    icon: Building2,
    price: "35 000",
    period: "FCFA/mois",
    description: "Pour les établissements en croissance",
    features: [
      "1 établissement",
      "Caisse POS complète",
      "Stock en temps réel",
      "Menu digital illimité",
      "Tables illimitées",
      "Rapports basiques",
      "Support prioritaire",
      "Programme fidélité",
    ],
    cta: "Choisir Essentiel",
    href: "/login",
    popular: false,
    gradient: "from-blue-900/20 to-surface",
  },
  {
    name: "Pro",
    icon: Crown,
    price: "55 000",
    period: "FCFA/mois",
    description: "Pour les professionnels exigeants",
    features: [
      "Multi-établissements",
      "Tout Essentiel +",
      "Assistant IA intégré",
      "Rapports avancés & export",
      "Billetterie événements",
      "Programme fidélité avancé",
      "Réservation en ligne",
      "Générateur contenu IA",
      "API accès",
    ],
    cta: "Choisir Pro",
    href: "/login",
    popular: true,
    gradient: "from-gold/20 to-amber-900/10",
  },
  {
    name: "Enterprise",
    icon: Rocket,
    price: "Sur devis",
    period: "",
    description: "Pour les chaînes et groupes",
    features: [
      "Sites illimités",
      "Tout Pro +",
      "Support dédié 24/7",
      "Formation sur site",
      "Intégration custom",
      "SLA garanti 99.9%",
      "Facturation sur mesure",
      "Account manager dédié",
    ],
    cta: "Nous contacter",
    href: "https://wa.me/24174000000",
    popular: false,
    gradient: "from-purple-900/20 to-surface",
  },
];

const faqs = [
  {
    q: "Puis-je changer de plan à tout moment ?",
    a: "Oui, vous pouvez upgrader ou downgrader à tout moment. La différence est proratisée.",
  },
  {
    q: "Comment fonctionne le paiement ?",
    a: "Paiement mensuel via Airtel Money, Moov Money ou virement bancaire. Pas d'engagement.",
  },
  {
    q: "Y a-t-il des frais cachés ?",
    a: "Non. Le prix affiché est tout compris. Pas de frais de setup, pas de commission sur vos ventes.",
  },
  {
    q: "Que se passe-t-il après les 30 jours gratuits ?",
    a: "Vous choisissez un plan payant ou votre compte passe en lecture seule. Aucune donnée n'est perdue.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-black text-gradient-gold">
            NightLife
          </Link>
          <Link href="/" className="text-sm text-text-muted hover:text-foreground flex items-center gap-1">
            <ArrowLeft size={14} /> Retour
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl sm:text-5xl font-black mb-4">
          Des tarifs <span className="text-gradient-gold">simples</span>
        </h1>
        <p className="text-text-muted max-w-lg mx-auto">
          Commencez gratuitement pendant 30 jours. Pas de carte bancaire requise.
          Évoluez selon vos besoins.
        </p>
      </div>

      {/* Plans */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 transition-all bg-gradient-to-b ${plan.gradient} ${
                  plan.popular
                    ? "border-2 border-gold/50 glow-gold scale-[1.02]"
                    : "border border-border"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-black text-xs font-bold px-4 py-1 rounded-full">
                    POPULAIRE
                  </span>
                )}

                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-2 rounded-lg ${plan.popular ? "bg-gold/20" : "bg-surface-light"}`}>
                    <Icon size={20} className={plan.popular ? "text-gold" : "text-text-muted"} />
                  </div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                </div>

                <div className="mb-2">
                  <span className="text-3xl font-black">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-text-muted ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-xs text-text-muted mb-6">{plan.description}</p>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check size={16} className="text-gold mt-0.5 shrink-0" />
                      <span className="text-text-muted">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-gold text-black hover:opacity-90"
                      : "border border-border text-foreground hover:border-gold/30 hover:text-gold"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-surface/50 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="glass rounded-xl p-5">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-3">Une question ?</h2>
        <p className="text-text-muted mb-6">Notre équipe est disponible pour vous accompagner</p>
        <a
          href="https://wa.me/24174000000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-success text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all"
        >
          <MessageCircle size={18} /> Discuter sur WhatsApp
        </a>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 text-center text-xs text-text-dim">
        © 2026 NightLife. Tous droits réservés. Fait avec ❤️ à Libreville, Gabon.
      </footer>
    </div>
  );
}
