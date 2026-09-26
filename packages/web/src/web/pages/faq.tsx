import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../components/language-provider";
import { Seo } from "../components/seo";
import { BookingCta, PageHero, PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";

const ITEMS = [1, 2, 3, 4, 5, 6] as const;

function Faq() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(1);

  return (
    <PageShell>
      <Seo
        title={t("seo.faq.title")}
        description={t("seo.faq.desc")}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: ITEMS.map((n) => ({
            "@type": "Question",
            name: t(`faq.q${n}`),
            acceptedAnswer: { "@type": "Answer", text: t(`faq.a${n}`) },
          })),
        }}
      />

      <PageHero labelKey="nav.faq" titleKey="faq.title" subtitleKey="faq.subtitle" />

      <section className="container section-y-b">
        <div className="mx-auto max-w-3xl">
          {ITEMS.map((n, i) => {
            const expanded = open === n;
            return (
              <Reveal key={n} delay={i * 60}>
                <div className="border-border/70 border-b">
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : n)}
                    aria-expanded={expanded}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="display-serif text-lg leading-snug font-light md:text-xl">
                      {t(`faq.q${n}`)}
                    </span>
                    <Plus
                      className={cn(
                        "text-primary mt-1 size-5 shrink-0 transition-transform duration-300",
                        expanded && "rotate-45",
                      )}
                      strokeWidth={1.25}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-out",
                      expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-muted-foreground pb-7 text-base leading-relaxed">
                        {t(`faq.a${n}`)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <BookingCta />
    </PageShell>
  );
}

export default Faq;
