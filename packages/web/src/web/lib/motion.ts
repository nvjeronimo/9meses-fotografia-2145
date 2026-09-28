import Lenis from "lenis";

/*
 * Site-wide motion, started once from <Motion /> in app.tsx:
 *
 * - smooth, inertial scrolling (Lenis) for mouse and trackpad; touch screens
 *   keep their native scroll;
 * - photographs open like a curtain from the top down, with a slow settle, as they come into
 *   view; the line-art session marks pop in;
 * - a gentle parallax on page heroes and the watercolour washes.
 *
 * Nothing is hidden in the HTML itself: photos below the fold are only held
 * closed by this script, so the pre-rendered page, reduced-motion visitors
 * and anything that fails before it runs all simply see the photos.
 */

const REDUCED = "(prefers-reduced-motion: reduce)";
const FINE_POINTER = "(pointer: fine)";

let lenis: Lenis | null = null;

/** Jump to the top of a newly opened page, cancelling any inertia left over. */
export function resetScroll() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, behavior: "instant" });
}

export function startMotion(): () => void {
  if (typeof window === "undefined" || window.matchMedia(REDUCED).matches) return () => {};
  const stops = [startPhotoReveal(), startParallax()];
  if (window.matchMedia(FINE_POINTER).matches) stops.push(startSmoothScroll());
  return () => stops.forEach((stop) => stop());
}

function startSmoothScroll() {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: true });
  const instance = lenis;

  // The menu drawer and the lightbox lock the page with body overflow:hidden.
  // Lenis scrolls the window itself, so it has to be told to stand still too.
  const sync = () => (document.body.style.overflow === "hidden" ? instance.stop() : instance.start());
  const observer = new MutationObserver(sync);
  observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

  return () => {
    observer.disconnect();
    instance.destroy();
    lenis = null;
  };
}

/* ---------- photographs reveal on entering the screen ---------- */

const CURTAIN = "cubic-bezier(0.77, 0, 0.18, 1)";
const SETTLE = "cubic-bezier(0.16, 1, 0.3, 1)";
const POP = "cubic-bezier(0.34, 1.56, 0.64, 1)";

function isPhoto(img: HTMLImageElement) {
  if (!img.closest("main") || img.closest("[data-hero], [data-no-reveal], dialog")) return false;
  if (img.classList.contains("brand-mark")) return true;
  // Decorative washes and anything icon-sized stay put.
  return !img.closest("[aria-hidden]") && img.getBoundingClientRect().width >= 120;
}

const isMark = (img: HTMLImageElement) => img.classList.contains("brand-mark");

/*
 * A photo waiting below the fold is held closed from the moment it is
 * rendered (by script, so pre-rendered HTML and failed scripts still show it).
 * Hiding it only when it reached the screen made it flash in full first.
 */
function hold(img: HTMLImageElement) {
  // Opacity, not a clip: Chrome will not lazy-load an image clipped to nothing.
  img.dataset.reveal = "pending";
  img.style.opacity = "0";
}

function reveal(img: HTMLImageElement, delay: number) {
  const play = () => {
    delete img.dataset.reveal;
    img.style.opacity = "";
    if (isMark(img)) {
      img.animate(
        [
          { opacity: 0, transform: "scale(0.6) rotate(-14deg)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 800, delay: delay + 150, easing: POP, fill: "backwards" },
      );
      return;
    }
    img.animate([{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0 0)" }], {
      duration: 1100,
      delay,
      easing: CURTAIN,
      fill: "backwards",
    });
    img.animate([{ transform: "scale(1.14)" }, { transform: "scale(1)" }], {
      duration: 1800,
      delay,
      easing: SETTLE,
      fill: "backwards",
    });
  };
  if (img.complete && img.naturalWidth) play();
  else img.addEventListener("load", play, { once: true });
}

function startPhotoReveal() {
  if (!("IntersectionObserver" in window) || !Element.prototype.animate) return () => {};

  // On the very first load, whatever is already on screen was pre-rendered and
  // painted before this ran, so it stays as it is. Everything below the fold,
  // and every photo of a page opened later in the app, gets the reveal.
  let booting = true;
  const boot = setTimeout(() => (booting = false), 700);

  const io = new IntersectionObserver(
    (entries) => {
      let stagger = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const img = entry.target as HTMLImageElement;
        io.unobserve(img);
        if (img.dataset.reveal !== "pending") continue;
        reveal(img, Math.min(stagger, 4) * 120);
        stagger++;
      }
    },
    { rootMargin: "0px 0px -5% 0px" },
  );

  const seen = new WeakSet<Element>();
  const scan = (root: ParentNode) => {
    for (const img of root.querySelectorAll("img")) {
      if (seen.has(img)) continue;
      seen.add(img);
      if (!isPhoto(img)) continue;
      if (!booting || img.getBoundingClientRect().top > window.innerHeight) hold(img);
      io.observe(img);
    }
  };
  scan(document);
  const mo = new MutationObserver((records) => {
    for (const record of records)
      for (const node of record.addedNodes) if (node instanceof Element) scan(node.parentNode ?? node);
  });
  mo.observe(document.body, { childList: true, subtree: true });

  return () => {
    clearTimeout(boot);
    io.disconnect();
    mo.disconnect();
  };
}

/* ---------- parallax ---------- */

/*
 * `data-parallax="hero"` drifts a full-bleed image down at a third of the
 * scroll speed while its section leaves the top of the screen. A number
 * (e.g. "0.1") drifts an element against the scroll around the middle of the
 * viewport. Desktop only: on phones it only adds jank to native scrolling.
 */
function startParallax() {
  if (!window.matchMedia(FINE_POINTER).matches) return () => {};
  const offsets = new WeakMap<HTMLElement, number>();
  let frame = 0;

  const update = () => {
    frame = 0;
    const vh = window.innerHeight;
    for (const el of document.querySelectorAll<HTMLElement>("[data-parallax]")) {
      const mode = el.dataset.parallax;
      let y: number;
      if (mode === "hero") {
        const top = (el.parentElement ?? el).getBoundingClientRect().top;
        if (top > 0 || -top > vh * 1.2) continue;
        y = -top * 0.35;
      } else {
        const rect = el.getBoundingClientRect();
        const top = rect.top - (offsets.get(el) ?? 0);
        if (top > vh || top + rect.height < 0) continue;
        y = -(top + rect.height / 2 - vh / 2) * Number(mode || 0.1);
      }
      offsets.set(el, y);
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}
