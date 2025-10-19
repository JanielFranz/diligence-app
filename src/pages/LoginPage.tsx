import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Container, Typography } from '@mui/material'
import { useAuth } from '../hooks/useAuth'
import LoginForm from '../components/auth/LoginForm'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const from = (location.state as any)?.from?.pathname || '/suppliers'

  useEffect(() => {
    // If user is already logged in, redirect to suppliers page
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from])

  const handleLoginSuccess = () => {
    navigate(from, { replace: true })
  }

  if (user) {
    return null // Prevent flash while redirecting
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.3)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="sm" sx={{ zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: '#2c3e50',
                fontWeight: 700,
                textShadow: '0 1px 3px rgba(0,0,0,0.1)',
                mb: 1,
              }}
            >
              Debida Diligencia
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#546e7a',
                fontWeight: 300,
                textShadow: '0 1px 2px rgba(0,0,0,0.05)',
              }}
            >
              Sistema de Gestión de Proveedores
            </Typography>
          </Box>

          {/* Login Form */}
          <LoginForm onSuccess={handleLoginSuccess} />
        </Box>
      </Container>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </Box>
  )
}
