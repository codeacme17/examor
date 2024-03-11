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
}

export default nextConfig
