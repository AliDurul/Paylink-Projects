/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.1.110',
        pathname: '/api/v1/media**',
      },
    ],
  },
};

export default nextConfig;
