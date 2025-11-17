import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // This is the simpler 'domains' array.
    // It's less specific but 100% reliable.
    domains: ["images.unsplash.com", "plus.unsplash.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
