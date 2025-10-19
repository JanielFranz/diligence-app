import { AppBar, Box, Container, Toolbar, Typography, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../hooks/useAuth'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Debida Diligencia - Proveedores
          </Typography>
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {user.username}
              </Typography>
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{ textTransform: 'none' }}
              >
                Cerrar Sesión
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>{children}</Container>
    </Box>
  )
}
