import { useState } from "react";
import { useLanguage } from "../components/language-provider";
import { Lightbox } from "../components/lightbox";
import { Seo } from "../components/seo";
import {
  BookingCta,
  CtaCard,
  PageHero,
  PageShell,
  SectionHeading,
} from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { TestimonialsCarousel } from "../components/testimonials";
import { useCategoryPhotos } from "../lib/photos";

function About() {
  const { t } = useLanguage();
  const { photos } = useCategoryPhotos("about");
  const portrait = photos[0]?.url ?? "/images/portfolio/about-portrait.jpg";
  const story = photos[1]?.url ?? "/images/portfolio/about-story.jpg";
  /** Everything past the portrait and the story photo runs as a band. */
  const band = photos.slice(2);
  const [bandIndex, setBandIndex] = useState<number | null>(null);

  return (
    <PageShell>
      <Seo title={t("seo.about.title")} description={t("seo.about.desc")} />

      <PageHero labelKey="about.hero.label" titleKey="about.hero.title" />

      {/* Intro + portrait */}
      <section className="container section-y-b">
        {/* Text column centred against the portrait, not top-aligned: the copy
            is shorter than the 4:5 frame, so aligning tops left it hanging. */}
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <Reveal>
            <p className="display-serif mb-8 text-2xl leading-relaxed font-light md:text-3xl">
              {t("about.intro")}
            </p>
            <div className="text-muted-foreground space-y-5 leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
            <p className="display-serif text-primary mt-10 text-2xl font-light italic">
              {t("about.signature")}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="image-mat aspect-[4/5] overflow-hidden">
              <img
                src={portrait}
                alt={t("about.hero.title")}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-card section-y">
        <div className="container grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="image-mat aspect-[3/4] overflow-hidden">
              <img src={story} alt="" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="display-serif text-3xl leading-tight font-light md:text-4xl">
              {t("about.philosophy.title")}
            </h2>
            <hr className="rule-line my-7 w-16" />
            <p className="text-muted-foreground leading-relaxed">
              {t("about.philosophy.text")}
            </p>
            <blockquote className="border-primary/40 mt-10 border-l pl-6">
              <p className="display-serif text-xl leading-relaxed font-light italic">
                “{t("about.quote")}”
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Family band */}
      {band.length > 0 && (
        <section className="container section-y">
          <Reveal>
            <SectionHeading
              label={t("about.gallery.label")}
              title={t("about.gallery.title")}
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-5 lg:grid-cols-5">
            {band.map((photo, i) => (
              <Reveal key={photo.id} delay={i * 80}>
                <button
                  type="button"
                  onClick={() => setBandIndex(i)}
                  aria-label={t("about.gallery.title")}
                  className="image-mat-sm group relative block w-full overflow-hidden"
                >
                  <img
                    src={photo.url}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="aspect-[2/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                </button>
              </Reveal>
            ))}
          </div>
          <Lightbox
            photos={band}
            index={bandIndex}
            onClose={() => setBandIndex(null)}
            onIndexChange={setBandIndex}
          />
        </section>
      )}

      {/* Testimonials */}
      <section className="container section-y">
        <Reveal>
          <TestimonialsCarousel />
        </Reveal>
      </section>

      {/* CTA cards */}
      <section className="container section-y-b">
        <div className="grid items-stretch gap-6 md:grid-cols-2 md:gap-8">
          <Reveal className="h-full">
            <CtaCard
              labelKey="about.studioCta.label"
              titleKey="about.studioCta.title"
              descriptionKey="about.studioCta.description"
              buttonKey="about.studioCta.button"
              page="studio"
              image="/images/portfolio/studio-espaco.jpg"
            />
          </Reveal>
          <Reveal delay={120} className="h-full">
            <CtaCard
              labelKey="about.sessionsCta.label"
              titleKey="about.sessionsCta.title"
              descriptionKey="about.sessionsCta.description"
              buttonKey="about.sessionsCta.button"
              page="sessions"
              image="/images/portfolio/home-1.jpg"
            />
          </Reveal>
        </div>
      </section>

      <BookingCta />
    </PageShell>
  );
}

export default About;
