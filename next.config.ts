import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/three-bar-fifty.firebasestorage.app/o/**',
      },
    ],
  },
}

export default nextConfig
