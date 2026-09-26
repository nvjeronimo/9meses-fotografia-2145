import { useMemo } from "react";
import type { PhotoCategory } from "../queries/photos";
import { DEFAULT_PHOTOS } from "./site";

export interface DisplayPhoto {
  id: string;
  url: string;
  captionPt?: string | null;
  captionEn?: string | null;
  category: PhotoCategory;
}

const toDisplay = (category: PhotoCategory) =>
  (DEFAULT_PHOTOS[category] ?? []).map((url) => ({ id: `photo-${url}`, url, category }));

/** Photos for one category (lib/site.ts › DEFAULT_PHOTOS). */
export function useCategoryPhotos(category: PhotoCategory): {
  photos: DisplayPhoto[];
  isLoading: boolean;
} {
  const photos = useMemo<DisplayPhoto[]>(() => toDisplay(category), [category]);
  return { photos, isLoading: false };
}

/** Photos across several categories, in the order given. */
export function useMixedPhotos(categories: PhotoCategory[]) {
  return useMemo<DisplayPhoto[]>(() => categories.flatMap(toDisplay), [categories]);
}
