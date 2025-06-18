import React from 'react';
import { Typography, Container, Grid, Paper, Button, Avatar } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const SocioDashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const nombre = auth?.nombre || 'Socio';
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
              Aquí puedes consultar tu rutina, membresía y más.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: (theme) => theme.palette.background.paper }}>
            <FitnessCenterIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="subtitle1" gutterBottom>
              Mi Rutina Actual
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
              Consulta y sigue tu rutina personalizada.
            </Typography>
            <Button variant="contained" fullWidth onClick={() => navigate('/socio/rutinas')}>
              Ver Rutina
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: (theme) => theme.palette.background.paper }}>
            <CreditCardIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="subtitle1" gutterBottom>
              Mi Membresía
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
              Estado: Activa<br />Vence: 30/06/2025
            </Typography>
            <Button variant="outlined" fullWidth onClick={() => navigate('/socio/pagar')}>
              Renovar Membresía
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SocioDashboard;