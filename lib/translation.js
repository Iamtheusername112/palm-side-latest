/**
 * Translation utility using OpenAI API
 * Provides automatic translation functionality for the app
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

if (!OPENAI_API_KEY) {
  console.warn(
    'OpenAI API key not found. Translation functionality will be limited.'
  )
}

// Language mapping for OpenAI
const LANGUAGE_MAP = {
  en: 'English',
  de: 'German',
  es: 'Spanish',
}

// Cache for translations to avoid repeated API calls
const translationCache = new Map()

// Rate limiting and request queue
const requestQueue = []
const maxConcurrentRequests = 1 // Only 1 request at a time
let requestDelay = 1000 // 1 second between requests (less aggressive)
let activeRequests = 0
let lastRequestTime = 0
let consecutive429Errors = 0 // Track consecutive 429 errors
let circuitBreakerOpen = false
let circuitBreakerTimeout = null

/**
 * Rate-limited request function to avoid 429 errors
 */
async function makeRateLimitedRequest(requestFn) {
  return new Promise((resolve, reject) => {
    requestQueue.push({ requestFn, resolve, reject })
    processRequestQueue()
  })
}

/**
 * Process the request queue with rate limiting
 */
async function processRequestQueue() {
  if (activeRequests >= maxConcurrentRequests || requestQueue.length === 0) {
    return
  }

  const now = Date.now()
  const timeSinceLastRequest = now - lastRequestTime

  if (timeSinceLastRequest < requestDelay) {
    setTimeout(processRequestQueue, requestDelay - timeSinceLastRequest)
    return
  }

  const { requestFn, resolve, reject } = requestQueue.shift()
  activeRequests++
  lastRequestTime = Date.now()

  try {
    const result = await requestFn()
    resolve(result)
  } catch (error) {
    reject(error)
  } finally {
    activeRequests--
    setTimeout(processRequestQueue, requestDelay)
  }
}

/**
 * Translate text using OpenAI API
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code (en, de, es)
 * @param {string} sourceLang - Source language code (optional, auto-detect if not provided)
 * @returns {Promise<string>} - Translated text
 */
export async function translateText(
  text,
  targetLang = 'en',
  sourceLang = 'auto'
) {
  // Return original text if target language is English or if text is empty
  if (targetLang === 'en' || !text || text.trim() === '') {
    return text
  }

  // Check if API key is available
  if (!OPENAI_API_KEY) {
    console.warn('OpenAI API key not available, returning original text')
    return text
  }

  // Circuit breaker: if we've had too many 429 errors, temporarily disable translations
  if (circuitBreakerOpen) {
    console.warn('Translation circuit breaker is open, using original text')
    return text
  }

  // Check cache first
  const cacheKey = `${text}-${sourceLang}-${targetLang}`
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)
  }

  try {
    const targetLanguage = LANGUAGE_MAP[targetLang]
    if (!targetLanguage) {
      console.warn(`Unsupported target language: ${targetLang}`)
      return text
    }

    const result = await makeRateLimitedRequest(async () => {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: `You are a professional translator. Translate the given text to ${targetLanguage}. 
              Maintain the original tone, context, and formatting. 
              For real estate content, use appropriate real estate terminology in the target language.
              Return only the translated text without any explanations or additional text.`,
              },
              {
                role: 'user',
                content: text,
              },
            ],
            max_tokens: 1000,
            temperature: 0.3,
          }),
        }
      )

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 429) {
          consecutive429Errors++
          console.warn(
            `OpenAI API rate limit reached (${consecutive429Errors} consecutive), using original text`
          )

          // Increase delay after consecutive 429 errors
          if (consecutive429Errors >= 3) {
            requestDelay = Math.min(requestDelay * 1.5, 10000) // Max 10 seconds
            console.warn(
              `Increasing request delay to ${requestDelay}ms due to repeated rate limiting`
            )
          }

          // Open circuit breaker after 5 consecutive 429 errors
          if (consecutive429Errors >= 5) {
            circuitBreakerOpen = true
            console.warn(
              'Opening translation circuit breaker due to repeated rate limiting'
            )

            // Close circuit breaker after 5 minutes
            if (circuitBreakerTimeout) {
              clearTimeout(circuitBreakerTimeout)
            }
            circuitBreakerTimeout = setTimeout(() => {
              circuitBreakerOpen = false
              consecutive429Errors = 0
              console.warn(
                'Closing translation circuit breaker, resuming translations'
              )
            }, 5 * 60 * 1000) // 5 minutes
          }

          return text
        } else {
          // Reset 429 counter on successful requests
          consecutive429Errors = 0
        }

        if (response.status === 401) {
          console.error('OpenAI API authentication failed')
          return text
        }
        if (response.status >= 500) {
          console.error('OpenAI API server error')
          return text
        }

        // For any other error, return original text instead of throwing
        console.warn(
          `OpenAI API error ${response.status}: ${response.statusText}, using original text`
        )
        return text
      } else {
        // Reset 429 counter on successful requests
        consecutive429Errors = 0
      }

      const data = await response.json()
      return data.choices?.[0]?.message?.content?.trim() || text
    })

    // Cache the translation
    translationCache.set(cacheKey, result)
    return result
  } catch (error) {
    console.error('Translation error:', error)
    // Return original text as fallback
    return text
  }
}

/**
 * Translate multiple texts in batch
 * @param {Array<{text: string, targetLang: string, sourceLang?: string}>} translations - Array of translation objects
 * @returns {Promise<Array<string>>} - Array of translated texts
 */
export async function translateBatch(translations) {
  const promises = translations.map(
    ({ text, targetLang, sourceLang = 'auto' }) =>
      translateText(text, targetLang, sourceLang)
  )

  return Promise.all(promises)
}

/**
 * Clear translation cache
 */
export function clearTranslationCache() {
  translationCache.clear()
}

/**
 * Get cache size for debugging
 * @returns {number} - Number of cached translations
 */
export function getCacheSize() {
  return translationCache.size
}

/**
 * Get rate limiting status for debugging
 * @returns {Object} - Rate limiting status information
 */
export function getRateLimitStatus() {
  return {
    activeRequests,
    queueLength: requestQueue.length,
    consecutive429Errors,
    circuitBreakerOpen,
    requestDelay,
    lastRequestTime: new Date(lastRequestTime).toISOString(),
  }
}

/**
 * Manually reset the circuit breaker (useful for testing)
 */
export function resetCircuitBreaker() {
  circuitBreakerOpen = false
  consecutive429Errors = 0
  if (circuitBreakerTimeout) {
    clearTimeout(circuitBreakerTimeout)
    circuitBreakerTimeout = null
  }
  console.warn('Circuit breaker manually reset')
}
