import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, CircularProgress, Alert, Card, CardContent, CardHeader, List, ListItem, ListItemText, Divider, ListItemIcon
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
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
        <Box>
            <Typography variant="h4" gutterBottom>
                Generador de Rutina con IA
            </Typography>
            <Typography sx={{ mb: 2 }}>
                Describe un objetivo adicional para tu entrenamiento (ej: "mejorar cardio", "enfocar en piernas", "perder grasa abdominal") y nuestra IA creará un plan para ti.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mb: 4, display: 'flex', gap: 2 }}>
                <TextField
                    label="Objetivo Adicional"
                    variant="outlined"
                    fullWidth
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value)}
                />
                <Button type="submit" variant="contained" disabled={isLoading} sx={{ minWidth: 150 }}>
                    {isLoading ? <CircularProgress size={24} /> : 'Generar Rutina'}
                </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            {rutinaGenerada && (
                <Card variant="outlined" sx={{ maxWidth: 600, mx: 'auto', mt: 4, boxShadow: (theme) => theme.shadows[4], borderRadius: 3 }}>
                    <CardHeader
                        title={<Typography variant="h6" fontWeight="bold">{rutinaGenerada.nombre}</Typography>}
                        subheader={`Duración: ${rutinaGenerada.duracionSemanas} semanas`}
                        sx={{ backgroundColor: (theme) => theme.palette.background.paper, borderTopLeftRadius: 12, borderTopRightRadius: 12, pb: 1 }}
                    />
                    <CardContent sx={{ pt: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>Objetivo Principal:</Typography>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>{rutinaGenerada.objetivo}</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle1" gutterBottom>Ejercicios Recomendados:</Typography>
                        <List>
                            {rutinaGenerada.ejercicios.map((ejercicio) => (
                                <ListItem key={ejercicio.id} sx={{ mb: 1 }}>
                                    <ListItemIcon>
                                        <FitnessCenterIcon color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={<Typography fontWeight="bold">{ejercicio.nombre}</Typography>}
                                        secondary={<Typography variant="body2" color="text.secondary">Grupo Muscular: {ejercicio.grupoMuscular}</Typography>}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default GenerarRutinaPage;