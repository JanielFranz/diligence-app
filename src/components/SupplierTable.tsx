import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import type { GridColDef, GridRowsProp, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Button, IconButton, Stack } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import type { Supplier } from '../api/suppliersApi'

type Props = {
  suppliers: Supplier[]
  onEdit: (s: Supplier) => void
  onDelete: (id: string) => void
  onScreen: (s: Supplier) => void
}

export default function SupplierTable({ suppliers, onEdit, onDelete, onScreen }: Props) {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })

  const rows: GridRowsProp = suppliers.map((s) => ({
    id: s.id,
    razonSocial: s.businessName,
    nombreComercial: s.commercialName || '-',
    identificacion: s.taxId,
    telefono: s.phoneNumber || '-',
    email: s.email || '-',
    pais: s.country || '-',
    facturacionAnualUSD: s.annualRevenueUsd ?? 0,
    updatedAt: new Date(s.lastEditDate).toLocaleString(),
  }))

  const columns: GridColDef[] = [
    { field: 'razonSocial', headerName: 'Razón Social', flex: 1, minWidth: 150 },
    { field: 'nombreComercial', headerName: 'Nombre Comercial', flex: 1, minWidth: 140 },
    { field: 'identificacion', headerName: 'Identificación', width: 140 },
    { field: 'telefono', headerName: 'Teléfono', width: 130 },
    { field: 'email', headerName: 'Correo Electrónico', width: 180 },
    { field: 'pais', headerName: 'País', width: 120 },
    { field: 'facturacionAnualUSD', headerName: 'Facturación Anual (USD)', width: 160 },
    { field: 'updatedAt', headerName: 'Última Edición', width: 160 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 160,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const row = suppliers.find((s) => s.id === String(params.id))!
        return (
          <Stack direction="row" spacing={1}>
            <IconButton color="primary" size="small" onClick={() => onEdit(row)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" size="small" onClick={() => onDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
            <Button variant="outlined" size="small" startIcon={<SearchIcon />} onClick={() => onScreen(row)}>
              Screen
            </Button>
          </Stack>
        )
      },
    },
  ]

  return (
    <Box sx={{ height: 520, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        pagination
        disableRowSelectionOnClick
      />
    </Box>
  )
}
