import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Layout from '../components/Layout'

export default function NotFound() {
  return (
    <Layout>
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          404
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Página no encontrada
        </Typography>
        <Button component={RouterLink} to="/" variant="contained">
          Volver al inicio
        </Button>
      </Box>
    </Layout>
  )
}
