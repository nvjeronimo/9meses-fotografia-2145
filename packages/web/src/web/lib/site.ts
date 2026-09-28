import type { PhotoCategory } from "../queries/photos";
import type { TranslationKey } from "./translations";

/** The live domain — used for canonical URLs, hreflang and structured data. */
export const SITE_URL = "https://9mesesfotografia.com";

export const CONTACT = {
  email: "info@9mesesfotografia.com",
  /** Display form. */
  phone: "+351 967 716 894",
  /** E.164, for tel: and wa.me links. */
  phoneE164: "+351967716894",
  /** Drives the legally required call-price note (see components/call-note). */
  phoneNetwork: "mobile" as "mobile" | "fixed",
  whatsappUrl: "https://wa.me/351967716894",
  instagram: "9mesesfotografia",
  instagramUrl: "https://www.instagram.com/9mesesfotografia/",
  facebook: "9mesesfotografia",
  facebookUrl: "https://www.facebook.com/9mesesfotografia/",
  /** Short link to the studio's own Google Business listing. */
  mapsUrl: "https://maps.app.goo.gl/eW1gQ4oFd6kTczNG6",
  /** Structured-data address parts. */
  street: "Avenida 25 de Abril, Edif. Space Beautiful, Loja G",
  postalCode: "8200-559",
  city: "Ferreiras, Albufeira",
  region: "Algarve",
  country: "PT",
  addressKey: "contact.address.full" as TranslationKey,
};

/** Public Google Business rating (checked 2026-09-26). Update when it changes. */
export const GOOGLE_REVIEWS = {
  rating: "5,0",
  ratingEn: "5.0",
  count: 34,
  url: "https://maps.google.com/?cid=12355365826419591254",
  /** Opens Google Maps straight on the "rate and review" dialog. */
  writeUrl:
    "https://www.google.com/maps/place/9+Meses+Fotografia/data=!4m3!3m2!1s0xd1acfd51cc0e869:0xab7713c1f1bd8856!12e1",
};

export interface SessionDef {
  /** Portuguese URL segment. */
  slug: string;
  /** English URL segment. */
  slugEn: string;
  category: PhotoCategory;
  sessionType: "maternity" | "newborn" | "baby" | "family" | "smash";
  titleKey: TranslationKey;
  shortKey: TranslationKey;
  timingKey: TranslationKey;
  descKey: TranslationKey;
  bodyKeys: [TranslationKey, TranslationKey];
  /** Fallback image while the real photos for this session are not uploaded. */
  fallbackImage: string;
  /**
   * Line-art mark from the studio's own brand pack, shown small beside the
   * session title. The pack ships no smash-the-cake mark, so that one
   * (first-birthday cake) was drawn to match it.
   */
  icon: string;
}

export const SESSIONS: SessionDef[] = [
  // Journey order: bump → newborn → first year → first birthday, then family.
  {
    slug: "maternidade",
    slugEn: "maternity",
    category: "maternity",
    sessionType: "maternity",
    titleKey: "sessions.maternity.title",
    shortKey: "session.maternity",
    timingKey: "sessions.maternity.timing",
    descKey: "sessions.maternity.desc",
    bodyKeys: ["sessions.maternity.body1", "sessions.maternity.body2"],
    fallbackImage: "/images/portfolio/maternity-1.jpg",
    icon: "/images/graphics/icon-maternidade.webp",
  },
  {
    slug: "newborn",
    slugEn: "newborn",
    category: "newborn",
    sessionType: "newborn",
    titleKey: "sessions.newborn.title",
    shortKey: "session.newborn",
    timingKey: "sessions.newborn.timing",
    descKey: "sessions.newborn.desc",
    bodyKeys: ["sessions.newborn.body1", "sessions.newborn.body2"],
    fallbackImage: "/images/portfolio/newborn-destaque.jpg",
    icon: "/images/graphics/icon-newborn.webp",
  },
  {
    slug: "bebe",
    slugEn: "baby",
    category: "baby",
    sessionType: "baby",
    titleKey: "sessions.baby.title",
    shortKey: "session.baby",
    timingKey: "sessions.baby.timing",
    descKey: "sessions.baby.desc",
    bodyKeys: ["sessions.baby.body1", "sessions.baby.body2"],
    fallbackImage: "/images/portfolio/baby-featured.jpg",
    icon: "/images/graphics/icon-bebe.webp",
  },
  {
    slug: "smash-the-cake",
    slugEn: "smash-the-cake",
    category: "smash",
    sessionType: "smash",
    titleKey: "sessions.smash.title",
    shortKey: "session.smash",
    timingKey: "sessions.smash.timing",
    descKey: "sessions.smash.desc",
    bodyKeys: ["sessions.smash.body1", "sessions.smash.body2"],
    fallbackImage: "/images/portfolio/smash-featured.jpg",
    icon: "/images/graphics/icon-smash-bolo.webp",
  },
  {
    slug: "familia",
    slugEn: "family",
    category: "family",
    sessionType: "family",
    titleKey: "sessions.family.title",
    shortKey: "session.family",
    timingKey: "sessions.family.timing",
    descKey: "sessions.family.desc",
    bodyKeys: ["sessions.family.body1", "sessions.family.body2"],
    fallbackImage: "/images/portfolio/family-c.jpg",
    icon: "/images/graphics/icon-familia.webp",
  },
];

/** Finds a session from either language's slug. */
export function sessionBySlug(slug: string) {
  return SESSIONS.find((session) => session.slug === slug || session.slugEn === slug);
}

/** Maps a session slug between languages, so the toggle keeps you on the same page. */
export function translateSessionSlug(slug: string, _from: string, to: string): string {
  const session = sessionBySlug(slug);
  if (!session) return slug;
  return to === "en" ? session.slugEn : session.slug;
}

/** Photos shipped with the site, used until the studio uploads its own. */
export const DEFAULT_PHOTOS: Record<PhotoCategory, string[]> = {
  home: [
    "/images/portfolio/home-1.jpg",
    "/images/portfolio/home-2.jpg",
    "/images/portfolio/home-3.jpg",
    "/images/portfolio/family-c.jpg",
    "/images/portfolio/home-daryna.jpg",
  ],
  about: [
    "/images/portfolio/about-portrait.jpg",
    "/images/portfolio/about-story.jpg",
    "/images/portfolio/about-1.jpg",
    "/images/portfolio/about-2.jpg",
    "/images/portfolio/about-3.jpg",
    "/images/portfolio/about-4.jpg",
    "/images/portfolio/about-5.jpg",
  ],
  studio: [
    "/images/portfolio/studio-espaco.jpg",
    "/images/portfolio/studio-a.jpg",
    "/images/portfolio/studio-b.jpg",
    "/images/portfolio/studio-c.jpg",
    "/images/portfolio/studio-natal.jpg",
  ],
  maternity: [
    "/images/portfolio/maternity-1.jpg",
    "/images/portfolio/maternity-2.jpg",
    "/images/portfolio/maternity-3.jpg",
    "/images/portfolio/maternity-duarte.jpg",
    "/images/portfolio/maternity-matias-1.jpg",
    "/images/portfolio/maternity-matias-2.jpg",
    "/images/portfolio/maternity-matias-3.jpg",
    "/images/portfolio/maternity-patricia.jpg",
    "/images/portfolio/maternity-vicente-1.jpg",
    "/images/portfolio/maternity-vicente-2.jpg",
    "/images/portfolio/maternity-vicente-3.jpg",
    "/images/portfolio/maternity-estudio-bw.jpg",
    "/images/portfolio/maternity-praia-1.jpg",
    "/images/portfolio/maternity-praia-2.jpg",
    "/images/portfolio/maternity-praia-3.jpg",
    "/images/portfolio/maternity-vasco.jpg",
    "/images/portfolio/maternity-afonso-1.jpg",
    "/images/portfolio/maternity-afonso-2.jpg",
    "/images/portfolio/maternity-alexandre.jpg",
    "/images/portfolio/maternity-camila.jpg",
    "/images/portfolio/maternity-duarte-2.jpg",
    "/images/portfolio/maternity-duarte-3.jpg",
    "/images/portfolio/maternity-duarte-4.jpg",
    "/images/portfolio/maternity-duarte-5.jpg",
  ],
  newborn: [
    "/images/portfolio/newborn-destaque.jpg",
    "/images/portfolio/newborn-featured.jpg",
    "/images/portfolio/newborn-1.jpg",
    "/images/portfolio/newborn-2.jpg",
    "/images/portfolio/newborn-3.jpg",
    "/images/portfolio/newborn-martina-mafalda.jpg",
    "/images/portfolio/newborn-matias.jpg",
    "/images/portfolio/newborn-olivia.jpg",
    "/images/portfolio/newborn-simao.jpg",
    "/images/portfolio/newborn-vasco-1.jpg",
    "/images/portfolio/newborn-vasco-2.jpg",
    "/images/portfolio/newborn-vasco-3.jpg",
    "/images/portfolio/newborn-alexandre-1.jpg",
    "/images/portfolio/newborn-alexandre-2.jpg",
    "/images/portfolio/newborn-camila.jpg",
    "/images/portfolio/newborn-eduardo.jpg",
    "/images/portfolio/newborn-eva.jpg",
    "/images/portfolio/newborn-frederica.jpg",
    "/images/portfolio/newborn-jovi.jpg",
    "/images/portfolio/newborn-leticia.jpg",
    "/images/portfolio/newborn-mariana-1.jpg",
    "/images/portfolio/newborn-mariana-2.jpg",
    "/images/portfolio/newborn-martina-mafalda-2.jpg",
  ],
  baby: [
    "/images/portfolio/baby-featured.jpg",
    "/images/portfolio/baby-2.jpg",
    "/images/portfolio/baby-3.jpg",
    "/images/portfolio/baby-clara-1.jpg",
    "/images/portfolio/baby-clara-2.jpg",
    "/images/portfolio/baby-clara-3.jpg",
    "/images/portfolio/baby-clara-4.jpg",
    "/images/portfolio/baby-clara-5.jpg",
    "/images/portfolio/baby-daryna-1.jpg",
    "/images/portfolio/baby-daryna-2.jpg",
    "/images/portfolio/baby-eva-1.jpg",
    "/images/portfolio/baby-eva-2.jpg",
    "/images/portfolio/baby-eva-3.jpg",
    "/images/portfolio/baby-laura.jpg",
    "/images/portfolio/baby-madalena-1.jpg",
    "/images/portfolio/baby-madalena-2.jpg",
    "/images/portfolio/baby-margarida-1.jpg",
    "/images/portfolio/baby-margarida-2.jpg",
    "/images/portfolio/baby-nazar.jpg",
    "/images/portfolio/baby-nazar-2.jpg",
    "/images/portfolio/baby-nazar-3.jpg",
    "/images/portfolio/baby-nazar-4.jpg",
  ],
  family: [
    "/images/portfolio/family-a.jpg",
    "/images/portfolio/family-b.jpg",
    "/images/portfolio/family-c.jpg",
    "/images/portfolio/family-nazar-1.jpg",
    "/images/portfolio/family-nazar-2.jpg",
    "/images/portfolio/family-nazar-3.jpg",
    "/images/portfolio/family-2023.jpg",
    "/images/portfolio/family-andreia-1.jpg",
    "/images/portfolio/family-andreia-2.jpg",
    "/images/portfolio/family-patrick-1.jpg",
    "/images/portfolio/family-patrick-2.jpg",
    "/images/portfolio/family-patrick-3.jpg",
    "/images/portfolio/family-patrick-4.jpg",
    "/images/portfolio/family-patrick-5.jpg",
    "/images/portfolio/family-2022-1.jpg",
    "/images/portfolio/family-2022-2.jpg",
    "/images/portfolio/family-2022-3.jpg",
    "/images/portfolio/family-d.jpg",
    "/images/portfolio/family-e.jpg",
    "/images/portfolio/family-f.jpg",
    "/images/portfolio/family-g.jpg",
    "/images/portfolio/family-h.jpg",
    "/images/portfolio/family-vanessa-1.jpg",
    "/images/portfolio/family-vanessa-2.jpg",
    "/images/portfolio/family-vanessa-3.jpg",
    "/images/portfolio/family-vanessa-4.jpg",
    "/images/portfolio/family-2023-2.jpg",
    "/images/portfolio/family-2023-3.jpg",
  ],
  smash: [
    "/images/portfolio/smash-featured.jpg",
    "/images/portfolio/smash-1.jpg",
    "/images/portfolio/smash-3.jpg",
    "/images/portfolio/smash-clara.jpg",
    "/images/portfolio/smash-clara-2.jpg",
    "/images/portfolio/smash-daryna.jpg",
    "/images/portfolio/smash-laura-2.jpg",
    "/images/portfolio/smash-madalena.jpg",
    "/images/portfolio/smash-nazar-1.jpg",
    "/images/portfolio/smash-nazar-2.jpg",
  ],
};

export const TESTIMONIALS = [
  {
    quote: {
      pt: "A Tânia tem um dom. Conseguiu captar a emoção deste momento de uma forma que nunca imaginámos. Voltaremos sempre.",
      en: "Tânia has a gift. She captured the emotion of this moment in a way we never imagined. We will always come back.",
    },
    author: "Ana & Miguel",
    sessionKey: "session.maternity" as TranslationKey,
  },
  {
    quote: {
      pt: "Sessão newborn tranquila do início ao fim. O bebé sempre no centro de tudo, e as fotografias são simplesmente lindas.",
      en: "A calm newborn session from start to finish. The baby was always the priority, and the photographs are simply beautiful.",
    },
    author: "Sofia R.",
    sessionKey: "session.newborn" as TranslationKey,
  },
  {
    quote: {
      pt: "Sentimo-nos em casa no estúdio. As fotografias de família ficaram naturais, cheias de vida e de nós.",
      en: "We felt at home in the studio. The family photographs came out natural, full of life and full of us.",
    },
    author: "Família Costa",
    sessionKey: "session.family" as TranslationKey,
  },
];
