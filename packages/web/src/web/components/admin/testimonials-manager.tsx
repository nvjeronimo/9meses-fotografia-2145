import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";
import {
  useAllTestimonials,
  useCreateTestimonial,
  useDeleteTestimonial,
  useUpdateTestimonial,
} from "../../queries/testimonials";
import { AdminButton, AdminCard, AdminLabel, useAdminCopy } from "./admin-ui";

type SessionType = "maternity" | "newborn" | "baby" | "family" | "smash";

const SESSION_TYPES: { value: SessionType; pt: string; en: string }[] = [
  { value: "maternity", pt: "Maternidade", en: "Maternity" },
  { value: "newborn", pt: "Newborn", en: "Newborn" },
  { value: "baby", pt: "Bebé", en: "Baby" },
  { value: "family", pt: "Família", en: "Family" },
  { value: "smash", pt: "Smash the Cake", en: "Smash the Cake" },
];

/**
 * Client reviews, editable by the studio. Text fields commit on blur — the same
 * pattern the photo and package managers use, so there is no save button to
 * forget.
 */
export function TestimonialsManager({ language }: { language: "pt" | "en" }) {
  const copy = useAdminCopy();
  const query = useAllTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const rows = useMemo(
    () => [...(query.data ?? [])].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id),
    [query.data],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="text-muted-foreground max-w-xl text-xs leading-relaxed">
          {copy.testimonialsIntro}
        </p>

        <AdminButton
          variant="solid"
          className="inline-flex items-center gap-2"
          disabled={createTestimonial.isPending}
          onClick={() =>
            createTestimonial.mutate({
              author: language === "pt" ? "Novo testemunho" : "New testimonial",
              quotePt: "",
              quoteEn: "",
              sessionType: null,
              sortOrder: rows.length,
              published: false,
            })
          }
        >
          <Plus className="size-3.5" />
          {copy.addTestimonial}
        </AdminButton>
      </div>

      {query.isLoading ? (
        <p className="text-muted-foreground text-sm">{copy.loading}</p>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground text-sm">{copy.noTestimonials}</p>
      ) : (
        <div className="space-y-4">
          {rows.map((row) => (
            <AdminCard key={row.id}>
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <label className="block">
                    <AdminLabel>{copy.author}</AdminLabel>
                    <input
                      aria-label={copy.author}
                      defaultValue={row.author}
                      onBlur={(event) =>
                        updateTestimonial.mutate({ id: row.id, author: event.target.value })
                      }
                      className="field"
                    />
                  </label>
                  <label className="block">
                    <AdminLabel>{copy.session}</AdminLabel>
                    <select
                      aria-label={copy.session}
                      value={row.sessionType ?? ""}
                      onChange={(event) =>
                        updateTestimonial.mutate({
                          id: row.id,
                          sessionType: (event.target.value || null) as SessionType | null,
                        })
                      }
                      className="field"
                    >
                      <option value="">{copy.none}</option>
                      {SESSION_TYPES.map((item) => (
                        <option key={item.value} value={item.value}>
                          {language === "pt" ? item.pt : item.en}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <AdminLabel>{copy.order}</AdminLabel>
                    <input
                      aria-label={copy.order}
                      type="number"
                      defaultValue={row.sortOrder}
                      onBlur={(event) =>
                        updateTestimonial.mutate({
                          id: row.id,
                          sortOrder: Number(event.target.value) || 0,
                        })
                      }
                      className="field"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <AdminLabel>{copy.quotePt}</AdminLabel>
                    <textarea
                      aria-label={copy.quotePt}
                      rows={4}
                      defaultValue={row.quotePt}
                      onBlur={(event) =>
                        updateTestimonial.mutate({ id: row.id, quotePt: event.target.value })
                      }
                      className="field resize-y"
                    />
                  </label>
                  <label className="block">
                    <AdminLabel>{copy.quoteEn}</AdminLabel>
                    <textarea
                      aria-label={copy.quoteEn}
                      rows={4}
                      defaultValue={row.quoteEn}
                      onBlur={(event) =>
                        updateTestimonial.mutate({ id: row.id, quoteEn: event.target.value })
                      }
                      className="field resize-y"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      aria-label={copy.published}
                      type="checkbox"
                      checked={row.published}
                      onChange={(event) =>
                        updateTestimonial.mutate({ id: row.id, published: event.target.checked })
                      }
                    />
                    {copy.published}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(copy.confirmRemove))
                        deleteTestimonial.mutate({ id: row.id });
                    }}
                    className="text-muted-foreground hover:text-destructive ml-auto flex items-center gap-1.5 text-xs transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                    {copy.remove}
                  </button>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
