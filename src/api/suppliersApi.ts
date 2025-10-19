import axios from 'axios'

export type Supplier = {
  id: string
  razonSocial: string
  nombreComercial?: string
  identificacion: string
  telefono?: string
  email?: string
  sitioWeb?: string
  direccion?: string
  pais?: string
  facturacionAnualUSD?: number
  updatedAt: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export async function listSuppliers(): Promise<Supplier[]> {
  const response = await axios.get(`${API_BASE_URL}/v1/supplier`)
  return response.data
}

export async function getSupplier(id: string): Promise<Supplier | undefined> {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/supplier/${id}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return undefined
    }
    throw error
  }
}

export async function createSupplier(data: Omit<Supplier, 'id' | 'updatedAt'>): Promise<Supplier> {
  const response = await axios.post(`${API_BASE_URL}/v1/supplier`, data)
  return response.data
}

export async function updateSupplier(id: string, data: Partial<Supplier>): Promise<Supplier | undefined> {
  try {
    const response = await axios.put(`${API_BASE_URL}/v1/supplier/${id}`, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return undefined
    }
    throw error
  }
}

export async function deleteSupplier(id: string): Promise<boolean> {
  try {
    await axios.delete(`${API_BASE_URL}/v1/supplier/${id}`)
    return true
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return false
    }
    throw error
  }
}
