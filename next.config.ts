import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  // 외부 이미지 도메인 허용
  images: {
    domains: ["k.kakaocdn.net"],
  },

  webpack(config: Configuration) {
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*", // 프론트에서 이 경로로 요청하면
        destination: "https://vote-dream.p-e.kr/api/:path*", // 백엔드로 프록시됨
      },
    ];
  },
};

export default nextConfig;
