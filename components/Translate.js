'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useTranslation } from '../contexts/TranslationContext'

/**
 * Automatic Translate Component
 * Wraps any JSX content and automatically translates it
 *
 * Usage:
 * <Translate>Hello, welcome!</Translate>
 * <Translate fallback="Loading...">Dynamic content</Translate>
 * <Translate staticKey="nav.home" />
 */
export default function Translate({
  children,
  fallback = null,
  staticKey = null,
  params = {},
  className = '',
  tag = 'span',
  delay = 0, // Add delay prop to stagger requests
  ...props
}) {
  const { currentLanguage, t, translateText, isLoading } = useTranslation()
  const [translatedText, setTranslatedText] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)

  // Determine what text to translate
  const textToTranslate = useMemo(() => {
    if (staticKey) {
      return t(staticKey, params)
    }

    if (typeof children === 'string') {
      return children
    }

    // For JSX children, extract text content
    if (children && typeof children === 'object') {
      return extractTextFromJSX(children)
    }

    return ''
  }, [children, staticKey, params, t])

  // Extract text content from JSX children
  function extractTextFromJSX(element) {
    if (typeof element === 'string') {
      return element
    }

    if (typeof element === 'number') {
      return String(element)
    }

    if (Array.isArray(element)) {
      return element.map(extractTextFromJSX).join('')
    }

    if (element && typeof element === 'object' && element.props) {
      if (element.props.children) {
        return extractTextFromJSX(element.props.children)
      }
    }

    return ''
  }

  // Translate text when it changes
  useEffect(() => {
    if (!textToTranslate || textToTranslate.trim() === '') {
      setTranslatedText('')
      return
    }

    // If it's a static key, we already have the translation
    if (staticKey) {
      setTranslatedText(textToTranslate)
      return
    }

    // For dynamic content, translate it with delay to prevent rate limiting
    const translateContent = async () => {
      if (currentLanguage === 'en') {
        setTranslatedText(textToTranslate)
        return
      }

      // Add delay to stagger requests and prevent rate limiting
      if (delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }

      setIsTranslating(true)
      try {
        const translated = await translateText(textToTranslate, currentLanguage)
        setTranslatedText(translated)
      } catch (error) {
        console.error('Translation error:', error)
        setTranslatedText(textToTranslate) // Fallback to original
      } finally {
        setIsTranslating(false)
      }
    }

    translateContent()
  }, [textToTranslate, currentLanguage, translateText, staticKey, delay])

  // Show loading state
  if (isTranslating || (isLoading && !staticKey)) {
    return (
      <span className={`${className} opacity-50`} {...props}>
        {fallback || '...'}
      </span>
    )
  }

  // If no text to display
  if (!translatedText && !textToTranslate) {
    return null
  }

  // Render the translated text
  const Tag = tag

  return (
    <Tag className={className} {...props}>
      {translatedText || textToTranslate}
    </Tag>
  )
}

/**
 * Higher-order component for automatic translation
 * Wraps a component and translates all its text content
 *
 * Usage:
 * const TranslatedComponent = withTranslation(MyComponent)
 */
export function withTranslation(WrappedComponent) {
  return function TranslatedComponent(props) {
    return (
      <Translate>
        <WrappedComponent {...props} />
      </Translate>
    )
  }
}

/**
 * Hook for manual translation control
 * Returns translation state and methods
 */
export function useTranslate() {
  const { translateText, currentLanguage, isLoading } = useTranslation()
  const [translations, setTranslations] = useState(new Map())

  const translate = useCallback(
    async (text, targetLang = currentLanguage) => {
      if (!text || text.trim() === '') return text
      if (targetLang === 'en') return text

      const cacheKey = `${text}-${targetLang}`

      if (translations.has(cacheKey)) {
        return translations.get(cacheKey)
      }

      try {
        const translated = await translateText(text, targetLang)
        setTranslations((prev) => new Map(prev).set(cacheKey, translated))
        return translated
      } catch (error) {
        console.error('Translation error:', error)
        return text
      }
    },
    [translateText, currentLanguage, translations]
  )

  const clearTranslations = useCallback(() => {
    setTranslations(new Map())
  }, [])

  return {
    translate,
    clearTranslations,
    isLoading,
    currentLanguage,
  }
}

/**
 * Simple text translation component for inline use
 *
 * Usage:
 * <TranslateText>Hello world</TranslateText>
 */
export function TranslateText({ children, ...props }) {
  return (
    <Translate tag='span' {...props}>
      {children}
    </Translate>
  )
}

/**
 * Translation component for headings
 *
 * Usage:
 * <TranslateHeading level={1}>Welcome</TranslateHeading>
 */
export function TranslateHeading({ level = 1, children, ...props }) {
  const Tag = `h${level}`

  return (
    <Translate tag={Tag} {...props}>
      {children}
    </Translate>
  )
}

/**
 * Translation component for paragraphs
 *
 * Usage:
 * <TranslateParagraph>This is a paragraph</TranslateParagraph>
 */
export function TranslateParagraph({ children, ...props }) {
  return (
    <Translate tag='p' {...props}>
      {children}
    </Translate>
  )
}
