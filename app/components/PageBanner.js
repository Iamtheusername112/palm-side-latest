'use client'

const PageBanner = ({ title, subtitle, videoSrc = '/video/videopalm3.mp4' }) => {
  return (
    <div className='relative overflow-hidden bg-gradient-to-r from-amber-700 to-green-700 py-12 pt-24 min-h-[360px] flex items-center'>
      <div className='absolute inset-0 bg-gradient-to-r from-amber-700/50 to-green-700/50 z-10'></div>
      <video
        className='absolute inset-0 w-full h-full object-cover'
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className='relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in'>
          {title}
        </h1>
        {subtitle && (
          <p className='text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto'>
            {subtitle}
          </p>
        )}
      </div>

      {/* Decorative Elements */}
      <div className='absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36'></div>
      <div className='absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48'></div>
    </div>
  )
}

export default PageBanner


