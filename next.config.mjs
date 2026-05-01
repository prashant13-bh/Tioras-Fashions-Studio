/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.pockethost.io',
      },
      {
        protocol: 'https',
        hostname: 'api-ecommerce.hostinger.com',
      },
    ],
  },
  async redirects() {
    return [
      // Old design studio routes → home
      { source: '/design-studio', destination: '/', permanent: true },
      { source: '/ai-designer', destination: '/', permanent: true },
      { source: '/design-generator', destination: '/', permanent: true },
      { source: '/customize', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
