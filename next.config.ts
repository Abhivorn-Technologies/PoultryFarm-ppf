import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  reactStrictMode: true,
  allowedDevOrigins: ["localhost:3000", "192.168.29.64:3000", "127.0.0.1:3000"],
};

export default nextConfig;
