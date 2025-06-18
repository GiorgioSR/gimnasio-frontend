import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Box, Typography, Alert, CircularProgress, Grid, Card, CardContent, CardActionArea, CardHeader, Paper } from '@mui/material';
import CheckoutForm from '../components/CheckoutForm';
import { getMembresias } from '../api/membresiaService';
import { realizarPago } from '../api/pagoService';
import useAuth from '../hooks/useAuth';

// Cargar Stripe con tu clave publicable desde el archivo .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

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
            setSelectedMembresia(null); // Resetear selección
        } catch (err) {
            setError(err.response?.data?.message || 'El pago falló. Por favor, intenta de nuevo.');
        }
    };

    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}><CircularProgress /></Box>;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Pagar Membresía</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <Typography variant="h6" gutterBottom>Selecciona un Plan</Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {membresias.map(m => (
                    <Grid key={m.id} xs={12} md={4}>
                        <Card
                            variant={selectedMembresia?.id === m.id ? 'elevation' : 'outlined'}
                            sx={{
                                borderColor: selectedMembresia?.id === m.id ? 'primary.main' : 'divider',
                                boxShadow: selectedMembresia?.id === m.id ? 6 : 1,
                                cursor: 'pointer',
                                backgroundColor: selectedMembresia?.id === m.id ? 'action.selected' : 'background.paper',
                                transition: 'box-shadow 0.2s',
                            }}
                            onClick={() => setSelectedMembresia(m)}
                        >
                            <CardActionArea>
                                <CardHeader
                                    title={<Typography variant="h6">{m.nombre}</Typography>}
                                    subheader={`${m.costo.toFixed(2)} BOB / ${m.duracionMeses} mes(es)`}
                                    sx={{ pb: 0 }}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {m.descripcion || 'Acceso completo al gimnasio y clases.'}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {selectedMembresia && (
                <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 2, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom>Detalles del Pago</Typography>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm 
                            onPaymentSuccess={handlePaymentSuccess}
                            onPaymentError={(err) => setError(err)}
                            paymentData={{ monto: selectedMembresia.costo }}
                        />
                    </Elements>
                </Paper>
            )}
        </Box>
    );
};

export default PagarMembresiaPage;