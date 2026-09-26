import { cn } from "@/lib/utils";
import { useState } from "react";
import type { DisplayPhoto } from "../lib/photos";
import { useLanguage } from "./language-provider";
import { Lightbox } from "./lightbox";
import { responsive } from "../lib/responsive";

interface PhotoGridProps {
  photos: DisplayPhoto[];
  className?: string;
  /** Widest column count, on large screens. Narrower screens step down. */
  columns?: 2 | 3 | 4;
  emptyMessage?: string;
  /** How many leading photos load eagerly (0 when the grid starts below the fold). */
  eagerCount?: number;
}

/**
 * Real masonry, via CSS multi-columns.
 *
 * The previous grid forced every photo into one of a handful of fixed aspect
 * ratios, which cropped portraits and left gaps between rows. Here each image
 * keeps its own proportions and the columns pack tight — which is what a
 * photography portfolio needs. `break-inside-avoid` stops an image being split
 * across a column boundary.
 */
const COLUMN_CLASSES: Record<2 | 3 | 4, string> = {
  2: "columns-1 sm:columns-2",
  3: "columns-2 md:columns-3",
  4: "columns-2 md:columns-3 lg:columns-4",
};

/** Rendered tile width per layout, so phones pick the -800 variant. */
const COLUMN_SIZES: Record<2 | 3 | 4, string> = {
  2: "(min-width: 640px) 50vw, 100vw",
  3: "(min-width: 768px) 33vw, 50vw",
  4: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
};

export function PhotoGrid({
  photos,
  className,
  columns = 3,
  emptyMessage,
  eagerCount = 6,
}: PhotoGridProps) {
  const { language, t } = useLanguage();
  const [index, setIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return emptyMessage ? (
      <p className="text-muted-foreground py-16 text-center text-sm">{emptyMessage}</p>
    ) : null;
  }

  return (
    <>
      <div
        className={cn(
          "gap-3 [column-fill:_balance] md:gap-5",
          COLUMN_CLASSES[columns],
          className,
        )}
      >
        {photos.map((photo, i) => {
          const caption = language === "pt" ? photo.captionPt : photo.captionEn;
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={caption || `${t("gallery.open")} ${i + 1}`}
              className="image-mat-sm group relative mb-3 block w-full break-inside-avoid overflow-hidden md:mb-5"
            >
              <img
                {...responsive(photo.url, COLUMN_SIZES[columns])}
                alt={caption ?? ""}
                loading={i < eagerCount ? "eager" : "lazy"}
                decoding="async"
                className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
            </button>
          );
        })}
      </div>

      <Lightbox
        photos={photos}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </>
  );
}
