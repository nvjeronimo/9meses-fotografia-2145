import { IMAGE_WIDTHS } from "./image-widths";

/**
 * srcset for a bundled photo: its -800, -1200 and -1600 WebP variants (see
 * tools/optimize-images.py). Uploaded photos and anything unknown pass
 * through untouched.
 */
export function responsive(src: string, sizes = "100vw") {
  const widths = IMAGE_WIDTHS[src];
  if (!widths) return { src };
  const base = src.replace(/\.(jpe?g)$/i, "");
  return {
    src: `${base}-1600.webp`,
    srcSet: `${base}-800.webp ${widths[0]}w, ${base}-1200.webp ${widths[1]}w, ${base}-1600.webp ${widths[2]}w`,
    sizes,
  };
}
