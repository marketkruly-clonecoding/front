/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["kurly.s3.ap-northeast-1.amazonaws.com", "img-cf.kurly.com"],
  },
  async rewrites() {
    return [
      {
        source: "/app/:path*",
        destination: "http://prod.hiimpedro.site:9000/app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
