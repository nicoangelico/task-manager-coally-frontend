import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL || 'http://localhost:8000/api',
  },
};

export default nextConfig;
