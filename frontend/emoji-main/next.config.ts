import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://172.23.182.27:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;