import { cn } from "@/lib/utils";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "wouter";
import { useLocation } from "wouter";
import type { PageId } from "../lib/routes";
import { CONTACT } from "../lib/site";
import { Footer } from "./footer";
import { useLanguage } from "./language-provider";
import { Navigation } from "./navigation";
import { Reveal } from "./reveal";
import { WhatsappButton } from "./whatsapp-button";
import { useAnalytics } from "../hooks/use-analytics";

/** Every public page: nav, content, footer, and a scroll reset on mount. */
export function PageShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { trackView } = useAnalytics();
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    trackView(location);
    // trackView is stable; re-running on location alone is what we want.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#conteudo" className="skip-link">
        {t("a11y.skip")}
      </a>
      <Navigation />
      <main id="conteudo" tabIndex={-1} key={location} className="page-enter flex-1 outline-none">
        {children}
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  );
}

interface PageHeroProps {
  labelKey: string;
  titleKey: string;
  subtitleKey?: string;
  image?: string;
}

/** Editorial page header — optional full-bleed image behind the title. */
export function PageHero({
  labelKey,
  titleKey,
  subtitleKey,
  image,
}: PageHeroProps) {
  const { t } = useLanguage();

  if (image) {
    return (
      <section
        data-hero="dark"
        className="relative flex h-[62vh] min-h-[420px] items-end overflow-hidden"
      >
        <img
          src={image}
          alt={t(titleKey)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/*
          One continuous ramp over the full section, like the home hero: dark
          at the very top for the nav, dark again at the bottom for the title,
          and no fixed-height slice whose edge could read as a line.
        */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.42)_9%,rgba(0,0,0,0.24)_22%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.26)_58%,rgba(0,0,0,0.5)_82%,rgba(0,0,0,0.7)_100%)]" />
        <div className="container relative z-10 pb-16 md:pb-24">
          <Reveal>
            <p className="uppercase-spaced mb-4 text-white/70">{t(labelKey)}</p>
            <h1 className="display-serif max-w-4xl text-[2.5rem] leading-[1.05] font-light text-white [text-wrap:balance] md:text-7xl">
              {t(titleKey)}
            </h1>
            {subtitleKey && (
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
                {t(subtitleKey)}
              </p>
            )}
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="container pt-28 pb-10 text-center md:pt-44 md:pb-20">
      <Reveal>
        <p className="uppercase-spaced text-muted-foreground mb-4">
          {t(labelKey)}
        </p>
        <h1 className="display-serif mx-auto max-w-4xl text-[2.5rem] leading-[1.05] font-light [text-wrap:balance] md:text-7xl">
          {t(titleKey)}
        </h1>
        {subtitleKey && (
          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-base leading-relaxed">
            {t(subtitleKey)}
          </p>
        )}
        <hr className="rule-line mx-auto mt-10 w-24" />
      </Reveal>
    </section>
  );
}

interface SectionLabelProps {
  label?: string;
  title: string;
  className?: string;
  center?: boolean;
}

export function SectionHeading({
  label,
  title,
  className,
  center = true,
}: SectionLabelProps) {
  return (
    <div className={cn(center && "text-center", "mb-12 md:mb-16", className)}>
      {label && (
        <p className="uppercase-spaced text-muted-foreground mb-4">{label}</p>
      )}
      <h2 className="display-serif text-[1.9rem] leading-[1.1] font-light [text-wrap:balance] md:text-[3.25rem]">
        {title}
      </h2>
    </div>
  );
}

interface CtaCardProps {
  titleKey: string;
  descriptionKey: string;
  buttonKey: string;
  page: PageId;
  /** Photo above the text, cropped 16:10. */
  image: string;
  /** Uppercase eyebrow over the title — defaults to the target page's nav label. */
  labelKey?: string;
}

export function CtaCard({
  titleKey,
  descriptionKey,
  buttonKey,
  page,
  image,
  labelKey,
}: CtaCardProps) {
  const { t, href } = useLanguage();
  const to = href(page);
  return (
    // h-full + the grid's default stretch keeps a pair of these the same
    // height however unevenly their copy runs.
    <Link
      to={to}
      className="border-border/70 group hover:border-border flex h-full flex-col border transition-colors duration-500"
    >
      <div className="overflow-hidden">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={t(titleKey)}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7 md:p-10">
        <p className="uppercase-spaced text-muted-foreground mb-3">
          {t(labelKey ?? `nav.${page}`)}
        </p>
        <h3 className="display-serif group-hover:text-primary text-2xl leading-tight font-light transition-colors duration-300 md:text-[1.75rem]">
          {t(titleKey)}
        </h3>
        <hr className="rule-line my-4 w-16 md:my-5" />
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t(descriptionKey)}
        </p>
        {/* mt-auto pins the action to the card's foot, so the two line up. */}
        <span className="uppercase-spaced text-primary link-underline mt-auto inline-block self-start pt-7 md:pt-9">
          {t(buttonKey)}
        </span>
      </div>
    </Link>
  );
}

/** Corner brackets of the ruled frame the brochure sets its titles inside. */
const FRAME_CORNERS = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
];

/** The dark "let's create memories" band used at the bottom of most pages. */
export function BookingCta() {
  const { t, href } = useLanguage();
  return (
    <section className="bg-band text-band-foreground relative isolate overflow-hidden">
      {/*
        A photograph buried almost entirely under the brand brown: the band
        keeps its flat colour at a glance but gains the warmth and grain the
        printed brochure gets from its paper.
      */}
      <img
        src="/images/portfolio/home-2.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover blur-[34px]"
      />
      <div aria-hidden className="bg-band/[0.93] absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_65%_at_50%_45%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.22)_100%)]"
      />

      <div className="section-y container">
        <Reveal>
          <div className="relative mx-auto max-w-2xl px-5 py-10 text-center md:px-14 md:py-14">
            {FRAME_CORNERS.map((corner) => (
              <span
                key={corner}
                aria-hidden
                className={cn(
                  "pointer-events-none absolute size-7 border-current/35 md:size-10",
                  corner,
                )}
              />
            ))}

            <p className="uppercase-spaced opacity-70">
              {t("home.cta.eyebrow")}
            </p>

            <h2 className="display-serif mt-4 text-[2rem] leading-[1.12] font-light [text-wrap:balance] md:text-[3.25rem]">
              {t("home.cta.title")}
            </h2>

            {/* Rule — dandelion — rule, the brochure's divider. */}
            <div
              aria-hidden
              className="mt-6 mb-6 flex items-center justify-center gap-4"
            >
              {/* The rules meet the puff's centre, not the artwork's box, so the
                  curling stem hangs below the line like a signature flourish. */}
              <span className="mt-[21px] h-px w-10 bg-current/30 md:mt-[30px] md:w-20" />
              <img
                src="/images/dandelion-gold.png"
                alt=""
                className="h-14 w-auto md:h-20"
              />
              <span className="mt-[21px] h-px w-10 bg-current/30 md:mt-[30px] md:w-20" />
            </div>

            <p className="mx-auto max-w-md text-sm leading-relaxed opacity-80">
              {t("home.cta.subtitle")}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                to={href("contact")}
                className="group bg-band-foreground text-band-chip-foreground inline-flex w-full items-center justify-center gap-2.5 px-9 py-4 text-[11px] tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-px hover:shadow-[0_16px_32px_-20px_rgba(0,0,0,0.8)] sm:w-auto"
              >
                {t("home.cta.button")}
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              {/* Second, lower-friction route for the many enquiries that
                  arrive by WhatsApp rather than through a form. */}
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:bg-band-foreground/10 inline-flex w-full items-center justify-center gap-2.5 border border-current/40 px-9 py-4 text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 sm:w-auto"
              >
                <MessageCircle className="size-3.5" />
                {t("home.cta.whatsapp")}
              </a>
            </div>

            <p className="uppercase-spaced mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 opacity-60">
              <span>{t("home.cta.note")}</span>
              <span aria-hidden className="hidden sm:inline">
                ·
              </span>
              <span className="whitespace-nowrap">{CONTACT.phone}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
