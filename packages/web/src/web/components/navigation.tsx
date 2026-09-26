import { cn } from "@/lib/utils";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import { useLanguage } from "./language-provider";
import { useTheme } from "./theme-provider";
import type { PageId } from "../lib/routes";

interface NavItem {
  page: PageId;
  key: string;
}

interface NavGroup {
  /** Label key for the trigger. */
  key: string;
  /** The page the trigger itself links to. */
  page: PageId;
  children: NavItem[];
}

type NavEntry = NavItem | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

/**
 * Five top-level entries instead of ten — the long flat list left no room for
 * a booking CTA and gave the nav no hierarchy.
 */
const NAV: NavEntry[] = [
  {
    key: "nav.group.about",
    page: "about",
    children: [
      { page: "about", key: "nav.about" },
      { page: "studio", key: "nav.studio" },
    ],
  },
  {
    key: "nav.group.sessions",
    page: "sessions",
    children: [
      { page: "sessions", key: "nav.sessions.all" },
      { page: "packages", key: "nav.packages" },
      { page: "prepare", key: "nav.prepare" },
      { page: "faq", key: "nav.faq" },
    ],
  },
  { page: "gallery", key: "nav.gallery" },
  { page: "journal", key: "nav.journal" },
  { page: "contact", key: "nav.contact" },
];

/** Flat list for the mobile drawer, where a dropdown would only add taps. */
const MOBILE_LINKS: NavItem[] = [
  { page: "home", key: "nav.home" },
  { page: "about", key: "nav.about" },
  { page: "studio", key: "nav.studio" },
  { page: "sessions", key: "nav.sessions" },
  { page: "packages", key: "nav.packages" },
  { page: "gallery", key: "nav.gallery" },
  { page: "prepare", key: "nav.prepare" },
  { page: "journal", key: "nav.journal" },
  { page: "faq", key: "nav.faq" },
  { page: "contact", key: "nav.contact" },
];

export function Navigation() {
  const { t, language, toggleLanguage, href } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const groupButtons = useRef(new Map<string, HTMLButtonElement>());
  /** The drawer starts below the bar, whose height now varies with the logo. */
  const [barHeight, setBarHeight] = useState(60);

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setBarHeight(headerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [scrolled, open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [location]);

  /**
   * Pages that open on a full-bleed photo mark their hero `data-hero="dark"`.
   * Over one, the default dark nav text is unreadable, so it flips to white.
   */
  useEffect(() => {
    // Watched rather than read once: the page's hero can mount after the bar.
    const check = () =>
      setOverHero(Boolean(document.querySelector('[data-hero="dark"]')));
    const frame = requestAnimationFrame(check);
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return () => void (document.body.style.overflow = "");
    // Drawer behaves as a modal: the page behind is inert, focus starts on the
    // first link, Escape closes it and focus goes back to the menu button.
    const behind = document.querySelectorAll<HTMLElement>("main, footer, [data-floating]");
    behind.forEach((node) => (node.inert = true));
    requestAnimationFrame(() => drawerRef.current?.querySelector<HTMLElement>("a")?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      behind.forEach((node) => (node.inert = false));
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!openGroup) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Hand focus back to the group's button before its links disappear.
      groupButtons.current.get(openGroup)?.focus();
      setOpenGroup(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openGroup]);

  /** Small grace period so the pointer can travel into the dropdown. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenGroup(null), 160);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const isActive = (page: PageId) => {
    const to = href(page);
    return page === "home" ? location === to : location.startsWith(to);
  };

  /** White nav: only while sitting on top of the photo, before the bar solidifies. */
  const onPhoto = overHero && !scrolled && !open;

  const linkTone = onPhoto
    ? { idle: "text-white/80 hover:text-white", active: "text-white is-active" }
    : {
        idle: "text-foreground/70 hover:text-foreground",
        active: "text-primary is-active",
      };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        scrolled
          ? "border-border/50 bg-background/80 border-b py-2.5 shadow-[0_1px_24px_-16px_rgba(0,0,0,0.45)] backdrop-blur-xl"
          : "border-b border-transparent py-5 md:py-7",
        // With the drawer open the bar sits on the drawer, not on the photo.
        open && "bg-background border-border/50 border-b",
      )}
    >
      {/*
        Three columns so the logo stays optically centred whatever the nav or
        the action cluster measure on either side.
      */}
      <div className="container grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/*
          The wrapper always occupies its grid column — hiding the nav itself
          on mobile would collapse the column and pull the logo off centre.
        */}
        <div className="flex items-center">
          {/* Full nav only from 1280px: below that the links crowd the logo. */}
          <nav className="hidden items-center gap-6 xl:flex 2xl:gap-8">
            {NAV.map((entry) => {
              if (!isGroup(entry)) {
                const active = isActive(entry.page);
                return (
                  <Link
                    key={entry.page}
                    to={href(entry.page)}
                    className={cn(
                      "nav-link uppercase-spaced relative py-1 text-[11px] whitespace-nowrap",
                      active ? linkTone.active : linkTone.idle,
                    )}
                  >
                    {t(entry.key)}
                  </Link>
                );
              }

              const groupActive = entry.children.some((child) =>
                isActive(child.page),
              );
              const expanded = openGroup === entry.key;

              return (
                <div
                  key={entry.key}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenGroup(entry.key);
                  }}
                  onMouseLeave={scheduleClose}
                  onBlur={(event) => {
                    // Tabbing out of the group closes its panel.
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setOpenGroup((current) => (current === entry.key ? null : current));
                    }
                  }}
                >
                  <button
                    type="button"
                    ref={(node) => {
                      if (node) groupButtons.current.set(entry.key, node);
                    }}
                    aria-expanded={expanded}
                    onClick={() => setOpenGroup(expanded ? null : entry.key)}
                    className={cn(
                      "nav-link uppercase-spaced relative flex items-center gap-1.5 py-1 text-[11px] whitespace-nowrap",
                      groupActive ? linkTone.active : linkTone.idle,
                    )}
                  >
                    {t(entry.key)}
                    <ChevronDown
                      className={cn(
                        "size-3 transition-transform duration-300",
                        expanded && "rotate-180",
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "absolute top-full left-1/2 z-50 w-60 -translate-x-1/2 pt-4 transition-all duration-200",
                      expanded
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0",
                    )}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="border-border/60 bg-background/95 border p-2 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                      <p className="text-muted-foreground px-4 pt-2 pb-3 text-[11px] leading-snug">
                        {t(`${entry.key}.desc`)}
                      </p>
                      {entry.children.map((child) => (
                        <Link
                          key={child.page}
                          to={href(child.page)}
                          onClick={() => setOpenGroup(null)}
                          className={cn(
                            "uppercase-spaced hover:bg-card block px-4 py-3 text-[11px] transition-colors duration-200",
                            isActive(child.page)
                              ? "text-primary"
                              : "text-foreground/75 hover:text-foreground",
                          )}
                        >
                          {t(child.key)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        <Link
          to={href("home")}
          className="flex shrink-0 items-center justify-center"
          aria-label="9 Meses Fotografia"
        >
          <img
            src="/images/logo.webp"
            alt="9 Meses Fotografia"
            width={330}
            height={196}
            className={cn(
              "w-auto transition-all duration-500",
              scrolled ? "h-10 md:h-12" : "h-16 md:h-24",
            )}
          />
        </Link>

        <div className="flex items-center justify-end gap-2">
          <Link
            to={href("contact")}
            className={cn(
              "hidden border px-5 py-2.5 text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 xl:inline-block",
              onPhoto
                ? "border-white/70 text-white hover:bg-white hover:text-stone-900"
                : "border-foreground text-foreground hover:bg-foreground hover:text-background",
            )}
          >
            {t("nav.contact.cta")}
          </Link>
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t("nav.language")}
            className={cn(
              // Same borderless treatment as the theme toggle beside it.
              "uppercase-spaced grid size-11 shrink-0 place-items-center transition-colors duration-300",
              onPhoto
                ? "text-white/80 hover:text-white"
                : "text-foreground/70 hover:text-foreground",
            )}
          >
            {language === "pt" ? "EN" : "PT"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t("nav.theme.toggle")}
            className={cn(
              // On phones it lives in the drawer, so the bar keeps two
              // full-size targets beside the centred logo.
              "hidden size-11 shrink-0 place-items-center transition-colors duration-300 xl:grid",
              onPhoto
                ? "text-white/80 hover:text-white"
                : "text-foreground/70 hover:text-foreground",
            )}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>
          <button
            type="button"
            ref={menuButtonRef}
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? t("nav.menu.close") : t("nav.menu.toggle")}
            aria-expanded={open}
            className={cn(
              "-mr-2 grid size-11 shrink-0 place-items-center xl:hidden",
              onPhoto ? "text-white" : "text-foreground",
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/*
        Portalled to <body>: the scrolled bar's backdrop-filter makes the
        header the containing block for fixed children, which collapsed the
        drawer to 0px once the page had been scrolled.
      */}
      {open &&
        createPortal(
            <div
              ref={drawerRef}
              className="bg-background fixed inset-x-0 bottom-0 z-40 overflow-y-auto xl:hidden"
              style={{ top: barHeight }}
            >
              <nav className="container flex flex-col pt-4 pb-10">
                {MOBILE_LINKS.map((link, index) => (
                  <Link
                    key={link.page}
                    to={href(link.page)}
                    className={cn(
                      "border-border/60 uppercase-spaced border-b py-4",
                      isActive(link.page) && "text-primary",
                    )}
                    style={{
                      animation: `fadeInUp 0.4s ease-out ${index * 35}ms both`,
                    }}
                  >
                    {t(link.key)}
                  </Link>
                ))}
                <Link
                  to={href("contact")}
                  className="btn-solid mt-8"
                  style={{
                    animation: `fadeInUp 0.4s ease-out ${MOBILE_LINKS.length * 35}ms both`,
                  }}
                >
                  {t("nav.contact.cta")}
                </Link>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="uppercase-spaced text-muted-foreground hover:text-foreground mt-6 flex min-h-11 items-center gap-3 self-start"
                >
                  {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
                  {t("nav.theme.toggle")}
                </button>
              </nav>
            </div>,
          document.body,
        )}
    </header>
  );
}
