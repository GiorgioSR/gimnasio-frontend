import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <Container>
            <Typography variant="h3" sx={{ mt: 5 }}>Acceso Denegado</Typography>
            <Typography sx={{ mt: 2 }}>No tienes permiso para ver esta página.</Typography>
            <Button variant="contained" onClick={goBack} sx={{ mt: 2 }}>Volver</Button>
        </Container>
    );
}

export default Unauthorized;