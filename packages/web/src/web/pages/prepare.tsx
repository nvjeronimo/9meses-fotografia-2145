import { Baby, Cake, Camera, Heart, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "../components/language-provider";
import { BookingCta, PageHero, PageShell, SectionHeading } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { Seo } from "../components/seo";
import { CONTACT } from "../lib/site";

const TIPS = [1, 2, 3, 4] as const;

const SESSION_NOTES = [
  { key: "maternity", icon: Heart, inStudioOnly: false },
  { key: "newborn", icon: Baby, inStudioOnly: false },
  { key: "baby", icon: Baby, inStudioOnly: true },
  { key: "family", icon: Users, inStudioOnly: false },
  { key: "smash", icon: Cake, inStudioOnly: true },
] as const;

type SessionKey = (typeof SESSION_NOTES)[number]["key"];
const isSessionKey = (value: string): value is SessionKey =>
  SESSION_NOTES.some((note) => note.key === value);

function Prepare() {
  const { t, href } = useLanguage();
  // Session pages link here as /preparar-a-sessao#newborn.
  const [active, setActive] = useState<SessionKey>(() => {
    const hash = typeof window === "undefined" ? "" : window.location.hash.slice(1);
    return isSessionKey(hash) ? hash : "maternity";
  });
  useEffect(() => {
    if (isSessionKey(window.location.hash.slice(1))) {
      document.getElementById("sessoes")?.scrollIntoView();
    }
  }, []);
  const select = (key: SessionKey) => {
    setActive(key);
    history.replaceState(null, "", `#${key}`);
  };

  return (
    <PageShell>
      <Seo title={t("seo.prepare.title")} description={t("seo.prepare.desc")} />

      <PageHero
        labelKey="prepare.label"
        titleKey="prepare.title"
        subtitleKey="prepare.subtitle"
      />

      {/* Universal tips */}
      <section className="container section-y-b">
        <SectionHeading title={t("prepare.general.title")} />
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {TIPS.map((n, i) => (
            <Reveal key={n} delay={i * 70}>
              <div className="border-border/70 flex gap-5 border-t pt-7">
                <span className="display-serif text-primary/80 text-3xl leading-none font-light">
                  {String(n).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display-serif mb-3 text-xl font-light">
                    {t(`prepare.general.${n}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {t(`prepare.general.${n}.text`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Session by session — the brochure's "Antes / O dia" pages. */}
      <section id="sessoes" className="bg-card border-border/60 border-y section-y scroll-mt-24">
        <div className="container">
          <SectionHeading title={t("prepare.sessions.title")} />
          <div
            role="tablist"
            aria-label={t("prepare.sessions.title")}
            className="mx-auto mb-10 flex max-w-3xl flex-wrap justify-center gap-2 md:mb-14"
          >
            {SESSION_NOTES.map((note, i) => {
              const Icon = note.icon;
              const selected = note.key === active;
              return (
                <button
                  key={note.key}
                  id={`tab-${note.key}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`panel-${note.key}`}
                  // Roving tabindex: one tab stop, arrows move between tabs.
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(note.key)}
                  onKeyDown={(event) => {
                    const last = SESSION_NOTES.length - 1;
                    const to =
                      event.key === "ArrowRight" ? (i === last ? 0 : i + 1)
                      : event.key === "ArrowLeft" ? (i === 0 ? last : i - 1)
                      : event.key === "Home" ? 0
                      : event.key === "End" ? last
                      : null;
                    if (to === null) return;
                    event.preventDefault();
                    const next = SESSION_NOTES[to]!.key;
                    select(next);
                    document.getElementById(`tab-${next}`)?.focus();
                  }}
                  className={cn(
                    "uppercase-spaced inline-flex min-h-11 items-center gap-2 border px-4 transition-colors duration-300",
                    selected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground/70 hover:border-foreground/50 hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" strokeWidth={1.5} aria-hidden />
                  {t(`session.${note.key}`)}
                </button>
              );
            })}
          </div>

          {SESSION_NOTES.map((note) => (
            <div
              key={note.key}
              id={`panel-${note.key}`}
              role="tabpanel"
              hidden={note.key !== active}
              tabIndex={0}
              aria-labelledby={`tab-${note.key}`}
              className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-16 [&[hidden]]:hidden"
            >
              <h3 className="sr-only">{t(`prepare.${note.key}.title`)}</h3>
              {(["before", "day"] as const).map((part) => (
                <article key={part} className="animate-fade-in-up">
                  <p className="uppercase-spaced text-primary mb-4">
                    {t(
                      part === "before"
                        ? note.inStudioOnly
                          ? "prepare.session"
                          : "prepare.before"
                        : "prepare.day",
                    )}
                  </p>
                  <div className="text-muted-foreground space-y-4 text-base leading-relaxed">
                    {t(`prepare.${note.key}.${part}`)
                      .split("\n\n")
                      .map((paragraph) => (
                        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                      ))}
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* After the session */}
      <section className="container section-y">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Camera className="text-primary/40 mx-auto mb-7 size-8" strokeWidth={1.25} />
            <h2 className="display-serif mb-5 text-3xl font-light md:text-4xl">
              {t("prepare.after.title")}
            </h2>
            <ol className="mx-auto mt-10 grid max-w-3xl gap-8 text-left sm:grid-cols-2">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="border-border/70 border-t pt-5">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {t(`prepare.after.${n}`)}
                  </p>
                </li>
              ))}
            </ol>

            <hr className="rule-line mx-auto my-12 w-24" />

            <h3 className="display-serif mb-4 text-2xl font-light">{t("prepare.cta.title")}</h3>
            <p className="text-muted-foreground mx-auto mb-9 max-w-md text-base leading-relaxed">
              {t("prepare.cta.text")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to={href("contact")} className="btn-outline">
                {t("nav.contact.cta")}
              </Link>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                {t("contact.whatsapp.cta")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <BookingCta />
    </PageShell>
  );
}

export default Prepare;
