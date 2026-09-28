import { Gift, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "../components/language-provider";
import { BookingCta, PageHero, PageShell, SectionHeading } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { Seo } from "../components/seo";
import { CONTACT } from "../lib/site";

const STEPS = [1, 2, 3, 4] as const;
const TERMS = [1, 2, 3, 4, 5] as const;

/** Gift vouchers, with the conditions from the printed brochure. */
function Vouchers() {
  const { t, href } = useLanguage();
  const whatsapp = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(t("vouchers.whatsapp.text"))}`;

  return (
    <PageShell>
      <Seo title={t("seo.vouchers.title")} description={t("seo.vouchers.desc")} />
      <PageHero labelKey="vouchers.label" titleKey="vouchers.title" subtitleKey="vouchers.subtitle" />

      <section className="container section-y-b">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="display-serif text-foreground/85 text-center text-xl leading-relaxed font-light md:text-2xl">
              {t("vouchers.intro")}
            </p>
          </Reveal>

          <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {STEPS.map((n, i) => (
              <Reveal key={n} as="li" delay={i * 70}>
                <div className="border-border/70 flex gap-5 border-t pt-7">
                  <span className="display-serif text-primary/80 text-3xl leading-none font-light">
                    {String(n).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="display-serif mb-2 text-xl font-light">{t(`vouchers.step.${n}.title`)}</h2>
                    <p className="text-muted-foreground text-base leading-relaxed">{t(`vouchers.step.${n}.text`)}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <div className="mt-14 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                to={`${href("contact")}?pacote=${encodeURIComponent(t("vouchers.package"))}`}
                className="btn-solid inline-flex items-center justify-center gap-2.5"
              >
                <Gift className="size-4" aria-hidden />
                {t("vouchers.cta")}
              </Link>
              <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-outline inline-flex items-center justify-center gap-2.5">
                <MessageCircle className="size-4" aria-hidden />
                {t("contact.whatsapp.cta")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-card border-border/60 border-y section-y">
        <div className="container">
          <SectionHeading title={t("vouchers.terms.title")} />
          <ul className="text-muted-foreground mx-auto max-w-2xl space-y-4 text-base leading-relaxed">
            {TERMS.map((n) => (
              <li key={n} className="border-border/70 border-l pl-4">
                {t(`vouchers.terms.${n}`)}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center">
            <Link to={href("packages")} className="link-underline uppercase-spaced text-primary">
              {t("vouchers.packagesLink")}
            </Link>
          </p>
        </div>
      </section>

      <BookingCta />
    </PageShell>
  );
}

export default Vouchers;
