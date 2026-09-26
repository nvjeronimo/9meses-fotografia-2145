import { PACKAGES, type SessionType } from "../content/packages";

export type { SessionType };

/** The static price list, shaped like the old API rows. */
const ROWS = PACKAGES.map((row, i) => ({
  ...row,
  id: i + 1,
  highlighted: row.highlighted ?? false,
  published: true,
}));

export function usePackages() {
  return { data: ROWS, isLoading: false };
}
