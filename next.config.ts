import type { NextConfig } from "next";

/** @type {NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // Erlaube Bilder von localhost
  },
};

export default nextConfig;
