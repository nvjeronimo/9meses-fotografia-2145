import { LegalBody } from "../components/legal-page";
import { useLanguage } from "../components/language-provider";
import { PageHero, PageShell } from "../components/page-shell";
import { Seo } from "../components/seo";
import { PRIVACY } from "../content/legal";

function Privacy() {
  const { t, language } = useLanguage();
  return (
    <PageShell>
      <Seo title={t("seo.privacy.title")} description={t("seo.privacy.desc")} />
      <PageHero labelKey="privacy.label" titleKey="privacy.title" />
      <LegalBody policy={PRIVACY[language]} />
    </PageShell>
  );
}

export default Privacy;
