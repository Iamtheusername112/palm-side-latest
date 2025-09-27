/**
 * Translation Hooks
 * Provides convenient hooks for translation functionality
 */

import { useState, useCallback } from 'react'
import {
  useTranslation as useTranslationContext,
  useStaticTranslation,
} from '../contexts/TranslationContext'

/**
 * Main translation hook
 * Provides full translation functionality including dynamic translation
 *
 * @returns {Object} Translation context value
 */
export function useTranslation() {
  return useTranslationContext()
}

// Re-export useStaticTranslation from context
export { useStaticTranslation }

/**
 * Hook for translating specific text
 * Returns a function to translate text and loading state
 *
 * @returns {Object} Translation utilities
 */
export function useTextTranslation() {
  const { translateText, currentLanguage, isLoading } = useTranslation()

  const translate = async (text, targetLang = currentLanguage) => {
    if (!text || text.trim() === '') return text
    if (targetLang === 'en') return text

    try {
      return await translateText(text, targetLang)
    } catch (error) {
      console.error('Translation error:', error)
      return text
    }
  }

  return {
    translate,
    isLoading,
    currentLanguage,
  }
}

/**
 * Hook for batch translation
 * Useful for translating multiple texts at once
 *
 * @returns {Object} Batch translation utilities
 */
export function useBatchTranslation() {
  const { translateBatch, currentLanguage, isLoading } = useTranslation()

  const translateTexts = async (texts, targetLang = currentLanguage) => {
    if (!texts || texts.length === 0) return []
    if (targetLang === 'en') return texts

    try {
      return await translateBatch(texts, targetLang)
    } catch (error) {
      console.error('Batch translation error:', error)
      return texts
    }
  }

  return {
    translateTexts,
    isLoading,
    currentLanguage,
  }
}

/**
 * Hook for language management
 * Provides language switching and validation utilities
 *
 * @returns {Object} Language management utilities
 */
export function useLanguage() {
  const {
    currentLanguage,
    changeLanguage,
    getLanguages,
    isSupported,
    availableLanguages,
  } = useTranslation()

  return {
    currentLanguage,
    changeLanguage,
    getLanguages,
    isSupported,
    availableLanguages,
  }
}

/**
 * Hook for translation with caching
 * Provides translation with built-in caching for better performance
 *
 * @returns {Object} Cached translation utilities
 */
export function useCachedTranslation() {
  const { translateText, currentLanguage, clearCache } = useTranslation()
  const [cache, setCache] = useState(new Map())

  const translate = useCallback(
    async (text, targetLang = currentLanguage) => {
      if (!text || text.trim() === '') return text
      if (targetLang === 'en') return text

      const cacheKey = `${text}-${targetLang}`

      if (cache.has(cacheKey)) {
        return cache.get(cacheKey)
      }

      try {
        const translated = await translateText(text, targetLang)
        setCache((prev) => new Map(prev).set(cacheKey, translated))
        return translated
      } catch (error) {
        console.error('Translation error:', error)
        return text
      }
    },
    [translateText, currentLanguage, cache]
  )

  const clearTranslationCache = useCallback(() => {
    setCache(new Map())
    clearCache()
  }, [clearCache])

  return {
    translate,
    clearTranslationCache,
    cacheSize: cache.size,
  }
}

// Re-export the main hook as default
export default useTranslation
