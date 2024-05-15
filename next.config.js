/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/your-cloudinary-account/**",
      },
    ],
  },
};
module.exports = nextConfig;
