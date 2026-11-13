import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetInSeconds: number;
}

// In-memory fallback if Upstash environment variables are not configured yet (e.g. local dev)
const fallbackStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Serverless-compatible rate limiter using Upstash Redis with a fallback in-memory store.
 * Reads credentials from UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
 */
export async function checkRateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000
): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const redis = new Redis({ url, token });
      const windowSeconds = Math.max(1, Math.floor(windowMs / 1000));
      const limiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
        prefix: "@upstash/ratelimit",
      });

      const res = await limiter.limit(key);
      const resetInSeconds = Math.max(0, Math.ceil((res.reset - Date.now()) / 1000));

      return {
        success: res.success,
        remaining: res.remaining,
        resetInSeconds,
      };
    } catch (err) {
      console.warn("Upstash Redis rate limit error, falling back to local memory limiter:", err);
    }
  }

  // Fallback memory rate limit when UPSTASH env vars are missing
  const now = Date.now();
  const record = fallbackStore.get(key);

  if (!record || now > record.resetTime) {
    fallbackStore.set(key, { count: 1, resetTime: now + windowMs });
    return {
      success: true,
      remaining: limit - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
    };
  }

  record.count += 1;
  fallbackStore.set(key, record);

  return {
    success: true,
    remaining: limit - record.count,
    resetInSeconds: Math.ceil((record.resetTime - now) / 1000),
  };
}
