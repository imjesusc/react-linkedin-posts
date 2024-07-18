/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/posts',
        destination: `${process.env.LINKEDIN_API_URL}/rest/posts`,
      },
    ]
  },
}

export default nextConfig
