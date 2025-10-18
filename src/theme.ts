import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#6a1b9a',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 2,
      },
    },
  },
})

export default theme

