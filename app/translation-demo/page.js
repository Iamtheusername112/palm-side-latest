'use client'

import { useState } from 'react'
import Translate from '../../components/Translate'
import LanguageSwitcher from '../../components/LanguageSwitcher'
import { useTranslation } from '../../hooks/useTranslation'

export default function TranslationDemo() {
  const { t, translateText, currentLanguage, isLoading } = useTranslation()
  const [dynamicText, setDynamicText] = useState(
    'This is dynamic content that will be translated automatically!'
  )
  const [translatedText, setTranslatedText] = useState('')

  const handleTranslate = async () => {
    const result = await translateText(dynamicText, currentLanguage)
    setTranslatedText(result)
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            <Translate>Translation System Demo</Translate>
          </h1>
          <p className='text-xl text-gray-600 mb-8'>
            <Translate>
              This page demonstrates the automatic translation system
            </Translate>
          </p>

          {/* Language Switcher */}
          <div className='flex justify-center gap-4'>
            <LanguageSwitcher variant='buttons' size='lg' />
          </div>
        </div>

        {/* Static Translations Demo */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
            <Translate>Static Translations</Translate>
          </h2>
          <p className='text-gray-600 mb-4'>
            <Translate>
              These translations use predefined keys and are instant:
            </Translate>
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <p>
                <strong>
                  <Translate staticKey='nav.home'>Home</Translate>:
                </strong>{' '}
                <Translate staticKey='nav.home' />
              </p>
              <p>
                <strong>
                  <Translate staticKey='nav.about'>About</Translate>:
                </strong>{' '}
                <Translate staticKey='nav.about' />
              </p>
              <p>
                <strong>
                  <Translate staticKey='nav.properties'>Properties</Translate>:
                </strong>{' '}
                <Translate staticKey='nav.properties' />
              </p>
              <p>
                <strong>
                  <Translate staticKey='nav.contact'>Contact</Translate>:
                </strong>{' '}
                <Translate staticKey='nav.contact' />
              </p>
            </div>
            <div className='space-y-2'>
              <p>
                <strong>
                  <Translate staticKey='common.loading'>Loading</Translate>:
                </strong>{' '}
                <Translate staticKey='common.loading' />
              </p>
              <p>
                <strong>
                  <Translate staticKey='common.error'>Error</Translate>:
                </strong>{' '}
                <Translate staticKey='common.error' />
              </p>
              <p>
                <strong>
                  <Translate staticKey='common.success'>Success</Translate>:
                </strong>{' '}
                <Translate staticKey='common.success' />
              </p>
              <p>
                <strong>
                  <Translate staticKey='btn.submit'>Submit</Translate>:
                </strong>{' '}
                <Translate staticKey='btn.submit' />
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Translation Demo */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
            <Translate>Dynamic Translations</Translate>
          </h2>
          <p className='text-gray-600 mb-4'>
            <Translate>
              These translations use OpenAI to translate any text automatically:
            </Translate>
          </p>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Translate>Enter text to translate:</Translate>
              </label>
              <textarea
                value={dynamicText}
                onChange={(e) => setDynamicText(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                rows={3}
                placeholder='Enter text to translate...'
              />
            </div>

            <button
              onClick={handleTranslate}
              disabled={isLoading}
              className='bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <Translate staticKey='common.loading'>Loading...</Translate>
              ) : (
                <Translate>Translate Text</Translate>
              )}
            </button>

            {translatedText && (
              <div className='mt-4 p-4 bg-gray-50 rounded-md'>
                <h3 className='font-medium text-gray-900 mb-2'>
                  <Translate>Translated Text:</Translate>
                </h3>
                <p className='text-gray-700'>{translatedText}</p>
              </div>
            )}
          </div>
        </div>

        {/* Automatic Translation Demo */}
        <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
            <Translate>Automatic Translation</Translate>
          </h2>
          <p className='text-gray-600 mb-4'>
            <Translate>
              These components automatically translate their content:
            </Translate>
          </p>

          <div className='space-y-4'>
            <div className='p-4 bg-blue-50 rounded-md'>
              <h3 className='text-lg font-semibold text-blue-900 mb-2'>
                <Translate>Real Estate Services</Translate>
              </h3>
              <p className='text-blue-800'>
                <Translate>
                  We provide comprehensive real estate services including
                  property sales, rentals, property management, and investment
                  consulting. Our experienced team is dedicated to helping you
                  find the perfect property or maximize your real estate
                  investments.
                </Translate>
              </p>
            </div>

            <div className='p-4 bg-green-50 rounded-md'>
              <h3 className='text-lg font-semibold text-green-900 mb-2'>
                <Translate>Why Choose Us?</Translate>
              </h3>
              <ul className='text-green-800 space-y-2'>
                <li>
                  • <Translate>Expert local market knowledge</Translate>
                </li>
                <li>
                  • <Translate>Personalized service and attention</Translate>
                </li>
                <li>
                  • <Translate>Extensive property portfolio</Translate>
                </li>
                <li>
                  •{' '}
                  <Translate>
                    Competitive pricing and transparent fees
                  </Translate>
                </li>
                <li>
                  • <Translate>24/7 customer support</Translate>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Property Information Demo */}
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
            <Translate>Property Information</Translate>
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='border border-gray-200 rounded-lg p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                <Translate staticKey='property.type'>Property Type</Translate>
              </h3>
              <p className='text-gray-600'>
                <Translate>Luxury Villa with Ocean View</Translate>
              </p>
            </div>

            <div className='border border-gray-200 rounded-lg p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                <Translate staticKey='property.price'>Price</Translate>
              </h3>
              <p className='text-gray-600'>
                <Translate>$2,500,000</Translate>
              </p>
            </div>

            <div className='border border-gray-200 rounded-lg p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                <Translate staticKey='property.location'>Location</Translate>
              </h3>
              <p className='text-gray-600'>
                <Translate>Miami Beach, Florida</Translate>
              </p>
            </div>

            <div className='border border-gray-200 rounded-lg p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                <Translate staticKey='property.bedrooms'>Bedrooms</Translate>
              </h3>
              <p className='text-gray-600'>
                <Translate>4 bedrooms</Translate>
              </p>
            </div>

            <div className='border border-gray-200 rounded-lg p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                <Translate staticKey='property.bathrooms'>Bathrooms</Translate>
              </h3>
              <p className='text-gray-600'>
                <Translate>3 bathrooms</Translate>
              </p>
            </div>

            <div className='border border-gray-200 rounded-lg p-4'>
              <h3 className='font-semibold text-gray-900 mb-2'>
                <Translate staticKey='property.status'>Status</Translate>
              </h3>
              <p className='text-gray-600'>
                <Translate staticKey='status.available'>Available</Translate>
              </p>
            </div>
          </div>
        </div>

        {/* Current Language Info */}
        <div className='mt-8 text-center text-gray-500'>
          <p>
            <Translate>Current Language:</Translate>{' '}
            <strong>{currentLanguage.toUpperCase()}</strong>
          </p>
          {isLoading && (
            <p className='text-emerald-600 mt-2'>
              <Translate>Translating content...</Translate>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
