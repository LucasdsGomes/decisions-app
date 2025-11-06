import type { NextConfig } from "next";

const backendHost = process.env.BACKEND_URL || "http://localhost:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: `${backendHost}/:path*/`,
      },
    ];
  },
};

export default nextConfig;
