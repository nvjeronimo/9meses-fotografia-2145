import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import {
  useCreatePackage,
  useDeletePackage,
  usePackages,
  useSeedPackages,
  useUpdatePackage,
  type SessionType,
} from "../../queries/packages";
import { AdminButton, AdminCard, AdminLabel, useAdminCopy } from "./admin-ui";

const SESSION_TYPES: { value: SessionType; pt: string; en: string }[] = [
  { value: "maternity", pt: "Maternidade", en: "Maternity" },
  { value: "newborn", pt: "Newborn", en: "Newborn" },
  { value: "baby", pt: "Bebé", en: "Baby" },
  { value: "family", pt: "Família", en: "Family" },
  { value: "smash", pt: "Smash the Cake", en: "Smash the Cake" },
];

export function PackagesManager({ language }: { language: "pt" | "en" }) {
  const copy = useAdminCopy();
  const query = usePackages();
  const createPackage = useCreatePackage();
  const updatePackage = useUpdatePackage();
  const deletePackage = useDeletePackage();
  const seed = useSeedPackages();
  const [filter, setFilter] = useState<SessionType | "all">("all");

  const rows = useMemo(
    () =>
      (query.data ?? [])
        .filter((row) => filter === "all" || row.sessionType === filter)
        .sort(
          (a, b) =>
            a.sessionType.localeCompare(b.sessionType) ||
            a.sortOrder - b.sortOrder ||
            a.id - b.id,
        ),
    [query.data, filter],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <label className="block">
          <AdminLabel>{copy.session}</AdminLabel>
          <select
            aria-label={copy.session}
            value={filter}
            onChange={(event) => setFilter(event.target.value as SessionType | "all")}
            className="field w-64"
          >
            <option value="all">{language === "pt" ? "Todas" : "All"}</option>
            {SESSION_TYPES.map((item) => (
              <option key={item.value} value={item.value}>
                {language === "pt" ? item.pt : item.en}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-wrap gap-3">
          {(query.data ?? []).length === 0 && (
            <AdminButton onClick={() => seed.mutate({})} disabled={seed.isPending}>
              {copy.seed}
            </AdminButton>
          )}
          <AdminButton
            variant="solid"
            className="inline-flex items-center gap-2"
            onClick={() =>
              createPackage.mutate({
                sessionType: filter === "all" ? "maternity" : filter,
                name: language === "pt" ? "Novo pacote" : "New package",
                price: 0,
                featuresPt: "",
                featuresEn: "",
                sortOrder: (query.data ?? []).length,
              })
            }
          >
            <Plus className="size-3.5" />
            {copy.addPackage}
          </AdminButton>
        </div>
      </div>

      {query.isLoading ? (
        <p className="text-muted-foreground text-sm">{copy.loading}</p>
      ) : (
        <div className="space-y-4">
          {rows.map((row) => (
            <AdminCard key={row.id}>
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <label className="block">
                    <AdminLabel>{copy.session}</AdminLabel>
                    <select
                      aria-label={copy.session}
                      value={row.sessionType}
                      onChange={(event) =>
                        updatePackage.mutate({
                          id: row.id,
                          sessionType: event.target.value as SessionType,
                        })
                      }
                      className="field"
                    >
                      {SESSION_TYPES.map((item) => (
                        <option key={item.value} value={item.value}>
                          {language === "pt" ? item.pt : item.en}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <AdminLabel>{copy.packageName}</AdminLabel>
                    <input
                      aria-label={copy.packageName}
                      defaultValue={row.name}
                      onBlur={(event) =>
                        updatePackage.mutate({ id: row.id, name: event.target.value })
                      }
                      className="field"
                    />
                  </label>
                  <label className="block">
                    <AdminLabel>{copy.price}</AdminLabel>
                    <input
                      aria-label={copy.price}
                      type="number"
                      min={0}
                      defaultValue={row.price}
                      onBlur={(event) =>
                        updatePackage.mutate({
                          id: row.id,
                          price: Number(event.target.value) || 0,
                        })
                      }
                      className="field"
                    />
                  </label>
                  <label className="block">
                    <AdminLabel>{copy.order}</AdminLabel>
                    <input
                      aria-label={copy.order}
                      type="number"
                      defaultValue={row.sortOrder}
                      onBlur={(event) =>
                        updatePackage.mutate({
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
                    <AdminLabel>{copy.featuresPt}</AdminLabel>
                    <textarea
                      aria-label={copy.featuresPt}
                      rows={6}
                      defaultValue={row.featuresPt}
                      onBlur={(event) =>
                        updatePackage.mutate({ id: row.id, featuresPt: event.target.value })
                      }
                      className="field resize-y"
                    />
                  </label>
                  <label className="block">
                    <AdminLabel>{copy.featuresEn}</AdminLabel>
                    <textarea
                      aria-label={copy.featuresEn}
                      rows={6}
                      defaultValue={row.featuresEn}
                      onBlur={(event) =>
                        updatePackage.mutate({ id: row.id, featuresEn: event.target.value })
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
                        updatePackage.mutate({ id: row.id, published: event.target.checked })
                      }
                    />
                    {copy.published}
                  </label>
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      aria-label={copy.highlighted}
                      type="checkbox"
                      checked={row.highlighted}
                      onChange={(event) =>
                        updatePackage.mutate({ id: row.id, highlighted: event.target.checked })
                      }
                    />
                    {copy.highlighted}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(copy.confirmRemove)) deletePackage.mutate({ id: row.id });
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
