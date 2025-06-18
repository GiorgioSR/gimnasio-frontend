import React from 'react';
import { Typography, Container, Grid, Paper, Button, Avatar, Box, Chip, Fade, LinearProgress } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
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

const ActionCard = ({ title, description, buttonText, onClick, icon, gradient, delay = 0 }) => (
  <Fade in={true} timeout={800 + delay}>
    <Paper 
      elevation={0}
      sx={{ 
        p: 4, 
        height: '100%',
        display: 'flex', 
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <Avatar 
        sx={{ 
          background: gradient,
          width: 56, 
          height: 56, 
          mb: 2,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)'
        }}
      >
        {icon}
      </Avatar>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#1e293b' }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flex: 1 }}>
        {description}
      </Typography>
      <Button 
        variant="contained" 
        fullWidth 
        onClick={onClick}
        sx={{
          background: gradient,
          fontWeight: 600,
          py: 1.5,
          '&:hover': {
            background: gradient,
            transform: 'scale(1.02)',
          }
        }}
      >
        {buttonText}
      </Button>
    </Paper>
  </Fade>
);

const SocioDashboard = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const nombre = auth?.nombre || 'Socio';

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
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
              ¡Bienvenido, {nombre}!
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 400 }}>
              Tu progreso fitness te está esperando
            </Typography>
            <Chip 
              label="Socio Activo" 
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
          <Grid item xs={12} md={4}>
            <StatsCard
              title="Entrenamientos"
              value="24"
              subtitle="Este mes • +15% vs mes anterior"
              icon={<FitnessCenterIcon />}
              color="#10b981"
              progress={75}
              delay={0}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatsCard
              title="Rutinas Activas"
              value="3"
              subtitle="Generadas con IA • Última: hace 2 días"
              icon={<TrendingUpIcon />}
              color="#3b82f6"
              progress={60}
              delay={100}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatsCard
              title="Días Restantes"
              value="18"
              subtitle="Membresía Premium • Vence: 30/06/2025"
              icon={<CalendarTodayIcon />}
              color="#f59e0b"
              progress={85}
              delay={200}
            />
          </Grid>

          {/* Action Cards */}
          <Grid item xs={12} md={4}>
            <ActionCard
              title="Generar Nueva Rutina"
              description="Usa nuestra IA avanzada para crear un plan de entrenamiento personalizado según tus objetivos."
              buttonText="Crear Rutina"
              onClick={() => navigate('/socio/generar-rutina')}
              icon={<FitnessCenterIcon />}
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              delay={300}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ActionCard
              title="Mis Rutinas"
              description="Revisa y sigue tus rutinas de entrenamiento personalizadas. Mantén el control de tu progreso."
              buttonText="Ver Rutinas"
              onClick={() => navigate('/socio/rutinas')}
              icon={<PersonIcon />}
              gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              delay={400}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ActionCard
              title="Gestionar Membresía"
              description="Renueva tu membresía, cambia de plan o consulta tu historial de pagos de forma segura."
              buttonText="Gestionar"
              onClick={() => navigate('/socio/pagar')}
              icon={<CreditCardIcon />}
              gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              delay={500}
            />
          </Grid>
        </Grid>

        {/* Progress Section */}
        <Fade in={true} timeout={1000}>
          <Paper 
            elevation={0}
            sx={{ 
              mt: 6, 
              p: 4, 
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 4
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              🎯 Tu Progreso Semanal
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#10b981', mb: 1 }}>
                    6/7
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Días entrenados
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={85} 
                    sx={{ 
                      mt: 1,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#10b981',
                        borderRadius: 3,
                      }
                    }} 
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#3b82f6', mb: 1 }}>
                    4.2h
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tiempo total
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={70} 
                    sx={{ 
                      mt: 1,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'rgba(59, 130, 246, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#3b82f6',
                        borderRadius: 3,
                      }
                    }} 
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: '#f59e0b', mb: 1 }}>
                    1,240
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Calorías quemadas
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={92} 
                    sx={{ 
                      mt: 1,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'rgba(245, 158, 11, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#f59e0b',
                        borderRadius: 3,
                      }
                    }} 
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default SocioDashboard;