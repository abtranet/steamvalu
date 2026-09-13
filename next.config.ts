import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output exists for the Docker image, which copies
  // `.next/standalone` (see Dockerfile). Vercel builds its own output and
  // rejects the standalone layout, so leave it unset there.
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
