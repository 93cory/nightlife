import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    "*": ["**/@swc/core*"],
  },
};

export default nextConfig;
