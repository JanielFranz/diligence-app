import { createContext, useState, useEffect } from 'react'
import { login as apiLogin, setupAuthInterceptor, removeAuthInterceptor } from '../api/authApi'
import type { LoginRequest, LoginResponse } from '../api/authApi'


export interface User {
  id: string
  username: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing token on app start
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
      setupAuthInterceptor(savedToken)
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    try {
      const credentials: LoginRequest = { username, password }
      const response: LoginResponse = await apiLogin(credentials)

      const user: User = {
        id: response.id,
        username: response.username
      }

      setUser(user)
      setToken(response.token)
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('auth_user', JSON.stringify(user))
      setupAuthInterceptor(response.token)
    } catch {
      throw new Error('Credenciales inválidas')
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    removeAuthInterceptor()
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
