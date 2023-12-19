const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    compress: true,
    images: {
        unoptimized: true,
    },
    compiler: {
        styledComponents: true,
    },
};

module.exports = withBundleAnalyzer({
    ...nextConfig,
    webpack(config) {
        const prod = process.env.NEXT_NODE_ENV === "production";
        // const plugins = [...config.plugins];
        return {
            ...config,
            mode: prod ? "production" : "development",
            devtool: prod ? "hidden-source-map" : "eval",
            // plugins: [...config.plugins],
        };
    },
});
