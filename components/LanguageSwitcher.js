'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../hooks/useTranslation'

/**
 * Language Switcher Component
 * Dropdown component for switching between supported languages
 *
 * Props:
 * - variant: 'dropdown' | 'buttons' | 'select' - Display variant
 * - showFlags: boolean - Show flag icons
 * - className: string - Additional CSS classes
 * - size: 'sm' | 'md' | 'lg' - Component size
 */
export default function LanguageSwitcher({
  variant = 'dropdown',
  showFlags = true,
  className = '',
  size = 'md',
  ...props
}) {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Language configuration with flags and names
  const languageConfig = {
    en: { name: 'English', flag: '🇺🇸', code: 'en' },
    de: { name: 'Deutsch', flag: '🇩🇪', code: 'de' },
    es: { name: 'Español', flag: '🇪🇸', code: 'es' },
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  const currentLang = languageConfig[currentLanguage] || languageConfig.en

  // Size classes
  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  }

  if (variant === 'buttons') {
    return (
      <div className={`flex gap-2 ${className}`} {...props}>
        {availableLanguages.map((lang) => {
          const config = languageConfig[lang]
          const isActive = lang === currentLanguage

          return (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`
                flex items-center gap-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105
                ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-700 to-green-700 hover:from-amber-800 hover:to-green-800 text-white shadow-lg'
                    : 'bg-white border border-gray-300 hover:border-amber-500 text-gray-700 hover:text-amber-700'
                }
                ${sizeClasses[size]}
              `}
            >
              {showFlags && <span className='text-lg'>{config.flag}</span>}
              <span>{config.name}</span>
            </button>
          )
        })}
      </div>
    )
  }

  if (variant === 'select') {
    return (
      <select
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className={`
          appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 font-semibold
          focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500
          hover:border-amber-500 hover:text-amber-700 transition-all duration-300
          ${sizeClasses[size]} ${className}
        `}
        {...props}
      >
        {availableLanguages.map((lang) => {
          const config = languageConfig[lang]
          return (
            <option key={lang} value={lang}>
              {showFlags ? `${config.flag} ${config.name}` : config.name}
            </option>
          )
        })}
      </select>
    )
  }

  // Default dropdown variant
  return (
    <div className={`relative ${className}`} ref={dropdownRef} {...props}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 bg-white border border-gray-300 rounded-lg font-semibold
          hover:border-amber-500 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500
          transition-all duration-300
          ${sizeClasses[size]}
        `}
      >
        {showFlags && <span className='text-lg'>{currentLang.flag}</span>}
        <span>{currentLang.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden'>
          {availableLanguages.map((lang) => {
            const config = languageConfig[lang]
            const isActive = lang === currentLanguage

            return (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`
                  w-full flex items-center gap-2 px-4 py-2 text-left transition-all duration-200
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-700 to-green-700 text-white'
                      : 'text-gray-700 hover:bg-amber-50 hover:text-amber-700'
                  }
                  ${sizeClasses[size]}
                `}
              >
                {showFlags && <span className='text-lg'>{config.flag}</span>}
                <span>{config.name}</span>
                {isActive && (
                  <svg
                    className='w-4 h-4 ml-auto'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/**
 * Compact Language Switcher
 * Smaller version for headers/navbars
 */
export function CompactLanguageSwitcher({ className = '', ...props }) {
  return (
    <LanguageSwitcher
      variant='dropdown'
      size='sm'
      className={className}
      {...props}
    />
  )
}

/**
 * Button Group Language Switcher
 * Horizontal button group layout
 */
export function ButtonLanguageSwitcher({ className = '', ...props }) {
  return (
    <LanguageSwitcher
      variant='buttons'
      size='sm'
      className={className}
      {...props}
    />
  )
}

/**
 * Select Language Switcher
 * Native select dropdown
 */
export function SelectLanguageSwitcher({ className = '', ...props }) {
  return <LanguageSwitcher variant='select' className={className} {...props} />
}
