import { useState, useEffect } from 'react'

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setIsOpen(!mobile)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleSidebar = () => setIsOpen(!isOpen)

  return { isOpen, isMobile, toggleSidebar }
}

