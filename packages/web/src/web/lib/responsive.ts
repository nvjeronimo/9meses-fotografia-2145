import { IMAGE_WIDTHS } from "./image-widths";

/**
 * srcset for a bundled photo: its -400, -800, -1200 and -1600 WebP variants
 * (see tools/optimize-images.py), plus the photo's width and height so the
 * browser knows its proportions before it loads. The page's CSS still decides
 * the size it is shown at. Uploaded photos and anything unknown pass through
 * untouched.
 */
export function responsive(src: string, sizes = "100vw") {
  const entry = IMAGE_WIDTHS[src];
  if (!entry) return { src };
  const base = src.replace(/\.(jpe?g)$/i, "");
  const [w400, w800, w1200, w1600] = entry.w;
  return {
    src: `${base}-1600.webp`,
    srcSet: `${base}-400.webp ${w400}w, ${base}-800.webp ${w800}w, ${base}-1200.webp ${w1200}w, ${base}-1600.webp ${w1600}w`,
    sizes,
    width: w1600,
    height: entry.h,
  };
}
