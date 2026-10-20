import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/quote", destination: "/find-my-plans", permanent: true }];
  },
};

export default nextConfig;
