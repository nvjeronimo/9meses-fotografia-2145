import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { bearer } from "better-auth/plugins";
import { db } from "./database";
import * as schema from "./database/schema";

/** True while the studio owner account has not been created yet. */
export async function isSetupPending() {
  const rows = await db.select({ id: schema.user.id }).from(schema.user).limit(1);
  return rows.length === 0;
}

/**
 * Single-owner admin auth (email + password only, no public sign-up).
 * The first account can be created once, from /admin/setup; after that the
 * database hook rejects any further sign-up, so the panel stays private.
 * `bearer()` keeps the session working inside the Runable preview iframe.
 */
export const auth = betterAuth({
  basePath: "/api/auth",
  baseURL: process.env.WEBSITE_URL,
  database: drizzleAdapter(db, { provider: "sqlite" }),
  emailAndPassword: { enabled: true },
  secret: process.env.BETTER_AUTH_SECRET,
  trustedOrigins: (request) => {
    const origin = request?.headers.get("origin");
    return origin ? [origin] : ["*"];
  },
  databaseHooks: {
    user: {
      create: {
        before: async () => {
          if (!(await isSetupPending())) {
            throw new APIError("FORBIDDEN", {
              message: "Sign-up is closed — this panel has a single owner account.",
            });
          }
        },
      },
    },
  },
  plugins: [bearer()],
});
