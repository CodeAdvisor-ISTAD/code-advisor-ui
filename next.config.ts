import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        pathname: '**',
      },
    ],
  },
}
  /* config options here */


export default nextConfig;
