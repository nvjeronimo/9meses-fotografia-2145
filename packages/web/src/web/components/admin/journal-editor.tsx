import { ExternalLink, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { useAllPosts, useCreatePost, useDeletePost, useUpdatePost } from "../../queries/posts";
import { uploadPhotoFile } from "../../queries/photos";
import { AdminButton, AdminCard, AdminLabel, useAdminCopy } from "./admin-ui";

/** YYYY-MM-DD for a date input, from whatever the API returned. */
function dateValue(value: unknown): string {
  const date = value instanceof Date ? value : new Date(String(value));
  return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
}

/**
 * The journal writer. Bilingual fields per entry, a cover image uploaded
 * straight to storage, and a draft/published switch — a draft stays invisible
 * on the public site until it is ticked.
 */
export function JournalEditor({ language }: { language: "pt" | "en" }) {
  const copy = useAdminCopy();
  const query = useAllPosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const fileInputs = useRef<Record<number, HTMLInputElement | null>>({});

  const rows = query.data ?? [];

  async function onCoverPicked(id: number, file: File | undefined) {
    if (!file) return;
    setUploadingId(id);
    try {
      const { publicUrl } = await uploadPhotoFile(file);
      await updatePost.mutateAsync({ id, coverUrl: publicUrl });
    } finally {
      setUploadingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <p className="text-muted-foreground max-w-xl text-xs leading-relaxed">
          {copy.journalIntro}
        </p>

        <AdminButton
          variant="solid"
          className="inline-flex items-center gap-2"
          disabled={createPost.isPending}
          onClick={() =>
            createPost.mutate({
              titlePt: language === "pt" ? "Nova entrada" : "Nova entrada",
              titleEn: "New entry",
              excerptPt: "",
              excerptEn: "",
              bodyPt: "",
              bodyEn: "",
              published: false,
            })
          }
        >
          <Plus className="size-3.5" />
          {copy.addPost}
        </AdminButton>
      </div>

      {query.isLoading ? (
        <p className="text-muted-foreground text-sm">{copy.loading}</p>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground text-sm">{copy.noPosts}</p>
      ) : (
        <div className="space-y-4">
          {rows.map((row) => (
            <AdminCard key={row.id}>
              <div className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <AdminLabel>{copy.titlePt}</AdminLabel>
                    <input
                      aria-label={copy.titlePt}
                      defaultValue={row.titlePt}
                      onBlur={(event) =>
                        updatePost.mutate({ id: row.id, titlePt: event.target.value })
                      }
                      className="field"
                    />
                  </label>
                  <label className="block">
                    <AdminLabel>{copy.titleEn}</AdminLabel>
                    <input
                      aria-label={copy.titleEn}
                      defaultValue={row.titleEn}
                      onBlur={(event) =>
                        updatePost.mutate({ id: row.id, titleEn: event.target.value })
                      }
                      className="field"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <AdminLabel>{copy.slug}</AdminLabel>
                    <input
                      aria-label={copy.slug}
                      defaultValue={row.slug}
                      onBlur={(event) =>
                        updatePost.mutate({ id: row.id, slug: event.target.value })
                      }
                      className="field"
                    />
                  </label>
                  <label className="block">
                    <AdminLabel>{copy.postDate}</AdminLabel>
                    <input
                      aria-label={copy.postDate}
                      type="date"
                      defaultValue={dateValue(row.publishedAt)}
                      onBlur={(event) => {
                        if (!event.target.value) return;
                        updatePost.mutate({
                          id: row.id,
                          publishedAt: new Date(`${event.target.value}T09:00:00`),
                        });
                      }}
                      className="field"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <AdminLabel>{copy.excerptPt}</AdminLabel>
                    <textarea
                      aria-label={copy.excerptPt}
                      rows={3}
                      defaultValue={row.excerptPt}
                      onBlur={(event) =>
                        updatePost.mutate({ id: row.id, excerptPt: event.target.value })
                      }
                      className="field resize-y"
                    />
                  </label>
                  <label className="block">
                    <AdminLabel>{copy.excerptEn}</AdminLabel>
                    <textarea
                      aria-label={copy.excerptEn}
                      rows={3}
                      defaultValue={row.excerptEn}
                      onBlur={(event) =>
                        updatePost.mutate({ id: row.id, excerptEn: event.target.value })
                      }
                      className="field resize-y"
                    />
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <AdminLabel>{copy.bodyPt}</AdminLabel>
                    <textarea
                      aria-label={copy.bodyPt}
                      rows={12}
                      defaultValue={row.bodyPt}
                      onBlur={(event) =>
                        updatePost.mutate({ id: row.id, bodyPt: event.target.value })
                      }
                      className="field resize-y font-mono text-xs leading-relaxed"
                    />
                  </label>
                  <label className="block">
                    <AdminLabel>{copy.bodyEn}</AdminLabel>
                    <textarea
                      aria-label={copy.bodyEn}
                      rows={12}
                      defaultValue={row.bodyEn}
                      onBlur={(event) =>
                        updatePost.mutate({ id: row.id, bodyEn: event.target.value })
                      }
                      className="field resize-y font-mono text-xs leading-relaxed"
                    />
                  </label>
                </div>

                {/* Cover */}
                <div className="flex flex-wrap items-end gap-4">
                  {row.coverUrl ? (
                    <img
                      src={row.coverUrl}
                      alt=""
                      className="border-border/70 h-20 w-28 border object-cover"
                    />
                  ) : null}
                  <label className="block flex-1 min-w-52">
                    <AdminLabel>{copy.coverUrl}</AdminLabel>
                    <input
                      aria-label={copy.coverUrl}
                      defaultValue={row.coverUrl ?? ""}
                      onBlur={(event) =>
                        updatePost.mutate({ id: row.id, coverUrl: event.target.value || null })
                      }
                      className="field"
                    />
                  </label>
                  <input
                    ref={(element) => {
                      fileInputs.current[row.id] = element;
                    }}
                    type="file"
                    accept="image/*"
                    aria-label={copy.coverUrl}
                    className="hidden"
                    onChange={(event) => {
                      void onCoverPicked(row.id, event.target.files?.[0]);
                      event.target.value = "";
                    }}
                  />
                  <AdminButton
                    className="inline-flex items-center gap-2"
                    disabled={uploadingId === row.id}
                    onClick={() => fileInputs.current[row.id]?.click()}
                  >
                    <Upload className="size-3.5" />
                    {uploadingId === row.id ? copy.uploading : copy.upload}
                  </AdminButton>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <label className="flex items-center gap-2 text-xs">
                    <input
                      aria-label={copy.published}
                      type="checkbox"
                      checked={row.published}
                      onChange={(event) =>
                        updatePost.mutate({ id: row.id, published: event.target.checked })
                      }
                    />
                    {row.published ? copy.published : copy.draft}
                  </label>
                  {row.published && (
                    <a
                      href={language === "pt" ? `/diario/${row.slug}` : `/en/journal/${row.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition-colors"
                    >
                      <ExternalLink className="size-3.5" />
                      {copy.viewPost}
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(copy.confirmRemove)) deletePost.mutate({ id: row.id });
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
