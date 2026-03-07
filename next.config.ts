import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/utils/imageLoader.ts",
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pictures-ghana.jijistatic.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.jijistatic.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
