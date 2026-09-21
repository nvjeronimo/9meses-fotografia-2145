import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";
import { S3_BUCKET, s3 } from "../lib/s3";
import { authed } from "../middleware/auth";

const categories = [
  "home",
  "about",
  "studio",
  "maternity",
  "newborn",
  "baby",
  "family",
  "smash",
] as const;

const photoInput = z.object({
  category: z.enum(categories),
  url: z.string().min(1),
  storageKey: z.string().nullish(),
  captionPt: z.string().nullish(),
  captionEn: z.string().nullish(),
  featured: z.boolean().optional(),
  sortOrder: z.number().optional(),
  published: z.boolean().optional(),
});

export const photos = {
  /** Public read — published photos only, optionally filtered by category. */
  list: base
    .input(z.object({ category: z.enum(categories).optional() }).optional())
    .handler(({ input }) => {
      const where = input?.category
        ? and(eq(schema.photos.published, true), eq(schema.photos.category, input.category))
        : eq(schema.photos.published, true);
      return db
        .select()
        .from(schema.photos)
        .where(where)
        .orderBy(asc(schema.photos.sortOrder), asc(schema.photos.id));
    }),

  /** Admin read — includes unpublished. */
  listAll: authed.handler(() =>
    db
      .select()
      .from(schema.photos)
      .orderBy(asc(schema.photos.category), asc(schema.photos.sortOrder), asc(schema.photos.id)),
  ),

  create: authed.input(photoInput).handler(async ({ input }) => {
    const [row] = await db.insert(schema.photos).values(input).returning();
    return row;
  }),

  update: authed
    .input(photoInput.partial().extend({ id: z.number() }))
    .handler(async ({ input }) => {
      const { id, ...values } = input;
      const [row] = await db
        .update(schema.photos)
        .set(values)
        .where(eq(schema.photos.id, id))
        .returning();
      return row;
    }),

  reorder: authed
    .input(z.object({ items: z.array(z.object({ id: z.number(), sortOrder: z.number() })) }))
    .handler(async ({ input }) => {
      for (const item of input.items) {
        await db
          .update(schema.photos)
          .set({ sortOrder: item.sortOrder })
          .where(eq(schema.photos.id, item.id));
      }
      return { ok: true };
    }),

  remove: authed.input(z.object({ id: z.number() })).handler(async ({ input }) => {
    const [row] = await db.select().from(schema.photos).where(eq(schema.photos.id, input.id));
    if (row?.storageKey) {
      try {
        await s3.send(new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: row.storageKey }));
      } catch {
        // object already gone — deleting the record is still correct
      }
    }
    await db.delete(schema.photos).where(eq(schema.photos.id, input.id));
    return { ok: true };
  }),
};
