import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // ¡Cambiamos a modo claro!
    primary: {
      main: '#007aff', // Un azul profesional como color principal
    },
    secondary: {
      main: '#ff3d00',
    },
    background: {
      default: '#f4f6f8', // Un gris muy claro para el fondo general
      paper: '#ffffff',   // Blanco puro para las tarjetas y menús
    },
    text: {
      primary: '#172b4d', // Un azul oscuro para el texto principal
      secondary: '#6b778c', // Un gris para texto secundario
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      color: '#172b4d',
    },
    h5: {
      fontWeight: 600,
      color: '#172b4d',
    },
    h6: {
        fontWeight: 600,
        color: '#172b4d',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 'bold',
          padding: '10px 20px',
        },
      },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none',
                borderRadius: 16,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', // Una sombra sutil para el modo claro
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                borderRight: '1px solid #e0e0e0',
                backgroundColor: '#ffffff',
            }
        }
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: '#ffffff',
                color: '#172b4d',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            }
        }
    }
  },
});

export default theme;