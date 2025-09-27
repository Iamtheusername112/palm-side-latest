'use client'

import { Toaster } from 'sonner'
import { ContactProvider } from './contexts/ContactContext'
import { TranslationProvider } from '../contexts/TranslationContext'

// import { ClerkProvider } from '@clerk/nextjs'

export function Providers({ children }) {
  return (
    <TranslationProvider>
      <ContactProvider>
        {children}
        <Toaster
          position='top-right'
          expand={true}
          richColors={true}
          closeButton={true}
          duration={4000}
        />
      </ContactProvider>
    </TranslationProvider>
  )
  // return <ClerkProvider>{children}</ClerkProvider>
}
