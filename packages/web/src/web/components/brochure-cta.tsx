import { cn } from "@/lib/utils";
import { useLanguage } from "./language-provider";
import { Reveal } from "./reveal";

import { BROCHURES } from "../content/brochures";
import { SESSIONS } from "../lib/site";
import type { SessionType } from "../content/packages";

/**
 * The studio's catalogue, one PDF per session (content/brochures.ts). Each
 * cover is page one of that PDF, rendered as a 640px WebP: a real cover tells
 * the visitor what they are about to open in a way a generic icon cannot.
 *
 * With `session`, the block offers that session's brochure (view or save).
 * Without it (the packages page), it offers all of them, one button each.
 * No embedded viewer: inlining a PDF would cost every visitor the download
 * whether they open it or not.
 */
export function BrochureCta({
  className,
  /**
   * Which surface the block sits on. It has to contrast with the section
   * around it, so a section that is already `bg-card` gets the `background`
   * variant and vice versa.
   */
  surface = "card",
  session,
}: {
  className?: string;
  surface?: "card" | "background";
  /** Which session's brochure; none offers every session's. */
  session?: SessionType;
}) {
  const { t } = useLanguage();
  const one = session ? BROCHURES[session] : null;
  const cover = one?.cover ?? BROCHURES.maternity.cover;
  const coverHref = one?.file ?? BROCHURES.maternity.file;
  const title = session
    ? t("brochure.titleFor").replace("{session}", t(`session.${session}`))
    : t("brochure.title");

  return (
    <Reveal className={className}>
      <div className={cn(surface === "card" ? "bg-card" : "bg-background", "border-border/70 flex flex-col items-center gap-7 border p-7 text-center md:flex-row md:items-center md:gap-10 md:p-10 md:text-left")}>
        {/* The cover itself, and a third way into the file: a thumbnail this
            size reads as something to click. */}
        <a
          href={coverHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t("brochure.view")}: ${title}`}
          className="image-mat-sm group block shrink-0 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:-translate-y-0.5"
        >
          <img
            src={cover}
            alt={title}
            loading="lazy"
            decoding="async"
            width={640}
            height={828}
            className="block w-24 md:w-32"
          />
        </a>

        <div className="flex-1">
          <p className="uppercase-spaced text-muted-foreground mb-2.5">{t("brochure.label")}</p>
          <h3 className="display-serif text-2xl leading-tight font-light md:text-[1.75rem]">
            {title}
          </h3>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">{t("brochure.text")}</p>
          <p className="uppercase-spaced text-muted-foreground mt-3 text-[11px]">
            {one ? t("brochure.meta").replace("{n}", String(one.pages)) : t("brochure.choose")}
          </p>
        </div>

        {one ? (
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:shrink-0 md:flex-col lg:flex-row">
            <a href={one.file} target="_blank" rel="noopener noreferrer" className={cn("btn-solid", "text-center")}>
              {t("brochure.view")}
            </a>
            <a href={one.file} download className={cn("btn-outline", "text-center")}>
              {t("brochure.download")}
            </a>
          </div>
        ) : (
          <ul className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 md:w-auto md:shrink-0">
            {SESSIONS.map((each) => (
              <li key={each.sessionType}>
                <a
                  href={BROCHURES[each.sessionType].file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline block text-center"
                >
                  {t(`session.${each.sessionType}`)}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Reveal>
  );
}
