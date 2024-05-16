/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Remove the deprecated 'domains' property
    domains: ["res.cloudinary.com"], // Deprecated

    // Use 'remotePatterns' for external domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Ensure the 'port' is set to an empty string if not used
        port: '',
        // Update the 'pathname' to match your Cloudinary account structure
        pathname: '/your-cloudinary-account/**',
      },
    ],
  },
};

module.exports = nextConfig;
