import { createContext, use, useCallback, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { type Language, translations, type TranslationKey } from "../lib/translations";
import { languageFromPath, pathFor, translatePath, type PageId } from "../lib/routes";
import { translateSessionSlug } from "../lib/site";
import { useContentOverrides } from "../queries/content";

interface LanguageContextValue {
  language: Language;
  /** Navigates to the same page in the given language. */
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey | string) => string;
  /** Builds an in-app path in the active language: `href("about")` → `/sobre`. */
  href: (page: PageId, slug?: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();
  // The URL is the single source of truth: /en/... is English, everything else
  // Portuguese. That is what makes both versions crawlable and shareable.
  const language = languageFromPath(location);
  const overrides = useContentOverrides();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback(
    (next: Language) => {
      if (next === language) return;
      const target = translatePath(location, next, translateSessionSlug);
      // Pages outside the localized set (e.g. /admin) have no counterpart, so
      // fall back to that language's home rather than a dead URL.
      navigate(target ?? (next === "en" ? "/en" : "/"));
    },
    [language, location, navigate],
  );

  const overrideMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const row of overrides.data ?? []) {
      const value = language === "pt" ? row.valuePt : row.valueEn;
      if (value && value.trim().length > 0) map.set(row.key, value);
    }
    return map;
  }, [overrides.data, language]);

  const t = useCallback(
    (key: TranslationKey | string) => {
      const override = overrideMap.get(key);
      if (override) return override;
      const dictionary = translations[language] as Record<string, string>;
      const fallback = translations.pt as Record<string, string>;
      return dictionary[key] ?? fallback[key] ?? key;
    },
    [overrideMap, language],
  );

  const href = useCallback(
    (page: PageId, slug?: string) => pathFor(page, language, slug),
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "pt" ? "en" : "pt"),
      t,
      href,
    }),
    [language, setLanguage, t, href],
  );

  return <LanguageContext value={value}>{children}</LanguageContext>;
}

export function useLanguage() {
  const context = use(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
