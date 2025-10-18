import { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { setupAuthInterceptor, removeAuthInterceptor } from '../api/authApi'

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  useEffect(() => {
    if (context.token) {
      setupAuthInterceptor(context.token)
    } else {
      removeAuthInterceptor()
    }
  }, [context.token])

  return context
}
