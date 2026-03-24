"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { translations, type Locale, type TranslationKey } from "./translations";

interface I18nState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      locale: "fr",
      setLocale: (locale: Locale) => set({ locale }),
    }),
    { name: "nl-i18n" }
  )
);

export function useTranslation() {
  const { locale, setLocale } = useI18nStore();

  function t(key: TranslationKey): string {
    return translations[locale][key] || translations.fr[key] || key;
  }

  return { t, locale, setLocale };
}
