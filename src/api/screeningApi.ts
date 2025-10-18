export type ScreeningSource = 'OFAC' | 'EU' | 'UN'

export type ScreeningResult = {
  fuente: ScreeningSource
  nombreCoincidente: string
  tipoCoincidencia: string
  nivelRiesgo: 'Alto' | 'Medio' | 'Bajo'
  detalles?: string
}

export async function runScreening(sources: ScreeningSource[], supplierName: string): Promise<ScreeningResult[]> {
  // Simula llamadas a fuentes externas
  await new Promise((r) => setTimeout(r, 600))

  const results: ScreeningResult[] = []
  if (sources.includes('OFAC') && supplierName.toLowerCase().includes('andes')) {
    results.push({
      fuente: 'OFAC',
      nombreCoincidente: 'Andes Trading',
      tipoCoincidencia: 'Nombre similar',
      nivelRiesgo: 'Medio',
      detalles: 'Coincidencia parcial en nombre comercial',
    })
  }
  if (sources.includes('EU') && supplierName.toLowerCase().includes('pac')) {
    results.push({
      fuente: 'EU',
      nombreCoincidente: 'Pacific Services',
      tipoCoincidencia: 'Identificación',
      nivelRiesgo: 'Alto',
      detalles: 'Coincidencia de identificador fiscal con persona en lista',
    })
  }

  // Devuelve resultados vacíos si no hay coincidencias
  return results
}

