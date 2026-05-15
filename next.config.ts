import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow access from local network device
  allowedDevOrigins: ["192.168.1.23"],
  experimental: {
    serverExternalPackages: ["better-sqlite3"],
  },
};

export default nextConfig;
