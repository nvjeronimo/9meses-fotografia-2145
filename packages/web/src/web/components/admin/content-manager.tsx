import { RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { groupedTranslationKeys, translations, type TranslationKey } from "../../lib/translations";
import { useContentOverrides, useResetContent, useSetContent } from "../../queries/content";
import { AdminButton, AdminCard, AdminLabel, useAdminCopy } from "./admin-ui";

const GROUP_LABELS: Record<string, { pt: string; en: string }> = {
  nav: { pt: "Navegação", en: "Navigation" },
  session: { pt: "Nomes das sessões", en: "Session names" },
  home: { pt: "Página inicial", en: "Home page" },
  about: { pt: "Sobre mim", en: "About" },
  studio: { pt: "Estúdio", en: "Studio" },
  sessions: { pt: "Sessões", en: "Sessions" },
  packages: { pt: "Pacotes", en: "Packages" },
  gallery: { pt: "Galeria", en: "Gallery" },
  faq: { pt: "FAQ", en: "FAQ" },
  contact: { pt: "Contacto", en: "Contact" },
  footer: { pt: "Rodapé", en: "Footer" },
  notfound: { pt: "Página 404", en: "404 page" },
  lightbox: { pt: "Visualizador de imagens", en: "Image viewer" },
  hero: { pt: "Slideshow", en: "Slideshow" },
  brand: { pt: "Marca", en: "Brand" },
};

function isLongText(value: string) {
  return value.length > 90;
}

export function ContentManager({ language }: { language: "pt" | "en" }) {
  const copy = useAdminCopy();
  const overrides = useContentOverrides();
  const setContent = useSetContent();
  const resetContent = useResetContent();

  const [query, setQuery] = useState("");
  const [openGroup, setOpenGroup] = useState<string | null>("home");

  const overrideMap = useMemo(() => {
    const map = new Map<string, { valuePt: string | null; valueEn: string | null }>();
    for (const row of overrides.data ?? []) {
      map.set(row.key, { valuePt: row.valuePt, valueEn: row.valueEn });
    }
    return map;
  }, [overrides.data]);

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return groupedTranslationKeys()
      .map(([group, keys]) => {
        const filtered = needle
          ? keys.filter(
              (key) =>
                key.toLowerCase().includes(needle) ||
                translations.pt[key].toLowerCase().includes(needle) ||
                translations.en[key].toLowerCase().includes(needle),
            )
          : keys;
        return [group, filtered] as const;
      })
      .filter(([, keys]) => keys.length > 0);
  }, [query]);

  function save(key: TranslationKey, field: "valuePt" | "valueEn", value: string) {
    const current = overrideMap.get(key);
    const next = {
      key,
      valuePt: current?.valuePt ?? null,
      valueEn: current?.valueEn ?? null,
      [field]: value.trim() === "" ? null : value,
    };
    if (next.valuePt === null && next.valueEn === null) {
      resetContent.mutate({ key });
      return;
    }
    setContent.mutate(next);
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-xs leading-relaxed">{copy.contentIntro}</p>

      <input
        aria-label={copy.searchKeys}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={copy.searchKeys}
        className="field max-w-md"
      />

      <div className="space-y-3">
        {groups.map(([group, keys]) => {
          const label = GROUP_LABELS[group];
          const open = query.trim() !== "" || openGroup === group;
          return (
            <div key={group} className="border-border/70 bg-card border">
              <button
                type="button"
                onClick={() => setOpenGroup(open && !query ? null : group)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="uppercase-spaced">
                  {label ? (language === "pt" ? label.pt : label.en) : group}
                </span>
                <span className="text-muted-foreground text-xs">{keys.length}</span>
              </button>

              {open && (
                <div className="border-border/70 space-y-6 border-t px-5 py-6">
                  {keys.map((key) => {
                    const override = overrideMap.get(key);
                    const originalPt = translations.pt[key];
                    const originalEn = translations.en[key];
                    const long = isLongText(originalPt) || isLongText(originalEn);
                    const Field = long ? "textarea" : "input";

                    return (
                      <div key={key} className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <code className="text-muted-foreground text-[10px] tracking-wider">
                            {key}
                          </code>
                          {override && (
                            <AdminButton
                              variant="ghost"
                              onClick={() => resetContent.mutate({ key })}
                              className="inline-flex shrink-0 items-center gap-1.5"
                            >
                              <RotateCcw className="size-3" />
                              {copy.reset}
                            </AdminButton>
                          )}
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="block">
                            <AdminLabel>PT</AdminLabel>
                            <Field
                              key={`pt-${key}-${override?.valuePt ?? ""}`}
                              rows={long ? 3 : undefined}
                              defaultValue={override?.valuePt ?? originalPt}
                              onBlur={(
                                event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
                              ) => {
                                if (event.target.value !== (override?.valuePt ?? originalPt)) {
                                  save(key, "valuePt", event.target.value);
                                }
                              }}
                              className="field"
                            />
                          </div>
                          <div className="block">
                            <AdminLabel>EN</AdminLabel>
                            <Field
                              key={`en-${key}-${override?.valueEn ?? ""}`}
                              rows={long ? 3 : undefined}
                              defaultValue={override?.valueEn ?? originalEn}
                              onBlur={(
                                event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
                              ) => {
                                if (event.target.value !== (override?.valueEn ?? originalEn)) {
                                  save(key, "valueEn", event.target.value);
                                }
                              }}
                              className="field"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {groups.length === 0 && (
        <AdminCard>
          <p className="text-muted-foreground text-sm">—</p>
        </AdminCard>
      )}
    </div>
  );
}
