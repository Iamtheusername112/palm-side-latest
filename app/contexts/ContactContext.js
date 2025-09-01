'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'

const ContactContext = createContext()

export const useContactContext = () => {
  const context = useContext(ContactContext)
  if (!context) {
    throw new Error('useContactContext must be used within a ContactProvider')
  }
  return context
}

export const ContactProvider = ({ children }) => {
  const [newContactsCount, setNewContactsCount] = useState(0)
  const [allContactsCount, setAllContactsCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const fetchContactCounts = useCallback(async () => {
    try {
      setIsLoading(true)

      // Check if we're in the browser
      if (typeof window === 'undefined') {
        return
      }

      // Fetch new contacts count
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        const newResponse = await fetch(
          '/api/admin/contacts?status=new&limit=1',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
          }
        )

        clearTimeout(timeoutId)

        if (newResponse.ok) {
          const newData = await newResponse.json()
          if (newData.success) {
            setNewContactsCount(newData.pagination?.total || 0)
            setRetryCount(0) // Reset retry count on success
          }
        } else if (newResponse.status === 401) {
          console.warn('Authentication required for new contacts count')
          // Don't retry on auth errors
          return
        } else {
          console.warn(
            'Failed to fetch new contacts count:',
            newResponse.status
          )
        }
      } catch (newError) {
        if (newError.name === 'AbortError') {
          console.warn('Request timeout for new contacts count')
        } else {
          console.warn('Error fetching new contacts count:', newError)
        }
      }

      // Fetch all contacts count
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

        const allResponse = await fetch(
          '/api/admin/contacts?status=all&limit=1',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
          }
        )

        clearTimeout(timeoutId)

        if (allResponse.ok) {
          const allData = await allResponse.json()
          if (allData.success) {
            setAllContactsCount(allData.pagination?.total || 0)
            setRetryCount(0) // Reset retry count on success
          }
        } else if (allResponse.status === 401) {
          console.warn('Authentication required for all contacts count')
          // Don't retry on auth errors
          return
        } else {
          console.warn(
            'Failed to fetch all contacts count:',
            allResponse.status
          )
        }
      } catch (allError) {
        if (allError.name === 'AbortError') {
          console.warn('Request timeout for all contacts count')
        } else {
          console.warn('Error fetching all contacts count:', allError)
        }
      }
    } catch (error) {
      console.error('Failed to fetch contact counts:', error)

      // Retry with exponential backoff (max 3 retries)
      if (retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000 // 1s, 2s, 4s
        setTimeout(() => {
          setRetryCount((prev) => prev + 1)
          fetchContactCounts()
        }, delay)
      }
    } finally {
      setIsLoading(false)
    }
  }, [retryCount])

  const updateContactCounts = useCallback((statusChange) => {
    // Optimistically update counts based on status change
    if (statusChange.from === 'new' && statusChange.to !== 'new') {
      setNewContactsCount((prev) => Math.max(0, prev - 1))
    } else if (statusChange.from !== 'new' && statusChange.to === 'new') {
      setNewContactsCount((prev) => prev + 1)
    }
  }, [])

  const addNewContact = useCallback(() => {
    setNewContactsCount((prev) => prev + 1)
    setAllContactsCount((prev) => prev + 1)
  }, [])

  useEffect(() => {
    // Only fetch if we're in the browser and not during SSR
    if (typeof window !== 'undefined') {
      fetchContactCounts()

      // Set up polling to refresh counts every 30 seconds
      const interval = setInterval(fetchContactCounts, 30000)

      return () => clearInterval(interval)
    }
  }, [fetchContactCounts])

  const retryFetch = useCallback(() => {
    setRetryCount(0)
    fetchContactCounts()
  }, [fetchContactCounts])

  const value = {
    newContactsCount,
    allContactsCount,
    isLoading,
    fetchContactCounts,
    updateContactCounts,
    addNewContact,
    retryFetch,
    retryCount,
  }

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  )
}
