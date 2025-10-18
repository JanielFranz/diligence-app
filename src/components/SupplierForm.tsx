import { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import type { Supplier } from '../api/suppliersApi'

type Props = {
  open: boolean
  initial?: Partial<Supplier>
  onClose: () => void
  onSubmit: (data: Omit<Supplier, 'id' | 'updatedAt'> & Partial<Pick<Supplier, 'id'>>) => void
}

export default function SupplierForm({ open, initial, onClose, onSubmit }: Props) {
  const [form, setForm] = useState({
    id: initial?.id || '',
    razonSocial: initial?.razonSocial || '',
    nombreComercial: initial?.nombreComercial || '',
    identificacion: initial?.identificacion || '',
    telefono: initial?.telefono || '',
    email: initial?.email || '',
    sitioWeb: initial?.sitioWeb || '',
    direccion: initial?.direccion || '',
    pais: initial?.pais || '',
    facturacionAnualUSD: initial?.facturacionAnualUSD ?? 0,
  })

  useEffect(() => {
    setForm({
      id: initial?.id || '',
      razonSocial: initial?.razonSocial || '',
      nombreComercial: initial?.nombreComercial || '',
      identificacion: initial?.identificacion || '',
      telefono: initial?.telefono || '',
      email: initial?.email || '',
      sitioWeb: initial?.sitioWeb || '',
      direccion: initial?.direccion || '',
      pais: initial?.pais || '',
      facturacionAnualUSD: initial?.facturacionAnualUSD ?? 0,
    })
  }, [initial, open])

  function change<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((s) => ({ ...s, [key]: value }))
  }

  function submit() {
    if (!form.razonSocial || !form.identificacion) return
    const payload = { ...form }
    onSubmit(payload)
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{form.id ? 'Editar Proveedor' : 'Crear Proveedor'}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Razón Social" value={form.razonSocial} onChange={(e) => change('razonSocial', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nombre Comercial" value={form.nombreComercial} onChange={(e) => change('nombreComercial', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Identificación" value={form.identificacion} onChange={(e) => change('identificacion', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Teléfono" value={form.telefono} onChange={(e) => change('telefono', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Correo Electrónico" value={form.email} onChange={(e) => change('email', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Sitio Web" value={form.sitioWeb} onChange={(e) => change('sitioWeb', e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Dirección" value={form.direccion} onChange={(e) => change('direccion', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="País" value={form.pais} onChange={(e) => change('pais', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth type="number" label="Facturación Anual (USD)" value={String(form.facturacionAnualUSD)} onChange={(e) => change('facturacionAnualUSD', Number(e.target.value))} />
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
