import createNextIntlPlugin from 'next-intl/plugin';
import withPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin();

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
      {
        protocol: 'https',
        hostname: 'media-cdn.tripadvisor.com',
        pathname: '**',
      },
    ],
  },
};

/** @type {withPWA.PWAConfig} */
const withPWAConfig = {
  dest: "public",         // destination directory for the PWA files
  disable: process.env.NODE_ENV !== "production",        // disable PWA in development
  register: true,         // register the PWA service worker
  skipWaiting: true,      // skip waiting for service worker activation
};

// Export the Next.js configuration object
export default withPWA(withPWAConfig)(withNextIntl(nextConfig));
