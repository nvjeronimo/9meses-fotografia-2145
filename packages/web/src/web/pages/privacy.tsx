import { useLanguage } from "../components/language-provider";
import { PageHero, PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { Seo } from "../components/seo";
import { CONTACT } from "../lib/site";

/** Each section of the policy, in reading order. */
const SECTIONS = [
  "controller",
  "data",
  "purpose",
  "legal",
  "retention",
  "images",
  "processors",
  "cookies",
  "rights",
  "complaints",
] as const;

const LAST_UPDATED = "2026-09-19";

function Privacy() {
  const { t, language } = useLanguage();

  const updated = new Date(LAST_UPDATED).toLocaleDateString(
    language === "pt" ? "pt-PT" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <PageShell>
      <Seo title={t("seo.privacy.title")} description={t("seo.privacy.desc")} />

      <PageHero labelKey="privacy.label" titleKey="privacy.title" />

      <section className="container pb-24 md:pb-32">
        <div className="mx-auto max-w-2xl">
          <p className="uppercase-spaced text-muted-foreground mb-14">
            {t("privacy.updated")}: {updated}
          </p>

          <div className="space-y-12">
            {SECTIONS.map((section, i) => (
              <Reveal key={section} delay={Math.min(i, 5) * 50}>
                <article>
                  <h2 className="display-serif mb-4 text-xl font-light md:text-2xl">
                    {t(`privacy.${section}.title`)}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(`privacy.${section}.text`)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <hr className="rule-line my-14" />

          <p className="text-muted-foreground text-sm leading-relaxed">
            <a
              href={`mailto:${CONTACT.email}`}
              className="nav-link text-primary"
            >
              {CONTACT.email}
            </a>
            {" · "}
            <a href={`tel:${CONTACT.phoneE164}`} className="nav-link text-primary">
              {CONTACT.phone}
            </a>
          </p>
        </div>
      </section>
    </PageShell>
  );
}

export default Privacy;
