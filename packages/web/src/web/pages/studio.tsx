import { Baby, Coffee, Package, Shirt, Wifi } from "lucide-react";
import { AguarelaDivider } from "../components/aguarela-divider";
import { useLanguage } from "../components/language-provider";
import { Seo } from "../components/seo";
import {
  BookingCta,
  CtaCard,
  PageHero,
  PageShell,
  SectionHeading,
} from "../components/page-shell";
import { PhotoGrid } from "../components/photo-grid";
import { Reveal } from "../components/reveal";
import { useCategoryPhotos } from "../lib/photos";

/**
 * Marks from the studio's own brand pack — the lit set, the dress rail, the
 * camera. Decorative: they restate the intro copy in the studio's own hand
 * rather than adding information, so they carry no labels.
 */
const STUDIO_MARKS = [
  "/images/graphics/icon-estudio.webp",
  "/images/graphics/icon-vestidos.webp",
  "/images/graphics/icon-camara.webp",
] as const;

const AMENITIES = [
  { icon: Coffee, key: "studio.amenity1" },
  { icon: Wifi, key: "studio.amenity2" },
  { icon: Baby, key: "studio.amenity3" },
  { icon: Shirt, key: "studio.amenity4" },
  { icon: Package, key: "studio.amenity5" },
] as const;

function Studio() {
  const { t } = useLanguage();
  const { photos } = useCategoryPhotos("studio");
  const hero = photos[0]?.url ?? "/images/portfolio/studio-espaco.jpg";

  return (
    <PageShell>
      <Seo title={t("seo.studio.title")} description={t("seo.studio.desc")} />

      <PageHero
        labelKey="studio.hero.label"
        titleKey="studio.hero.title"
        image={hero}
      />

      {/* Intro */}
      <section className="container section-y">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="display-serif text-3xl leading-tight font-light md:text-4xl">
              {t("studio.intro.title")}
            </h2>
            <hr className="rule-line my-7 w-16" />
            <p className="text-muted-foreground leading-relaxed">
              {t("studio.intro.text")}
            </p>
            <div aria-hidden className="mt-9 flex items-center gap-4 md:mt-11 md:gap-6">
              {STUDIO_MARKS.map((mark) => (
                <img
                  key={mark}
                  src={mark}
                  alt=""
                  loading="lazy"
                  className="brand-mark size-14 shrink-0 md:size-16"
                />
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="image-mat overflow-hidden">
              <img
                src={photos[1]?.url ?? hero}
                alt={t("studio.intro.title")}
                className="h-auto w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Amenities */}
      <section className="bg-card section-y">
        <div className="container">
          <Reveal>
            <SectionHeading title={t("studio.amenities.title")} />
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {AMENITIES.map((amenity, i) => (
              <Reveal key={amenity.key} delay={i * 80} className="text-center">
                <amenity.icon
                  className="text-primary mx-auto mb-5 size-7"
                  strokeWidth={1.25}
                />
                <p className="text-sm leading-relaxed">{t(amenity.key)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flipped, because here the wash trails out of the section above it
          rather than leading into the one below. */}
      <AguarelaDivider edge="top" />

      {/* Quote */}
      <section className="container section-y section-flush-t text-center">
        <Reveal>
          <p className="display-serif mx-auto max-w-3xl text-2xl leading-relaxed font-light italic md:text-3xl">
            “{t("studio.quote")}”
          </p>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="container section-y-b">
        <PhotoGrid photos={photos} columns={3} />
      </section>

      {/* CTA cards */}
      <section className="container section-y-b">
        <div className="grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
          <Reveal className="h-full">
            <CtaCard
              labelKey="studio.aboutCta.label"
              titleKey="studio.aboutCta.title"
              descriptionKey="studio.aboutCta.description"
              buttonKey="studio.aboutCta.button"
              page="about"
              image="/images/portfolio/about-portrait.jpg"
            />
          </Reveal>
          <Reveal delay={120} className="h-full">
            <CtaCard
              labelKey="studio.sessionsCta.label"
              titleKey="studio.sessionsCta.title"
              descriptionKey="studio.sessionsCta.description"
              buttonKey="studio.sessionsCta.button"
              page="sessions"
              image="/images/portfolio/family-b.jpg"
            />
          </Reveal>
        </div>
      </section>

      <BookingCta />
    </PageShell>
  );
}

export default Studio;
