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

  /** The session's own brand mark, so a card is placeable at a glance. */
  const iconFor = (type: string) =>
    SESSIONS.find((session) => session.sessionType === type)?.icon;

  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-6",
        rows.length > 2 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
        className,
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
                "flex h-full flex-col border p-6 md:p-10",
                row.highlighted
                  ? "border-primary/50 bg-card shadow-[0_1px_40px_-20px_rgba(0,0,0,0.25)]"
                  : "border-border/70 bg-background",
              )}
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <p className="uppercase-spaced text-muted-foreground">
                  {t("packages.package")}
                </p>
                {iconFor(row.sessionType) && (
                  <img
                    src={iconFor(row.sessionType)}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    /* Pulled up level with the label's cap height and kept small:
                       it marks the card, it does not headline it. */
                    className="brand-mark -mt-1.5 size-12 shrink-0 md:size-14"
                  />
                )}
              </div>
              <h3 className="display-serif text-2xl font-light">{row.name}</h3>
              <p className="display-serif text-primary mt-4 text-4xl font-light md:mt-5">
                {row.price}
                <span className="ml-1 text-xl">€</span>
              </p>
              <hr className="rule-line my-5 md:my-7" />
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
  );
}
