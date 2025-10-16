'use client'

const PageBanner = ({ title, subtitle, videoSrc = '/video/videopalm3.mp4' }) => {
  return (
    <div className='relative overflow-hidden bg-[#B08D57] py-12 pt-24 min-h-[360px] flex items-center'>
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

      {/* Waving Palms - enhanced */}
      <div className='pointer-events-none absolute left-2 sm:left-6 bottom-6 z-20 flex items-end gap-2'>
        {/* Left Palm - gradient stroke, trunk + fronds with offset animations */}
        <svg className='w-12 h-12 palm-glow' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <defs>
            <linearGradient id='goldStrokeLeft' x1='0' y1='0' x2='24' y2='24' gradientUnits='userSpaceOnUse'>
              <stop offset='0%' stopColor='#B08D57' />
              <stop offset='100%' stopColor='#9C7C49' />
            </linearGradient>
          </defs>
          <g stroke='url(#goldStrokeLeft)' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path className='palm-trunk-anim' d='M12 22c0-6 0-10 0-12' />
            <path className='palm-frond-anim' d='M12 10c-2-3-5-4-8-3 3 2 5 3 6 5' />
            <path className='palm-frond-anim' d='M12 10c2-3 5-4 8-3-3 2-5 3-6 5' />
            <path className='palm-frond-anim' d='M12 12c-2-2-4-2.5-6-2 2 1.5 3.5 2 4.5 3.5' />
            <path className='palm-frond-anim' d='M12 12c2-2 4-2.5 6-2-2 1.5-3.5 2-4.5 3.5' />
          </g>
        </svg>
      </div>
      <div className='pointer-events-none absolute right-2 sm:right-6 bottom-6 z-20 flex items-end gap-2'>
        {/* Right Palm - gradient stroke, delayed animation */}
        <svg className='w-12 h-12 palm-glow float-slower' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <defs>
            <linearGradient id='goldStrokeRight' x1='24' y1='0' x2='0' y2='24' gradientUnits='userSpaceOnUse'>
              <stop offset='0%' stopColor='#B08D57' />
              <stop offset='100%' stopColor='#9C7C49' />
            </linearGradient>
          </defs>
          <g stroke='url(#goldStrokeRight)' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path className='palm-trunk-anim' style={{ animationDelay: '0.6s' }} d='M12 22c0-6 0-10 0-12' />
            <path className='palm-frond-anim' style={{ animationDelay: '0.3s' }} d='M12 10c-2-3-5-4-8-3 3 2 5 3 6 5' />
            <path className='palm-frond-anim' style={{ animationDelay: '0.3s' }} d='M12 10c2-3 5-4 8-3-3 2-5 3-6 5' />
            <path className='palm-frond-anim' style={{ animationDelay: '0.15s' }} d='M12 12c-2-2-4-2.5-6-2 2 1.5 3.5 2 4.5 3.5' />
            <path className='palm-frond-anim' style={{ animationDelay: '0.15s' }} d='M12 12c2-2 4-2.5 6-2-2 1.5-3.5 2-4.5 3.5' />
          </g>
        </svg>
      </div>

      {/* Subtle sparkles */}
      <div className='pointer-events-none absolute inset-x-0 bottom-6 z-10'>
        <div className='sparkle' style={{ left: '20%', animationDelay: '0s' }} />
        <div className='sparkle' style={{ left: '35%', animationDelay: '0.6s' }} />
        <div className='sparkle' style={{ left: '60%', animationDelay: '1.2s' }} />
        <div className='sparkle' style={{ left: '75%', animationDelay: '1.8s' }} />
      </div>
    </div>
  )
}

export default PageBanner


