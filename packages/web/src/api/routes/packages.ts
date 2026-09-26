import { asc, eq } from "drizzle-orm";
import { z } from "zod";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";
import { authed } from "../middleware/auth";

const sessionTypes = ["maternity", "newborn", "baby", "family", "smash"] as const;

const packageInput = z.object({
  sessionType: z.enum(sessionTypes),
  name: z.string().min(1),
  price: z.number().int().min(0),
  featuresPt: z.string().default(""),
  featuresEn: z.string().default(""),
  highlighted: z.boolean().optional(),
  sortOrder: z.number().optional(),
  published: z.boolean().optional(),
});

export const packages = {
  list: base.handler(() =>
    db
      .select()
      .from(schema.sessionPackages)
      .orderBy(asc(schema.sessionPackages.sortOrder), asc(schema.sessionPackages.id)),
  ),

  create: authed.input(packageInput).handler(async ({ input }) => {
    const [row] = await db.insert(schema.sessionPackages).values(input).returning();
    return row;
  }),

  update: authed
    .input(packageInput.partial().extend({ id: z.number() }))
    .handler(async ({ input }) => {
      const { id, ...values } = input;
      const [row] = await db
        .update(schema.sessionPackages)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(schema.sessionPackages.id, id))
        .returning();
      return row;
    }),

  remove: authed.input(z.object({ id: z.number() })).handler(async ({ input }) => {
    await db.delete(schema.sessionPackages).where(eq(schema.sessionPackages.id, input.id));
    return { ok: true };
  }),

  /** Seeds the five session types with the studio's current price list. Idempotent. */
  seed: authed.handler(async () => ({ seeded: await seedPackagesIfEmpty() })),
};

/**
 * Fills the price list the first time the table is empty, so the public pages
 * always show real prices before the studio touches the admin panel.
 * Called at server boot and by the admin "restore price list" action.
 */
export async function seedPackagesIfEmpty() {
  const existing = await db
    .select({ id: schema.sessionPackages.id })
    .from(schema.sessionPackages)
    .limit(1);
  if (existing.length > 0) return 0;
  const rows = await db.insert(schema.sessionPackages).values(SEED).returning();
  return rows.length;
}

const pkg = (count: string, countEn: string, extrasPt: string[] = [], extrasEn: string[] = []) => ({
  featuresPt: [
    count,
    "Imagens em JPEG de alta resolução",
    "Entrega em galeria online",
    ...extrasPt,
  ].join("\n"),
  featuresEn: [
    countEn,
    "High-resolution JPEG images",
    "Delivered in an online gallery",
    ...extrasEn,
  ].join("\n"),
});

const ALL = ["Todas as imagens editadas", "All edited images"] as const;
const SLIDESHOW = [
  "Slideshow com todas as imagens da sessão",
  "Slideshow with every image from the session",
] as const;
const PRINTS_10 = ["10 impressões 15x20", "10 prints 15x20"] as const;
const PRINTS_15 = ["15 impressões 15x20", "15 prints 15x20"] as const;
const CAKE = ["Bolo incluído", "Cake included"] as const;

// Brochura "Pacotes e Informações 2024" — three per session, cheapest first.
const SEED = [
  // Maternidade
  { sessionType: "maternity", name: "Mini", price: 150,
    ...pkg("15 imagens editadas", "15 edited images"), sortOrder: 1 },
  { sessionType: "maternity", name: "Deluxe", price: 250,
    ...pkg("25 imagens editadas", "25 edited images", [PRINTS_10[0]], [PRINTS_10[1]]), sortOrder: 2 },
  { sessionType: "maternity", name: "VIP", price: 300, highlighted: true,
    ...pkg(ALL[0], ALL[1], [SLIDESHOW[0], PRINTS_15[0]], [SLIDESHOW[1], PRINTS_15[1]]), sortOrder: 3 },
  // Newborn
  { sessionType: "newborn", name: "Prata", price: 180,
    ...pkg("8 imagens editadas", "8 edited images"), sortOrder: 4 },
  { sessionType: "newborn", name: "Ouro", price: 250,
    ...pkg("15 imagens editadas", "15 edited images", [PRINTS_10[0]], [PRINTS_10[1]]), sortOrder: 5 },
  { sessionType: "newborn", name: "Diamante", price: 370, highlighted: true,
    ...pkg(ALL[0], ALL[1],
      [SLIDESHOW[0], PRINTS_15[0], "Vale de 20€ para a sessão de bebé (entre os 7 e os 10 meses)"],
      [SLIDESHOW[1], PRINTS_15[1], "€20 voucher for the baby session (between 7 and 10 months)"]),
    sortOrder: 6 },
  // Bebé
  { sessionType: "baby", name: "Pacote 1", price: 150,
    ...pkg("10 imagens editadas", "10 edited images"), sortOrder: 7 },
  { sessionType: "baby", name: "Pacote 2", price: 230,
    ...pkg("20 imagens editadas", "20 edited images", [PRINTS_10[0]], [PRINTS_10[1]]), sortOrder: 8 },
  { sessionType: "baby", name: "Pacote 3", price: 300, highlighted: true,
    ...pkg(ALL[0], ALL[1], [SLIDESHOW[0], PRINTS_15[0]], [SLIDESHOW[1], PRINTS_15[1]]), sortOrder: 9 },
  // Família
  { sessionType: "family", name: "Essencial", price: 150,
    ...pkg("15 imagens editadas", "15 edited images"), sortOrder: 10 },
  { sessionType: "family", name: "Medium", price: 250,
    ...pkg("25 imagens editadas", "25 edited images", [PRINTS_10[0]], [PRINTS_10[1]]), sortOrder: 11 },
  { sessionType: "family", name: "Completo", price: 300, highlighted: true,
    ...pkg(ALL[0], ALL[1], [SLIDESHOW[0], PRINTS_15[0]], [SLIDESHOW[1], PRINTS_15[1]]), sortOrder: 12 },
  // Smash the Cake
  { sessionType: "smash", name: "XS", price: 150,
    ...pkg("10 imagens editadas", "10 edited images", [CAKE[0]], [CAKE[1]]), sortOrder: 13 },
  { sessionType: "smash", name: "M", price: 250,
    ...pkg("20 imagens editadas", "20 edited images", [CAKE[0], PRINTS_10[0]], [CAKE[1], PRINTS_10[1]]),
    sortOrder: 14 },
  { sessionType: "smash", name: "L", price: 340, highlighted: true,
    ...pkg(ALL[0], ALL[1],
      [CAKE[0], SLIDESHOW[0], PRINTS_15[0], "Vale de 20€ para a sessão de família (válido 1 ano)"],
      [CAKE[1], SLIDESHOW[1], PRINTS_15[1], "€20 voucher for a family session (valid for 1 year)"]),
    sortOrder: 15 },
] satisfies (typeof schema.sessionPackages.$inferInsert)[];
