/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  allowedDevOrigins: [
    "localhost:*",
    "127.0.0.1:*",
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;