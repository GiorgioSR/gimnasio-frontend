import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, CircularProgress, Alert, Card, CardContent, 
  CardHeader, List, ListItem, ListItemText, Divider, ListItemIcon, Fade, Paper, Avatar
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import useAuth from '../hooks/useAuth';
import { generarRutinaIA } from '../api/rutinaService';

const GenerarRutinaPage = () => {
    const { auth } = useAuth();
    const [objetivo, setObjetivo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [rutinaGenerada, setRutinaGenerada] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setRutinaGenerada(null);

        try {
            const response = await generarRutinaIA(auth.id, objetivo, auth.token);
            setRutinaGenerada(response.data);
        } catch (err) {
            setError('Error al generar la rutina. Por favor, intente de nuevo.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

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
          <Box sx={{ position: 'relative', zIndex: 1, p: 4 }}>
            <Fade in={true} timeout={600}>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  <SmartToyIcon sx={{ fontSize: 50 }} />
                </Avatar>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 800, 
                    color: 'white',
                    mb: 2,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  🤖 Generador de Rutina con IA
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 600, mx: 'auto' }}>
                  Describe tu objetivo de entrenamiento y nuestra inteligencia artificial creará un plan personalizado para ti
                </Typography>
              </Box>
            </Fade>

            <Fade in={true} timeout={800}>
              <Paper 
                elevation={0}
                sx={{ 
                  maxWidth: 800, 
                  mx: 'auto', 
                  p: 6,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 4
                }}
              >
                <Box component="form" onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <AutoAwesomeIcon sx={{ color: '#667eea', fontSize: 28 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                      Cuéntanos tu objetivo
                    </Typography>
                  </Box>
                  
                  <TextField
                    label="Describe tu objetivo de entrenamiento"
                    placeholder="Ej: Quiero mejorar mi resistencia cardiovascular y tonificar mis brazos"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value)}
                    sx={{ 
                      mb: 4,
                      '& .MuiOutlinedInput-root': {
                        fontSize: '1.1rem',
                        '& fieldset': {
                          borderWidth: 2,
                        },
                      }
                    }}
                  />
                  
                  <Button 
                    type="submit" 
                    variant="contained" 
                    disabled={isLoading || !objetivo.trim()}
                    fullWidth
                    size="large"
                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SmartToyIcon />}
                    sx={{ 
                      py: 2,
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                        transform: 'translateY(-2px)',
                      },
                      '&:disabled': {
                        background: 'linear-gradient(135deg, #a0aec0 0%, #718096 100%)',
                      }
                    }}
                  >
                    {isLoading ? 'Generando tu rutina perfecta...' : 'Generar Rutina con IA'}
                  </Button>
                </Box>

                {error && (
                  <Fade in={true}>
                    <Alert severity="error" sx={{ mt: 3, borderRadius: 3 }}>
                      {error}
                    </Alert>
                  </Fade>
                )}
              </Paper>
            </Fade>

            {rutinaGenerada && (
              <Fade in={true} timeout={1000}>
                <Card 
                  elevation={0}
                  sx={{ 
                    maxWidth: 800, 
                    mx: 'auto', 
                    mt: 6,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                        <AutoAwesomeIcon />
                      </Avatar>
                    }
                    title={
                      <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e293b' }}>
                        {rutinaGenerada.nombre}
                      </Typography>
                    }
                    subheader={
                      <Typography variant="subtitle1" sx={{ color: '#64748b', fontWeight: 500 }}>
                        Duración: {rutinaGenerada.duracionSemanas} semanas • Generado con IA
                      </Typography>
                    }
                    sx={{ 
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
                      pb: 2
                    }}
                  />
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                        🎯 Objetivo Principal
                      </Typography>
                      <Paper 
                        sx={{ 
                          p: 3, 
                          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                          border: '1px solid rgba(99, 102, 241, 0.2)',
                          borderRadius: 3
                        }}
                      >
                        <Typography variant="body1" sx={{ color: '#4c1d95', fontWeight: 500 }}>
                          {rutinaGenerada.objetivo}
                        </Typography>
                      </Paper>
                    </Box>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1e293b', mb: 3 }}>
                      💪 Ejercicios Recomendados
                    </Typography>
                    <List sx={{ p: 0 }}>
                      {rutinaGenerada.ejercicios.map((ejercicio, index) => (
                        <Fade in={true} timeout={1200 + index * 100} key={ejercicio.id}>
                          <ListItem 
                            sx={{ 
                              mb: 2, 
                              p: 3,
                              background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.8) 100%)',
                              borderRadius: 3,
                              border: '1px solid rgba(226, 232, 240, 0.5)',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                              }
                            }}
                          >
                            <ListItemIcon>
                              <Avatar 
                                sx={{ 
                                  background: `linear-gradient(135deg, ${
                                    index % 3 === 0 ? '#10b981, #059669' :
                                    index % 3 === 1 ? '#3b82f6, #1d4ed8' :
                                    '#f59e0b, #d97706'
                                  })`,
                                  width: 48,
                                  height: 48
                                }}
                              >
                                <FitnessCenterIcon />
                              </Avatar>
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
                                  {ejercicio.nombre}
                                </Typography>
                              }
                              secondary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                                    Grupo Muscular:
                                  </Typography>
                                  <Paper 
                                    sx={{ 
                                      px: 2, 
                                      py: 0.5, 
                                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                      color: 'white',
                                      borderRadius: 2,
                                      fontSize: '0.75rem',
                                      fontWeight: 600
                                    }}
                                  >
                                    {ejercicio.grupoMuscular}
                                  </Paper>
                                </Box>
                              }
                            />
                          </ListItem>
                        </Fade>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Fade>
            )}
          </Box>
        </Box>
    );
};

export default GenerarRutinaPage;