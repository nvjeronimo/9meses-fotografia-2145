import { Baby, Cake, Camera, Heart, Users } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "../components/language-provider";
import { BookingCta, PageHero, PageShell, SectionHeading } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { Seo } from "../components/seo";
import { CONTACT } from "../lib/site";

const TIPS = [1, 2, 3, 4] as const;

const SESSION_NOTES = [
  { key: "maternity", icon: Heart },
  { key: "newborn", icon: Baby },
  { key: "baby", icon: Cake },
  { key: "family", icon: Users },
] as const;

function Prepare() {
  const { t, href } = useLanguage();

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
                <span className="display-serif text-primary/40 text-3xl leading-none font-light">
                  {String(n).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display-serif mb-3 text-xl font-light">
                    {t(`prepare.general.${n}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(`prepare.general.${n}.text`)}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Per-session notes */}
      <section className="bg-card border-border/60 border-y section-y">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-12">
            {SESSION_NOTES.map((note, i) => {
              const Icon = note.icon;
              return (
                <Reveal key={note.key} delay={i * 70}>
                  <article className="flex gap-6">
                    <Icon
                      className="text-primary mt-1.5 size-6 shrink-0"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                    <div>
                      <h3 className="display-serif mb-3 text-2xl font-light">
                        {t(`prepare.${note.key}.title`)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {t(`prepare.${note.key}.text`)}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
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
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              {t("prepare.after.text")}
            </p>

            <hr className="rule-line mx-auto my-12 w-24" />

            <h3 className="display-serif mb-4 text-2xl font-light">{t("prepare.cta.title")}</h3>
            <p className="text-muted-foreground mx-auto mb-9 max-w-md text-sm leading-relaxed">
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
