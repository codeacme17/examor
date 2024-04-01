/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/manage-notes',
        permanent: true,
      },
    ]
  },
  webpack(config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }

    return config
  },
}

export default nextConfig
