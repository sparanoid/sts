import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_API_BASE_PATH || '',
  /* config options here */
}

export default nextConfig
