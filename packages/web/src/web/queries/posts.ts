import { POSTS } from "../content/posts";

const ROWS = [...POSTS]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .map((post) => ({ ...post, updatedAt: post.publishedAt, published: true }));

export function usePosts() {
  return { data: ROWS, isLoading: false };
}

export function usePost(slug: string) {
  return { data: ROWS.find((post) => post.slug === slug) ?? null, isLoading: false };
}
