import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/ecommerce-app",
  images: { unoptimized: true },
};

export default nextConfig;
