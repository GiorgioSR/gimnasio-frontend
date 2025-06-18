import React from 'react';
import { Typography, Box, Grid, Paper, Avatar, Fade, LinearProgress } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PaymentIcon from '@mui/icons-material/Payment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import useAuth from '../hooks/useAuth';

const StatCard = ({ title, value, icon, color, trend, delay = 0 }) => (
  <Fade in={true} timeout={600 + delay}>
    <Paper 
      sx={{ 
        p: 3, 
        height: '100%',
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          transform: 'translate(30px, -30px)',
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', width: 56, height: 56 }}>
          {icon}
        </Avatar>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {value}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {title}
          </Typography>
        </Box>
      </Box>
      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TrendingUpIcon sx={{ fontSize: 16 }} />
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            +{trend}% este mes
          </Typography>
        </Box>
      )}
    </Paper>
  </Fade>
);

const ProgressCard = ({ title, current, total, color, delay = 0 }) => (
  <Fade in={true} timeout={800 + delay}>
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color }}>
          {current}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          de {total}
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={(current / total) * 100} 
        sx={{ 
          height: 8, 
          borderRadius: 4,
          backgroundColor: 'rgba(0,0,0,0.1)',
          '& .MuiLinearProgress-bar': {
            background: `linear-gradient(90deg, ${color} 0%, ${color}aa 100%)`,
            borderRadius: 4,
          }
        }} 
      />
    </Paper>
  </Fade>
);

const AdminDashboard = () => {
    const { auth } = useAuth();

    return (
        <Box>
            <Fade in={true} timeout={400}>
                <Box sx={{ mb: 4 }}>
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            fontWeight: 800, 
                            mb: 1,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Dashboard Administrativo
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                        Bienvenido de nuevo, {auth.nombre}. Aquí tienes el resumen completo de tu gimnasio.
                    </Typography>
                </Box>
            </Fade>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Total de Socios" 
                        value="247" 
                        icon={<PeopleIcon />} 
                        color="#10b981" 
                        trend="12"
                        delay={0}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Entrenadores Activos" 
                        value="18" 
                        icon={<FitnessCenterIcon />} 
                        color="#f59e0b" 
                        trend="5"
                        delay={100}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Clases Disponibles" 
                        value="32" 
                        icon={<EventNoteIcon />} 
                        color="#3b82f6" 
                        trend="8"
                        delay={200}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Ingresos del Mes" 
                        value="$12,450" 
                        icon={<PaymentIcon />} 
                        color="#ec4899" 
                        trend="23"
                        delay={300}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <ProgressCard 
                        title="Ocupación del Gimnasio"
                        current={186}
                        total={250}
                        color="#10b981"
                        delay={400}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <ProgressCard 
                        title="Clases con Cupos Llenos"
                        current={24}
                        total={32}
                        color="#f59e0b"
                        delay={500}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <ProgressCard 
                        title="Meta de Ingresos Mensual"
                        current={12450}
                        total={15000}
                        color="#ec4899"
                        delay={600}
                    />
                </Grid>

                <Grid item xs={12} md={8}>
                    <Fade in={true} timeout={1000}>
                        <Paper 
                            sx={{ 
                                p: 4, 
                                height: '350px', 
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center', 
                                justifyContent: 'center',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '-50%',
                                    right: '-50%',
                                    width: '200%',
                                    height: '200%',
                                    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                                    animation: 'float 20s ease-in-out infinite',
                                },
                                '@keyframes float': {
                                    '0%, 100%': { transform: 'translateY(0px)' },
                                    '50%': { transform: 'translateY(-20px)' },
                                }
                            }}
                        >
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, zIndex: 1 }}>
                                📊 Análisis de Crecimiento
                            </Typography>
                            <Typography variant="body1" align="center" sx={{ opacity: 0.9, zIndex: 1 }}>
                                Gráfico interactivo de crecimiento de socios y tendencias de ingresos
                            </Typography>
                            <Typography variant="caption" sx={{ mt: 2, opacity: 0.7, zIndex: 1 }}>
                                Próximamente: Dashboard con métricas en tiempo real
                            </Typography>
                        </Paper>
                    </Fade>
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <Fade in={true} timeout={1200}>
                        <Paper 
                            sx={{ 
                                p: 4, 
                                height: '350px', 
                                display: 'flex', 
                                flexDirection: 'column',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                color: 'white',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                                🎯 Actividad Reciente
                            </Typography>
                            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                                <Box sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        Nuevo socio registrado
                                    </Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                        Hace 2 horas
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        Pago de membresía procesado
                                    </Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                        Hace 4 horas
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        Nueva clase programada
                                    </Typography>
                                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                        Hace 6 horas
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Fade>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;