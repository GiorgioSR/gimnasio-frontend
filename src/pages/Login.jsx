import React, { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import apiClient from '../api/axios';
import {
  Container, Box, TextField, Button, Typography, Alert, Grid, Link, Paper
} from '@mui/material';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiClient.post('/api/auth/login', { email, password });
      login(response.data);

      const rol = response.data.rol;
      if (rol === 'ADMIN') {
        navigate('/admin');
      } else if (rol === 'ENTRENADOR') {
        navigate('/entrenador');
      } else {
        navigate('/socio');
      }

    } catch (err) {
      if (!err?.response) {
        setError('Sin respuesta del servidor');
      } else if (err.response?.status === 400 || err.response?.status === 401) {
        setError('Credenciales inválidas');
      } else {
        setError('Falló el inicio de sesión');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 3, boxShadow: (theme) => theme.shadows[4], backgroundColor: (theme) => theme.palette.background.paper }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Iniciar Sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"No tienes usuario? Create una cuenta"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;