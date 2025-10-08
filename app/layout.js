import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import TranslationDebugger from '../components/TranslationDebugger'
import LoadingScreen from './components/LoadingScreen'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Palmside S.L.',
  description: 'Your trusted partner in real estate services',
  keywords:
    'real estate, luxury properties, investment properties, Mallorca, property management',
  authors: [{ name: 'Palmside S.L.' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      {
        url: '/logo/palmside-logo-transparent.png',
        type: 'image/png',
        sizes: '192x192',
      },
    ],
    apple: [{ url: '/apple-icon.png', type: 'image/png', sizes: '180x180' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  robots: 'index, follow',
  openGraph: {
    title: 'Palmside S.L.',
    description: 'Your trusted partner in real estate services',
    type: 'website',
    locale: 'en_US',
    siteName: 'Palmside S.L.',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#059669',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingScreen />
        <Providers>{children}</Providers>
        <TranslationDebugger />
      </body>
    </html>
  )
}
