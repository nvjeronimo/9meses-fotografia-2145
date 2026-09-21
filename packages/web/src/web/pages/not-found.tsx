import { Link } from "wouter";
import { useLanguage } from "../components/language-provider";
import { PageShell } from "../components/page-shell";

function NotFound() {
  const { t, href } = useLanguage();

  return (
    <PageShell>
      <section className="container flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
        <p className="display-serif text-primary/40 text-7xl font-light md:text-9xl">404</p>
        <h1 className="display-serif mt-6 text-3xl leading-tight font-light md:text-4xl">
          {t("notfound.title")}
        </h1>
        <p className="text-muted-foreground mt-5 max-w-md text-sm leading-relaxed">
          {t("notfound.text")}
        </p>
        <Link to={href("home")} className="btn-outline mt-10">
          {t("notfound.cta")}
        </Link>
      </section>
    </PageShell>
  );
}

export default NotFound;
