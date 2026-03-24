"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Package, ChefHat, Bike, Check, Clock, MapPin, Phone, ArrowLeft } from "lucide-react";

const steps = [
  { key: "confirmed", label: "Confirmée", icon: Check, desc: "Votre commande a été reçue" },
  { key: "preparing", label: "En préparation", icon: ChefHat, desc: "Le chef prépare vos plats" },
  { key: "picked_up", label: "En livraison", icon: Bike, desc: "Le livreur est en route" },
  { key: "delivered", label: "Livrée", icon: Package, desc: "Bon appétit !" },
];

function SuiviContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "CMD-052";
  const [currentStep, setCurrentStep] = useState(1);

  // Simulate progression
  useEffect(() => {
    if (currentStep < 3) {
      const timer = setTimeout(() => setCurrentStep((s) => s + 1), 8000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const estimatedTime = currentStep === 1 ? "25-35 min" : currentStep === 2 ? "15-20 min" : currentStep === 3 ? "Arrivée imminente" : "Livrée !";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 pt-4 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="p-2 rounded-lg bg-surface border border-border text-text-muted">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Suivi de commande</h1>
            <p className="text-xs text-text-muted font-mono">{orderId}</p>
          </div>
        </div>

        {/* ETA */}
        <div className="glass rounded-xl p-5 text-center mb-6">
          <Clock size={24} className="mx-auto mb-2 text-gold" />
          <p className="text-2xl font-bold text-gold">{estimatedTime}</p>
          <p className="text-xs text-text-muted mt-1">Temps estimé</p>
        </div>

        {/* Progress steps */}
        <div className="glass rounded-xl p-6 mb-6">
          <div className="space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i <= currentStep;
              const isCurrent = i === currentStep;
              return (
                <div key={step.key} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive ? "bg-gold/20" : "bg-surface-light"
                    } ${isCurrent ? "ring-2 ring-gold/50 ring-offset-2 ring-offset-background" : ""}`}>
                      <Icon size={18} className={isActive ? "text-gold" : "text-text-dim"} />
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[40px] transition-all ${
                        i < currentStep ? "bg-gold" : "bg-surface-lighter"
                      }`} />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className={`font-semibold text-sm ${isActive ? "text-foreground" : "text-text-dim"}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-text-muted">{step.desc}</p>
                    {isCurrent && (
                      <div className="flex items-center gap-1 mt-1">
                        <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                        <span className="text-[10px] text-gold font-medium">En cours</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order details */}
        <div className="glass rounded-xl p-5 mb-6">
          <h3 className="font-semibold mb-3">Détails de la commande</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">1x Poulet braisé</span>
              <span>5 000 F</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">2x Bissap</span>
              <span>2 000 F</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">1x Banane flambée</span>
              <span>2 500 F</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-text-muted">Sous-total</span>
                <span>9 500 F</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Livraison</span>
                <span>1 500 F</span>
              </div>
              <div className="flex justify-between font-bold text-gold mt-1">
                <span>Total</span>
                <span>11 000 FCFA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="glass rounded-xl p-5 mb-6">
          <h3 className="font-semibold mb-3">Livraison</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-gold mt-0.5" />
              <div>
                <p className="text-text-muted">Adresse</p>
                <p>Quartier Glass, près de la pharmacie centrale</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bike size={16} className="text-gold mt-0.5" />
              <div>
                <p className="text-text-muted">Livreur</p>
                <p>Emmanuel — en scooter</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="flex gap-3">
          <a href="tel:+24177987654" className="flex-1 flex items-center justify-center gap-2 py-3 glass rounded-xl text-sm text-text-muted hover:text-gold transition-all">
            <Phone size={16} /> Appeler le restaurant
          </a>
          <a href="tel:+24174000010" className="flex-1 flex items-center justify-center gap-2 py-3 glass rounded-xl text-sm text-text-muted hover:text-gold transition-all">
            <Phone size={16} /> Appeler le livreur
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SuiviPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-text-muted">Chargement...</div>}>
      <SuiviContent />
    </Suspense>
  );
}
