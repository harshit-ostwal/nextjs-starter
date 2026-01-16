/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        qualities: [100, 75, 50],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
        ],
    },
    devIndicators: false,
};

export default nextConfig;
