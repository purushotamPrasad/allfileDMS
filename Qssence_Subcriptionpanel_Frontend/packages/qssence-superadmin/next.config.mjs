/** @type {import('next').NextConfig} */
const nextConfig = {

    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: false,

    swcMinify: true,

    webpack(config, { isServer }) {
        if (!isServer) {
           
            config.resolve.fallback = {
                fs: false,
                path: false,
                crypto: false,
                stream: false, 
            };
        }

        return config;
    },
};

export default nextConfig;
