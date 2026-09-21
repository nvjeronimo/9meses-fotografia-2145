/**
 * Client-side resize + WebP conversion, run before a photo leaves the browser.
 *
 * Camera files out of a studio workflow are routinely 6–12 MB and 6000 px wide.
 * Uploading them raw makes the admin panel feel broken on a phone and makes the
 * public gallery slow for everyone. Resizing to a web-sized long edge and
 * re-encoding as WebP typically cuts 8 MB to under 400 KB with no visible
 * difference at the sizes the site actually displays.
 *
 * Everything degrades safely: if the browser cannot decode the file, cannot
 * encode WebP, or the "compressed" result comes out larger, the original file
 * is uploaded untouched.
 */

/** Long edge of the stored image. Twice the widest slot the site renders. */
const MAX_EDGE = 2400;
const WEBP_QUALITY = 0.82;
/** Below this there is nothing worth saving. */
const SKIP_BELOW_BYTES = 200 * 1024;

export interface CompressResult {
  file: File;
  /** False when the original was returned unchanged. */
  compressed: boolean;
  originalBytes: number;
  bytes: number;
}

export async function compressImage(file: File): Promise<CompressResult> {
  const unchanged: CompressResult = {
    file,
    compressed: false,
    originalBytes: file.size,
    bytes: file.size,
  };

  // GIFs would lose their animation, SVGs are already small and vector.
  if (!file.type.startsWith("image/")) return unchanged;
  if (file.type === "image/gif" || file.type === "image/svg+xml") return unchanged;
  if (file.size < SKIP_BELOW_BYTES) return unchanged;

  try {
    const bitmap = await decode(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return unchanged;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(bitmap, 0, 0, width, height);
    if ("close" in bitmap) bitmap.close();

    const blob = await toBlob(canvas, "image/webp", WEBP_QUALITY);
    // A browser without WebP encoding hands back a PNG, which is usually bigger.
    if (!blob || blob.type !== "image/webp" || blob.size >= file.size) return unchanged;

    const name = `${file.name.replace(/\.[^.]+$/, "")}.webp`;
    return {
      file: new File([blob], name, { type: "image/webp", lastModified: Date.now() }),
      compressed: true,
      originalBytes: file.size,
      bytes: blob.size,
    };
  } catch {
    return unchanged;
  }
}

/** `createImageBitmap` where available — it decodes off the main thread. */
async function decode(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      // EXIF orientation applied here, so portraits are not stored sideways.
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      // Fall through to the <img> path.
    }
  }

  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "sync";
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("decode failed"));
      image.src = url;
    });
    return image;
  } finally {
    // Revoking after load is safe: the bitmap is already in memory.
    URL.revokeObjectURL(url);
  }
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

/** "8.4 MB → 340 KB" for the admin panel's upload feedback. */
export function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}
