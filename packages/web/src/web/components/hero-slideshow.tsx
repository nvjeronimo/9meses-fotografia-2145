import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useCategoryPhotos } from "../lib/photos";
import { usePrefersReducedMotion } from "../hooks/use-scroll-animation";
import { useLanguage } from "./language-provider";
import { responsive } from "../lib/responsive";
import { useAfterLoad } from "../hooks/use-after-load";

const INTERVAL = 6500;

export function HeroSlideshow() {
  const { t, href } = useLanguage();
  const { photos } = useCategoryPhotos("home");
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  // Only slide one loads with the page; the rest follow once it has settled.
  const later = useAfterLoad();

  // WCAG 2.2.2: the slideshow can be paused, pauses while hovered or focused,
  // and never advances on its own for visitors who asked for reduced motion.
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const paused = reduced || userPaused || hovered;

  useEffect(() => {
    if (photos.length < 2 || paused) return;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % photos.length), INTERVAL);
    return () => clearInterval(id);
  }, [photos.length, paused]);

  return (
    <section
      data-hero="dark"
      className="relative h-[94vh] min-h-[560px] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovered(false);
      }}
    >
      {photos.map((photo, i) =>
        i !== 0 && !later ? null : (
        <img
          key={photo.id}
          {...responsive(photo.url)}
          alt=""
          fetchPriority={i === 0 ? "high" : "auto"}
          decoding={i === 0 ? "sync" : "async"}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
          style={
            i === index && !reduced
              ? {
                  transform: "scale(1.04)",
                  transition: "opacity 1.6s ease-in-out, transform 8s ease-out",
                }
              : undefined
          }
        />
        ),
      )}

      {/*
        One continuous ramp across the whole hero instead of three stacked
        boxes. Every earlier attempt darkened a fixed-height slice, and the
        edge of that slice read as a hard line partway down the photo. Because
        this gradient spans `inset-0`, it starts at the very top of the page —
        under the nav — and resolves at the bottom edge, so there is no seam to
        see anywhere. The top stops carry the nav, the bottom ones the slide
        indicators.
      */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.46)_7%,rgba(0,0,0,0.28)_17%,rgba(0,0,0,0.16)_30%,rgba(0,0,0,0.14)_45%,rgba(0,0,0,0.18)_62%,rgba(0,0,0,0.3)_82%,rgba(0,0,0,0.44)_100%)]" />
      {/*
        Centre vignette for the headline. Sized to the section and fading to
        fully transparent at 100%, so its falloff ends on the section edges
        rather than inside the frame.
      */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_50%_50%,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.24)_45%,rgba(0,0,0,0.08)_75%,rgba(0,0,0,0)_100%)]" />

      <div className="relative z-10 flex h-full items-center">
        <div className="container text-center">
          <p
            className="uppercase-spaced mb-7 text-white/75"
            style={{ animation: "fadeInUp 1.1s ease-out both" }}
          >
            {t("home.hero.eyebrow")}
          </p>
          <h1
            className="display-serif mx-auto max-w-5xl text-[2.75rem] leading-[1.06] font-light text-white [text-wrap:balance] md:text-7xl lg:text-8xl"
            style={{ animation: "fadeInUp 1.1s ease-out 120ms both", textShadow: "0 2px 40px rgba(0,0,0,0.35)" }}
          >
            {t("home.hero.title")}
          </h1>
          <p
            className="mx-auto mt-8 max-w-xl text-base leading-relaxed font-normal text-white/90 md:text-lg"
            style={{ animation: "fadeInUp 1.1s ease-out 300ms both", textShadow: "0 1px 20px rgba(0,0,0,0.4)" }}
          >
            {t("home.hero.subtitle")}
          </p>
          <div style={{ animation: "fadeInUp 1.1s ease-out 500ms both" }}>
            <Link
              to={href("sessions")}
              className="mt-12 inline-block border border-white/70 px-10 py-4 text-[11px] tracking-[0.15em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-stone-900"
            >
              {t("home.hero.cta")}
            </Link>
          </div>
        </div>
      </div>

      {/* Progress bars: each slide fills its own bar over INTERVAL. */}
      {photos.length > 1 && (
        <div className="absolute right-0 bottom-9 left-0 z-10 flex justify-center gap-3">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${t("hero.goTo")} ${i + 1}`}
              aria-current={i === index}
              className="group flex h-11 w-12 items-center md:w-16"
            >
              <span className="relative block h-[2px] w-full overflow-hidden bg-white/30 transition-colors duration-300 group-hover:bg-white/50">
                <span
                  key={`${photo.id}-${index}`}
                  className={cn(
                    "absolute inset-y-0 left-0 bg-white",
                    i === index ? "w-full" : "w-0",
                    i === index && !paused && "hero-progress",
                  )}
                />
              </span>
            </button>
          ))}
          {!reduced && (
            <button
              type="button"
              onClick={() => setUserPaused((prev) => !prev)}
              aria-label={t(userPaused ? "hero.play" : "hero.pause")}
              className="grid size-11 place-items-center text-white/70 transition-colors hover:text-white"
            >
              {userPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
