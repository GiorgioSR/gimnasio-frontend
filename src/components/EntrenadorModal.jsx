import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Alert, Box
} from '@mui/material';
import { createEntrenador, updateEntrenador } from '../api/entrenadorService';
import useAuth from '../hooks/useAuth';

const EntrenadorModal = ({ open, onClose, entrenador, refreshEntrenadores }) => {
    const { auth } = useAuth();
    // Estado inicial simplificado, sin los campos de perfil
    const initialState = {
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        fechaNacimiento: '',
        telefono: '',
        direccion: '',
    };

    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (entrenador) {
            setIsEditing(true);
            setFormData({
                nombre: entrenador.nombre || '',
                apellido: entrenador.apellido || '',
                email: entrenador.email || '',
                password: '',
                fechaNacimiento: entrenador.fechaNacimiento || '',
                telefono: entrenador.telefono || '',
                direccion: entrenador.direccion || '',
            });
        } else {
            setIsEditing(false);
            setFormData(initialState);
        }
        setError('');
    }, [entrenador, open]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isEditing) {
                const dataToUpdate = { ...formData };
                if (!dataToUpdate.password) delete dataToUpdate.password;
                await updateEntrenador(entrenador.id, dataToUpdate, auth.token);
            } else {
                if (!formData.password || formData.password.length < 6) {
                    setError("La contraseña es obligatoria y debe tener al menos 6 caracteres.");
                    return;
                }
                await createEntrenador(formData, auth.token);
            }
            refreshEntrenadores();
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Ocurrió un error. Intente de nuevo.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditing ? 'Editar Entrenador' : 'Añadir Nuevo Entrenador'}</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={6}><TextField name="nombre" label="Nombre" value={formData.nombre} onChange={handleChange} fullWidth required /></Grid>
                        <Grid xs={12} sm={6}><TextField name="apellido" label="Apellido" value={formData.apellido} onChange={handleChange} fullWidth required /></Grid>
                        <Grid xs={12}><TextField name="email" label="Correo Electrónico" type="email" value={formData.email} onChange={handleChange} fullWidth required disabled={isEditing} /></Grid>
                        <Grid xs={12}><TextField name="password" label={isEditing ? "Nueva Contraseña (Opcional)" : "Contraseña"} type="password" value={formData.password} onChange={handleChange} fullWidth required={!isEditing} /></Grid>
                        <Grid xs={12} sm={6}><TextField name="fechaNacimiento" label="Fecha de Nacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} /></Grid>
                        <Grid xs={12} sm={6}><TextField name="telefono" label="Teléfono" value={formData.telefono} onChange={handleChange} fullWidth /></Grid>
                        <Grid xs={12}><TextField name="direccion" label="Dirección" value={formData.direccion} onChange={handleChange} fullWidth /></Grid>
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

export default EntrenadorModal;