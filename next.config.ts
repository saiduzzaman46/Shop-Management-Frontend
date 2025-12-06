import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/product/getimage/**",
      },
      {
        protocol: "https",
        hostname: "shop-management-backend-production.up.railway.app",
        port: "",
        pathname: "/product/getimage/**",
      },
    ],
  },
};

export default nextConfig;
