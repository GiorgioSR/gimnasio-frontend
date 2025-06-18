import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import apiClient from '../api/axios';
import {
  Container, Box, TextField, Button, Typography, Alert, FormControl, 
  InputLabel, Select, MenuItem, Paper, Fade, Avatar, Grid, Link
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    fechaNacimiento: '',
    telefono: '',
    direccion: '',
    rol: 'SOCIO'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post('/api/auth/register', formData);
      login(response.data);

      // Redirección basada en el rol
      if (response.data.rol === 'ADMIN') {
        navigate('/admin');
      } else if (response.data.rol === 'ENTRENADOR') {
        navigate('/entrenador');
      } else {
        navigate('/socio');
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError('El correo electrónico ya está registrado.');
      } else {
        setError('Error en el registro. Por favor, intente de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={800}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 6, 
              borderRadius: 6, 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mb: 3,
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  boxShadow: '0 10px 25px rgba(240, 147, 251, 0.3)',
                }}
              >
                <FitnessCenterIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography 
                component="h1" 
                variant="h4" 
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1
                }}
              >
                Únete a aiGym
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                Crea tu cuenta y comienza tu transformación fitness
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              {error && (
                <Fade in={true}>
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                    {error}
                  </Alert>
                </Fade>
              )}
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="nombre"
                    required
                    fullWidth
                    label="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="apellido"
                    required
                    fullWidth
                    label="Apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    required
                    fullWidth
                    label="Correo Electrónico"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    required
                    fullWidth
                    label="Contraseña"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="fechaNacimiento"
                    required
                    fullWidth
                    label="Fecha de Nacimiento"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="telefono"
                    fullWidth
                    label="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="direccion"
                    fullWidth
                    label="Dirección"
                    value={formData.direccion}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Tipo de Usuario</InputLabel>
                    <Select
                      name="rol"
                      value={formData.rol}
                      label="Tipo de Usuario"
                      onChange={handleChange}
                    >
                      <MenuItem value="SOCIO">Socio</MenuItem>
                      <MenuItem value="ENTRENADOR">Entrenador</MenuItem>
                      <MenuItem value="ADMIN">Administrador</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                startIcon={<PersonAddIcon />}
                sx={{ 
                  mt: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  mb: 3,
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e879f9 0%, #ef4444 100%)',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)',
                  }
                }}
              >
                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
              
              <Grid container justifyContent="center">
                <Grid item>
                  <Link 
                    component={RouterLink} 
                    to="/login" 
                    variant="body2"
                    sx={{
                      color: '#f093fb',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      }
                    }}
                  >
                    ¿Ya tienes cuenta? Inicia sesión aquí
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Register;