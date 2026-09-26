import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Link } from "wouter";
import { usePackages, type SessionType } from "../queries/packages";
import { SESSIONS } from "../lib/site";
import { useLanguage } from "./language-provider";
import { Reveal } from "./reveal";

interface PackageCardsProps {
  sessionType: SessionType | SessionType[];
  className?: string;
}

export function PackageCards({ sessionType, className }: PackageCardsProps) {
  const { t, language, href } = useLanguage();
  const query = usePackages();
  const wanted = Array.isArray(sessionType) ? sessionType : [sessionType];

  const rows = (query.data ?? [])
    .filter((row) => row.published && wanted.includes(row.sessionType as SessionType))
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);

  if (rows.length === 0) return null;

  /** Brochure notes that belong to these sessions (bundle discount, add-ons). */
  const notes = wanted.flatMap((type) => PACKAGE_NOTES[type] ?? []);
  const packageWord = t("packages.package").toLowerCase();

  /** The session's own brand mark, so a card is placeable at a glance. */
  const iconFor = (type: string) =>
    SESSIONS.find((session) => session.sessionType === type)?.icon;

  return (
    <div className={className}>
    <div
      className={cn(
        "grid gap-4 sm:gap-6",
        rows.length > 2 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      {rows.map((row, i) => {
        const features = (language === "pt" ? row.featuresPt : row.featuresEn)
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);

        return (
          <Reveal key={row.id} delay={i * 100} as="article">
            <div
              className={cn(
                "flex h-full flex-col border p-6 md:p-8",
                row.highlighted
                  ? "border-primary/50 bg-card shadow-[0_1px_40px_-20px_rgba(0,0,0,0.25)]"
                  : "border-border/70 bg-background",
              )}
            >
              {/* One heading row: mark, label and name on the left, price on the right. */}
              <div className="flex items-center gap-4">
                {iconFor(row.sessionType) && (
                  <img
                    src={iconFor(row.sessionType)}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="brand-mark size-12 shrink-0"
                  />
                )}
                <div className="min-w-0">
                  {/* "Pacote 1" already says it; don't print "Pacote" twice. */}
                  {!row.name.toLowerCase().startsWith(packageWord) && (
                    <p className="uppercase-spaced text-muted-foreground mb-1">
                      {t("packages.package")}
                    </p>
                  )}
                  <h3 className="display-serif text-2xl leading-tight font-light">{row.name}</h3>
                </div>
                <p className="display-serif text-primary ml-auto shrink-0 text-3xl leading-none font-light whitespace-nowrap md:text-4xl">
                  {row.price}
                  <span className="ml-0.5 text-lg md:text-xl">€</span>
                </p>
              </div>
              <hr className="rule-line my-5 md:my-6" />
              <ul className="mb-7 flex-1 space-y-2.5 md:mb-9 md:space-y-3.5">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm leading-relaxed">
                    <Check className="text-primary mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={`${href("contact")}?sessao=${row.sessionType}&pacote=${encodeURIComponent(
                  `${row.name} · ${row.price}€`,
                )}`}
                className={cn(row.highlighted ? "btn-solid" : "btn-outline", "self-start")}
              >
                {t("packages.cta")}
              </Link>
            </div>
          </Reveal>
        );
      })}
    </div>
      {notes.length > 0 && (
        <ul className="text-muted-foreground mx-auto mt-8 max-w-3xl space-y-2 text-center text-sm leading-relaxed md:mt-10">
          {notes.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const PACKAGE_NOTES: Partial<Record<SessionType, string[]>> = {
  maternity: ["packages.note.studioOutdoor", "packages.note.bundle"],
  newborn: ["packages.note.bundle"],
  smash: ["packages.note.balloons"],
};
