'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LanguageSwitcher({ compact = false }) {
  const router = useRouter()
  const [locale, setLocale] = useState('en')

  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )locale=([^;]+)/)
    if (match && match[1]) {
      setLocale(decodeURIComponent(match[1]))
    }
  }, [])

  function onChange(e) {
    const next = e.target.value
    document.cookie = `locale=${encodeURIComponent(next)}; Path=/; Max-Age=31536000; SameSite=Lax`
    router.refresh()
  }

  const selectClass = compact
    ? 'border border-gray-300 text-sm rounded-md px-2 py-1'
    : 'border border-gray-300 text-base rounded-md px-3 py-2'

  return (
    <select aria-label='Change language' className={selectClass} value={locale} onChange={onChange}>
      <option value='en'>English</option>
      <option value='de'>Deutsch</option>
      <option value='es'>Español</option>
    </select>
  )
}


