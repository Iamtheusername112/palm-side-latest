import Image from 'next/image'

export default function Loading() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 via-green-50 to-yellow-50'>
      <div className='flex flex-col items-center space-y-8'>
        {/* Logo with pulse animation */}
        <div className='relative'>
          <div className='absolute inset-0 animate-ping opacity-75'>
            <div className='h-32 w-32 rounded-full bg-gradient-to-r from-amber-400 to-green-500 blur-xl'></div>
          </div>
          <div className='relative animate-pulse'>
            <Image
              src='/logo/palmside-logo-transparent.png'
              alt='Palmside Logo'
              width={200}
              height={200}
              priority
              className='drop-shadow-2xl'
            />
          </div>
        </div>

        {/* Loading text and spinner */}
        <div className='flex flex-col items-center space-y-4'>
          <div className='flex items-center space-x-3'>
            <div className='h-3 w-3 animate-bounce rounded-full bg-amber-600 [animation-delay:-0.3s]'></div>
            <div className='h-3 w-3 animate-bounce rounded-full bg-green-600 [animation-delay:-0.15s]'></div>
            <div className='h-3 w-3 animate-bounce rounded-full bg-amber-600'></div>
          </div>
          <p className='text-lg font-semibold text-gray-700 animate-pulse'>
            Loading Palmside...
          </p>
        </div>
      </div>
    </div>
  )
}
