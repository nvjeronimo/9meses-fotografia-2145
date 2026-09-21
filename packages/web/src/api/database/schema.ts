import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * 9 Meses Fotografia — content schema.
 * Applied with `bun run db:push` (from packages/web).
 */

/** Gallery / session photos managed from the admin panel. */
export const photos = sqliteTable("photos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** maternity | newborn | baby | family | smash | home | studio | about */
  category: text("category").notNull(),
  url: text("url").notNull(),
  storageKey: text("storage_key"),
  captionPt: text("caption_pt"),
  captionEn: text("caption_en"),
  /** Marks the lead image of a category (hero / highlight). */
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/** Per-key PT/EN text overrides for the site copy. */
export const contentEntries = sqliteTable("content_entries", {
  key: text("key").primaryKey(),
  valuePt: text("value_pt"),
  valueEn: text("value_en"),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/** Session packages and prices. */
export const sessionPackages = sqliteTable("session_packages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** maternity | newborn | baby | family | smash */
  sessionType: text("session_type").notNull(),
  /** Display name, e.g. "Gold", "Diamond", "Simples", "XS" */
  name: text("name").notNull(),
  price: integer("price").notNull(),
  /** Newline-separated feature list. */
  featuresPt: text("features_pt").notNull().default(""),
  featuresEn: text("features_en").notNull().default(""),
  highlighted: integer("highlighted", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/** Contact-form submissions, stored alongside the EmailJS delivery. */
export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  sessionType: text("session_type"),
  familyMembers: text("family_members"),
  /** Date the client would like the session on, as submitted (YYYY-MM-DD). */
  preferredDate: text("preferred_date"),
  message: text("message").notNull(),
  /** GDPR: the visitor ticked the privacy-policy consent box. */
  consent: integer("consent", { mode: "boolean" }).notNull().default(false),
  read: integer("read", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/** Client reviews shown on the home page, managed from the admin panel. */
export const testimonials = sqliteTable("testimonials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  author: text("author").notNull(),
  quotePt: text("quote_pt").notNull().default(""),
  quoteEn: text("quote_en").notNull().default(""),
  /** maternity | newborn | baby | family | smash — drives the small label. */
  sessionType: text("session_type"),
  sortOrder: integer("sort_order").notNull().default(0),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

/** Journal (blog) entries — bilingual, markdown body, written in the admin panel. */
export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** URL segment, shared by both languages. */
  slug: text("slug").notNull().unique(),
  titlePt: text("title_pt").notNull().default(""),
  titleEn: text("title_en").notNull().default(""),
  excerptPt: text("excerpt_pt").notNull().default(""),
  excerptEn: text("excerpt_en").notNull().default(""),
  /** Markdown. */
  bodyPt: text("body_pt").notNull().default(""),
  bodyEn: text("body_en").notNull().default(""),
  coverUrl: text("cover_url"),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  publishedAt: integer("published_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});



export * from "./auth-schema";
