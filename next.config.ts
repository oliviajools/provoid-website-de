import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Allow dev access from mobile devices on local network
  allowedDevOrigins: ['192.168.155.23'],
  
  // Optimize images for better mobile performance
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Enable React strict mode for better performance
  reactStrictMode: true,
  
  // Optimize production builds
  swcMinify: true,
  
  // Improve performance with compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
