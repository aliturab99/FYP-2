/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    suppressHydrationWarning: true
  },
  // Additional hydration handling
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Optimize for client-side rendering
  swcMinify: true,
  images: {
    // Allow all external domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
    // Legacy domains support (for backward compatibility)
    domains: ['localhost'],
    // Disable image optimization for external images (optional)
    unoptimized: true,
    // Disable image format optimization for better compatibility
    formats: ['image/webp', 'image/avif'],
    // Allow any image size
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  }
};

export default nextConfig;
