'use client'

import { Toaster } from 'sonner'

// import { ClerkProvider } from '@clerk/nextjs'

export function Providers({ children }) {
  return (
    <>
      {children}
      <Toaster
        position='top-right'
        expand={true}
        richColors={true}
        closeButton={true}
        duration={4000}
      />
    </>
  )
  // return <ClerkProvider>{children}</ClerkProvider>
}
