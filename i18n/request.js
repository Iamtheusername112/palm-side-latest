import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'

const SUPPORTED = ['en', 'de', 'es']

export default getRequestConfig(async () => {
  const cookieLocale = cookies().get('locale')?.value
  const locale = SUPPORTED.includes(cookieLocale) ? cookieLocale : 'en'
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})


