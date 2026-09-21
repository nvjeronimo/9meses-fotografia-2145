import { eq } from "drizzle-orm";
import { z } from "zod";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";
import { authed } from "../middleware/auth";

/**
 * PT/EN text overrides. The site ships a full default dictionary in the client;
 * rows here override a key when present, so the admin only stores what changed.
 */
export const content = {
  list: base.handler(() => db.select().from(schema.contentEntries)),

  set: authed
    .input(
      z.object({
        key: z.string().min(1),
        valuePt: z.string().nullish(),
        valueEn: z.string().nullish(),
      }),
    )
    .handler(async ({ input }) => {
      const [row] = await db
        .insert(schema.contentEntries)
        .values({ ...input, updatedAt: new Date() })
        .onConflictDoUpdate({
          target: schema.contentEntries.key,
          set: { valuePt: input.valuePt, valueEn: input.valueEn, updatedAt: new Date() },
        })
        .returning();
      return row;
    }),

  reset: authed.input(z.object({ key: z.string() })).handler(async ({ input }) => {
    await db.delete(schema.contentEntries).where(eq(schema.contentEntries.key, input.key));
    return { ok: true };
  }),
};
