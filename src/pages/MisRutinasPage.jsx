import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Accordion, AccordionSummary, AccordionDetails, CircularProgress, Alert, ListItemText, Divider, Grid, Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useAuth from '../hooks/useAuth';
import { getMisRutinas } from '../api/rutinaService';

const MisRutinasPage = () => {
    const { auth } = useAuth();
    const [rutinas, setRutinas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchRutinas = useCallback(async () => {
        if (!auth.id || !auth.token) return;

        setIsLoading(true);
        setError('');
        try {
            const response = await getMisRutinas(auth.id, auth.token);
            setRutinas(response.data);
        } catch (err) {
            setError('No se pudieron cargar tus rutinas.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [auth.id, auth.token]);

    useEffect(() => {
        fetchRutinas();
    }, [fetchRutinas]);

    if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Mis Rutinas de Entrenamiento
            </Typography>

            {rutinas.length === 0 ? (
                <Typography>
                    Aún no tienes rutinas asignadas. ¡Ve a "Generar Rutina con IA" para crear tu primer plan!
                </Typography>
            ) : (
                rutinas.map((rutina) => (
                    <Accordion key={rutina.id} sx={{ mb: 2, backgroundColor: (theme) => theme.palette.background.paper, boxShadow: (theme) => theme.shadows[2], borderRadius: 2 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${rutina.id}-content`}
                            id={`panel${rutina.id}-header`}
                        >
                            <Typography sx={{ width: '60%', flexShrink: 0, fontWeight: 'bold' }}>{rutina.nombre}</Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{rutina.objetivo}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="subtitle2" gutterBottom>
                                Duración: {rutina.duracionSemanas} semanas
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="h6" gutterBottom>
                                Ejercicios:
                            </Typography>
                            <Grid container spacing={2}>
                                {rutina.ejercicios?.map((ejercicio) => (
                                    <Grid key={ejercicio.id} xs={12} md={6} lg={4}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, p: 1, borderRadius: 1, backgroundColor: (theme) => theme.palette.action.hover }}>
                                            <ListItemText
                                                primary={<Typography fontWeight="bold">{ejercicio.nombre}</Typography>}
                                                secondary={
                                                    <Chip label={ejercicio.grupoMuscular} color="primary" size="small" sx={{ mt: 0.5 }} />
                                                }
                                            />
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
        </Box>
    );
};

export default MisRutinasPage;