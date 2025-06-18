import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Typography } from '@mui/material';
import { AuthProvider } from './context/AuthContext';

// Layouts
import AdminLayout from './components/AdminLayout';
import SocioLayout from './components/SocioLayout';
import EntrenadorLayout from './components/EntrenadorLayout'; // <-- Importa el nuevo layout

// Componentes de Rutas y Páginas
import RequireAuth from './routes/RequireAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import AdminDashboard from './pages/AdminDashboard';
import EntrenadorDashboard from './pages/EntrenadorDashboard';
import SocioDashboard from './pages/SocioDashboard';
import SociosAdminPage from './pages/SociosAdminPage';
import EntrenadoresAdminPage from './pages/EntrenadoresAdminPage';
import PagosAdminPage from './pages/PagosAdminPage';
import GenerarRutinaPage from './pages/GenerarRutinaPage';
import MisRutinasPage from './pages/MisRutinasPage';
import PagarMembresiaPage from './pages/PagarMembresiaPage';
import MisClasesPage from './pages/MisClasesPage';
import ClasesAdminPage from './pages/ClasesAdminPage'; 
import TiposSocioAdminPage from './pages/TiposSocioAdminPage';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <AuthProvider>
        <Routes>
          {/* --- Rutas Públicas --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* --- Rutas Protegidas --- */}

          {/* Rutas para ADMIN */}
          <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="socios" element={<SociosAdminPage />} />
              <Route path="entrenadores" element={<EntrenadoresAdminPage />} />
              <Route path="pagos" element={<PagosAdminPage />} />
              <Route path="clases" element={<ClasesAdminPage />} />
              <Route path="tipos-socio" element={<TiposSocioAdminPage />} />
            </Route>
          </Route>

          {/* ---- RUTAS PARA ENTRENADOR (CORREGIDAS) ---- */}
           <Route element={<RequireAuth allowedRoles={['ENTRENADOR']} />}>
                <Route path="/entrenador" element={<EntrenadorLayout />}>
                    <Route index element={<EntrenadorDashboard />} />
                    <Route path="mis-clases" element={<MisClasesPage />} />
                </Route>
           </Route>

          {/* Rutas para SOCIO */}
            <Route element={<RequireAuth allowedRoles={['SOCIO']} />}>
              <Route path="/socio" element={<SocioLayout />}>
                <Route index element={<SocioDashboard />} />
                <Route path="generar-rutina" element={<GenerarRutinaPage />} />
                <Route path="rutinas" element={<MisRutinasPage />} />
                <Route path="pagar" element={<PagarMembresiaPage />} />
              </Route>
            </Route>
          
          {/* Ruta por defecto y catch-all */}
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Typography>Página no encontrada</Typography>} />
        </Routes>
      </AuthProvider>
    </Router>
    </ThemeProvider>
  );
}

export default App;