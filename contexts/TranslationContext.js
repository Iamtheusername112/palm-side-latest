'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import {
  getTranslation,
  getAvailableLanguages,
  isLanguageSupported,
} from '../lib/translations'
import { translateText } from '../lib/translation'

const TranslationContext = createContext()

/**
 * Translation Provider Component
 * Provides translation context to the entire app
 */
export function TranslationProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [isLoading, setIsLoading] = useState(false)
  const [translationCache, setTranslationCache] = useState(new Map())

  // Initialize language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage && isLanguageSupported(savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0]
      if (isLanguageSupported(browserLang)) {
        setCurrentLanguage(browserLang)
      }
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferred-language', currentLanguage)
  }, [currentLanguage])

  /**
   * Change the current language
   * @param {string} lang - Language code (en, de, es)
   */
  const changeLanguage = useCallback((lang) => {
    if (isLanguageSupported(lang)) {
      setCurrentLanguage(lang)
      // Clear translation cache when language changes
      setTranslationCache(new Map())
    }
  }, [])

  /**
   * Get static translation for a key
   * @param {string} key - Translation key
   * @param {Object} params - Parameters for string interpolation
   * @returns {string} - Translated text
   */
  const t = useCallback(
    (key, params = {}) => {
      return getTranslation(key, currentLanguage, params)
    },
    [currentLanguage]
  )

  /**
   * Translate dynamic text using OpenAI
   * @param {string} text - Text to translate
   * @param {string} targetLang - Target language (optional, uses current language if not provided)
   * @returns {Promise<string>} - Translated text
   */
  const translateTextAsync = useCallback(
    async (text, targetLang = currentLanguage) => {
      if (!text || text.trim() === '') return text
      if (targetLang === 'en') return text

      // Check cache first
      const cacheKey = `${text}-${targetLang}`
      if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey)
      }

      try {
        setIsLoading(true)
        const translatedText = await translateText(text, targetLang)

        // Cache the translation
        setTranslationCache((prev) =>
          new Map(prev).set(cacheKey, translatedText)
        )

        return translatedText
      } catch (error) {
        console.error('Translation error:', error)
        return text // Return original text as fallback
      } finally {
        setIsLoading(false)
      }
    },
    [currentLanguage, translationCache]
  )

  /**
   * Translate multiple texts in batch
   * @param {Array<string>} texts - Array of texts to translate
   * @param {string} targetLang - Target language (optional)
   * @returns {Promise<Array<string>>} - Array of translated texts
   */
  const translateBatch = useCallback(
    async (texts, targetLang = currentLanguage) => {
      if (targetLang === 'en') return texts

      const promises = texts.map((text) => translateTextAsync(text, targetLang))
      return Promise.all(promises)
    },
    [currentLanguage, translateTextAsync]
  )

  /**
   * Clear translation cache
   */
  const clearCache = useCallback(() => {
    setTranslationCache(new Map())
  }, [])

  /**
   * Get available languages
   * @returns {Array<string>} - Array of language codes
   */
  const getLanguages = useCallback(() => {
    return getAvailableLanguages()
  }, [])

  /**
   * Check if a language is supported
   * @param {string} lang - Language code
   * @returns {boolean} - True if language is supported
   */
  const isSupported = useCallback((lang) => {
    return isLanguageSupported(lang)
  }, [])

  const value = {
    // State
    currentLanguage,
    isLoading,

    // Actions
    changeLanguage,
    t,
    translateText: translateTextAsync,
    translateBatch,
    clearCache,
    getLanguages,
    isSupported,

    // Utility
    isLanguageSupported: isSupported,
    availableLanguages: getLanguages(),
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}

/**
 * Hook to use translation context
 * @returns {Object} - Translation context value
 */
export function useTranslation() {
  const context = useContext(TranslationContext)

  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }

  return context
}

/**
 * Hook for static translations only (lighter weight)
 * @returns {Object} - Translation utilities for static content
 */
export function useStaticTranslation() {
  const { currentLanguage, t, getLanguages, isSupported } = useTranslation()

  return {
    currentLanguage,
    t,
    getLanguages,
    isSupported,
  }
}

export default TranslationContext
