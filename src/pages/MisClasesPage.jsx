import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, CircularProgress, Alert, Grid, Card, CardContent, CardActions, Button
} from '@mui/material';
import useAuth from '../hooks/useAuth';
import { getClasesPorEntrenador } from '../api/claseService';
import InscritosModal from '../components/InscritosModal';

const MisClasesPage = () => {
    const { auth } = useAuth();
    const [clases, setClases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClase, setSelectedClase] = useState(null);

    const fetchClases = useCallback(async () => {
        if (!auth.id || !auth.token) return;

        setIsLoading(true);
        setError('');
        try {
            const response = await getClasesPorEntrenador(auth.id, auth.token);
            setClases(response.data);
        } catch (err) {
            setError('No se pudieron cargar tus clases.');
        } finally {
            setIsLoading(false);
        }
    }, [auth.id, auth.token]);

    useEffect(() => {
        fetchClases();
    }, [fetchClases]);

    const handleOpenModal = (clase) => {
        setSelectedClase(clase);
        setIsModalOpen(true);
    };

    if (isLoading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Mis Clases</Typography>
            {clases.length === 0 ? (
                <Typography>No tienes ninguna clase asignada.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {clases.map(clase => (
                        <Grid item key={clase.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">{clase.nombre}</Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {clase.dias.join(', ')} - {clase.horarioInicio} a {clase.horarioFin}
                                    </Typography>
                                    <Typography variant="body2">
                                        Capacidad: {clase.cuposOcupados} / {clase.capacidadMaxima}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleOpenModal(clase)}>Ver Inscritos</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            {selectedClase && (
                <InscritosModal 
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    clase={selectedClase}
                />
            )}
        </Box>
    );
};

export default MisClasesPage;