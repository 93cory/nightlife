"use client";

import { useState } from "react";
import { Building2, Clock, MapPin, Phone, Globe, Palette, Bell, Shield, Save, Check } from "lucide-react";

export default function ParametresPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    name: "Le Privilège Lounge",
    type: "bar",
    description: "Le bar lounge le plus exclusif de Libreville. Cocktails signatures, ambiance feutrée et musique live.",
    address: "Boulevard de l'Indépendance, Quartier Louis, Libreville",
    phone: "+241 74 12 34 56",
    whatsapp: "+241 74 12 34 56",
    currency: "FCFA",
    timezone: "Africa/Libreville",
    language: "fr",
    maxCapacity: "120",
    tableCount: "15",
    openingTime: "17:00",
    closingTime: "02:00",
    primaryColor: "#d4a843",
    notifyNewOrder: true,
    notifyLowStock: true,
    notifyReservation: true,
    requireAuth: false,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Paramètres</h1>
          <p className="text-sm text-text-muted">Configuration de l&apos;établissement</p>
        </div>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
            saved ? "bg-success/20 text-success" : "bg-gradient-gold text-black hover:opacity-90"
          }`}
        >
          {saved ? <><Check size={16} /> Sauvegardé</> : <><Save size={16} /> Sauvegarder</>}
        </button>
      </div>

      {/* Informations */}
      <div className="glass rounded-xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><Building2 size={18} className="text-gold" /> Informations générales</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-text-muted mb-1">Nom de l&apos;établissement</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50"
            />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1">Type</label>
            <select
              value={settings.type}
              onChange={(e) => setSettings({ ...settings, type: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50"
            >
              <option value="bar">Bar / Lounge</option>
              <option value="restaurant">Restaurant</option>
              <option value="snack">Snack-bar</option>
              <option value="nightclub">Boîte de nuit</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1">Description</label>
          <textarea
            value={settings.description}
            onChange={(e) => setSettings({ ...settings, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm resize-none focus:outline-none focus:border-gold/50"
          />
        </div>
      </div>

      {/* Contact */}
      <div className="glass rounded-xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><Phone size={18} className="text-gold" /> Contact & Localisation</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-text-muted mb-1">Téléphone</label>
            <input type="tel" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50" />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1">WhatsApp</label>
            <input type="tel" value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50" />
          </div>
        </div>
        <div>
          <label className="block text-sm text-text-muted mb-1">Adresse</label>
          <input type="text" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50" />
        </div>
      </div>

      {/* Horaires & Capacité */}
      <div className="glass rounded-xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><Clock size={18} className="text-gold" /> Horaires & Capacité</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-text-muted mb-1">Ouverture</label>
            <input type="time" value={settings.openingTime} onChange={(e) => setSettings({ ...settings, openingTime: e.target.value })} className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50" />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1">Fermeture</label>
            <input type="time" value={settings.closingTime} onChange={(e) => setSettings({ ...settings, closingTime: e.target.value })} className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50" />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1">Capacité max</label>
            <input type="number" value={settings.maxCapacity} onChange={(e) => setSettings({ ...settings, maxCapacity: e.target.value })} className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50" />
          </div>
          <div>
            <label className="block text-sm text-text-muted mb-1">Nombre de tables</label>
            <input type="number" value={settings.tableCount} onChange={(e) => setSettings({ ...settings, tableCount: e.target.value })} className="w-full px-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-gold/50" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass rounded-xl p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2"><Bell size={18} className="text-gold" /> Notifications</h2>
        <div className="space-y-3">
          {[
            { key: "notifyNewOrder", label: "Nouvelle commande", desc: "Alerte sonore + push pour chaque commande" },
            { key: "notifyLowStock", label: "Stock bas", desc: "Notification quand un produit atteint le seuil minimum" },
            { key: "notifyReservation", label: "Nouvelle réservation", desc: "Notification pour chaque réservation en ligne" },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between p-3 bg-surface-light/50 rounded-xl">
              <div>
                <p className="text-sm font-medium">{n.label}</p>
                <p className="text-xs text-text-dim">{n.desc}</p>
              </div>
              <button
                onClick={() => setSettings({ ...settings, [n.key]: !settings[n.key as keyof typeof settings] })}
                className={`w-12 h-7 rounded-full transition-all ${
                  settings[n.key as keyof typeof settings] ? "bg-gold" : "bg-surface-lighter"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  settings[n.key as keyof typeof settings] ? "translate-x-6" : "translate-x-1"
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
