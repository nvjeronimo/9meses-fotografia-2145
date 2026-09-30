import { useEffect, useState } from "react";
import { CONTACT } from "../lib/site";
import { useLanguage } from "./language-provider";
import { useAnalytics } from "../hooks/use-analytics";

/**
 * Floating WhatsApp action. Appears after a short scroll so it never covers the
 * hero, and carries a prefilled greeting so the studio knows where the message
 * came from.
 */
export function WhatsappButton() {
  const { t, language } = useLanguage();
  const { trackEvent } = useAnalytics();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const greeting =
    language === "pt"
      ? "Olá! Gostaria de saber mais sobre as sessões de fotografia."
      : "Hello! I would like to know more about your photography sessions.";
  const url = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(greeting)}`;

  // Same frosted surface as the sticky header, so the two read as one family.
  return (
    <aside aria-label={t("contact.whatsapp")} data-floating className="[view-transition-name:whatsapp]">
    <a
      href={url}
      // Out of the tab order and hidden from AT while it is faded out.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      target="_blank"
      rel="noreferrer"
      aria-label={t("contact.whatsapp.aria")}
      onClick={() => trackEvent("whatsapp_click", { placement: "floating" })}
      className={`fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center gap-2.5 rounded-full border border-border/50 bg-background/80 text-foreground shadow-[0_1px_24px_-16px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-500 hover:border-primary hover:text-primary sm:right-5 sm:bottom-5 sm:size-auto sm:py-3 sm:pr-5 sm:pl-4 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* Official glyph — lucide's generic bubble reads as a chat box, not WhatsApp. */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 shrink-0 sm:size-5" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.116-.198.058-.371-.03-.52-.086-.148-.66-1.59-.904-2.178-.238-.571-.48-.49-.658-.499l-.563-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M20.52 3.449A11.874 11.874 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.366-8.452zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981 1-3.648-.235-.374a9.86 9.86 0 0 1-1.512-5.26c.002-5.45 4.437-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.438 9.885-9.885 9.885z" />
      </svg>
      {/* Icon only on phones; the aria-label names it. */}
      <span className="hidden text-[11px] tracking-[0.12em] uppercase sm:inline">{t("contact.whatsapp")}</span>
    </a>
    </aside>
  );
}
