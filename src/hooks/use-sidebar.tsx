import { useState, useEffect } from 'react'

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsOpen(window.innerWidth >= 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleSidebar = () => setIsOpen(!isOpen)

  return { isOpen, isMobile, toggleSidebar }
}

