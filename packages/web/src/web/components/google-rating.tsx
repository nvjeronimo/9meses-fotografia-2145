import { cn } from "@/lib/utils";
import { GOOGLE_REVIEWS } from "../lib/site";
import { useLanguage } from "./language-provider";

/** "5,0 ★ em 34 avaliações no Google · Deixe a sua avaliação" — testimonials and footer. */
export function GoogleRating({ className }: { className?: string }) {
  const { t, language } = useLanguage();
  const rating = language === "pt" ? GOOGLE_REVIEWS.rating : GOOGLE_REVIEWS.ratingEn;
  const [before, after = ""] = t("testimonials.google")
    .replace("{count}", String(GOOGLE_REVIEWS.count))
    .split("{rating}");

  return (
    <p className={cn("text-muted-foreground text-sm", className)}>
      <a href={GOOGLE_REVIEWS.url} target="_blank" rel="noreferrer" className="link-underline">
        {before}
        <strong className="font-bold">{rating}</strong>
        {after}
      </a>
      <span aria-hidden className="mx-2">
        ·
      </span>
      <a href={GOOGLE_REVIEWS.writeUrl} target="_blank" rel="noreferrer" className="link-underline whitespace-nowrap">
        {t("testimonials.write")}
      </a>
    </p>
  );
}
