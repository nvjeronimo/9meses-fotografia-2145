import { base } from "../__core/app";
import { isSetupPending } from "../auth";

export const admin = {
  /** Drives /admin/setup vs /admin/login. */
  setupStatus: base.handler(async () => ({ pending: await isSetupPending() })),
};
