import { useMemo, useState } from 'react'
import { Box, Button, CircularProgress, Snackbar, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Layout from '../components/Layout'
import SupplierTable from '../components/SupplierTable'
import SupplierForm from '../components/SupplierForm'
import ScreeningModal from '../components/ScreeningModal'
import * as api from '../api/suppliersApi'

export default function SuppliersPage() {
  const qc = useQueryClient()

  const { data: suppliers, isLoading } = useQuery({
    queryKey: ['suppliers'],
    queryFn: api.listSuppliers
  })

  console.log('suppliers data:', suppliers)

  const createM = useMutation({
    mutationFn: api.createSupplier,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['suppliers'] }),
  })

  const updateM = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<api.Supplier> }) =>
      api.updateSupplier(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['suppliers'] }),
  })

  const deleteM = useMutation({
    mutationFn: api.deleteSupplier,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['suppliers'] }),
  })

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<api.Supplier | undefined>()
  const [screenOpen, setScreenOpen] = useState(false)
  const [screenSupplier, setScreenSupplier] = useState<api.Supplier | null>(null)
  const [snack, setSnack] = useState<{ open: boolean; message: string }>({ open: false, message: '' })

  function handleCreate() {
    setEditing(undefined)
    setFormOpen(true)
  }

  function handleEdit(s: api.Supplier) {
    console.log('Editing supplier:', s)
    setEditing(s)
    setFormOpen(true)
  }

  async function handleSubmit(data: Omit<api.Supplier, 'id' | 'updatedAt'> & Partial<Pick<api.Supplier, 'id'>>) {
    try {
      if (editing && editing.id) {
        await updateM.mutateAsync({ id: editing.id, data })
        setSnack({ open: true, message: 'Proveedor actualizado' })
      } else {
        await createM.mutateAsync(data)
        setSnack({ open: true, message: 'Proveedor creado' })
      }
      setFormOpen(false)
    } catch {
      setSnack({ open: true, message: 'Error al guardar' })
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Confirmar eliminación del proveedor?')) return
    await deleteM.mutateAsync(id)
    setSnack({ open: true, message: 'Proveedor eliminado' })
  }

  function handleScreen(s: api.Supplier) {
    setScreenSupplier(s)
    setScreenOpen(true)
  }

  const rows = useMemo(() => suppliers ?? [], [suppliers])

  return (
    <Layout>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h5">Proveedores</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Nuevo Proveedor
        </Button>
      </Stack>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <SupplierTable suppliers={rows} onEdit={handleEdit} onDelete={handleDelete} onScreen={handleScreen} />
      )}

      <SupplierForm open={formOpen} initial={editing} onClose={() => setFormOpen(false)} onSubmit={handleSubmit} />
      <ScreeningModal open={screenOpen} supplier={screenSupplier ?? undefined} onClose={() => setScreenOpen(false)} />

      <Snackbar open={snack.open} message={snack.message} autoHideDuration={3000} onClose={() => setSnack((s) => ({ ...s, open: false }))} />
    </Layout>
  )
}
