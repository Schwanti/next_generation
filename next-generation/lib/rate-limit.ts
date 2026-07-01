import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

interface RateLimitEntry {
  attempts: number;
  resetAt: number;
}

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

// In-memory fallback for development
const store = new Map<string, RateLimitEntry>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}, 60_000);

function inMemoryRateLimit(ip: string) {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || entry.resetAt <= now) {
    store.set(ip, { attempts: 1, resetAt: now + WINDOW_MS });
    return { success: true, remaining: MAX_ATTEMPTS - 1, resetInMs: WINDOW_MS };
  }

  entry.attempts++;

  if (entry.attempts > MAX_ATTEMPTS) {
    return { success: false, remaining: 0, resetInMs: entry.resetAt - now };
  }

  return { success: true, remaining: MAX_ATTEMPTS - entry.attempts, resetInMs: entry.resetAt - now };
}

// Upstash Redis rate limiter (production on Vercel)
const upstashRatelimit = (() => {
  try {
    if (
      typeof process !== "undefined" &&
      process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      return new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(MAX_ATTEMPTS, `${WINDOW_MS / 1000}s`),
      });
    }
  } catch {
    // Upstash not available
  }
  return null;
})();

export async function rateLimit(ip: string) {
  if (upstashRatelimit) {
    const { success, remaining, reset } = await upstashRatelimit.limit(ip);
    return { success, remaining, resetInMs: Math.max(0, reset - Date.now()) };
  }

  return inMemoryRateLimit(ip);
}
