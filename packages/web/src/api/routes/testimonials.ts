import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";
import { authed } from "../middleware/auth";

const sessionTypes = ["maternity", "newborn", "baby", "family", "smash"] as const;

const testimonialInput = z.object({
  author: z.string().min(1).max(120),
  quotePt: z.string().max(1200).optional(),
  quoteEn: z.string().max(1200).optional(),
  sessionType: z.enum(sessionTypes).nullish(),
  sortOrder: z.number().optional(),
  published: z.boolean().optional(),
});

/** The reviews the site shipped with — restored on first boot so the carousel is never empty. */
const DEFAULTS = [
  {
    author: "Ana & Miguel",
    quotePt:
      "A Tânia tem um dom. Conseguiu captar a emoção deste momento de uma forma que nunca imaginámos. Voltaremos sempre.",
    quoteEn:
      "Tânia has a gift. She captured the emotion of this moment in a way we never imagined. We will always come back.",
    sessionType: "maternity",
    sortOrder: 0,
  },
  {
    author: "Sofia R.",
    quotePt:
      "Sessão newborn tranquila do início ao fim. O bebé sempre no centro de tudo, e as fotografias são simplesmente lindas.",
    quoteEn:
      "A calm newborn session from start to finish. The baby was always the priority, and the photographs are simply beautiful.",
    sessionType: "newborn",
    sortOrder: 1,
  },
  {
    author: "Família Costa",
    quotePt:
      "Sentimo-nos em casa no estúdio. As fotografias de família ficaram naturais, cheias de vida e de nós.",
    quoteEn:
      "We felt at home in the studio. The family photographs came out natural, full of life and full of us.",
    sessionType: "family",
    sortOrder: 2,
  },
];

/** Idempotent: only writes when the table is empty. */
export async function seedTestimonialsIfEmpty() {
  const existing = await db.select({ id: schema.testimonials.id }).from(schema.testimonials).limit(1);
  if (existing.length > 0) return { seeded: false };
  await db.insert(schema.testimonials).values(DEFAULTS);
  return { seeded: true };
}

export const testimonials = {
  /** Public read — published only. */
  list: base.handler(() =>
    db
      .select()
      .from(schema.testimonials)
      .where(eq(schema.testimonials.published, true))
      .orderBy(asc(schema.testimonials.sortOrder), asc(schema.testimonials.id)),
  ),

  /** Admin read — includes unpublished. */
  listAll: authed.handler(() =>
    db
      .select()
      .from(schema.testimonials)
      .orderBy(asc(schema.testimonials.sortOrder), asc(schema.testimonials.id)),
  ),

  create: authed.input(testimonialInput).handler(async ({ input }) => {
    const [row] = await db.insert(schema.testimonials).values(input).returning();
    return row;
  }),

  update: authed
    .input(testimonialInput.partial().extend({ id: z.number() }))
    .handler(async ({ input }) => {
      const { id, ...values } = input;
      const [row] = await db
        .update(schema.testimonials)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(schema.testimonials.id, id))
        .returning();
      return row;
    }),

  remove: authed.input(z.object({ id: z.number() })).handler(async ({ input }) => {
    await db.delete(schema.testimonials).where(eq(schema.testimonials.id, input.id));
    return { ok: true };
  }),

  seed: base.handler(() => seedTestimonialsIfEmpty()),
};
