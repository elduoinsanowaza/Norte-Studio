import { Redis } from "@upstash/redis";

// Shares the same Upstash instance as the Panel de Cliente project
// (norte-studio-clientes), so its admin panel can read what gets written
// here. The Vercel Marketplace "Upstash for Redis" integration exposes
// KV_REST_API_* names (not UPSTASH_REDIS_REST_*), so Redis.fromEnv() can't
// be used directly.
export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});
