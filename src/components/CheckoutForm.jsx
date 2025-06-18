import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, CircularProgress, Alert } from '@mui/material';

const CheckoutForm = ({ onPaymentSuccess, onPaymentError, paymentData }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            onPaymentError("Stripe no se ha cargado correctamente.");
            setIsLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            onPaymentError(error.message);
            setIsLoading(false);
        } else {
            // Llama a la función del padre con el ID del método de pago
            onPaymentSuccess(paymentMethod.id);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 2 }}>
                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </Box>
            <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!stripe || isLoading}
                sx={{ mt: 3 }}
            >
                {isLoading ? <CircularProgress size={24} /> : `Pagar ${paymentData.monto.toFixed(2)} BOB`}
            </Button>
        </form>
    );
};

export default CheckoutForm;