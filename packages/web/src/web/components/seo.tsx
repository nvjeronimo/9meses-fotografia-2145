import { useLocation } from "wouter";
import { CONTACT, GOOGLE_REVIEWS, SITE_URL } from "../lib/site";
import { matchPath, translatePath } from "../lib/routes";
import { translateSessionSlug } from "../lib/site";
import { useLanguage } from "./language-provider";

/**
 * Per-page metadata. React 19 hoists <title>, <meta> and <link> rendered
 * anywhere in the tree into <head>, so each page can own its own SEO tags
 * without a helmet library.
 */
interface SeoProps {
  /** Translation key or literal for the page title (without the brand suffix). */
  title: string;
  description: string;
  /** Absolute or site-relative image for social cards. */
  image?: string;
  /** Overrides the canonical path — used by dynamic pages. */
  path?: string;
  /** JSON-LD object graph for this page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Keeps a page out of the index (e.g. thank-you or admin screens). */
  noindex?: boolean;
  /** Trail below the home page, e.g. Sessões › Newborn (BreadcrumbList). */
  crumbs?: { name: string; path: string }[];
}

const BRAND = "9 Meses Fotografia";

function absolute(url: string) {
  if (url.startsWith("http")) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export function Seo({ title, description, image, path, jsonLd, noindex, crumbs }: SeoProps) {
  const [location] = useLocation();
  const { language } = useLanguage();
  const rawPath = path ?? location;
  const canonicalPath = rawPath.length > 1 ? rawPath.replace(/\/+$/, "") : rawPath;
  const canonical = absolute(canonicalPath);
  const match = matchPath(canonicalPath);

  // hreflang pair — each language's own URL for this same page.
  const alternates: { hrefLang: string; href: string }[] = [];
  if (match) {
    // Same translation the language toggle uses, so session slugs that differ
    // per language (maternidade ↔ maternity) point at pages that exist.
    const pt = translatePath(canonicalPath, "pt", translateSessionSlug) ?? canonicalPath;
    const en = translatePath(canonicalPath, "en", translateSessionSlug) ?? canonicalPath;
    alternates.push({ hrefLang: "pt-PT", href: absolute(pt) });
    alternates.push({ hrefLang: "en", href: absolute(en) });
    alternates.push({ hrefLang: "x-default", href: absolute(pt) });
  }

  const fullTitle = title.includes(BRAND) ? title : `${title} | ${BRAND}`;
  // Pages with their own hero (a post, a session) share that photo; everything
  // else falls back to the branded card carrying the wordmark and tagline.
  const socialImage = absolute(image ?? "/og-image.jpg");

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, follow" />}

      {alternates.map((alt) => (
        <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={BRAND} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={socialImage} />
      {/* The branded card's real size; page photos vary, so they carry none. */}
      {!image && <meta property="og:image:width" content="1200" />}
      {!image && <meta property="og:image:height" content="630" />}
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content={language === "pt" ? "pt_PT" : "en_GB"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={socialImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
      {crumbs && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [{ name: BRAND, path: language === "pt" ? "/" : "/en" }, ...crumbs].map(
              (crumb, i) => ({ "@type": "ListItem", position: i + 1, name: crumb.name, item: absolute(crumb.path) }),
            ),
          })}
        </script>
      )}
    </>
  );
}

/**
 * The studio itself, as Google understands a local business. Emitted on the
 * home page so the knowledge panel, hours and map pin resolve to the site.
 */
export function localBusinessJsonLd(language: "pt" | "en"): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BRAND,
    url: SITE_URL,
    image: absolute("/images/portfolio/studio-espaco.jpg"),
    logo: absolute("/images/logo.png"),
    description:
      language === "pt"
        ? "Estúdio de fotografia de maternidade, recém-nascido, bebé e família em Ferreiras, Albufeira, Algarve."
        : "Maternity, newborn, baby and family photography studio in Ferreiras, Albufeira, Algarve.",
    email: CONTACT.email,
    telephone: CONTACT.phoneE164,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      postalCode: CONTACT.postalCode,
      addressLocality: "Albufeira",
      addressRegion: CONTACT.region,
      addressCountry: CONTACT.country,
    },
    // Same pin as the Google Business listing.
    geo: { "@type": "GeoCoordinates", latitude: 37.1282895, longitude: -8.2485006 },
    hasMap: GOOGLE_REVIEWS.url,
    areaServed: ["Albufeira", "Algarve", "Portugal"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    sameAs: [CONTACT.instagramUrl, CONTACT.facebookUrl, GOOGLE_REVIEWS.url],
    founder: { "@id": `${SITE_URL}/#tania` },
    slogan: language === "pt" ? "Da barriga ao primeiro aninho" : "From the bump to the first birthday",
    knowsAbout: KNOWS_ABOUT[language],
  };
}

const KNOWS_ABOUT = {
  pt: [
    "Fotografia de grávida",
    "Fotografia newborn",
    "Fotografia de recém-nascido",
    "Fotografia de bebé",
    "Smash the cake",
    "Fotografia de família",
  ],
  en: [
    "Maternity photography",
    "Newborn photography",
    "Baby photography",
    "Cake smash photography",
    "Family photography",
  ],
};

/**
 * Tânia, as the person behind the studio: who photographs your baby is the
 * question parents (and AI answers) ask, and her nursing background is the
 * trust signal no other studio nearby has.
 */
export function taniaJsonLd(language: "pt" | "en"): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#tania`,
    name: "Tânia Pires",
    url: `${SITE_URL}${language === "pt" ? "/sobre" : "/en/about"}`,
    image: absolute("/images/portfolio/about-portrait.jpg"),
    jobTitle:
      language === "pt"
        ? "Fotógrafa de grávida, newborn, bebé e família"
        : "Maternity, newborn, baby and family photographer",
    description:
      language === "pt"
        ? "Fotógrafa no Algarve desde 2012 e a tempo inteiro desde 2017. Foi enfermeira durante vários anos antes de se dedicar à fotografia; tem o estúdio 9 Meses Fotografia em Ferreiras, Albufeira."
        : "Photographer in the Algarve since 2012, full time since 2017. She worked as a nurse for several years before turning to photography, and runs the 9 Meses Fotografia studio in Ferreiras, Albufeira.",
    worksFor: { "@id": `${SITE_URL}/#business` },
    workLocation: { "@type": "Place", name: "Albufeira, Algarve, Portugal" },
    knowsAbout: KNOWS_ABOUT[language],
    sameAs: [CONTACT.instagramUrl],
  };
}
