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

const gold = {
  pt: "15 imagens editadas\nFicheiros JPEG em alta resolução\nGaleria online privada\nSlideshow da sessão\n15 impressões 15x20\nVale de 20€ para produtos",
  en: "15 edited images\nHigh-resolution JPEG files\nPrivate online gallery\nSession slideshow\n15 prints 15x20\n€20 voucher for products",
};
const diamond = {
  pt: "Todas as imagens editadas\nFicheiros JPEG em alta resolução\nGaleria online privada\nSlideshow da sessão\n15 impressões 15x20\nVale de 20€ para produtos",
  en: "All edited images\nHigh-resolution JPEG files\nPrivate online gallery\nSession slideshow\n15 prints 15x20\n€20 voucher for products",
};

const SEED = [
  {
    sessionType: "maternity",
    name: "Gold",
    price: 250,
    featuresPt: gold.pt,
    featuresEn: gold.en,
    sortOrder: 1,
  },
  {
    sessionType: "maternity",
    name: "Diamond",
    price: 370,
    featuresPt: diamond.pt,
    featuresEn: diamond.en,
    highlighted: true,
    sortOrder: 2,
  },
  {
    sessionType: "newborn",
    name: "Gold",
    price: 250,
    featuresPt: gold.pt,
    featuresEn: gold.en,
    sortOrder: 3,
  },
  {
    sessionType: "newborn",
    name: "Diamond",
    price: 370,
    featuresPt: diamond.pt,
    featuresEn: diamond.en,
    highlighted: true,
    sortOrder: 4,
  },
  {
    sessionType: "baby",
    name: "Simples",
    price: 165,
    featuresPt: "10 imagens editadas\nFicheiros JPEG em alta resolução\nGaleria online privada",
    featuresEn: "10 edited images\nHigh-resolution JPEG files\nPrivate online gallery",
    sortOrder: 5,
  },
  {
    sessionType: "baby",
    name: "Completo",
    price: 300,
    featuresPt:
      "Todas as imagens editadas\nFicheiros JPEG em alta resolução\nGaleria online privada\n10 impressões 15x20",
    featuresEn:
      "All edited images\nHigh-resolution JPEG files\nPrivate online gallery\n10 prints 15x20",
    highlighted: true,
    sortOrder: 6,
  },
  {
    sessionType: "family",
    name: "Simples",
    price: 150,
    featuresPt: "15 imagens editadas\nFicheiros JPEG em alta resolução\nGaleria online privada",
    featuresEn: "15 edited images\nHigh-resolution JPEG files\nPrivate online gallery",
    sortOrder: 7,
  },
  {
    sessionType: "family",
    name: "Completo",
    price: 300,
    featuresPt:
      "Todas as imagens editadas\nFicheiros JPEG em alta resolução\nGaleria online privada\nSlideshow da sessão\n15 impressões 15x20",
    featuresEn:
      "All edited images\nHigh-resolution JPEG files\nPrivate online gallery\nSession slideshow\n15 prints 15x20",
    highlighted: true,
    sortOrder: 8,
  },
  {
    sessionType: "smash",
    name: "XS",
    price: 250,
    featuresPt:
      "10 imagens editadas\nFicheiros JPEG em alta resolução\nGaleria online privada\nBolo incluído",
    featuresEn:
      "10 edited images\nHigh-resolution JPEG files\nPrivate online gallery\nCake included",
    sortOrder: 9,
  },
  {
    sessionType: "smash",
    name: "L",
    price: 340,
    featuresPt:
      "Todas as imagens editadas\nFicheiros JPEG em alta resolução\nGaleria online privada\nSlideshow da sessão\nBolo incluído\n15 impressões 15x20\nVale de 20€ para produtos",
    featuresEn:
      "All edited images\nHigh-resolution JPEG files\nPrivate online gallery\nSession slideshow\nCake included\n15 prints 15x20\n€20 voucher for products",
    highlighted: true,
    sortOrder: 10,
  },
];
