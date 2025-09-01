'use client'

import { useState, useEffect } from 'react'
import { Eye, Type, Contrast, Settings } from 'lucide-react'

const AccessibilitySettings = () => {
  const [fontSize, setFontSize] = useState('base')
  const [highContrast, setHighContrast] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedFontSize =
      localStorage.getItem('accessibility-font-size') || 'base'
    const savedHighContrast =
      localStorage.getItem('accessibility-high-contrast') === 'true'

    setFontSize(savedFontSize)
    setHighContrast(savedHighContrast)

    // Apply initial settings
    applyFontSize(savedFontSize)
    applyHighContrast(savedHighContrast)
  }, [])

  const applyFontSize = (size) => {
    const root = document.documentElement

    // Remove existing font size classes
    root.classList.remove(
      'font-xs',
      'font-sm',
      'font-base',
      'font-lg',
      'font-xl'
    )

    // Apply new font size
    switch (size) {
      case 'xs':
        root.classList.add('font-xs')
        break
      case 'sm':
        root.classList.add('font-sm')
        break
      case 'base':
        root.classList.add('font-base')
        break
      case 'lg':
        root.classList.add('font-lg')
        break
      case 'xl':
        root.classList.add('font-xl')
        break
    }
  }

  const applyHighContrast = (enabled) => {
    const root = document.documentElement

    if (enabled) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
  }

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize)
    localStorage.setItem('accessibility-font-size', newSize)
    applyFontSize(newSize)
  }

  const handleHighContrastToggle = () => {
    const newValue = !highContrast
    setHighContrast(newValue)
    localStorage.setItem('accessibility-high-contrast', newValue.toString())
    applyHighContrast(newValue)
  }

  const resetSettings = () => {
    setFontSize('base')
    setHighContrast(false)
    localStorage.removeItem('accessibility-font-size')
    localStorage.removeItem('accessibility-high-contrast')
    applyFontSize('base')
    applyHighContrast(false)
  }

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className='fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200'
        title='Accessibility Settings'
        aria-label='Open accessibility settings'
      >
        <Settings className='h-6 w-6' />
      </button>

      {/* Accessibility Settings Panel */}
      {showSettings && (
        <div className='fixed bottom-20 right-6 z-50 bg-white rounded-lg shadow-xl border p-6 w-80'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Accessibility Settings
            </h3>
            <button
              onClick={() => setShowSettings(false)}
              className='text-gray-400 hover:text-gray-600'
              aria-label='Close accessibility settings'
            >
              ×
            </button>
          </div>

          {/* Font Size Settings */}
          <div className='mb-6'>
            <div className='flex items-center mb-3'>
              <Type className='h-5 w-5 text-gray-600 mr-2' />
              <label className='text-base font-medium text-gray-900'>
                Font Size
              </label>
            </div>
            <div className='grid grid-cols-5 gap-2'>
              {[
                { value: 'xs', label: 'XS', size: 'text-xs' },
                { value: 'sm', label: 'SM', size: 'text-sm' },
                { value: 'base', label: 'MD', size: 'text-base' },
                { value: 'lg', label: 'LG', size: 'text-lg' },
                { value: 'xl', label: 'XL', size: 'text-xl' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFontSizeChange(option.value)}
                  className={`px-3 py-2 rounded-md border transition-colors duration-200 ${
                    fontSize === option.value
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className={option.size}>{option.label}</span>
                </button>
              ))}
            </div>
            <p className='text-sm text-gray-600 mt-2'>
              Choose a font size that's comfortable for you to read.
            </p>
          </div>

          {/* High Contrast Toggle */}
          <div className='mb-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <Contrast className='h-5 w-5 text-gray-600 mr-2' />
                <label className='text-base font-medium text-gray-900'>
                  High Contrast
                </label>
              </div>
              <button
                onClick={handleHighContrastToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  highContrast ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label='Toggle high contrast mode'
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <p className='text-sm text-gray-600 mt-2'>
              Increase contrast for better visibility.
            </p>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetSettings}
            className='w-full px-4 py-2 text-base text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200'
          >
            Reset to Default
          </button>
        </div>
      )}
    </>
  )
}

export default AccessibilitySettings
