/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/24",
      },
      {
        protocol: "https",
        hostname: "landingfoliocom.imgix.net",
        pathname: "/store/collection/dusk/images/logo.svg",
      },
      {
        protocol: "https",
        hostname: "landingfoliocom.imgix.net",
        pathname: "/store/collection/dusk/images/noise.png",
      },
      {
        protocol: "https",
        hostname: "landingfoliocom.imgix.net",
        pathname: "/store/collection/dusk/images/hero/4/dashboard-mockup.png",
      },
    ],
  },
};

module.exports = nextConfig;
