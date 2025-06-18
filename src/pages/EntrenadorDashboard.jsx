import React from 'react';
import { Typography, Container, Grid, Paper, Button, Avatar, Box, Chip, Fade, LinearProgress } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const StatsCard = ({ title, value, subtitle, icon, color, progress, delay = 0 }) => (
  <Fade in={true} timeout={600 + delay}>
    <Paper 
      elevation={0}
      sx={{ 
        p: 4, 
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
          width: '80px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          transform: 'translate(25px, -25px)',
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', width: 48, height: 48 }}>
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
      <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
        {subtitle}
      </Typography>
      {progress !== undefined && (
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
            }
          }} 
        />
      )}
    </Paper>
  </Fade>
);

const EntrenadorDashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const nombre = auth?.nombre || 'Entrenador';

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Fade in={true} timeout={400}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: 'auto',
                mb: 3,
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                boxShadow: '0 10px 30px rgba(240, 147, 251, 0.3)',
              }}
            >
              {nombre.charAt(0)}
            </Avatar>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 800, 
                color: 'white',
                mb: 1,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              ¡Hola, {nombre}!
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>
              Inspira y transforma vidas a través del fitness
            </Typography>
            <Chip 
              label="Entrenador Certificado" 
              sx={{ 
                mt: 2,
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 600,
                backdropFilter: 'blur(10px)'
              }} 
            />
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {/* Stats Cards */}
          <Grid item xs={12} md={3}>
            <StatsCard
              title="Clases Hoy"
              value="6"
              subtitle="2 completadas • 4 pendientes"
              icon={<CalendarTodayIcon />}
              color="#10b981"
              progress={33}
              delay={0}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatsCard
              title="Socios Activos"
              value="42"
              subtitle="En tus clases • +8 este mes"
              icon={<GroupIcon />}
              color="#3b82f6"
              progress={85}
              delay={100}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatsCard
              title="Clases Semanales"
              value="18"
              subtitle="Promedio semanal • Muy activo"
              icon={<FitnessCenterIcon />}
              color="#f59e0b"
              progress={90}
              delay={200}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <StatsCard
              title="Rating Promedio"
              value="4.9"
              subtitle="Basado en 127 evaluaciones"
              icon={<TrendingUpIcon />}
              color="#ec4899"
              progress={98}
              delay={300}
            />
          </Grid>

          {/* Main Action Card */}
          <Grid item xs={12} md={8}>
            <Fade in={true} timeout={800}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 6, 
                  height: '400px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)',
                    zIndex: 0,
                  }
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 3,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      mx: 'auto'
                    }}
                  >
                    <FitnessCenterIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, color: '#1e293b', mb: 2 }}>
                    Gestiona Tus Clases
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400 }}>
                    Revisa el horario de hoy, consulta la lista de socios inscritos y mantén el control total de tus sesiones de entrenamiento.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/entrenador/mis-clases')}
                    sx={{
                      px: 6,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #e879f9 0%, #ef4444 100%)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    Ver Mis Clases
                  </Button>
                </Box>
              </Paper>
            </Fade>
          </Grid>

          {/* Schedule Card */}
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={1000}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  height: '400px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 4
                }}
              >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
                  📅 Próximas Clases
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box 
                    sx={{ 
                      p: 3, 
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      borderRadius: 3,
                      color: 'white'
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Yoga Matutino
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      09:00 - 10:00 • 12 inscritos
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      p: 3, 
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      borderRadius: 3,
                      color: 'white'
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      CrossFit Intensivo
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      11:00 - 12:00 • 8 inscritos
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      p: 3, 
                      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      borderRadius: 3,
                      color: 'white'
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      Pilates Avanzado
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      16:00 - 17:00 • 15 inscritos
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EntrenadorDashboard;