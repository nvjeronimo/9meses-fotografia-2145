import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Star, Trash2, Upload } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import {
  uploadPhotoFile,
  useAllPhotos,
  useCreatePhoto,
  useDeletePhoto,
  useReorderPhotos,
  useUpdatePhoto,
  type PhotoCategory,
} from "../../queries/photos";
import { formatBytes } from "../../lib/image-compress";
import { AdminButton, AdminCard, AdminLabel, useAdminCopy } from "./admin-ui";

const CATEGORIES: { value: PhotoCategory; pt: string; en: string }[] = [
  { value: "home", pt: "Início (slideshow)", en: "Home (slideshow)" },
  { value: "about", pt: "Sobre mim", en: "About" },
  { value: "studio", pt: "Estúdio", en: "Studio" },
  { value: "maternity", pt: "Maternidade", en: "Maternity" },
  { value: "newborn", pt: "Newborn", en: "Newborn" },
  { value: "baby", pt: "Bebé", en: "Baby" },
  { value: "family", pt: "Família", en: "Family" },
  { value: "smash", pt: "Smash the Cake", en: "Smash the Cake" },
];

export function PhotosManager({ language }: { language: "pt" | "en" }) {
  const copy = useAdminCopy();
  const query = useAllPhotos();
  const createPhoto = useCreatePhoto();
  const updatePhoto = useUpdatePhoto();
  const deletePhoto = useDeletePhoto();
  const reorder = useReorderPhotos();
  const fileInput = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState<PhotoCategory>("home");
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);
  /** What the browser-side resize saved on the last batch. */
  const [savings, setSavings] = useState<{ from: number; to: number } | null>(null);

  const rows = useMemo(
    () =>
      (query.data ?? [])
        .filter((row) => row.category === category)
        .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id),
    [query.data, category],
  );

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setSavings(null);
    setUploading(files.length);
    let fromBytes = 0;
    let toBytes = 0;
    let order = rows.length > 0 ? Math.max(...rows.map((row) => row.sortOrder)) + 1 : 0;

    for (const file of Array.from(files)) {
      try {
        const { url, storageKey, originalBytes, bytes } = await uploadPhotoFile(file);
        await createPhoto.mutateAsync({ category, url, storageKey, sortOrder: order });
        fromBytes += originalBytes;
        toBytes += bytes;
        order += 1;
      } catch (uploadError) {
        setError(uploadError instanceof Error ? uploadError.message : String(uploadError));
      } finally {
        setUploading((prev) => prev - 1);
      }
    }
    if (fileInput.current) fileInput.current.value = "";
    if (toBytes > 0 && fromBytes > toBytes) setSavings({ from: fromBytes, to: toBytes });
  }

  function move(index: number, delta: number) {
    const target = index + delta;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    const [moved] = next.splice(index, 1);
    if (!moved) return;
    next.splice(target, 0, moved);
    reorder.mutate({ items: next.map((row, i) => ({ id: row.id, sortOrder: i })) });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <label className="block">
          <AdminLabel>{copy.category}</AdminLabel>
          <select
            aria-label={copy.category}
            value={category}
            onChange={(event) => setCategory(event.target.value as PhotoCategory)}
            className="field w-64"
          >
            {CATEGORIES.map((item) => (
              <option key={item.value} value={item.value}>
                {language === "pt" ? item.pt : item.en}
              </option>
            ))}
          </select>
        </label>

        <div>
          <input
            aria-label={copy.upload}
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(event) => onFiles(event.target.files)}
          />
          <AdminButton
            variant="solid"
            onClick={() => fileInput.current?.click()}
            disabled={uploading > 0}
            className="inline-flex items-center gap-2"
          >
            <Upload className="size-3.5" />
            {uploading > 0 ? `${copy.uploading} (${uploading})` : copy.upload}
          </AdminButton>
        </div>
      </div>

      {error && <p className="text-destructive text-sm">{error}</p>}
      {savings && (
        <p className="text-primary text-xs">
          {copy.optimised}: {formatBytes(savings.from)} → {formatBytes(savings.to)}
        </p>
      )}
      <p className="text-muted-foreground text-xs leading-relaxed">{copy.defaultsNote}</p>
      <p className="text-muted-foreground text-xs leading-relaxed">{copy.compressNote}</p>

      {query.isLoading ? (
        <p className="text-muted-foreground text-sm">{copy.loading}</p>
      ) : rows.length === 0 ? (
        <AdminCard>
          <p className="text-muted-foreground text-sm">{copy.noPhotos}</p>
        </AdminCard>
      ) : (
        <div className="space-y-4">
          {rows.map((row, index) => (
            <AdminCard key={row.id}>
              <div className="flex flex-col gap-5 sm:flex-row">
                <img
                  src={row.url}
                  alt=""
                  className="h-40 w-32 shrink-0 object-cover sm:h-32"
                />
                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <AdminLabel>{copy.captionPt}</AdminLabel>
                      <input
                        aria-label={copy.captionPt}
                        defaultValue={row.captionPt ?? ""}
                        onBlur={(event) =>
                          updatePhoto.mutate({ id: row.id, captionPt: event.target.value })
                        }
                        className="field"
                      />
                    </label>
                    <label className="block">
                      <AdminLabel>{copy.captionEn}</AdminLabel>
                      <input
                        aria-label={copy.captionEn}
                        defaultValue={row.captionEn ?? ""}
                        onBlur={(event) =>
                          updatePhoto.mutate({ id: row.id, captionEn: event.target.value })
                        }
                        className="field"
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
                          updatePhoto.mutate({ id: row.id, published: event.target.checked })
                        }
                      />
                      {copy.published}
                    </label>
                    <button
                      type="button"
                      onClick={() => updatePhoto.mutate({ id: row.id, featured: !row.featured })}
                      className={cn(
                        "flex items-center gap-1.5 text-xs transition-colors",
                        row.featured ? "text-primary" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Star className={cn("size-3.5", row.featured && "fill-current")} />
                      {copy.featured}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        aria-label={copy.up}
                        className="text-muted-foreground hover:text-foreground p-1 disabled:opacity-30"
                      >
                        <ChevronUp className="size-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(index, 1)}
                        disabled={index === rows.length - 1}
                        aria-label={copy.down}
                        className="text-muted-foreground hover:text-foreground p-1 disabled:opacity-30"
                      >
                        <ChevronDown className="size-4" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(copy.confirmRemove)) deletePhoto.mutate({ id: row.id });
                      }}
                      className="text-muted-foreground hover:text-destructive ml-auto flex items-center gap-1.5 text-xs transition-colors"
                    >
                      <Trash2 className="size-3.5" />
                      {copy.remove}
                    </button>
                  </div>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}
    </div>
  );
}
