import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "wouter";
import { useLanguage } from "../components/language-provider";
import { BookingCta, PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { Seo } from "../components/seo";
import { SITE_URL } from "../lib/site";
import { usePost } from "../queries/posts";

function formatDate(value: string | Date | null, language: string) {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(language === "pt" ? "pt-PT" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function JournalPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t, language, href } = useLanguage();
  const { data: post, isLoading } = usePost(slug ?? "");

  if (isLoading) {
    return (
      <PageShell>
        <div className="container pt-36 pb-28 md:pt-44">
          <div className="mx-auto max-w-2xl animate-pulse">
            <div className="bg-muted h-3 w-28" />
            <div className="bg-muted mt-6 h-10 w-3/4" />
            <div className="bg-muted mt-10 h-4 w-full" />
            <div className="bg-muted mt-3 h-4 w-11/12" />
          </div>
        </div>
      </PageShell>
    );
  }

  if (!post) {
    return (
      <PageShell>
        <Seo title={t("journal.notfound")} description={t("seo.journal.desc")} noindex />
        <div className="container pt-40 pb-28 text-center md:pt-48">
          <p className="display-serif text-2xl font-light">{t("journal.notfound")}</p>
          <Link to={href("journal")} className="btn-outline mt-10 inline-block">
            {t("journal.back")}
          </Link>
        </div>
      </PageShell>
    );
  }

  const title = (language === "pt" ? post.titlePt : post.titleEn) ?? "";
  const excerpt = (language === "pt" ? post.excerptPt : post.excerptEn) ?? "";
  const body = (language === "pt" ? post.bodyPt : post.bodyEn) ?? "";
  const date = formatDate(post.publishedAt, language);

  // Paragraphs are stored as plain text with blank lines between them.
  const paragraphs = body.split(/\n\s*\n/).filter((block) => block.trim().length > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt,
    image: post.coverUrl ? `${SITE_URL}${post.coverUrl}` : undefined,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
    inLanguage: language === "pt" ? "pt-PT" : "en",
    author: { "@type": "Organization", name: "9 Meses Fotografia" },
    publisher: { "@type": "Organization", name: "9 Meses Fotografia" },
    mainEntityOfPage: `${SITE_URL}${href("journalPost", post.slug)}`,
  };

  return (
    <PageShell>
      <Seo
        title={title}
        description={excerpt || t("seo.journal.desc")}
        image={post.coverUrl ?? undefined}
        jsonLd={jsonLd}
      />

      <article>
        {post.coverUrl ? (
          <section className="relative flex h-[58vh] min-h-[380px] items-end overflow-hidden">
            <img
              src={post.coverUrl}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
            <div className="container relative z-10 pb-14 md:pb-20">
              <Reveal>
                <p className="uppercase-spaced mb-4 text-white/70">{date}</p>
                <h1 className="display-serif max-w-3xl text-3xl leading-[1.15] font-light text-white md:text-5xl">
                  {title}
                </h1>
              </Reveal>
            </div>
          </section>
        ) : (
          <section className="container pt-36 pb-4 text-center md:pt-44">
            <Reveal>
              <p className="uppercase-spaced text-muted-foreground mb-4">{date}</p>
              <h1 className="display-serif mx-auto max-w-3xl text-3xl leading-[1.15] font-light md:text-5xl">
                {title}
              </h1>
            </Reveal>
          </section>
        )}

        <section className="container section-y">
          <div className="mx-auto max-w-2xl">
            {excerpt && (
              <Reveal>
                <p className="display-serif mb-10 text-lg leading-relaxed font-light md:text-xl">
                  {excerpt}
                </p>
                <hr className="rule-line mb-10 w-24" />
              </Reveal>
            )}

            <div className="space-y-6">
              {paragraphs.map((block, i) => (
                <Reveal key={i} delay={Math.min(i, 4) * 50}>
                  <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    {block}
                  </p>
                </Reveal>
              ))}
            </div>

            <Link
              to={href("journal")}
              className="uppercase-spaced text-primary mt-14 inline-flex items-center gap-2"
            >
              <ArrowLeft className="size-4" />
              {t("journal.back")}
            </Link>
          </div>
        </section>
      </article>

      <BookingCta />
    </PageShell>
  );
}

export default JournalPost;
