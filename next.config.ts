import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Consigliato per rilevare problemi di React
  swcMinify: true,       // Opzione per minimizzare il codice
  serverActions: true
};

export default nextConfig;
