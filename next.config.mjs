/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
            },
        ],
    },
};

export default nextConfig;
