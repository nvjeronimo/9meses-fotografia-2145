import { Link, useParams } from "wouter";
import { AguarelaDivider } from "../components/aguarela-divider";
import { BrochureCta } from "../components/brochure-cta";
import { useLanguage } from "../components/language-provider";
import { Seo } from "../components/seo";
import { PackageCards } from "../components/package-cards";
import { BookingCta, PageShell, SectionHeading } from "../components/page-shell";
import { PhotoGrid } from "../components/photo-grid";
import { Reveal } from "../components/reveal";
import { useCategoryPhotos } from "../lib/photos";
import { sessionBySlug } from "../lib/site";
import NotFound from "./not-found";

function SessionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const session = sessionBySlug(slug ?? "");
  const { t, href, language } = useLanguage();
  const { photos } = useCategoryPhotos(session?.category ?? "home");

  if (!session) return <NotFound />;

  const hero = photos[0]?.url ?? session.fallbackImage;

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
      <section className="relative flex h-[75vh] min-h-[460px] items-end overflow-hidden">
        <img src={hero} alt={t(session.titleKey)} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
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
          <div className="mx-auto max-w-4xl">
            <PackageCards sessionType={session.sessionType} />
          </div>
          {/* Same pull quote as /pacotes, so the line reads identically
              wherever prices are shown. */}
          <p className="display-serif text-foreground/85 mx-auto mt-12 max-w-2xl text-center text-xl leading-relaxed font-light italic md:text-2xl">
            {t("packages.extras")}
          </p>
          {/* Same catalogue as /pacotes — it covers every session, so it is
              worth offering wherever prices are being read. */}
          <BrochureCta surface="background" className="mx-auto mt-12 max-w-4xl md:mt-16" />
          {/* Way out to the other sessions, kept to the very end: someone who
              has read this far either books or wants to compare, and this is
              the only place the second answer belongs. */}
          <div className="mt-12 text-center md:mt-16">
            <Link to={href("sessions")} className="btn-outline">
              {t("sessions.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      <BookingCta />
    </PageShell>
  );
}

export default SessionDetail;
