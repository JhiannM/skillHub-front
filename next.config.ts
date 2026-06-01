import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['192.168.1.65'],
    output: "standalone",
    turbopack: {
        root: process.cwd(),
    },
    /* config options here */
};

export default nextConfig;
