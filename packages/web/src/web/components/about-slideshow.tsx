import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/use-scroll-animation";
import { responsive } from "../lib/responsive";
import { useAfterLoad } from "../hooks/use-after-load";

/** Long hold, long dissolve — the section reads as a portrait, not a carousel. */
const INTERVAL = 5200;

/**
 * Unattended cross-fade for the home page's "A Minha História" portrait.
 *
 * Deliberately has no controls, dots or arrows: it sits next to a block of
 * copy, and anything clickable there would compete with the section's own
 * link. `HeroSlideshow` is the interactive sibling of this — same fade, but it
 * owns the viewport and can afford indicators.
 *
 * The frames are stacked absolutely, so the caller has to give this a sized
 * box (the home page uses `aspect-[4/5]`).
 */
export function AboutSlideshow({
  photos,
  alt,
  className,
}: {
  photos: string[];
  alt: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const later = useAfterLoad(1500);

  useEffect(() => {
    // Respect the OS setting by simply never advancing — frame one stays up.
    if (reduced || photos.length < 2) return;
    const id = setInterval(() => setIndex((prev) => (prev + 1) % photos.length), INTERVAL);
    return () => clearInterval(id);
  }, [photos.length, reduced]);

  if (photos.length === 0) return null;

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {photos.map((url, i) =>
        // Frames after the first get their source only once the page has loaded.
        i !== 0 && !later ? null : (
        <img
          key={url}
          {...responsive(url, "(min-width: 768px) 45vw, 80vw")}
          /* Only the visible frame is announced; the rest are decorative dupes. */
          alt={i === 0 ? alt : ""}
          aria-hidden={i !== 0}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[2200ms] ease-in-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
        ),
      )}
    </div>
  );
}
