import React from 'react';
import { Typography, Container, Grid, Paper, Button, Avatar, Box } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const EntrenadorDashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  // Datos de ejemplo
  const nombre = auth?.nombre || 'Entrenador';
  const clasesHoy = 4;
  const sociosActivos = 32;
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: (theme) => theme.palette.background.paper }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mb: 2 }}>
              <PersonIcon fontSize="large" />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              ¡Bienvenido, {nombre}!
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Gestiona tus clases y consulta tus socios inscritos.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: (theme) => theme.palette.background.paper }}>
            <FitnessCenterIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="subtitle1" gutterBottom>
              Clases para Hoy
            </Typography>
            <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
              {clasesHoy}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Revisa y administra tus clases diarias.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: (theme) => theme.palette.background.paper }}>
            <GroupIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="subtitle1" gutterBottom>
              Socios Activos
            </Typography>
            <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
              {sociosActivos}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Socios asignados actualmente a tus clases.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              sx={{ px: 5, py: 2, fontWeight: 'bold', fontSize: '1.1rem' }}
              onClick={() => navigate('/entrenador/mis-clases')}
            >
              Ir a Mis Clases
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EntrenadorDashboard;