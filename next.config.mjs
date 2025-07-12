/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // dev backend url
    API_URL: "http://localhost:5000/api",

    // live backend url
    // API_URL: "",

    // frontend live url
    FRONTEND_URL: "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shohozbibaho.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
