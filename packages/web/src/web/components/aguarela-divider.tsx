import { cn } from "@/lib/utils";

/**
 * The watercolour wash from the studio's own brand pack, used as a section
 * break instead of a rule.
 *
 * The source art is a white sheet with the wash along one edge, so the file we
 * ship is alpha-keyed off its luminance. That keeps the paper texture but lets
 * whatever section colour sits behind it show through — which matters here,
 * because the page alternates between `background` and the slightly warmer
 * `card`, and a baked-in white would band against both.
 *
 * `edge` picks which way the wash points: "bottom" closes a section, "top"
 * opens the one underneath. Decorative only, so it is hidden from the a11y
 * tree.
 */
export function AguarelaDivider({
  edge = "bottom",
  className,
}: {
  edge?: "top" | "bottom";
  className?: string;
}) {
  /*
   * The wash trails off into flat colour at the end opposite its brushed edge,
   * and the artwork itself stops dead there. Fading that end out means the band
   * never shows a ruled horizontal line where it meets the next section,
   * whatever height it ends up at.
   */
  const fade = `linear-gradient(to ${edge === "top" ? "top" : "bottom"}, #000 0%, #000 52%, transparent 100%)`;

  return (
    <div aria-hidden className={cn("pointer-events-none relative w-full select-none", className)}>
      <div data-parallax="0.08">
      <img
        src={edge === "top" ? "/images/graphics/aguarela-band-top.webp" : "/images/graphics/aguarela-band.webp"}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ maskImage: fade, WebkitMaskImage: fade }}
        /*
         * Sized by its own 1440x280 proportions (`h-auto`) rather than a fixed
         * band height: at 16/24px tall the crop bit straight through the wash
         * and left a hard cut where the brushed edge should trail off. The max
         * heights only bite on very wide viewports, and the crop is anchored
         * away from the ragged edge, so that edge — the whole point of the
         * artwork — always survives it.
         *
         * Held at 60% so it reads as paper rather than a graphic. On the dark
         * theme the wash keeps its colour and just drops to a haze — inverting
         * it instead (tried first) put a black smudge on near-black, which was
         * both invisible and muddy.
         */
        className={cn(
          "h-auto max-h-32 w-full object-cover opacity-60 sm:max-h-44 md:max-h-56 lg:max-h-72 dark:opacity-[0.22]",
          edge === "top" ? "object-bottom" : "object-top",
        )}
      />
      </div>
    </div>
  );
}
