import { TESTIMONIALS } from "../content/testimonials";

const ROWS = [...TESTIMONIALS]
  .sort((a, b) => a.sortOrder - b.sortOrder)
  .map((row) => ({ ...row, published: true }));

export function useTestimonials() {
  return { data: ROWS, isLoading: false };
}
