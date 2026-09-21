import { AguarelaDivider } from "../components/aguarela-divider";
import { BrochureCta } from "../components/brochure-cta";
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
                <div className="mb-7 text-center md:mb-10">
                  <h2 className="display-serif text-[1.9rem] leading-tight font-light md:text-5xl">
                    {t(group.titleKey)}
                  </h2>
                  <hr className="rule-line mx-auto mt-5 w-16 md:mt-6" />
                </div>
              </Reveal>
              <div className="mx-auto max-w-5xl">
                <PackageCards sessionType={group.types} />
              </div>
            </div>
          ))}
        </div>

        <Reveal>
          {/* Set as a pull quote rather than fine print: it is the one line that
              tells the reader the packages are a starting point, so it carries
              the same serif italic voice as the studio quote. */}
          <p className="display-serif text-foreground/85 mx-auto mt-12 max-w-2xl border-t pt-8 text-center text-xl leading-relaxed font-light italic md:mt-20 md:pt-10 md:text-2xl">
            {t("packages.extras")}
          </p>
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
