/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["kurly.s3.ap-northeast-1.amazonaws.com", "img-cf.kurly.com"],
  },
};

module.exports = nextConfig;
