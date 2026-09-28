import { POSTS } from "../content/posts";

const ALL = [...POSTS]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .map((post) => ({ ...post, updatedAt: post.publishedAt, published: !post.draft }));

/** Published posts only: drafts never appear in the journal list. */
export function usePosts() {
  return { data: ALL.filter((post) => post.published), isLoading: false };
}

/** A post by slug. Drafts open by direct link (for review) but are noindex. */
export function usePost(slug: string) {
  return { data: ALL.find((post) => post.slug === slug) ?? null, isLoading: false };
}
