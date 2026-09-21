import type { Language } from "./translations";

/**
 * Localized URLs.
 *
 * Portuguese lives at the root (`/sobre`) and English under a prefix
 * (`/en/about`), so each language has its own indexable address and can carry
 * its own <title>, description and hreflang pair. The language is read from the
 * URL — never from storage — which is what makes the two versions crawlable.
 */

export type PageId =
  | "home"
  | "about"
  | "studio"
  | "sessions"
  | "sessionDetail"
  | "packages"
  | "gallery"
  | "prepare"
  | "journal"
  | "journalPost"
  | "faq"
  | "contact"
  | "privacy";

interface PageDef {
  pt: string;
  en: string;
  /** Path carries a `:slug` segment. */
  dynamic?: boolean;
}

export const PAGES: Record<PageId, PageDef> = {
  home: { pt: "/", en: "/en" },
  about: { pt: "/sobre", en: "/en/about" },
  studio: { pt: "/estudio", en: "/en/studio" },
  sessions: { pt: "/sessoes", en: "/en/sessions" },
  sessionDetail: { pt: "/sessoes/:slug", en: "/en/sessions/:slug", dynamic: true },
  packages: { pt: "/pacotes", en: "/en/packages" },
  gallery: { pt: "/galeria", en: "/en/gallery" },
  prepare: { pt: "/preparar-a-sessao", en: "/en/prepare-your-session" },
  journal: { pt: "/diario", en: "/en/journal" },
  journalPost: { pt: "/diario/:slug", en: "/en/journal/:slug", dynamic: true },
  faq: { pt: "/faq", en: "/en/faq" },
  contact: { pt: "/contacto", en: "/en/contact" },
  privacy: { pt: "/privacidade", en: "/en/privacy" },
};

export const PAGE_IDS = Object.keys(PAGES) as PageId[];

/** Static pages, in the order they belong in a sitemap. */
export const STATIC_PAGE_IDS = PAGE_IDS.filter((id) => !PAGES[id].dynamic);

/** Builds the path for a page in a language, substituting `:slug`. */
export function pathFor(page: PageId, language: Language, slug?: string): string {
  const template = PAGES[page][language];
  if (!PAGES[page].dynamic) return template;
  return template.replace(":slug", slug ?? "");
}

export interface PathMatch {
  page: PageId;
  language: Language;
  slug?: string;
}

/** Reverse of `pathFor` — which page and language a location belongs to. */
export function matchPath(location: string): PathMatch | null {
  const path = normalize(location);

  for (const page of PAGE_IDS) {
    for (const language of ["pt", "en"] as Language[]) {
      const template = PAGES[page][language];
      if (PAGES[page].dynamic) {
        const prefix = template.replace(":slug", "");
        if (path.startsWith(prefix) && path.length > prefix.length) {
          const slug = path.slice(prefix.length);
          if (!slug.includes("/")) return { page, language, slug };
        }
      } else if (path === template) {
        return { page, language };
      }
    }
  }
  return null;
}

/** The language a location renders in. Anything unrecognised falls back to PT. */
export function languageFromPath(location: string): Language {
  const path = normalize(location);
  return path === "/en" || path.startsWith("/en/") ? "en" : "pt";
}

/** True when the location is one of the localized public pages. */
export function isLocalizedPath(location: string): boolean {
  return matchPath(location) !== null;
}

/**
 * The same page in the other language, including a translated session slug.
 * Returns null when the current location has no counterpart (e.g. /admin).
 */
export function translatePath(
  location: string,
  target: Language,
  translateSlug?: (slug: string, from: Language, to: Language) => string,
): string | null {
  const match = matchPath(location);
  if (!match) return null;
  if (match.language === target) return normalize(location);

  const slug =
    match.slug && translateSlug ? translateSlug(match.slug, match.language, target) : match.slug;
  return pathFor(match.page, target, slug);
}

/** Strips the trailing slash so `/sobre/` and `/sobre` match the same page. */
function normalize(location: string): string {
  const path = location.split("?")[0]?.split("#")[0] ?? "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}
