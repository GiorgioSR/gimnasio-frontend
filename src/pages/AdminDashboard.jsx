import React from 'react';
import { Typography, Box, Grid, Paper, Avatar } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PaymentIcon from '@mui/icons-material/Payment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import useAuth from '../hooks/useAuth';

// Un componente pequeño para las tarjetas de resumen
const StatCard = ({ title, value, icon, color }) => (
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
        <Avatar sx={{ bgcolor: color, width: 56, height: 56, mr: 2 }}>
            {icon}
        </Avatar>
        <Box>
            <Typography color="text.secondary">{title}</Typography>
            <Typography variant="h5">{value}</Typography>
        </Box>
    </Paper>
);

const AdminDashboard = () => {
    const { auth } = useAuth();

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Resumen del Sistema
            </Typography>
            <Typography paragraph color="text.secondary">
                Bienvenido de nuevo, {auth.nombre}. Aquí tienes una vista general del estado del gimnasio.
            </Typography>
            <Grid container spacing={3} mt={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Total de Socios" value= "4" icon={<PeopleIcon />} color="#10b981" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Entrenadores Activos" value="8" icon={<FitnessCenterIcon />} color="#ff3d00" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Clases Disponibles" value="12" icon={<EventNoteIcon />} color="#29b6f6" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard title="Ingresos del Mes" value="$5,430" icon={<PaymentIcon />} color="#ffc107" />
                </Grid>
                
                {/* Aquí podríamos añadir más componentes, como gráficos o tablas de actividad reciente */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2, height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Typography color="text.secondary">Gráfico de Crecimiento de Socios (Placeholder)</Typography>
                    </Paper>
                </Grid>
                 <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Typography color="text.secondary">Actividad Reciente (Placeholder)</Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;