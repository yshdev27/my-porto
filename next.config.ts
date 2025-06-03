import type { NextConfig } from "next";

import createMDX from '@next/mdx' 

const nextConfig: NextConfig = {

  /* config options here */
   pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        hostname: "aceternity.com",
},
],
},
}
;

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
})

export default withMDX(nextConfig);
