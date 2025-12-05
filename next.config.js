/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'steve-api-app.renovlux-group.com',
        pathname: '/storage/**',
      },
    ],
  },
  trailingSlash: true, // recommandé pour export
};

module.exports = nextConfig;
