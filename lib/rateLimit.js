// Simple in-memory limiter: protects your API credit from abuse.
// On serverless hosts it resets per instance; use Upstash/Redis for strict limits.
const hits = new Map();

export function rateLimit(key, max, windowMs) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (recent.length >= max) { hits.set(key, recent); return false; }
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export const clientIp = (req) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
