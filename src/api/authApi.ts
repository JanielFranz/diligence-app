import axios from 'axios'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
  }
}

// Mock authentication function - replace with real API call
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Mock validation
  if (credentials.email === 'admin@test.com' && credentials.password === 'password') {
    return {
      token: 'mock-jwt-token-12345',
      user: {
        id: '1',
        email: 'admin@test.com',
        name: 'Administrador'
      }
    }
  }

  throw new Error('Credenciales inválidas')
}

// Real API call would look like this:
/*
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials)
  return response.data
}
*/

export async function logout(): Promise<void> {
  // In a real app, you might want to call the backend to invalidate the token
  // await axios.post(`${API_BASE_URL}/auth/logout`)
}

// Set up axios interceptor for auth token
export function setupAuthInterceptor(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function removeAuthInterceptor() {
  delete axios.defaults.headers.common['Authorization']
}
