/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal config to avoid build issues
  
  // Enable larger file uploads for property images (up to 50MB)
  experimental: {
    // Increase body size limit for API routes and server actions
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
}

export default nextConfig
