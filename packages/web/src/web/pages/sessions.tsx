import { Link } from "wouter";
import { AguarelaDivider } from "../components/aguarela-divider";
import { FramedTitle } from "../components/framed-title";
import { useLanguage } from "../components/language-provider";
import { Seo } from "../components/seo";
import { BookingCta, PageHero, PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { SESSIONS } from "../lib/site";
import { responsive } from "../lib/responsive";

function Sessions() {
  const { t, href, language } = useLanguage();
  const slugOf = (s: { slug: string; slugEn: string }) =>
    language === "en" ? s.slugEn : s.slug;

  return (
    <PageShell>
      <Seo title={t("seo.sessions.title")} description={t("seo.sessions.desc")} />

      <PageHero
        labelKey="sessions.hero.label"
        titleKey="sessions.hero.title"
        subtitleKey="sessions.hero.subtitle"
      />

      <section className="container section-y-b section-flush-b">
        <div className="space-y-12 md:space-y-28">
          {SESSIONS.map((session, i) => (
            <Reveal key={session.slug} as="article">
              <div
                className={`grid items-center gap-5 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link to={href("sessionDetail", slugOf(session))} className="group block">
                  <div className="image-mat aspect-[4/3] overflow-hidden">
                    <img
                      {...responsive(session.fallbackImage, "(min-width: 768px) 50vw, 100vw")}
                      alt={t(session.titleKey)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                    />
                  </div>
                  {/* Same notched number as the home grid, so both read as one system. */}
                  <span className="display-serif bg-background text-foreground/85 group-hover:text-primary relative z-10 -mt-8 inline-block pr-3 text-[2rem] leading-none font-light transition-colors duration-500 md:-mt-11 md:pr-5 md:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
                <div>
                  <FramedTitle align="start" className="mb-5 md:mb-7">
                    <Link
                      to={href("sessionDetail", slugOf(session))}
                      className="hover:text-foreground inline-flex items-center gap-3 transition-colors"
                    >
                      <img
                        src={session.icon}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className="brand-mark size-8 shrink-0 tracking-normal md:size-9"
                      />
                      {t(session.shortKey)}
                    </Link>
                  </FramedTitle>
                  <p className="uppercase-spaced text-muted-foreground mb-4">
                    {t(session.timingKey)}
                  </p>
                  <p className="text-muted-foreground mb-4 leading-relaxed md:mb-5">{t(session.descKey)}</p>
                  {/* Secondary blurb is redundant on a phone — the detail page carries it. */}
                  <p className="text-muted-foreground mb-9 hidden text-sm leading-relaxed md:block">
                    {t(session.bodyKeys[0])}
                  </p>
                  <Link to={href("sessionDetail", slugOf(session))} className="btn-outline">
                    {t("sessions.viewSession")}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <AguarelaDivider />

      <BookingCta />
    </PageShell>
  );
}

export default Sessions;
