import { GetObjectCommand } from "@aws-sdk/client-s3";
import type { RouterClient } from "@orpc/server";
import { createApp } from "./__core/app";
import { auth } from "./auth";
import { S3_BUCKET, s3 } from "./lib/s3";
import { admin } from "./routes/admin";
import { content } from "./routes/content";
import { messages } from "./routes/messages";
import { packages, seedPackagesIfEmpty } from "./routes/packages";
import { photos } from "./routes/photos";
import { ping } from "./routes/ping";
import { posts } from "./routes/posts";
import { seedTestimonialsIfEmpty, testimonials } from "./routes/testimonials";
import { upload } from "./routes/upload";

// API features are oRPC procedures, one file per feature in ./routes/,
// composed into this router — typed end-to-end via the clients
// (web: src/web/lib/api.ts, mobile: lib/api.ts).
// Keep each routes/ file under 500 lines (`bun run lint` enforces this);
// split into more feature files as they grow.
// Patterns and examples: skills/app/references/api.md
export const router = {
  ping,
  admin,
  photos,
  content,
  packages,
  messages,
  testimonials,
  posts,
  upload,
};

export type AppRouter = typeof router;
/** Typed client for the router — used by the web and mobile api clients. */
export type AppRouterClient = RouterClient<AppRouter>;

const app = createApp(router);

// First boot: fill the session price list so the public pages are never empty.
void seedPackagesIfEmpty().catch(() => undefined);
void seedTestimonialsIfEmpty().catch(() => undefined);

// Better Auth (admin panel sign-in)
app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw));

// Streams admin-uploaded photos back out of Tigris under a stable public path.
app.get("/api/files/*", async (c) => {
  const key = c.req.path.replace("/api/files/", "");
  if (!key) return c.json({ error: "Missing key" }, 400);
  try {
    const object = await s3.send(new GetObjectCommand({ Bucket: S3_BUCKET, Key: key }));
    if (!object.Body) return c.json({ error: "Not found" }, 404);
    return new Response(object.Body.transformToWebStream(), {
      status: 200,
      headers: {
        "Content-Type": object.ContentType ?? "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return c.json({ error: "Not found" }, 404);
  }
});

export default app;
