import type { NextConfig } from "next";


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

export default nextConfig;
