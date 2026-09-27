import { useState } from "react";
import { LegalBody } from "../components/legal-page";
import { useLanguage } from "../components/language-provider";
import { PageHero, PageShell } from "../components/page-shell";
import { Seo } from "../components/seo";
import { COOKIES } from "../content/legal";

/** Everything this site keeps in the browser (see content/legal.ts). */
const STORED_KEYS = ["9meses.theme", "contact"];

function Cookies() {
  const { t, language } = useLanguage();
  const [cleared, setCleared] = useState(false);

  const forget = () => {
    try {
      for (const key of STORED_KEYS) localStorage.removeItem(key);
    } catch {
      // Storage blocked: nothing was stored either.
    }
    document.documentElement.classList.remove("dark");
    setCleared(true);
  };

  return (
    <PageShell>
      <Seo title={t("seo.cookies.title")} description={t("seo.cookies.desc")} />
      <PageHero labelKey="cookies.label" titleKey="cookies.title" />
      <LegalBody policy={COOKIES[language]}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button type="button" onClick={forget} className="btn-outline">
            {t("cookies.forget")}
          </button>
          <p role="status" className="text-muted-foreground text-sm">
            {cleared ? t("cookies.forgotten") : ""}
          </p>
        </div>
      </LegalBody>
    </PageShell>
  );
}

export default Cookies;
