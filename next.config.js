/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "pixelbuddy-production.up.railway.app",
      },
    ],
  },
};

module.exports = nextConfig;
