import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sur Vercel, ne pas utiliser standalone (Vercel gère son propre build)
  ...(process.env.VERCEL ? {} : { output: "standalone" }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
