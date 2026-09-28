import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { useTestimonials } from "../queries/testimonials";
import { useLanguage } from "./language-provider";
import { GoogleRating } from "./google-rating";
import { usePrefersReducedMotion } from "../hooks/use-scroll-animation";
import { responsive } from "../lib/responsive";

/** Maps a stored session type to its translation key, for the attribution line. */
const SESSION_KEYS: Record<string, string> = {
  maternity: "session.maternity",
  newborn: "session.newborn",
  baby: "session.baby",
  family: "session.family",
  smash: "session.smash",
};

export function TestimonialsCarousel() {
  const { t, language } = useLanguage();
  const { data } = useTestimonials();
  const [index, setIndex] = useState(0);

  // Reviews come from the admin panel, so the list length changes at runtime.
  const items = (data ?? []).filter((row) =>
    ((language === "pt" ? row.quotePt : row.quoteEn) ?? "").trim().length > 0,
  );

  // Rotates on its own only when nobody is reading or asked for less motion.
  const reduced = usePrefersReducedMotion();
  const [held, setHeld] = useState(false);
  useEffect(() => {
    if (items.length < 2 || reduced || held) return;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % items.length), 8000);
    return () => clearInterval(id);
  }, [items.length, reduced, held]);

  useEffect(() => {
    if (index >= items.length) setIndex(0);
  }, [index, items.length]);

  const item = items[index];
  if (!item) return null;

  const quote = (language === "pt" ? item.quotePt : item.quoteEn) ?? "";
  const sessionKey = item.sessionType ? SESSION_KEYS[item.sessionType] : undefined;

  return (
    <div
      className="relative mx-auto max-w-3xl text-center"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
      }}
    >
      <blockquote key={item.id} style={{ animation: "fadeInUp 0.7s ease-out both" }}>
        {item.photo ? (
          <img
            {...responsive(item.photo, "96px")}
            alt=""
            loading="lazy"
            className="mx-auto mb-8 size-24 rounded-full object-cover"
          />
        ) : (
          <Quote className="text-primary/25 mx-auto mb-8 size-9" aria-hidden />
        )}
        <p className="display-serif text-xl leading-relaxed font-light italic md:text-2xl">
          “{quote}”
        </p>
        <footer className="mt-8">
          <p className="text-sm font-medium">{item.author}</p>
          {sessionKey && (
            <p className="uppercase-spaced text-muted-foreground mt-2">{t(sessionKey)}</p>
          )}
        </footer>
      </blockquote>

      {items.length > 1 && (
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev - 1 + items.length) % items.length)}
            aria-label={t("lightbox.previous")}
            className="text-muted-foreground hover:text-foreground grid size-11 place-items-center transition-colors"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex">
            {items.map((testimonial, i) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={testimonial.author}
                aria-current={i === index}
                className="group grid size-8 place-items-center"
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full transition-colors duration-300",
                    i === index ? "bg-primary" : "bg-border group-hover:bg-muted-foreground",
                  )}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % items.length)}
            aria-label={t("lightbox.next")}
            className="text-muted-foreground hover:text-foreground grid size-11 place-items-center transition-colors"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}

      <GoogleRating className="mt-10" />
    </div>
  );
}
