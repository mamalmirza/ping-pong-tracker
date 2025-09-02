'use client'

import { useState, useEffect, useCallback } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/check')
      const data = await response.json()
      setIsAuthenticated(data.authenticated)
    } catch (error) {
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
        return { success: true }
      } else {
        const data = await response.json()
        return { success: false, error: data.error || 'Invalid password' }
      }
    } catch (error) {
      return { success: false, error: 'An error occurred. Please try again.' }
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      // Force a full page reload to clear any cached state
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }, [])

  useEffect(() => {
    checkAuth()

    // Refresh auth state when window gains focus
    const handleFocus = () => {
      checkAuth()
    }

    window.addEventListener('focus', handleFocus)
    
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [checkAuth])

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshAuth: checkAuth,
  }
}
