import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Link } from "wouter";
import { CONTACT, SESSIONS } from "../lib/site";
import type { PageId } from "../lib/routes";
import { useLanguage } from "./language-provider";

const NAV = [
  { page: "about", key: "nav.about" },
  { page: "studio", key: "nav.studio" },
  { page: "packages", key: "nav.packages" },
  { page: "gallery", key: "nav.gallery" },
  { page: "prepare", key: "nav.prepare" },
  { page: "journal", key: "nav.journal" },
  { page: "faq", key: "nav.faq" },
] satisfies { page: PageId; key: string }[];

/** Mandatory in Portugal for any business serving the public. */
const COMPLAINTS_URL = "https://www.livroreclamacoes.pt/inicio";

export function Footer() {
  const { t, href, language } = useLanguage();

  return (
    <footer className="border-border/60 bg-card relative isolate border-t">
      {/*
        Watercolour wash anchored to the bottom of the viewport rather than the
        element, so the footer content drifts over it as the page settles. The
        PNG carries no white, which lets the card colour show through the paper
        grain; dark mode only needs a hint of it.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/images/aguarela-footer.webp')] bg-[length:300%_auto] bg-fixed bg-bottom bg-no-repeat opacity-90 md:bg-[length:100%_auto] dark:opacity-40"
      />
      <div className="relative container py-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <img
              src="/images/logo.webp"
              alt="9 Meses Fotografia"
              className="mb-5 h-20 w-auto md:h-24"
            />
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Footer links carry the header's `nav-link` underline: it already
              handles the colour transition, so the old `transition-colors`
              utilities came off with it. `inline-block` keeps the rule the
              width of the label instead of the column. */}
          <div>
            <h2 className="uppercase-spaced text-muted-foreground mb-5">
              {t("footer.nav")}
            </h2>
            <ul className="space-y-3">
              {NAV.map((item) => (
                <li key={item.page}>
                  <Link
                    to={href(item.page)}
                    className="nav-link text-foreground/80 hover:text-primary inline-block text-[12px] tracking-[0.08em] uppercase"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="uppercase-spaced text-muted-foreground mb-5">
              {t("footer.sessions")}
            </h2>
            <ul className="space-y-3">
              {SESSIONS.map((session) => (
                <li key={session.slug}>
                  <Link
                    to={href(
                      "sessionDetail",
                      language === "en" ? session.slugEn : session.slug,
                    )}
                    className="nav-link text-foreground/80 hover:text-primary inline-block text-[12px] tracking-[0.08em] uppercase"
                  >
                    {t(session.shortKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="uppercase-spaced text-muted-foreground mb-5">
              {t("footer.contact")}
            </h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="text-primary mt-0.5 size-4 shrink-0" />
                <a
                  href={`tel:${CONTACT.phoneE164}`}
                  className="nav-link text-foreground/80 hover:text-primary"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="text-primary mt-0.5 size-4 shrink-0" />
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link text-foreground/80 hover:text-primary"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-primary mt-0.5 size-4 shrink-0" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="nav-link text-foreground/80 hover:text-primary"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Instagram className="text-primary mt-0.5 size-4 shrink-0" />
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link text-foreground/80 hover:text-primary"
                >
                  @{CONTACT.instagram}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Facebook className="text-primary mt-0.5 size-4 shrink-0" />
                <a
                  href={CONTACT.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link text-foreground/80 hover:text-primary"
                >
                  {CONTACT.facebook}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-0.5 size-4 shrink-0" />
                <span className="text-foreground/80">
                  {t(CONTACT.addressKey)}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="rule-line mt-14 mb-8" />

        <div className="text-muted-foreground flex flex-col items-center justify-between gap-3 text-xs md:flex-row">
          <div className="space-y-1 text-center md:text-left">
            <p>
              {t("footer.rights").replace(
                "{year}",
                String(new Date().getFullYear()),
              )}
            </p>
            <p className="text-muted-foreground/80">
              By{" "}
              <a
                href="https://nelsonjeronimo.pt"
                target="_blank"
                rel="noreferrer"
                className="nav-link hover:text-foreground"
              >
                Nelson Jeronimo
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 tracking-[0.08em] uppercase">
            <Link
              to={href("privacy")}
              className="nav-link hover:text-foreground"
            >
              {t("nav.privacy")}
            </Link>
            <a
              href={COMPLAINTS_URL}
              target="_blank"
              rel="noreferrer"
              className="nav-link hover:text-foreground"
            >
              {t("footer.complaints")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
