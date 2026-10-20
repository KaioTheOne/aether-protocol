import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ...o que já estava aqui (como cacheComponents) fica como está...
  allowedDevOrigins: ["192.168.18.10"],
};

export default nextConfig;