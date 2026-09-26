import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Link } from "wouter";
import { usePackages, type SessionType } from "../queries/packages";
import { useLanguage } from "./language-provider";
import { Reveal } from "./reveal";

interface PackageCardsProps {
  sessionType: SessionType | SessionType[];
  className?: string;
  /** The Barriga + Bebé offer; on by default for maternity and newborn. */
  showBundle?: boolean;
}

export function PackageCards({ sessionType, className, showBundle = true }: PackageCardsProps) {
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
              {/* One heading row: label and name on the left, price on the right. */}
              <div className="flex items-center gap-4">
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
                  <li key={feature} className="flex items-start gap-3 text-base leading-relaxed">
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
      {showBundle && wanted.some((type) => type === "maternity" || type === "newborn") && (
        // The maternity + newborn discount, as an offer rather than fine print.
        <div className="border-primary/40 bg-background mx-auto mt-8 flex max-w-3xl flex-col items-start gap-5 border p-6 sm:flex-row sm:items-center sm:justify-between md:mt-10 md:p-8">
          <div>
            <p className="display-serif text-primary text-2xl font-light">{t("bundle.title")}</p>
            <p className="text-muted-foreground mt-2 text-base leading-relaxed">{t("bundle.text")}</p>
          </div>
          <Link
            to={`${href("contact")}?sessao=maternity&pacote=${encodeURIComponent(t("bundle.package"))}`}
            className="btn-outline shrink-0"
          >
            {t("bundle.cta")}
          </Link>
        </div>
      )}
      {notes.length > 0 && (
        <ul className="text-muted-foreground mx-auto mt-8 max-w-3xl space-y-2 text-center text-base leading-relaxed md:mt-10">
          {notes.map((key) => (
            <li key={key}>{t(key)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const PACKAGE_NOTES: Partial<Record<SessionType, string[]>> = {
  maternity: ["packages.note.studioOutdoor"],
  smash: ["packages.note.balloons"],
};
