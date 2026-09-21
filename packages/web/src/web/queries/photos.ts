import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client, orpc } from "../lib/api";
import { compressImage } from "../lib/image-compress";

export type PhotoCategory =
  | "home"
  | "about"
  | "studio"
  | "maternity"
  | "newborn"
  | "baby"
  | "family"
  | "smash";

/** Published photos, optionally for one category. */
export function usePhotos(category?: PhotoCategory) {
  return useQuery(
    orpc.photos.list.queryOptions({
      input: category ? { category } : {},
      staleTime: 60_000,
    }),
  );
}

/** Admin listing — includes unpublished photos. */
export function useAllPhotos(enabled = true) {
  return useQuery(orpc.photos.listAll.queryOptions({ enabled }));
}

function useInvalidatePhotos() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: orpc.photos.key() });
}

export function useCreatePhoto() {
  const invalidate = useInvalidatePhotos();
  return useMutation(orpc.photos.create.mutationOptions({ onSuccess: invalidate }));
}

export function useUpdatePhoto() {
  const invalidate = useInvalidatePhotos();
  return useMutation(orpc.photos.update.mutationOptions({ onSuccess: invalidate }));
}

export function useDeletePhoto() {
  const invalidate = useInvalidatePhotos();
  return useMutation(orpc.photos.remove.mutationOptions({ onSuccess: invalidate }));
}

export function useReorderPhotos() {
  const invalidate = useInvalidatePhotos();
  return useMutation(orpc.photos.reorder.mutationOptions({ onSuccess: invalidate }));
}

/**
 * Presign + direct PUT to Tigris. Returns the stable public path and storage key.
 *
 * The file is resized and re-encoded to WebP in the browser first, so a 10 MB
 * camera original is stored — and served — as a few hundred KB.
 */
export async function uploadPhotoFile(file: File) {
  const { file: payload, compressed, originalBytes, bytes } = await compressImage(file);
  const contentType = payload.type || "image/jpeg";

  const { url, key, publicUrl } = await client.upload.presign({
    filename: payload.name,
    contentType,
  });
  const res = await fetch(url, {
    method: "PUT",
    body: payload,
    headers: { "Content-Type": contentType },
  });
  if (!res.ok) throw new Error(`Upload failed (${res.status})`);
  return { url: publicUrl, storageKey: key, compressed, originalBytes, bytes };
}
