import { fileURLToPath } from 'url'
import { dirname } from 'path'
import createNextIntlPlugin from 'next-intl/plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
}
const withNextIntl = createNextIntlPlugin({
  // Use cookie-based locale; no locale prefix in routes
  routing: {
    locales: ['en', 'de', 'es'],
    defaultLocale: 'en',
    localePrefix: 'never'
  }
})

export default withNextIntl(nextConfig)
