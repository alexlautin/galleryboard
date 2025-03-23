/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
};
module.exports = {
  async headers() {
    return [
      {
        source: '/api/socket/io',
        headers: [
          {
            key: 'Connection',
            value: 'Upgrade',
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig; 