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
import type { ScreeningResult, OFACScreeningResult, WorldBankScreeningResult } from '../api/screeningApi'
import type { Supplier } from '../api/suppliersApi'

type Props = {
  open: boolean
  supplier?: Supplier | null
  onClose: () => void
}

type SourceFilter = {
  ofac: boolean
  worldBank: boolean
}

export default function ScreeningModal({ open, supplier, onClose }: Props) {
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>({ ofac: true, worldBank: false })
  const [loading, setLoading] = useState(false)
  const [screeningData, setScreeningData] = useState<ScreeningResult | null>(null)
  const [filteredResults, setFilteredResults] = useState<(OFACScreeningResult | WorldBankScreeningResult)[]>([])

  // Reset state when modal opens
  useEffect(() => {
    if (!open) return
    setScreeningData(null)
    setFilteredResults([])
    setSourceFilter({ ofac: true, worldBank: false })
  }, [open])

  // Run screening when modal opens and supplier is available
  useEffect(() => {
    let mounted = true
    async function runScreeningRequest() {
      if (!supplier || !open) return

      setLoading(true)
      try {
        const supplierId = parseInt(supplier.id)
        const res = await runScreening(supplierId)
        if (!mounted) return
        console.log('Screening results:', res)
        setScreeningData(res)
      } catch (e) {
        console.error('Error running screening:', e)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    runScreeningRequest()
    return () => {
      mounted = false
    }
  }, [supplier, open])

  // Filter results based on source selection
  useEffect(() => {
    if (!screeningData) {
      setFilteredResults([])
      return
    }

    const filtered: (OFACScreeningResult | WorldBankScreeningResult)[] = []

    // Add OFAC results if selected
    if (sourceFilter.ofac && screeningData.results.ofac) {
      filtered.push(...screeningData.results.ofac)
    }

    // Add World Bank results if selected
    if (sourceFilter.worldBank && screeningData.results.worldBank) {
      filtered.push(...screeningData.results.worldBank)
    }

    setFilteredResults(filtered)
  }, [screeningData, sourceFilter])

  function toggleSource(source: keyof SourceFilter) {
    setSourceFilter(prev => ({
      ...prev,
      [source]: !prev[source]
    }))
  }

  function getSourceName(result: OFACScreeningResult | WorldBankScreeningResult): string {
    return 'id' in result ? 'OFAC' : 'World Bank'
  }

  function getResultName(result: OFACScreeningResult | WorldBankScreeningResult): string {
    return 'id' in result ? result.name : result.firmName
  }



  function getRiskLevel(result: OFACScreeningResult | WorldBankScreeningResult): string {
    if ('id' in result) {
      return result.sourceList.includes('SDN') ? 'Alto' : 'Medio'
    } else {
      return 'Medio'
    }
  }

  function getDetails(result: OFACScreeningResult | WorldBankScreeningResult): string {
    if ('id' in result) {
      return `${result.programs} - ${result.sourceList}`
    } else {
      return `${result.grounds} (${result.fromDate} - ${result.toDate})`
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Screening - {supplier?.businessName || 'Proveedor'}</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 1 }}>
          <Typography variant="subtitle2">Filtrar por Fuentes</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={sourceFilter.ofac}
                onChange={() => toggleSource('ofac')}
              />
            }
            label="OFAC"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sourceFilter.worldBank}
                onChange={() => toggleSource('worldBank')}
              />
            }
            label="World Bank"
          />
        </Box>
        {loading && <LinearProgress />}

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Resultados</Typography>
          {filteredResults.length === 0 && !loading && (
            <Typography sx={{ mt: 1 }}>
              {!screeningData || screeningData.total_hits === 0
                ? 'No se encontraron coincidencias en ninguna fuente.'
                : 'No se encontraron coincidencias para las fuentes seleccionadas.'
              }
            </Typography>
          )}

          {filteredResults.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fuente</TableCell>
                    <TableCell>Nombre Coincidente</TableCell>

                    <TableCell>Nivel de Riesgo</TableCell>
                    <TableCell>Detalles</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredResults.map((result, i) => (
                    <TableRow key={i}>
                      <TableCell>{getSourceName(result)}</TableCell>
                      <TableCell>{getResultName(result)}</TableCell>
                      <TableCell>{getRiskLevel(result)}</TableCell>
                      <TableCell>{getDetails(result)}</TableCell>
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
