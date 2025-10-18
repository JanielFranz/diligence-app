import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { runScreening } from '../api/screeningApi'
import type { ScreeningSource, ScreeningResult } from '../api/screeningApi'
import type { Supplier } from '../api/suppliersApi'

type Props = {
  open: boolean
  supplier?: Supplier | null
  onClose: () => void
}

export default function ScreeningModal({ open, supplier, onClose }: Props) {
  const [sources, setSources] = useState<ScreeningSource[]>(['OFAC'])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ScreeningResult[]>([])

  useEffect(() => {
    if (!open) return
    setResults([])
    setSources(['OFAC'])
  }, [open])

  useEffect(() => {
    let mounted = true
    async function run() {
      if (!supplier) return
      if (sources.length === 0) {
        setResults([])
        return
      }
      setLoading(true)
      try {
        const res = await runScreening(sources, supplier.razonSocial)
        if (!mounted) return
        setResults(res)
      } catch (e) {
        console.error(e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [sources, supplier])

  function toggleSource(s: ScreeningSource) {
    setSources((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Screening - {supplier?.razonSocial || 'Proveedor'}</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 1 }}>
          <Typography variant="subtitle2">Fuentes</Typography>
          <FormControlLabel control={<Checkbox checked={sources.includes('OFAC')} onChange={() => toggleSource('OFAC')} />} label="OFAC" />
          <FormControlLabel control={<Checkbox checked={sources.includes('EU')} onChange={() => toggleSource('EU')} />} label="EU" />
          <FormControlLabel control={<Checkbox checked={sources.includes('UN')} onChange={() => toggleSource('UN')} />} label="UN" />
        </Box>
        {loading && <LinearProgress />}

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Resultados</Typography>
          {results.length === 0 && !loading && <Typography sx={{ mt: 1 }}>No se encontraron coincidencias.</Typography>}

          {results.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fuente</TableCell>
                    <TableCell>Nombre Coincidente</TableCell>
                    <TableCell>Tipo de Coincidencia</TableCell>
                    <TableCell>Nivel de Riesgo</TableCell>
                    <TableCell>Detalles</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell>{r.fuente}</TableCell>
                      <TableCell>{r.nombreCoincidente}</TableCell>
                      <TableCell>{r.tipoCoincidencia}</TableCell>
                      <TableCell>{r.nivelRiesgo}</TableCell>
                      <TableCell>{r.detalles}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}
