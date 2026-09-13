import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  // A stray lockfile above the repo made Next guess a workspace root outside it.
  outputFileTracingRoot: path.resolve(__dirname),
  // Next blocks cross-origin dev requests by default, so anything other than
  // localhost — a phone on the LAN, or a tunnel hostname — must be listed here.
  // The previous entry (10.0.0.176) no longer matches this machine.
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "192.168.1.*",
    "10.*",
    "*.trycloudflare.com",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.ts.net",
  ],
  // The floating dev badge sits over the bottom-left of every page, which makes
  // design review and screenshots misleading. Errors are still surfaced.
  devIndicators: false,
  // AVIF where the browser supports it, WebP otherwise: several sources are 1–2 MB PNGs.
  images: { formats: ["image/avif", "image/webp"] },
  // steamvalu.com is canonical: send www to the same path (and query) there.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.steamvalu.com" }],
        destination: "https://steamvalu.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
