import createNextIntlPlugin from 'next-intl/plugin';
import withPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin();

// Allowed domais for api requests
const allowedDomains = ['https://trip-hold.vercel.app'];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,      // Enable React strict mode for improved error handling
  swcMinify: true,            // Enable SWC minification for improved performance
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
    ],
  },
  // Block request to api from others domains (CORS)
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV == 'production' ? allowedDomains.join(', ') : '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Accept',
          },
        ],
      },
    ];
  },
};

// PWA configuration
const withPWAConfig = {
  dest: "public",         // destination directory for the PWA files
  disable: process.env.NODE_ENV !== "production",        // disable PWA in development
  register: true,         // register the PWA service worker
  skipWaiting: true,      // skip waiting for service worker activation
};

export default withPWA(withPWAConfig)(withNextIntl(nextConfig));
