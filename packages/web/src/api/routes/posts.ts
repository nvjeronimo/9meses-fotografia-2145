import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";
import { authed } from "../middleware/auth";

/** Lowercase, accent-free, hyphenated — safe in a URL. */
export function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{Mn}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const postInput = z.object({
  slug: z.string().max(90).optional(),
  titlePt: z.string().max(200).optional(),
  titleEn: z.string().max(200).optional(),
  excerptPt: z.string().max(600).optional(),
  excerptEn: z.string().max(600).optional(),
  bodyPt: z.string().max(40000).optional(),
  bodyEn: z.string().max(40000).optional(),
  coverUrl: z.string().nullish(),
  published: z.boolean().optional(),
  publishedAt: z.coerce.date().optional(),
});

export const posts = {
  /** Public list — published entries, newest first. */
  list: base.handler(() =>
    db
      .select()
      .from(schema.posts)
      .where(eq(schema.posts.published, true))
      .orderBy(desc(schema.posts.publishedAt)),
  ),

  /** Public single entry by slug. */
  bySlug: base.input(z.object({ slug: z.string() })).handler(async ({ input }) => {
    const [row] = await db
      .select()
      .from(schema.posts)
      .where(and(eq(schema.posts.slug, input.slug), eq(schema.posts.published, true)));
    return row ?? null;
  }),

  /** Admin list — includes drafts. */
  listAll: authed.handler(() =>
    db.select().from(schema.posts).orderBy(desc(schema.posts.publishedAt)),
  ),

  create: authed.input(postInput).handler(async ({ input }) => {
    const baseSlug = input.slug?.trim()
      ? slugify(input.slug)
      : slugify(input.titlePt || input.titleEn || "entrada");
    // Keep slugs unique without failing the write the admin just made.
    const taken = await db
      .select({ slug: schema.posts.slug })
      .from(schema.posts)
      .where(eq(schema.posts.slug, baseSlug));
    const slug =
      taken.length > 0 ? `${baseSlug}-${Date.now().toString(36).slice(-4)}` : baseSlug;

    const [row] = await db
      .insert(schema.posts)
      .values({ ...input, slug: slug || `entrada-${Date.now().toString(36)}` })
      .returning();
    return row;
  }),

  update: authed
    .input(postInput.partial().extend({ id: z.number() }))
    .handler(async ({ input }) => {
      const { id, ...values } = input;
      const patch: Record<string, unknown> = { ...values, updatedAt: new Date() };
      if (typeof values.slug === "string") {
        const next = slugify(values.slug);
        if (next) patch.slug = next;
        else delete patch.slug;
      }
      const [row] = await db
        .update(schema.posts)
        .set(patch)
        .where(eq(schema.posts.id, id))
        .returning();
      return row;
    }),

  remove: authed.input(z.object({ id: z.number() })).handler(async ({ input }) => {
    await db.delete(schema.posts).where(eq(schema.posts.id, input.id));
    return { ok: true };
  }),
};
