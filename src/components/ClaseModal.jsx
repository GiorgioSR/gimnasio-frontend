import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Alert, Box, Select, MenuItem, InputLabel, FormControl, OutlinedInput, Chip
} from '@mui/material';
import { getEntrenadores } from '../api/entrenadorService';
import { createClase, updateClase } from '../api/claseService';
import useAuth from '../hooks/useAuth';

const DIAS_SEMANA = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];

const ClaseModal = ({ open, onClose, clase, refreshClases }) => {
    const { auth } = useAuth();
    const initialState = {
        nombre: '',
        descripcion: '',
        entrenadorId: '',
        capacidadMaxima: 10,
        dias: [],
        horarioInicio: '08:00',
        horarioFin: '09:00',
    };

    const [formData, setFormData] = useState(initialState);
    const [entrenadores, setEntrenadores] = useState([]);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Cargar la lista de entrenadores cuando el modal se abre
        if (open) {
            const fetchEntrenadores = async () => {
                try {
                    const response = await getEntrenadores(auth.token);
                    setEntrenadores(response.data);
                } catch (err) {
                    setError('No se pudo cargar la lista de entrenadores.');
                }
            };
            fetchEntrenadores();
        }

        if (clase) {
            setIsEditing(true);
            setFormData({ ...clase });
        } else {
            setIsEditing(false);
            setFormData(initialState);
        }
        setError('');
    }, [clase, open, auth.token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDiasChange = (event) => {
        const { target: { value } } = event;
        setFormData({
          ...formData,
          dias: typeof value === 'string' ? value.split(',') : value,
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isEditing) {
                await updateClase(clase.id, formData, auth.token);
            } else {
                await createClase(formData, auth.token);
            }
            refreshClases();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al guardar la clase.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditing ? 'Editar Clase' : 'Añadir Nueva Clase'}</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}><TextField name="nombre" label="Nombre de la Clase" value={formData.nombre} onChange={handleChange} fullWidth required /></Grid>
                        <Grid item xs={12}><TextField name="descripcion" label="Descripción" multiline rows={3} value={formData.descripcion} onChange={handleChange} fullWidth /></Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="entrenador-select-label">Entrenador</InputLabel>
                                <Select labelId="entrenador-select-label" name="entrenadorId" value={formData.entrenadorId} label="Entrenador" onChange={handleChange} required>
                                    {entrenadores.map(e => <MenuItem key={e.id} value={e.id}>{e.nombre} {e.apellido}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}><TextField name="capacidadMaxima" label="Capacidad Máxima" type="number" value={formData.capacidadMaxima} onChange={handleChange} fullWidth required /></Grid>
                        <Grid item xs={12} sm={6}><TextField name="horarioInicio" label="Hora de Inicio" type="time" value={formData.horarioInicio} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required /></Grid>
                        <Grid item xs={12} sm={6}><TextField name="horarioFin" label="Hora de Fin" type="time" value={formData.horarioFin} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} required /></Grid>
                        <Grid item xs={12}>
                             <FormControl fullWidth>
                                <InputLabel id="dias-select-label">Días de la Semana</InputLabel>
                                <Select
                                    labelId="dias-select-label"
                                    multiple
                                    name="dias"
                                    value={formData.dias}
                                    onChange={handleDiasChange}
                                    input={<OutlinedInput label="Días de la Semana" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => <Chip key={value} label={value} />)}
                                        </Box>
                                    )}
                                >
                                    {DIAS_SEMANA.map((dia) => <MenuItem key={dia} value={dia}>{dia}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ClaseModal;