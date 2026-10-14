import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "public.blob.vercel-storage.com",
      },
    ],
  },
  reactStrictMode: true,
  allowedDevOrigins: [
    "localhost:3000",
    "127.0.0.1:3000",
    "localhost:3001",
    "127.0.0.1:3001",
    "localhost:3002",
    "127.0.0.1:3002",
    "localhost:3005",
    "127.0.0.1:3005",
    "192.168.29.64:3000",
    "192.168.29.64:3001",
    "192.168.29.96:3000",
    "192.168.29.96:3001",
  ],
};

export default nextConfig;
