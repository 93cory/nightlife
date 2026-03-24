"use client";

import { useI18nStore } from "@/lib/i18n/useTranslation";
import { Globe } from "lucide-react";

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useI18nStore();

  function toggle() {
    setLocale(locale === "fr" ? "en" : "fr");
  }

  if (compact) {
    return (
      <button
        onClick={toggle}
        className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium text-text-muted hover:text-gold hover:bg-gold/5 transition-all"
        title={locale === "fr" ? "Switch to English" : "Passer en Français"}
      >
        <Globe size={14} />
        {locale.toUpperCase()}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border text-sm text-text-muted hover:text-gold hover:border-gold/30 transition-all"
    >
      <Globe size={16} />
      {locale === "fr" ? "English" : "Français"}
    </button>
  );
}
