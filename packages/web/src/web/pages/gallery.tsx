import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useLanguage } from "../components/language-provider";
import { Seo } from "../components/seo";
import { BookingCta, PageHero, PageShell } from "../components/page-shell";
import { PhotoGrid } from "../components/photo-grid";
import { Reveal } from "../components/reveal";
import { useMixedPhotos } from "../lib/photos";
import type { PhotoCategory } from "../queries/photos";

const FILTERS: { value: PhotoCategory | "all"; key: string }[] = [
  { value: "all", key: "gallery.filter.all" },
  { value: "maternity", key: "gallery.filter.maternity" },
  { value: "newborn", key: "gallery.filter.newborn" },
  { value: "baby", key: "gallery.filter.baby" },
  { value: "family", key: "gallery.filter.family" },
  { value: "smash", key: "gallery.filter.smash" },
  { value: "studio", key: "gallery.filter.studio" },
];

const ALL_CATEGORIES: PhotoCategory[] = [
  "maternity",
  "newborn",
  "baby",
  "family",
  "smash",
  "studio",
];

const PAGE_SIZE = 12;

function Gallery() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<PhotoCategory | "all">("all");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const all = useMixedPhotos(ALL_CATEGORIES);

  const filtered = useMemo(
    () => (filter === "all" ? all : all.filter((photo) => photo.category === filter)),
    [all, filter],
  );

  const visible = filtered.slice(0, limit);

  return (
    <PageShell>
      <Seo title={t("seo.gallery.title")} description={t("seo.gallery.desc")} />

      <PageHero
        labelKey="gallery.hero.label"
        titleKey="gallery.hero.title"
        subtitleKey="gallery.hero.subtitle"
      />

      <section className="container section-y-b">
        <Reveal className="mb-10 flex flex-wrap justify-center gap-x-7 gap-y-1">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => {
                setFilter(item.value);
                setLimit(PAGE_SIZE);
              }}
              className={cn(
                "uppercase-spaced relative py-3 transition-colors duration-300",
                filter === item.value
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t(item.key)}
              <span
                className={cn(
                  "bg-primary absolute bottom-2 left-0 h-[1px] transition-all duration-300",
                  filter === item.value ? "w-full" : "w-0",
                )}
              />
            </button>
          ))}
        </Reveal>

        <PhotoGrid
          photos={visible}
          columns={4}
          emptyMessage={t("gallery.filter.empty")}
        />

        {filtered.length > limit && (
          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={() => setLimit((prev) => prev + PAGE_SIZE)}
              className="btn-outline"
            >
              {t("home.gallery.loadMore")}
            </button>
          </div>
        )}
      </section>

      <BookingCta />
    </PageShell>
  );
}

export default Gallery;
