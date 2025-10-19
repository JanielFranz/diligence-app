import axios from 'axios'

export type ScreeningSource = {
  ofac: number
  worldBank: number
}

export type OFACScreeningResult = {
  id: number
  name: string
  type: string
  programs: string
  sourceList: string
  address: string
}

export type WorldBankScreeningResult = {
  firmName: string
  address: string
  country: string
  fromDate: string
  toDate: string
  grounds: string
}

export type ScreeningResult = {
  query: string
  total_hits: number
  results: {
    ofac: OFACScreeningResult[]
    worldBank: WorldBankScreeningResult[]
  }
  sources: ScreeningSource
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:44312/api'

export async function runScreening(supplierId: number): Promise<ScreeningResult> {
  const response = await axios.get(`${API_BASE_URL}/v1/screen/supplier/${supplierId}`)
  return response.data
}
