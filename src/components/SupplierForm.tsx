import { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import type { Supplier } from '../api/suppliersApi'

type Props = {
  open: boolean
  initial?: Partial<Supplier>
  onClose: () => void
  onSubmit: (data: Omit<Supplier, 'id' | 'lastEditDate'> & Partial<Pick<Supplier, 'id'>>) => void
}

export default function SupplierForm({ open, initial, onClose, onSubmit }: Props) {
  const [form, setForm] = useState({
    id: initial?.id || '',
    businessName: initial?.businessName || '',
    commercialName: initial?.commercialName || '',
    taxId: initial?.taxId || '',
    phoneNumber: initial?.phoneNumber || '',
    email: initial?.email || '',
    website: initial?.website || '',
    physicalAddress: initial?.physicalAddress || '',
    country: initial?.country || '',
    annualRevenueUsd: initial?.annualRevenueUsd ?? 0,
  })

  useEffect(() => {
    setForm({
      id: initial?.id || '',
      businessName: initial?.businessName || '',
      commercialName: initial?.commercialName || '',
      taxId: initial?.taxId || '',
      phoneNumber: initial?.phoneNumber || '',
      email: initial?.email || '',
      website: initial?.website || '',
      physicalAddress: initial?.physicalAddress || '',
      country: initial?.country || '',
      annualRevenueUsd: initial?.annualRevenueUsd ?? 0,
    })
  }, [initial, open])

  function change<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((s) => ({ ...s, [key]: value }))
  }

  function submit() {
    if (!form.businessName || !form.taxId) return

    const payload = {
      ...form,
    }

    onSubmit(payload)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{form.id ? 'Editar Proveedor' : 'Crear Proveedor'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Razón Social" value={form.businessName} onChange={(e) => change('businessName', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nombre Comercial" value={form.commercialName} onChange={(e) => change('commercialName', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Identificación" value={form.taxId} onChange={(e) => change('taxId', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Teléfono" value={form.phoneNumber} onChange={(e) => change('phoneNumber', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Correo Electrónico" value={form.email} onChange={(e) => change('email', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Sitio Web" value={form.website} onChange={(e) => change('website', e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Dirección" value={form.physicalAddress} onChange={(e) => change('physicalAddress', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="País" value={form.country} onChange={(e) => change('country', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="number" label="Facturación Anual (USD)" value={String(form.annualRevenueUsd)} onChange={(e) => change('annualRevenueUsd', Number(e.target.value))} />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={submit}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
