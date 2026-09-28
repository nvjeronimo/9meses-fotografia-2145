import { Link } from "wouter";
import { useLanguage } from "../components/language-provider";
import { BookingCta, PageHero, PageShell } from "../components/page-shell";
import { Reveal } from "../components/reveal";
import { Seo } from "../components/seo";
import { usePosts } from "../queries/posts";
import { responsive } from "../lib/responsive";

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

function Journal() {
  const { t, language, href } = useLanguage();
  const { data, isLoading } = usePosts();

  const posts = (data ?? []).filter(
    (post) => ((language === "pt" ? post.titlePt : post.titleEn) ?? "").trim().length > 0,
  );

  return (
    <PageShell>
      <Seo title={t("seo.journal.title")} description={t("seo.journal.desc")} />

      <PageHero labelKey="journal.label" titleKey="journal.title" subtitleKey="journal.subtitle" />

      <section className="container section-y-b">
        {isLoading ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="bg-muted aspect-[4/3] w-full" />
                <div className="bg-muted mt-5 h-3 w-24" />
                <div className="bg-muted mt-4 h-5 w-3/4" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground mx-auto max-w-md text-center text-sm">
            {t("journal.empty")}
          </p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => {
              const title = (language === "pt" ? post.titlePt : post.titleEn) ?? "";
              const excerpt = (language === "pt" ? post.excerptPt : post.excerptEn) ?? "";
              return (
                <Reveal key={post.id} delay={(i % 3) * 80}>
                  <article>
                    <Link to={href("journalPost", post.slug)} className="group block">
                      {post.coverUrl && (
                        <div className="mb-5 overflow-hidden">
                          <img
                            {...responsive(post.coverUrl, "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw")}
                            alt={title}
                            loading="lazy"
                            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                      )}
                      <p className="uppercase-spaced text-muted-foreground mb-3">
                        {formatDate(post.publishedAt, language)}
                      </p>
                      <h2 className="display-serif group-hover:text-primary text-xl leading-snug font-light transition-colors duration-300">
                        {title}
                      </h2>
                      {excerpt && (
                        <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                          {excerpt}
                        </p>
                      )}
                      {/* Text-only CTA, so it carries the header's animated
                          rule — drawn on hover of the whole card, like the
                          session and CTA cards. */}
                      <span className="uppercase-spaced text-primary link-underline mt-5 inline-block">
                        {t("journal.readmore")}
                      </span>
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      <BookingCta />
    </PageShell>
  );
}

export default Journal;
