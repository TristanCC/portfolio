import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl/,
      type: 'asset/source'
    })
    return config
  }
};

export default nextConfig;
