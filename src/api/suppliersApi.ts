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

const STORAGE_KEY = 'diligence_suppliers_v1'

function readStore(): Supplier[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Supplier[]
  } catch (e) {
    console.error('reading suppliers store', e)
    return []
  }
}

function writeStore(list: Supplier[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export async function listSuppliers(): Promise<Supplier[]> {
  await new Promise((r) => setTimeout(r, 250))
  return readStore()
}

export async function getSupplier(id: string): Promise<Supplier | undefined> {
  await new Promise((r) => setTimeout(r, 150))
  return readStore().find((s) => s.id === id)
}

export async function createSupplier(data: Omit<Supplier, 'id' | 'updatedAt'>): Promise<Supplier> {
  const list = readStore()
  const newItem: Supplier = {
    ...data,
    id: Math.random().toString(36).slice(2, 9),
    updatedAt: new Date().toISOString(),
  }
  list.unshift(newItem)
  writeStore(list)
  await new Promise((r) => setTimeout(r, 200))
  return newItem
}

export async function updateSupplier(id: string, data: Partial<Supplier>): Promise<Supplier | undefined> {
  const list = readStore()
  const idx = list.findIndex((s) => s.id === id)
  if (idx === -1) return undefined
  const updated = { ...list[idx], ...data, updatedAt: new Date().toISOString() }
  list[idx] = updated
  writeStore(list)
  await new Promise((r) => setTimeout(r, 200))
  return updated
}

export async function deleteSupplier(id: string): Promise<boolean> {
  const list = readStore()
  const next = list.filter((s) => s.id !== id)
  writeStore(next)
  await new Promise((r) => setTimeout(r, 150))
  return true
}

// Seed some sample data if empty
(function seed() {
  const current = readStore()
  if (current.length === 0) {
    const samples: Supplier[] = [
      {
        id: 'a1',
        razonSocial: 'Comercial Andes S.A.',
        nombreComercial: 'Andes',
        identificacion: '123456789',
        telefono: '+593987654321',
        email: 'ventas@andes.com',
        sitioWeb: 'https://andes.example',
        direccion: 'Av. Principal 123',
        pais: 'Ecuador',
        facturacionAnualUSD: 1200000,
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'b2',
        razonSocial: 'Servicios del Pacífico S.R.L.',
        nombreComercial: 'Pacífico',
        identificacion: '987654321',
        telefono: '+593912345678',
        email: 'contacto@pacifico.example',
        sitioWeb: 'https://pacifico.example',
        direccion: 'Calle Secundaria 45',
        pais: 'Perú',
        facturacionAnualUSD: 850000,
        updatedAt: new Date().toISOString(),
      },
    ]
    writeStore(samples)
  }
})()

