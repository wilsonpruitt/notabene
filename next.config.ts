import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // A stray package-lock.json in $HOME makes Next infer the wrong
  // workspace root; pin it to this project.
  turbopack: { root: __dirname },
};

export default nextConfig;
