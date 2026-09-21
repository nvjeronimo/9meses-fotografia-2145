import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { useLanguage } from "./language-provider";
import { Reveal } from "./reveal";
import { SESSIONS } from "../lib/site";

/**
 * Editorial session grid: consistent 4:5 crop, a large serif number notched
 * over the bottom-left corner of the photo, and columns offset from each other
 * so the grid reads as a spread rather than a row of boxes.
 */
export function SessionCards({ className }: { className?: string }) {
  const { t, href, language } = useLanguage();

  return (
    <div className={cn("grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3", className)}>
      {SESSIONS.map((session, i) => {
        const slug = language === "en" ? session.slugEn : session.slug;
        // Stagger the columns vertically (desktop only) for the asymmetric look.
        const offset = ["lg:mt-0", "lg:mt-16", "lg:mt-8"][i % 3];

        return (
          <Reveal key={session.slug} delay={i * 80} as="article" className={offset}>
            <Link to={href("sessionDetail", slug)} className="group block">
              <div className="bg-card relative overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={session.fallbackImage}
                    alt={t(session.titleKey)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                  />
                </div>
              </div>

              {/* The number punches a solid notch into the photo's corner, so it
                  stays legible over both bright and dark images. */}
              <div className="relative -mt-7 flex items-end gap-4 pl-0 md:-mt-9">
                <span className="display-serif bg-background text-foreground/85 group-hover:text-primary relative z-10 pr-3 text-[1.9rem] leading-none font-light transition-colors duration-500 md:pr-4 md:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="pt-3.5 md:pt-5">
                <p className="uppercase-spaced text-muted-foreground mb-2 text-[9px] md:mb-2.5 md:text-[11px]">
                  {t(session.timingKey)}
                </p>
                <h3 className="display-serif group-hover:text-primary min-h-[2.5em] text-lg leading-tight font-light transition-colors duration-300 sm:min-h-0 md:text-[1.75rem]">
                  {t(session.titleKey)}
                </h3>
                {/* The blurb is noise in a two-up phone grid — the title carries it. */}
                <p className="text-muted-foreground mt-3.5 hidden text-sm leading-relaxed sm:block">
                  {t(session.descKey)}
                </p>
                <span className="uppercase-spaced text-primary link-underline mt-3 inline-block text-[9px] md:mt-5 md:text-[11px]">
                  {t("sessions.viewSession")}
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
