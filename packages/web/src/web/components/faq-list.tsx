import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { Qa } from "../content/session-seo";
import { Reveal } from "./reveal";

/**
 * Question-and-answer accordion. Closed answers stay in the HTML (only their
 * height is collapsed), so search engines and AI crawlers read every answer.
 */
export function FaqList({ items, initiallyOpen = 0 }: { items: Qa[]; initiallyOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(initiallyOpen);

  return (
    <div className="mx-auto max-w-3xl">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <Reveal key={item.q} delay={i * 60}>
            <div className="border-border/70 border-b">
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className="display-serif text-lg leading-snug font-light md:text-xl">{item.q}</span>
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
                  <p className="text-muted-foreground pb-7 text-base leading-relaxed">{item.a}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/** FAQPage structured data for the same questions. */
export function faqJsonLd(items: Qa[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
