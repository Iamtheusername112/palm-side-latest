/**
 * Translation utilities for managing delays and preventing rate limiting
 */

// Counter for generating staggered delays
let delayCounter = 0

/**
 * Get a staggered delay for translation requests
 * @param {number} baseDelay - Base delay in milliseconds
 * @param {number} increment - Increment between requests
 * @returns {number} - Staggered delay value
 */
export function getStaggeredDelay(baseDelay = 0, increment = 500) {
  const delay = baseDelay + delayCounter * increment
  delayCounter++
  return delay
}

/**
 * Reset the delay counter (useful when changing languages)
 */
export function resetDelayCounter() {
  delayCounter = 0
}

/**
 * Generate delays for a list of items
 * @param {number} count - Number of items
 * @param {number} baseDelay - Base delay in milliseconds
 * @param {number} increment - Increment between requests
 * @returns {Array<number>} - Array of delay values
 */
export function generateDelays(count, baseDelay = 0, increment = 500) {
  return Array.from(
    { length: count },
    (_, index) => baseDelay + index * increment
  )
}
