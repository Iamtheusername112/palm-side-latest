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

  const fetchContactCounts = useCallback(async () => {
    try {
      setIsLoading(true)

      // Fetch new contacts count
      const newResponse = await fetch('/api/admin/contacts?status=new&limit=1')
      if (newResponse.ok) {
        const newData = await newResponse.json()
        if (newData.success) {
          setNewContactsCount(newData.pagination?.total || 0)
        }
      }

      // Fetch all contacts count
      const allResponse = await fetch('/api/admin/contacts?status=all&limit=1')
      if (allResponse.ok) {
        const allData = await allResponse.json()
        if (allData.success) {
          setAllContactsCount(allData.pagination?.total || 0)
        }
      }
    } catch (error) {
      console.error('Failed to fetch contact counts:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

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
    fetchContactCounts()

    // Set up polling to refresh counts every 30 seconds
    const interval = setInterval(fetchContactCounts, 30000)

    return () => clearInterval(interval)
  }, [fetchContactCounts])

  const value = {
    newContactsCount,
    allContactsCount,
    isLoading,
    fetchContactCounts,
    updateContactCounts,
    addNewContact,
  }

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  )
}
