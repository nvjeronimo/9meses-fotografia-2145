import { AguarelaDivider } from "../components/aguarela-divider";
import { BrochureCta } from "../components/brochure-cta";
import { FramedTitle } from "../components/framed-title";
import { useLanguage } from "../components/language-provider";
import { Seo } from "../components/seo";
import { PackageCards } from "../components/package-cards";
import { BookingCta, PageHero, PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import type { SessionType } from "../queries/packages";

const GROUPS: { titleKey: string; types: SessionType[] }[] = [
  { titleKey: "packages.maternity.title", types: ["maternity"] },
  { titleKey: "packages.newborn.title", types: ["newborn"] },
  { titleKey: "packages.baby.title", types: ["baby"] },
  { titleKey: "packages.family.title", types: ["family"] },
  { titleKey: "packages.smash.title", types: ["smash"] },
];

/** Brochura 2024 — "Produtos". */
const EXTRAS: { label: string; labelKey?: string; kindKey?: string; price: string; each?: boolean }[] = [
  { label: "digital", labelKey: "packages.extras.photos", price: "15€", each: true },
  { label: "10x15", kindKey: "packages.extras.print", price: "1€", each: true },
  { label: "13x18", kindKey: "packages.extras.print", price: "1,25€", each: true },
  { label: "15x20", kindKey: "packages.extras.print", price: "1,50€", each: true },
  { label: "30x40", kindKey: "packages.extras.canvasOne", price: "45€" },
  { label: "40x60", kindKey: "packages.extras.canvasOne", price: "60€" },
  { label: "50x75", kindKey: "packages.extras.canvasOne", price: "85€" },
  { label: "60x90", kindKey: "packages.extras.canvasOne", price: "115€" },
  { label: "100x150", kindKey: "packages.extras.canvasOne", price: "230€" },
];

function Packages() {
  const { t } = useLanguage();

  return (
    <PageShell>
      <Seo title={t("seo.packages.title")} description={t("seo.packages.desc")} />

      <PageHero
        labelKey="nav.packages"
        titleKey="packages.title"
        subtitleKey="packages.subtitle"
      />

      <section className="container section-y-b section-flush-b">
        <div className="space-y-12 md:space-y-28">
          {GROUPS.map((group) => (
            <div key={group.titleKey}>
              <Reveal>
                <FramedTitle className="mb-8 md:mb-12">{t(group.titleKey)}</FramedTitle>
              </Reveal>
              <div className="mx-auto max-w-5xl">
                <PackageCards sessionType={group.types} />
              </div>
            </div>
          ))}
        </div>

        <Reveal>
          {/* Extras and terms straight from the brochure, so nothing about the
              price has to be discovered later on WhatsApp. */}
          <div className="border-border/70 mx-auto mt-14 grid max-w-5xl gap-12 border-t pt-12 md:mt-24 md:grid-cols-2 md:gap-20 md:pt-16">
            <div>
              <h2 className="display-serif mb-6 text-3xl font-light">{t("packages.extras.title")}</h2>
              <dl className="divide-border/60 divide-y text-sm">
                {EXTRAS.map((line) => (
                  <div key={line.label} className="flex items-baseline justify-between gap-6 py-3">
                    <dt className="text-muted-foreground">
                      {line.labelKey ? t(line.labelKey) : `${t(line.kindKey ?? "")} ${line.label}`}
                      {line.each && <span className="text-muted-foreground/70"> ({t("packages.extras.each")})</span>}
                    </dt>
                    <dd className="display-serif text-foreground shrink-0 text-lg tabular-nums">
                      {line.price}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="display-serif mb-6 text-3xl font-light">{t("packages.terms.title")}</h2>
              <ul className="text-muted-foreground space-y-4 text-sm leading-relaxed">
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n} className="border-border/60 border-l pl-4">
                    {t(`packages.terms.${n}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* The catalogue closes the page, after the extras: by this point the
            reader has seen every package, and this is what they take with
            them. */}
        <BrochureCta className="mx-auto mt-14 max-w-5xl md:mt-24" />
      </section>

      <AguarelaDivider />

      <BookingCta />
    </PageShell>
  );
}

export default Packages;
