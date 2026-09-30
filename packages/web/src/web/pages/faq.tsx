import { useLanguage } from "../components/language-provider";
import { Seo } from "../components/seo";
import { BookingCta, PageHero, PageShell } from "../components/page-shell";
import { FaqList, faqJsonLd } from "../components/faq-list";

const ITEMS = [1, 2, 3, 4, 5, 6] as const;

function Faq() {
  const { t } = useLanguage();
  const items = ITEMS.map((n) => ({ q: t(`faq.q${n}`), a: t(`faq.a${n}`) }));

  return (
    <PageShell>
      <Seo title={t("seo.faq.title")} description={t("seo.faq.desc")} jsonLd={faqJsonLd(items)} />
      <PageHero labelKey="nav.faq" titleKey="faq.title" subtitleKey="faq.subtitle" />
      <section className="container section-y-b">
        <FaqList items={items} />
      </section>
      <BookingCta />
    </PageShell>
  );
}

export default Faq;
