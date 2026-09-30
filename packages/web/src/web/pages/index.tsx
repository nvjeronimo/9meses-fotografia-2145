import { Link } from "wouter";
import { AboutSlideshow } from "../components/about-slideshow";
import { AguarelaDivider } from "../components/aguarela-divider";
import { HeroSlideshow } from "../components/hero-slideshow";
import { useLanguage } from "../components/language-provider";
import { Seo, localBusinessJsonLd, taniaJsonLd } from "../components/seo";
import { BookingCta, PageShell, SectionHeading } from "../components/page-shell";
import { PhotoGrid } from "../components/photo-grid";
import { Reveal } from "../components/reveal";
import { SessionCards } from "../components/session-cards";
import { TestimonialsCarousel } from "../components/testimonials";
import { useCategoryPhotos, useMixedPhotos } from "../lib/photos";

const PREVIEW_CATEGORIES = ["maternity", "newborn", "baby", "family", "smash"] as const;

function Index() {
  const { t, href, language } = useLanguage();
  const about = useCategoryPhotos("about");
  const preview = useMixedPhotos([...PREVIEW_CATEGORIES]);
  /*
   * The whole Sobre Mim set feeds the fade, in its published order — so the
   * frame that used to sit here as a still is still the one that greets you.
   */
  const aboutFrames = about.photos.length
    ? about.photos.map((photo) => photo.url)
    : ["/images/portfolio/about-portrait.jpg"];

  return (
    <PageShell>
      <Seo
        title={t("seo.home.title")}
        description={t("seo.home.desc")}
        jsonLd={[localBusinessJsonLd(language), taniaJsonLd(language)]}
      />

      <HeroSlideshow />

      {/* Welcome */}
      <section className="container section-y text-center">
        <Reveal>
          <p className="uppercase-spaced text-muted-foreground mb-6">{t("home.welcome.label")}</p>
          <p className="display-serif mx-auto max-w-3xl text-xl leading-relaxed font-light md:text-2xl">
            {t("home.welcome.text")}
          </p>
          <hr className="rule-line mx-auto mt-12 w-24" />
        </Reveal>
      </section>

      {/* About preview */}
      <section className="bg-card section-y">
        <div className="container grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="image-mat aspect-[4/5] overflow-hidden">
              <AboutSlideshow photos={aboutFrames} alt={t("home.about.title")} />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="uppercase-spaced text-muted-foreground mb-4">{t("home.about.label")}</p>
            <h2 className="display-serif text-3xl leading-tight font-light md:text-4xl">
              {t("home.about.title")}
            </h2>
            <hr className="rule-line my-7 w-16" />
            <p className="text-muted-foreground mb-5 leading-relaxed">{t("home.about.intro")}</p>
            <p className="text-muted-foreground mb-9 leading-relaxed">{t("home.about.text")}</p>
            <Link to={href("about")} className="btn-outline">
              {t("home.about.cta")}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Sessions */}
      <section className="container section-y section-flush-b">
        <Reveal>
          <SectionHeading
            label={t("home.sessions.label")}
            title={t("home.sessions.title")}
            className="mb-6 md:mb-8"
          />
          <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center leading-relaxed md:mb-16">
            {t("home.sessions.intro")}
          </p>
        </Reveal>
        <SessionCards />
      </section>

      {/* The wash sits on the boundary, so the card section below washes up into
          the page instead of starting on a hard edge. */}
      <AguarelaDivider />

      {/* Gallery preview */}
      <section className="bg-card section-y">
        <div className="container">
          <Reveal>
            <SectionHeading label={t("home.gallery.label")} title={t("home.gallery.title")} />
          </Reveal>
          <PhotoGrid
            photos={preview.slice(0, 9)}
            columns={3}
            eagerCount={0}
            emptyMessage={t("gallery.empty")}
          />
          <div className="mt-12 text-center">
            <Link to={href("gallery")} className="btn-outline">
              {t("home.gallery.viewAll")}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container section-y">
        <Reveal>
          <SectionHeading
            label={t("home.testimonials.label")}
            title={t("home.testimonials.title")}
          />
          <TestimonialsCarousel />
        </Reveal>
      </section>

      <BookingCta />
    </PageShell>
  );
}

export default Index;
