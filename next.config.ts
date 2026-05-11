import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["arryvobase.com", "*.vercel.app"],
    },
  },
};

export default nextConfig;
