import { ORPCError } from "@orpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";
import { clientKey, rateLimit } from "../lib/rate-limit";
import { authed } from "../middleware/auth";

/** 3 submissions per hour from the same address is plenty for a real enquiry. */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

/** Crude but effective: real enquiries do not carry links by the dozen. */
const LINK_PATTERN = /https?:\/\//gi;

export const messages = {
  /** Public — contact form submissions are stored alongside the EmailJS delivery. */
  create: base
    .input(
      z.object({
        name: z.string().min(1).max(120),
        email: z.string().email().max(160),
        phone: z.string().max(40).nullish(),
        sessionType: z.string().max(40).nullish(),
        familyMembers: z.string().max(200).nullish(),
        preferredDate: z.string().max(40).nullish(),
        message: z.string().min(1).max(4000),
        consent: z.boolean().optional(),
        /**
         * Honeypot — hidden in the form, so only a bot fills it in.
         * Filled means we pretend to succeed and store nothing.
         */
        website: z.string().optional(),
      }),
    )
    .handler(async ({ input, context }) => {
      // Honeypot: answer 200 so the bot does not learn it was caught.
      if (input.website && input.website.trim().length > 0) return { id: null, skipped: true };

      // Link-stuffed bodies are spam, not enquiries.
      if ((input.message.match(LINK_PATTERN) ?? []).length > 3) {
        return { id: null, skipped: true };
      }

      const limit = rateLimit(clientKey(context.headers, "contact"), MAX_PER_WINDOW, WINDOW_MS);
      if (!limit.ok) {
        throw new ORPCError("TOO_MANY_REQUESTS", {
          message: `Too many submissions. Try again in ${Math.ceil(limit.retryAfter / 60)} min.`,
        });
      }

      const { website: _honeypot, ...values } = input;
      const [row] = await db
        .insert(schema.messages)
        .values({ ...values, consent: values.consent ?? false })
        .returning();
      return { id: row?.id ?? null, skipped: false };
    }),

  list: authed.handler(() =>
    db.select().from(schema.messages).orderBy(desc(schema.messages.createdAt)),
  ),

  unreadCount: authed.handler(async () => {
    const rows = await db
      .select({ id: schema.messages.id })
      .from(schema.messages)
      .where(eq(schema.messages.read, false));
    return rows.length;
  }),

  markRead: authed
    .input(z.object({ id: z.number(), read: z.boolean().default(true) }))
    .handler(async ({ input }) => {
      const [row] = await db
        .update(schema.messages)
        .set({ read: input.read })
        .where(eq(schema.messages.id, input.id))
        .returning();
      return row;
    }),

  remove: authed.input(z.object({ id: z.number() })).handler(async ({ input }) => {
    await db.delete(schema.messages).where(eq(schema.messages.id, input.id));
    return { ok: true };
  }),
};
