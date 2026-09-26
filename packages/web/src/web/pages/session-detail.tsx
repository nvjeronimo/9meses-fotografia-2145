import { HeartHandshake } from "lucide-react";
import { Link, useParams } from "wouter";
import { cn } from "@/lib/utils";
import { AguarelaDivider } from "../components/aguarela-divider";
import { BrochureCta } from "../components/brochure-cta";
import { useLanguage } from "../components/language-provider";
import { Seo } from "../components/seo";
import { PackageCards } from "../components/package-cards";
import { BookingCta, PageShell, SectionHeading } from "../components/page-shell";
import { PhotoGrid } from "../components/photo-grid";
import { Reveal } from "../components/reveal";
import { useCategoryPhotos } from "../lib/photos";
import { SESSIONS, sessionBySlug } from "../lib/site";
import NotFound from "./not-found";
import { responsive } from "../lib/responsive";

/** Sessions whose hero photo is dark enough for the white, transparent nav. */
const DARK_HEROES = new Set<string>(["maternity", "newborn", "smash"]);

function SessionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const session = sessionBySlug(slug ?? "");
  const { t, href, language } = useLanguage();
  const { photos } = useCategoryPhotos(session?.category ?? "home");

  if (!session) return <NotFound />;

  const hero = photos[0]?.url ?? session.fallbackImage;
  // Family closes the journey, so nothing after it is its "next chapter".
  const isNext = (i: number) => i === 0 && session.sessionType !== "family";

  return (
    <PageShell>
      <Seo
        title={t(session.titleKey)}
        description={t(session.descKey)}
        image={hero}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: t(session.titleKey),
          description: t(session.descKey),
          provider: { "@type": "PhotographyBusiness", name: "9 Meses Fotografia" },
          areaServed: { "@type": "Place", name: "Albufeira, Algarve, Portugal" },
          inLanguage: language === "pt" ? "pt-PT" : "en",
        }}
      />

      {/* Full-bleed hero */}
      {/*
        Darker hero photos flip the transparent nav to white (data-hero="dark");
        a soft top scrim keeps those white links legible over any sky or skin.
      */}
      <section
        data-hero={DARK_HEROES.has(session.sessionType) ? "dark" : undefined}
        className="relative flex h-[75vh] min-h-[460px] items-end overflow-hidden"
      >
        <img {...responsive(hero)} alt={t(session.titleKey)} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        {DARK_HEROES.has(session.sessionType) && (
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
        )}
        <div className="container relative z-10 pb-16 md:pb-24">
          <Reveal>
            <p className="uppercase-spaced mb-4 text-white/70">{t(session.timingKey)}</p>
            <h1 className="display-serif text-4xl leading-[1.1] font-light text-white md:text-6xl">
              {t(session.titleKey)}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Copy */}
      <section className="container section-y">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="display-serif mb-10 text-2xl leading-relaxed font-light md:text-3xl">
              {t(session.descKey)}
            </p>
            <div className="text-muted-foreground space-y-6 leading-relaxed">
              <p>{t(session.bodyKeys[0])}</p>
              <p>{t(session.bodyKeys[1])}</p>
            </div>
          </Reveal>
          {session.sessionType === "newborn" && (
            <Reveal>
              {/* The anxious question for newborn parents, answered where they read. */}
              <aside className="border-border/70 mt-12 flex gap-5 border p-6 md:p-8">
                <HeartHandshake className="text-primary mt-1 size-6 shrink-0" strokeWidth={1.25} aria-hidden />
                <div>
                  <h2 className="display-serif mb-3 text-2xl font-light">{t("newborn.safety.title")}</h2>
                  <p className="text-muted-foreground mb-3 leading-relaxed">{t("newborn.safety.text")}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t("newborn.safety.book")}</p>
                </div>
              </aside>
            </Reveal>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="container section-y-b section-flush-b">
        <Reveal>
          <SectionHeading label={t("home.gallery.label")} title={t("home.gallery.title")} />
        </Reveal>
        <PhotoGrid photos={photos} columns={3} />
      </section>

      {/* The wash opens the packages block rather than closing the page, so the
          switch from the work to its prices reads as a new chapter. */}
      <AguarelaDivider />

      {/* Packages last, immediately before the booking CTA: the work comes
          first, the price after it, and the two sit next to each other so
          reading one leads straight into booking. */}
      <section className="bg-card section-y">
        <div className="container">
          <Reveal>
            <SectionHeading label={t("packages.title")} title={t(session.titleKey)} />
          </Reveal>
          <div className="mx-auto max-w-5xl">
            <PackageCards sessionType={session.sessionType} />
          </div>
          {/* Same pull quote as /pacotes, so the line reads identically
              wherever prices are shown. */}
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-sm">
            <Link to={href("packages")} className="link-underline">
              {t("packages.extras.link")}
            </Link>
          </p>
          {/* Same catalogue as /pacotes — it covers every session, so it is
              worth offering wherever prices are being read. */}
          <BrochureCta surface="background" className="mx-auto mt-12 max-w-4xl md:mt-16" />
          <p className="mt-10 text-center">
            <Link
              to={`${href("prepare")}#${session.sessionType}`}
              className="link-underline uppercase-spaced text-primary"
            >
              {t("sessions.prepareLink")}
            </Link>
          </p>
        </div>
      </section>

      {/* The other sessions, as a way on for anyone comparing before booking. */}
      <nav aria-label={t("sessions.others")} className="container section-y">
        <Reveal>
          <h2 className="display-serif mb-8 text-center text-3xl font-light md:mb-12 md:text-4xl">
            {t("sessions.others")}
          </h2>
        </Reveal>
        <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {/* Journey order, starting from the chapter after this one. */}
          {[
            ...SESSIONS.slice(SESSIONS.indexOf(session) + 1),
            ...SESSIONS.slice(0, SESSIONS.indexOf(session)),
          ].map((other, i) => (
            <Reveal key={other.slug} as="li" delay={i * 70}>
              <Link
                to={href("sessionDetail", language === "pt" ? other.slug : other.slugEn)}
                className="group block"
              >
                <span className="image-mat-sm block overflow-hidden">
                  <img
                    {...responsive(other.fallbackImage, "(min-width: 768px) 25vw, 50vw")}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </span>
                <span className="mt-3 block">
                  <span
                    className={cn(
                      "uppercase-spaced block",
                      isNext(i) ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {isNext(i) ? t("sessions.nextChapter") : t(other.timingKey)}
                  </span>
                  <span className="display-serif group-hover:text-primary mt-1 block text-lg leading-snug font-light transition-colors md:text-xl">
                    {t(other.titleKey)}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </nav>

      <BookingCta />
    </PageShell>
  );
}

export default SessionDetail;
