import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {
  Container, Box, TextField, Button, Typography, Alert, FormControl, InputLabel, Select, MenuItem, Paper,
} from '@mui/material';

const Register = () => {
  const { registerAndLogin } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [rol, setRol] = useState('SOCIO'); // Por defecto SOCIO
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    const payload = {
        nombre, apellido, email, password, fechaNacimiento, telefono, direccion, rol
    };

    try {
      const userData = await registerAndLogin(payload);

      // Redirección basada en el rol
      if (userData.rol === 'ADMIN') {
        navigate('/admin');
      } else if (userData.rol === 'ENTRENADOR') {
        navigate('/entrenador');
      } else {
        navigate('/socio');
      }
    } catch (err) {
      if (err.response?.status === 409) { // 409 Conflict, del backend
        setError('El correo electrónico ya está registrado.');
      } else {
        setError('Error en el registro. Por favor, intente de nuevo.');
        console.error(err);
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500, borderRadius: 3, boxShadow: (theme) => theme.shadows[4], backgroundColor: (theme) => theme.palette.background.paper }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" gutterBottom>
            Registro de Usuario
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: '100%' }}>
            {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
            <TextField name="nombre" required fullWidth id="nombre" label="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} sx={{ mb: 2 }} />
            <TextField name="apellido" required fullWidth id="apellido" label="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} sx={{ mb: 2 }} />
            <TextField name="email" required fullWidth id="email" label="Correo Electrónico" type="email" value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} />
            <TextField name="password" required fullWidth id="password" label="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} />
            <TextField name="fechaNacimiento" required fullWidth id="fechaNacimiento" label="Fecha de Nacimiento" type="date" InputLabelProps={{ shrink: true }} value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} sx={{ mb: 2 }} />
            <TextField name="telefono" fullWidth id="telefono" label="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} sx={{ mb: 2 }} />
            <TextField name="direccion" fullWidth id="direccion" label="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} sx={{ mb: 2 }} />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="rol-select-label">Rol</InputLabel>
              <Select labelId="rol-select-label" id="rol" value={rol} label="Rol" onChange={e => setRol(e.target.value)}>
                <MenuItem value={'SOCIO'}>Socio</MenuItem>
                <MenuItem value={'ENTRENADOR'}>Entrenador</MenuItem>
                <MenuItem value={'ADMIN'}>Administrador</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Registrarse
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;