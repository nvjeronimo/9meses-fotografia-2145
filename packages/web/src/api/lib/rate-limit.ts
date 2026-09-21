/**
 * Tiny in-memory sliding-window rate limiter.
 *
 * Good enough for a single-instance site: it stops a bot hammering the contact
 * form without adding a database round-trip. Counters reset when the process
 * restarts, which is acceptable for spam control.
 */

const hits = new Map<string, number[]>();

/** Drops buckets nobody has touched for a while so the map cannot grow forever. */
function prune(now: number, windowMs: number) {
  for (const [key, stamps] of hits) {
    const kept = stamps.filter((stamp) => now - stamp < windowMs);
    if (kept.length === 0) hits.delete(key);
    else hits.set(key, kept);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** Seconds until the caller may try again. */
  retryAfter: number;
}

/** Records a hit for `key` and reports whether it is within `limit` per `windowMs`. */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  if (hits.size > 500) prune(now, windowMs);

  const stamps = (hits.get(key) ?? []).filter((stamp) => now - stamp < windowMs);

  if (stamps.length >= limit) {
    const oldest = stamps[0] ?? now;
    hits.set(key, stamps);
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - oldest)) / 1000) };
  }

  stamps.push(now);
  hits.set(key, stamps);
  return { ok: true, retryAfter: 0 };
}

/** Best-effort client identity from proxy headers, for rate-limit bucketing. */
export function clientKey(headers: Headers, scope: string): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || headers.get("cf-connecting-ip") || headers.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
}
