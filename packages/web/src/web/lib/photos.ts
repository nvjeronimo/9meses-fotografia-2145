import { useMemo } from "react";
import { usePhotos, type PhotoCategory } from "../queries/photos";
import { DEFAULT_PHOTOS } from "./site";

export interface DisplayPhoto {
  id: string;
  url: string;
  captionPt?: string | null;
  captionEn?: string | null;
  category: PhotoCategory;
}

/**
 * Photos for one category: whatever the admin uploaded, falling back to the
 * images shipped with the site while a category is still empty.
 */
export function useCategoryPhotos(category: PhotoCategory): {
  photos: DisplayPhoto[];
  isLoading: boolean;
} {
  const query = usePhotos(category);

  const photos = useMemo<DisplayPhoto[]>(() => {
    const uploaded = query.data ?? [];
    if (uploaded.length > 0) {
      return uploaded.map((photo) => ({
        id: `db-${photo.id}`,
        url: photo.url,
        captionPt: photo.captionPt,
        captionEn: photo.captionEn,
        category: photo.category as PhotoCategory,
      }));
    }
    return (DEFAULT_PHOTOS[category] ?? []).map((url) => ({
      id: `default-${url}`,
      url,
      category,
    }));
  }, [query.data, category]);

  return { photos, isLoading: query.isLoading };
}

/** Photos across several categories, in the order given. */
export function useMixedPhotos(categories: PhotoCategory[]) {
  const query = usePhotos();

  return useMemo<DisplayPhoto[]>(() => {
    const uploaded = query.data ?? [];
    const out: DisplayPhoto[] = [];
    for (const category of categories) {
      const forCategory = uploaded.filter((photo) => photo.category === category);
      if (forCategory.length > 0) {
        out.push(
          ...forCategory.map((photo) => ({
            id: `db-${photo.id}`,
            url: photo.url,
            captionPt: photo.captionPt,
            captionEn: photo.captionEn,
            category: photo.category as PhotoCategory,
          })),
        );
      } else {
        out.push(
          ...(DEFAULT_PHOTOS[category] ?? []).map((url) => ({
            id: `default-${url}`,
            url,
            category,
          })),
        );
      }
    }
    return out;
  }, [query.data, categories]);
}
