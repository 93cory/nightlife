"use client";

import { useState } from "react";
import { Sparkles, Copy, Check, Instagram, Facebook, Music2, RefreshCw, Megaphone } from "lucide-react";

type Platform = "instagram" | "facebook" | "tiktok";
type ContentType = "promo" | "event" | "menu" | "ambiance" | "happy-hour";

const contentTypes: { key: ContentType; label: string; emoji: string }[] = [
  { key: "promo", label: "Promotion", emoji: "🔥" },
  { key: "event", label: "Événement", emoji: "🎉" },
  { key: "menu", label: "Nouveau plat/cocktail", emoji: "🍹" },
  { key: "ambiance", label: "Ambiance", emoji: "✨" },
  { key: "happy-hour", label: "Happy Hour", emoji: "🕐" },
];

const platforms: { key: Platform; label: string; icon: React.ElementType }[] = [
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "tiktok", label: "TikTok", icon: Music2 },
];

const demoGenerations: Record<string, Record<Platform, string>> = {
  promo: {
    instagram: "🔥 PROMO DU WEEKEND 🔥\n\nCe vendredi et samedi, profitez de -30% sur tous nos cocktails signatures ! 🍹\n\nMojito, Passion, Piña Colada... à partir de 2 800F seulement !\n\n📍 Le Privilège Lounge\n⏰ 17h - 22h\n\n#Libreville #Nightlife #HappyHour #Cocktails #Gabon #PromoWeekend #LePrivilege",
    facebook: "🎊 OFFRE SPÉCIALE CE WEEKEND !\n\nLe Privilège Lounge vous gâte ce vendredi et samedi avec -30% sur TOUS les cocktails signatures !\n\n🍹 Mojito → 2 800F au lieu de 4 000F\n🍹 Cocktail Passion → 3 500F au lieu de 5 000F\n🍹 Piña Colada → 3 150F au lieu de 4 500F\n\nRéservez votre table dès maintenant !\n📞 +241 74 12 34 56\n📍 Boulevard de l'Indépendance, Quartier Louis\n\n#Libreville #Promo #Cocktails #Weekend",
    tiktok: "POV: Tu découvres que Le Privilège fait -30% sur les cocktails ce weekend 😱🍹\n\nMojito à 2 800F... on y va ? 👀\n\n#Libreville #Nightlife #Gabon #Cocktails #Promo #LePrivilege #WeekendVibes",
  },
  event: {
    instagram: "🎵 SOIRÉE AFROBEATS 🎵\n\nSamedi 28 Mars — Club 241\n\n🎧 DJ Maleek x DJ Black\n🔥 Les meilleurs hits Afrobeats & Amapiano\n🍾 Bouteilles VIP dès 55 000F\n\nTickets :\n🎫 Normal : 5 000F\n⭐ VIP : 15 000F\n👑 VVIP : 30 000F\n\n⚡ Places limitées — Réservez maintenant !\n\n#Club241 #Afrobeats #Libreville #SoiréeGabon #Amapiano #DJMaleek",
    facebook: "🔊 SAVE THE DATE 🔊\n\n🗓️ Samedi 28 Mars 2026\n📍 Club 241 — Libreville\n\nSOIRÉE AFROBEATS avec DJ Maleek & DJ Black !\n\nLes meilleurs sons Afrobeats, Amapiano et Ndombolo dans la plus grande boîte de Libreville.\n\n🎫 Billetterie en ligne :\n• Normal : 5 000 FCFA\n• VIP : 15 000 FCFA (accès zone VIP + 1 boisson)\n• VVIP : 30 000 FCFA (carré privé + bouteille)\n\n📞 Réservation carrés VIP : +241 66 55 44 33\n\n⚡ 180/300 tickets déjà vendus — Ne tardez pas !",
    tiktok: "SAMEDI SOIR AU CLUB 241 🔥🎵\n\nDJ Maleek va mettre le feu avec du Afrobeats & Amapiano 🇬🇦\n\nQui vient ? Tag ton crew ! 👇\n\n#Club241 #Libreville #Afrobeats #Gabon #Nightclub #SoiréeLibreville",
  },
  menu: {
    instagram: "🍹 NOUVEAU COCKTAIL 🍹\n\nDécouvrez notre dernière création : le \"Passion Gabonaise\" !\n\n🥭 Fruit de la passion frais\n🍋 Citron vert\n🥃 Rhum premium\n🌿 Menthe du jardin\n\nUn cocktail 100% local, 100% saveur ! 🇬🇦\n\n5 000F | Disponible dès ce soir\n\n📍 Le Privilège Lounge\n\n#Cocktail #Libreville #MadeInGabon #Mixologie #LePrivilege",
    facebook: "🆕 NOUVELLE CRÉATION — \"Passion Gabonaise\" 🇬🇦\n\nNotre barman Patrick vous a concocté un cocktail inédit :\n\n• Fruit de la passion frais du marché\n• Citron vert pressé\n• Rhum premium sélectionné\n• Menthe fraîche\n\nUn voyage tropical dans votre verre ! 🌴\n\n💰 5 000 FCFA\n📍 Le Privilège Lounge — dès ce soir\n\nVenez le goûter et dites-nous ce que vous en pensez ! 🍹",
    tiktok: "Notre barman Patrick a créé un NOUVEAU cocktail 🤯🍹\n\n\"Passion Gabonaise\" — fruit de la passion + rhum + citron vert + menthe 🌿\n\nC'est TROP bon 😩 5 000F au Privilège Lounge\n\n#Cocktail #Libreville #Gabon #Mixologie #FoodTok",
  },
  ambiance: {
    instagram: "✨ Vendredi soir au Privilège ✨\n\nL'ambiance monte doucement... 🎶\n\nLumières tamisées, cocktails qui coulent, rires entre amis.\n\nC'est ça, la vie nocturne à Libreville. 🌙\n\n📍 Le Privilège Lounge\nOuvert ce soir jusqu'à 05h\n\n#Friday #Libreville #NightOut #Ambiance #Gabon #VendrediSoir",
    facebook: "Rien ne vaut un vendredi soir au Privilège... ✨\n\nCocktails, bonne musique, bonne compagnie. L'endroit parfait pour décompresser après une longue semaine.\n\nOn vous attend ce soir ! 🍸\n\n📍 Boulevard de l'Indépendance\n⏰ 17h - 05h\n📞 +241 74 12 34 56",
    tiktok: "Vendredi soir au Privilège Lounge 🌙✨\n\nL'ambiance est juste parfaite 🔥\n\nQuand tu trouves TON endroit à Libreville... 😌\n\n#Libreville #Friday #Nightlife #Gabon #Ambiance #Lounge",
  },
  "happy-hour": {
    instagram: "🕐 HAPPY HOUR 🕐\n\nTous les jours de 17h à 19h !\n\n🍺 Bières : -30%\n🍹 Cocktails : -30%\n🍢 Tapas : -30%\n\nL'after-work parfait existe, il est au Privilège ! 😎\n\n📍 Le Privilège Lounge\n\n#HappyHour #AfterWork #Libreville #Promo #Cocktails #Bière",
    facebook: "☀️ HAPPY HOUR — Tous les jours de 17h à 19h !\n\n-30% sur :\n🍺 Toutes les bières (Castel à 1 050F, Heineken à 1 400F)\n🍹 Tous les cocktails classiques (Mojito à 2 800F !)\n🍢 Tous les tapas (Brochettes à 2 100F)\n\nL'excuse parfaite pour un after-work entre collègues 😉\n\n📍 Le Privilège Lounge\n📞 +241 74 12 34 56",
    tiktok: "HAPPY HOUR au Privilège de 17h à 19h 🍻\n\n-30% sur TOUT 🤑\n\nMojito à 2 800F... Heineken à 1 400F...\n\nOn se retrouve après le boulot ? 😎\n\n#HappyHour #Libreville #AfterWork #Gabon #Promo",
  },
};

export default function ContenuIAPage() {
  const [contentType, setContentType] = useState<ContentType>("promo");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const content = demoGenerations[contentType]?.[platform] || "";

  function handleGenerate() {
    setLoading(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerated(true);
      setLoading(false);
    }, 1500);
  }

  function handleCopy() {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Megaphone size={24} className="text-gold" /> Générateur de contenu IA
        </h1>
        <p className="text-sm text-text-muted">Créez des posts pour vos réseaux sociaux en 1 clic</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Config */}
        <div className="space-y-6">
          {/* Content type */}
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-3">Type de contenu</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {contentTypes.map((t) => (
                <button
                  key={t.key}
                  onClick={() => { setContentType(t.key); setGenerated(false); }}
                  className={`p-3 rounded-xl text-sm font-medium text-left transition-all ${
                    contentType === t.key ? "bg-gold/20 text-gold border border-gold/30" : "bg-surface border border-border text-text-muted hover:text-foreground"
                  }`}
                >
                  <span className="text-lg">{t.emoji}</span>
                  <p className="mt-1">{t.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div className="glass rounded-xl p-5">
            <h3 className="font-semibold mb-3">Plateforme</h3>
            <div className="flex gap-2">
              {platforms.map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.key}
                    onClick={() => { setPlatform(p.key); setGenerated(false); }}
                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-medium transition-all ${
                      platform === p.key ? "bg-gold/20 text-gold border border-gold/30" : "bg-surface border border-border text-text-muted hover:text-foreground"
                    }`}
                  >
                    <Icon size={18} /> {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3.5 bg-gradient-gold text-black font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <><RefreshCw size={18} className="animate-spin" /> Génération en cours...</>
            ) : (
              <><Sparkles size={18} /> Générer le contenu</>
            )}
          </button>
        </div>

        {/* Output */}
        <div className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Résultat</h3>
            {generated && (
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  copied ? "bg-success/20 text-success" : "bg-surface-light text-text-muted hover:text-gold"
                }`}
              >
                {copied ? <><Check size={14} /> Copié !</> : <><Copy size={14} /> Copier</>}
              </button>
            )}
          </div>

          {generated ? (
            <div className="bg-surface-light rounded-xl p-4 min-h-[300px]">
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{content}</p>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <Sparkles size={32} className="mx-auto mb-3 text-gold animate-pulse" />
                <p className="text-sm text-text-muted">L&apos;IA génère votre contenu...</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <Megaphone size={40} className="mx-auto mb-3 text-text-dim" />
                <p className="text-sm text-text-muted">Sélectionnez un type de contenu et cliquez sur Générer</p>
              </div>
            </div>
          )}

          {generated && (
            <p className="text-[10px] text-text-dim mt-3 text-center">
              Généré par NightLife IA — Personnalisez avant de publier
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
