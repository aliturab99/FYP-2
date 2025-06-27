"use client"
import { useEffect, useState } from 'react'

const ClientWrapper = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder that matches the server-rendered content
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    )
  }

  return children
}

export default ClientWrapper
