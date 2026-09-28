import { Link } from "wouter";
import type { Block, Policy } from "../content/legal";
import { CALL_NOTE_ID, CallMark } from "./call-note";
import { useLanguage } from "./language-provider";

/** Plain-text contacts in the policy copy become links. */
function linkify(text: string) {
  const parts = text.split(/(info@9mesesfotografia\.com|\+351 967 716 894|www\.[a-z.]+\.pt)/g);
  return parts.map((part, i) => {
    if (part === "info@9mesesfotografia.com") return <a key={i} href={`mailto:${part}`} className="text-primary link-underline">{part}</a>;
    if (part === "+351 967 716 894")
      return (
        <a key={i} href="tel:+351967716894" aria-describedby={CALL_NOTE_ID} className="text-primary link-underline whitespace-nowrap">
          {part}
          <CallMark />
        </a>
      );
    if (/^www\./.test(part)) return <a key={i} href={`https://${part}`} target="_blank" rel="noreferrer" className="text-primary link-underline">{part}</a>;
    return part;
  });
}

function BlockView({ block }: { block: Block }) {
  if ("p" in block) {
    return <p className="text-muted-foreground text-base leading-relaxed">{linkify(block.p)}</p>;
  }
  if ("ul" in block) {
    return (
      <ul className="text-muted-foreground space-y-3 text-base leading-relaxed">
        {block.ul.map((item) => (
          <li key={item} className="border-border/70 border-l pl-4">
            {linkify(item)}
          </li>
        ))}
      </ul>
    );
  }
  const { head, rows } = block.table;
  return (
    <div className="border-border/70 border">
      {/* Table from md up; stacked cards on phones, each label beside its value. */}
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="bg-card">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="uppercase-spaced text-muted-foreground px-4 py-3 align-bottom font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-border/70 border-t align-top">
              {row.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="text-foreground px-4 py-4 font-normal">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="text-muted-foreground px-4 py-4 leading-relaxed">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="divide-border/70 divide-y md:hidden">
        {rows.map((row) => (
          <dl key={row[0]} className="space-y-3 p-4">
            {row.map((cell, i) => (
              <div key={i}>
                <dt className="uppercase-spaced text-muted-foreground mb-1">{head[i]}</dt>
                <dd className={i === 0 ? "text-foreground" : "text-muted-foreground leading-relaxed"}>{cell}</dd>
              </div>
            ))}
          </dl>
        ))}
      </div>
    </div>
  );
}

/** Shared layout for the privacy and cookie policies. */
export function LegalBody({ policy, children }: { policy: Policy; children?: React.ReactNode }) {
  const { href } = useLanguage();
  return (
    <section className="container pb-24 md:pb-32">
      <div className="mx-auto max-w-3xl">
        <p className="display-serif text-foreground/85 text-xl leading-relaxed font-light md:text-2xl">
          {policy.lead}
        </p>

        <dl className="border-border/70 mt-8 flex flex-wrap gap-x-10 gap-y-3 border-y py-4">
          {policy.facts.map(([label, value]) => (
            <div key={label} className="flex items-baseline gap-2">
              <dt className="uppercase-spaced text-muted-foreground">{label}</dt>
              <dd className="text-foreground">{value}</dd>
            </div>
          ))}
        </dl>

        <nav aria-label={policy.tocLabel} className="mt-10">
          <p className="uppercase-spaced text-muted-foreground mb-3">{policy.tocLabel}</p>
          <ol className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {policy.sections.map((section, i) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="hover:text-primary inline-flex min-h-9 items-center gap-3 transition-colors">
                  <span className="text-primary tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-14 space-y-14">
          {policy.sections.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="display-serif mb-5 text-2xl font-light md:text-3xl">{section.title}</h2>
              <div className="space-y-5">
                {section.blocks.map((block, i) => (
                  <BlockView key={i} block={block} />
                ))}
              </div>
            </article>
          ))}
        </div>

        {children}

        <hr className="rule-line my-14" />
        <p className="text-muted-foreground text-base">
          {policy.crossLink.text}{" "}
          <Link to={href(policy.crossLink.page)} className="text-primary link-underline">
            {policy.crossLink.link}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
