'use client'

import { Toaster } from 'sonner'
import { ContactProvider } from './contexts/ContactContext'

// import { ClerkProvider } from '@clerk/nextjs'

export function Providers({ children }) {
  return (
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
  )
  // return <ClerkProvider>{children}</ClerkProvider>
}
