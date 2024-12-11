import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.externals = config.externals || [];
    
    // Workaround for issue: https://github.com/chroma-core/chroma/issues/2988
    config.externals.push({
      'https://unpkg.com/@xenova/transformers@2.13.2': 'transformers',
    });
    
    return config;
  }
};

export default nextConfig;