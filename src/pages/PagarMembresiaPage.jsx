import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { 
  Box, Typography, Alert, CircularProgress, Grid, Card, CardContent, 
  CardActionArea, CardHeader, Paper, Fade, Avatar, Chip
} from '@mui/material';
import CheckoutForm from '../components/CheckoutForm';
import { getMembresias } from '../api/membresiaService';
import { realizarPago } from '../api/pagoService';
import useAuth from '../hooks/useAuth';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PlanCard = ({ plan, isSelected, onClick, delay = 0 }) => (
  <Fade in={true} timeout={600 + delay}>
    <Card
      elevation={0}
      sx={{
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: isSelected ? '3px solid #667eea' : '2px solid transparent',
        background: isSelected 
          ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
        '&:hover': {
          transform: isSelected ? 'scale(1.05)' : 'scale(1.02)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        }
      }}
      onClick={onClick}
    >
      <CardActionArea sx={{ height: '100%', p: 0 }}>
        <CardHeader
          avatar={
            <Avatar 
              sx={{ 
                background: isSelected 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                color: isSelected ? 'white' : '#64748b'
              }}
            >
              {plan.nombre.charAt(0)}
            </Avatar>
          }
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                {plan.nombre}
              </Typography>
              {plan.nombre.toLowerCase().includes('premium') && (
                <Chip 
                  icon={<StarIcon />} 
                  label="Popular" 
                  size="small" 
                  sx={{ 
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white',
                    fontWeight: 600
                  }} 
                />
              )}
            </Box>
          }
          subheader={
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#667eea', mt: 1 }}>
              ${plan.costo.toFixed(2)}
              <Typography component="span" variant="body2" sx={{ color: '#64748b', ml: 1 }}>
                / {plan.duracionMeses} mes{plan.duracionMeses > 1 ? 'es' : ''}
              </Typography>
            </Typography>
          }
          sx={{ pb: 1 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {plan.descripcion || 'Acceso completo al gimnasio y todas las clases disponibles.'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon sx={{ color: '#10b981', fontSize: 16 }} />
            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
              Acceso ilimitado al gimnasio
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
            <CheckCircleIcon sx={{ color: '#10b981', fontSize: 16 }} />
            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 600 }}>
              Todas las clases incluidas
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  </Fade>
);

const PagarMembresiaPage = () => {
    const { auth } = useAuth();
    const [membresias, setMembresias] = useState([]);
    const [selectedMembresia, setSelectedMembresia] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMembresias = async () => {
            try {
                const response = await getMembresias(auth.token);
                setMembresias(response.data);
            } catch (err) {
                setError("No se pudieron cargar las membresías.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchMembresias();
    }, [auth.token]);

    const handlePaymentSuccess = async (paymentMethodId) => {
        setError('');
        setSuccess('');

        const { id, costo, duracionMeses } = selectedMembresia;
        const hoy = new Date();
        const fechaFin = new Date();
        fechaFin.setMonth(hoy.getMonth() + duracionMeses);

        const pagoData = {
            socioId: auth.id,
            membresiaId: id,
            monto: costo,
            fechaInicioMembresia: hoy.toISOString().split('T')[0],
            fechaFinMembresia: fechaFin.toISOString().split('T')[0],
            metodoPago: 'STRIPE',
            transaccionId: paymentMethodId,
        };
        
        try {
            await realizarPago(pagoData, auth.token);
            setSuccess(`¡Pago exitoso! Tu membresía '${selectedMembresia.nombre}' ha sido activada.`);
            setSelectedMembresia(null);
        } catch (err) {
            setError(err.response?.data?.message || 'El pago falló. Por favor, intenta de nuevo.');
        }
    };

    if (isLoading) {
        return (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              minHeight: '60vh'
            }}
          >
            <CircularProgress size={60} />
          </Box>
        );
    }

    return (
        <Box 
          sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 50%, #4facfe 100%)',
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
            <Fade in={true} timeout={400}>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 3,
                    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    boxShadow: '0 10px 30px rgba(67, 233, 123, 0.3)',
                  }}
                >
                  <CreditCardIcon sx={{ fontSize: 50 }} />
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
                  💳 Gestionar Membresía
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 600, mx: 'auto' }}>
                  Elige el plan perfecto para alcanzar tus objetivos fitness
                </Typography>
              </Box>
            </Fade>

            {error && (
              <Fade in={true}>
                <Alert severity="error" sx={{ mb: 4, maxWidth: 800, mx: 'auto', borderRadius: 3 }}>
                  {error}
                </Alert>
              </Fade>
            )}
            
            {success && (
              <Fade in={true}>
                <Alert severity="success" sx={{ mb: 4, maxWidth: 800, mx: 'auto', borderRadius: 3 }}>
                  {success}
                </Alert>
              </Fade>
            )}

            <Fade in={true} timeout={600}>
              <Typography 
                variant="h5" 
                sx={{ 
                  textAlign: 'center', 
                  mb: 4, 
                  fontWeight: 700, 
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                ✨ Selecciona tu Plan
              </Typography>
            </Fade>

            <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto', mb: 6 }}>
              {membresias.map((plan, index) => (
                <Grid key={plan.id} item xs={12} md={4}>
                  <PlanCard
                    plan={plan}
                    isSelected={selectedMembresia?.id === plan.id}
                    onClick={() => setSelectedMembresia(plan)}
                    delay={index * 100}
                  />
                </Grid>
              ))}
            </Grid>

            {selectedMembresia && (
              <Fade in={true} timeout={800}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    maxWidth: 600, 
                    mx: 'auto', 
                    p: 6,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 4
                  }}
                >
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      }}
                    >
                      <CreditCardIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, color: '#1e293b' }}>
                      Finalizar Pago
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Plan seleccionado: <strong>{selectedMembresia.nombre}</strong>
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#43e97b', mt: 1 }}>
                      ${selectedMembresia.costo.toFixed(2)} BOB
                    </Typography>
                  </Box>
                  
                  <Elements stripe={stripePromise}>
                    <CheckoutForm 
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={(err) => setError(err)}
                      paymentData={{ monto: selectedMembresia.costo }}
                    />
                  </Elements>
                </Paper>
              </Fade>
            )}
          </Box>
        </Box>
    );
};

export default PagarMembresiaPage;