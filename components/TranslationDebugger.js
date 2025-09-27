'use client'

import { useState, useEffect } from 'react'
import {
  getRateLimitStatus,
  getCacheSize,
  resetCircuitBreaker,
} from '../lib/translation'

/**
 * Debug component to monitor translation system status
 * Only shows in development mode
 */
export default function TranslationDebugger() {
  const [status, setStatus] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return

    const interval = setInterval(() => {
      setStatus({
        ...getRateLimitStatus(),
        cacheSize: getCacheSize(),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Don't render in production
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className='fixed bottom-4 right-4 z-50'>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className='bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700'
      >
        Translation Debug
      </button>

      {isVisible && status && (
        <div className='absolute bottom-12 right-0 bg-white border border-gray-300 rounded-lg p-4 shadow-lg text-xs max-w-xs'>
          <div className='font-semibold mb-2'>Translation Status</div>
          <div className='space-y-1'>
            <div>Active Requests: {status.activeRequests}</div>
            <div>Queue Length: {status.queueLength}</div>
            <div>429 Errors: {status.consecutive429Errors}</div>
            <div>
              Circuit Breaker: {status.circuitBreakerOpen ? 'OPEN' : 'CLOSED'}
            </div>
            <div>Request Delay: {status.requestDelay}ms</div>
            <div>Cache Size: {status.cacheSize}</div>
            <div>
              Last Request:{' '}
              {status.lastRequestTime
                ? new Date(status.lastRequestTime).toLocaleTimeString()
                : 'Never'}
            </div>
          </div>
          {status.circuitBreakerOpen && (
            <button
              onClick={resetCircuitBreaker}
              className='mt-2 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600'
            >
              Reset Circuit Breaker
            </button>
          )}
        </div>
      )}
    </div>
  )
}
