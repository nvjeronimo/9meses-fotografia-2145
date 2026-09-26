import { cn } from "@/lib/utils";
import { useLanguage } from "./language-provider";
import { Reveal } from "./reveal";

/** The studio's own catalogue, served straight from `public/`. */
export const BROCHURE_URL = "/brochura/9meses-brochura.pdf";

/**
 * Page one of the catalogue, rendered out of the PDF at 180 dpi and shipped as
 * a 640px WebP. A real cover tells the visitor what they are about to open in
 * a way a generic icon cannot.
 */
const BROCHURE_COVER = "/brochura/capa-brochura.webp";

/**
 * Link block for the printed catalogue: opens it in a new tab, or saves it.
 *
 * Both actions point at the same file — "view" lets the browser's own PDF
 * reader handle it (which is what most people want on a desktop), "download"
 * forces the save dialog for anyone who wants it on their phone. No embedded
 * viewer: the file is 4 MB and 55 pages, so inlining it would cost every
 * visitor the download whether they open it or not.
 */
export function BrochureCta({
  className,
  /**
   * Which surface the block sits on. It has to contrast with the section
   * around it, so a section that is already `bg-card` gets the `background`
   * variant and vice versa.
   */
  surface = "card",
}: {
  className?: string;
  surface?: "card" | "background";
}) {
  const { t } = useLanguage();

  return (
    <Reveal className={className}>
      <div className={cn(surface === "card" ? "bg-card" : "bg-background", "border-border/70 flex flex-col items-center gap-7 border p-7 text-center md:flex-row md:items-center md:gap-10 md:p-10 md:text-left")}>
        {/* The cover itself, and a third way into the file: a thumbnail this
            size reads as something to click. */}
        <a
          href={BROCHURE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("brochure.view")}
          className="image-mat-sm group block shrink-0 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.55)] transition-transform duration-500 hover:-translate-y-0.5"
        >
          <img
            src={BROCHURE_COVER}
            alt={t("brochure.title")}
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
            {t("brochure.title")}
          </h3>
          <p className="text-muted-foreground mt-3 text-base leading-relaxed">{t("brochure.text")}</p>
          <p className="uppercase-spaced text-muted-foreground mt-3 text-[11px]">
            {t("brochure.meta")}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:shrink-0 md:flex-col lg:flex-row">
          <a
            href={BROCHURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("btn-solid", "text-center")}
          >
            {t("brochure.view")}
          </a>
          <a href={BROCHURE_URL} download className={cn("btn-outline", "text-center")}>
            {t("brochure.download")}
          </a>
        </div>
      </div>
    </Reveal>
  );
}
