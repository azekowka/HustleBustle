import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //output: "standalone", // Ensures correct build output for Vercel
  reactStrictMode: true, // Helps detect issues during development
  images: {
    unoptimized: true, // Use if you're facing issues with Next.js images in Vercel
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
