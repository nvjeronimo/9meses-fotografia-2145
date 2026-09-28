import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { DisplayPhoto } from "../lib/photos";
import { useLanguage } from "./language-provider";
import { responsive } from "../lib/responsive";

interface LightboxProps {
  photos: DisplayPhoto[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function Lightbox({ photos, index, onClose, onIndexChange }: LightboxProps) {
  const { t, language } = useLanguage();
  const open = index !== null && photos.length > 0;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  // A real modal: showModal() traps focus, makes the page behind inert and
  // gives Escape for free; focus goes back to the photo that opened it.
  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, [open]);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, go]);

  if (!open || index === null) return null;
  const photo = photos[index];
  if (!photo) return null;
  const caption = language === "pt" ? photo.captionPt : photo.captionEn;

  /*
   * Rendered into `document.body` on purpose. The page wrapper (`.page-enter`)
   * keeps a `transform` after its entry animation finishes (fill-mode `both`),
   * and a transformed ancestor becomes the containing block for `position: fixed`
   * descendants — which made `inset-0` resolve to the whole scrollable page
   * instead of the viewport, pushing the photo below the fold. A portal takes
   * the overlay out of that subtree entirely.
   */
  return createPortal(
    <dialog
      ref={dialogRef}
      data-lenis-prevent
      aria-label={t("lightbox.label")}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="fixed inset-0 z-100 m-0 flex h-dvh max-h-none w-screen max-w-none items-center justify-center overflow-hidden border-0 bg-black/95 p-4 md:p-10"
      style={{ animation: "fadeInUp 0.3s ease-out" }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t("lightbox.close")}
        className="absolute top-5 right-5 z-10 p-2 text-white/70 transition-colors hover:text-white"
      >
        <X className="size-6" />
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t("lightbox.previous")}
            className="absolute left-3 z-10 p-3 text-white/60 transition-colors hover:text-white md:left-8"
          >
            <ChevronLeft className="size-8" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t("lightbox.next")}
            className="absolute right-3 z-10 p-3 text-white/60 transition-colors hover:text-white md:right-8"
          >
            <ChevronRight className="size-8" />
          </button>
        </>
      )}

      <figure className="flex max-h-full max-w-6xl flex-col items-center gap-4">
        <img
          key={photo.id}
          {...responsive(photo.url)}
          alt={caption ?? ""}
          className="max-h-[78dvh] w-auto max-w-full object-contain"
          style={{ animation: "fadeInUp 0.5s ease-out" }}
        />
        <figcaption className="text-center text-xs tracking-[0.15em] text-white/50 uppercase">
          {caption ? <span className="block normal-case">{caption}</span> : null}
          <span>
            {index + 1} / {photos.length}
          </span>
        </figcaption>
      </figure>

      <p className="absolute bottom-4 left-0 right-0 hidden text-center text-[10px] tracking-[0.2em] text-white/30 uppercase md:block">
        {t("lightbox.hint")}
      </p>
    </dialog>,
    document.body,
  );
}
