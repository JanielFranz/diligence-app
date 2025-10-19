import axios from 'axios'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  id: string
  username: string
} 



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:44312/api'

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await axios.post(`${API_BASE_URL}/v1/authentication/sign-in`, credentials)
  return response.data
}

export async function logout(): Promise<void> {
  // await axios.post(`${API_BASE_URL}/auth/logout`)
}

// Set up axios interceptor for auth token
export function setupAuthInterceptor(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function removeAuthInterceptor() {
  delete axios.defaults.headers.common['Authorization']
}
