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
      // Old design studio routes → home (Except the new /design-studio we just enabled)
      { source: '/ai-designer', destination: '/', permanent: false },
      { source: '/design-generator', destination: '/', permanent: false },
      { source: '/customize', destination: '/', permanent: false },
    ];
  },
};

export default nextConfig;
