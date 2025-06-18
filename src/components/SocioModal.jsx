import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Alert, Box, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { createSocio, updateSocio } from '../api/socioService';
import useAuth from '../hooks/useAuth';
import { getTiposSocio } from '../api/tipoSocioService';

const SocioModal = ({ open, onClose, socio, refreshSocios }) => {
    const { auth } = useAuth();
    const initialState = {
        nombre: '',
        apellido: '',
        tipoSocioId: '',
        email: '',
        password: '',
        fechaNacimiento: '',
        telefono: '',
        direccion: '',
    };
    const [formData, setFormData] = useState(initialState);
    const [tiposSocio, setTiposSocio] = useState([]);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (open) {
            getTiposSocio(auth.token)
                .then(res => setTiposSocio(res.data))
                .catch(() => setTiposSocio([]));
        }
    }, [open, auth.token]);

    useEffect(() => {
        if (socio) {
            setIsEditing(true);
            setFormData({
                nombre: socio.nombre || '',
                apellido: socio.apellido || '',
                tipoSocioId: socio.tipoSocioId || '',
                email: socio.email || '',
                password: '', // La contraseña no se precarga por seguridad
                fechaNacimiento: socio.fechaNacimiento || '',
                telefono: socio.telefono || '',
                direccion: socio.direccion || '',
            });
        } else {
            setIsEditing(false);
            setFormData(initialState);
        }
        setError('');
    }, [socio, open]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isEditing) {
            // Lógica para actualizar
            try {
                const dataToUpdate = { ...formData };
                if (!dataToUpdate.password) {
                    delete dataToUpdate.password;
                }
                await updateSocio(socio.id, dataToUpdate, auth.token);
                refreshSocios();
                onClose();
            } catch (err) {
                setError('Error al actualizar el socio.');
                console.error(err);
            }
        } else {
            // Lógica para crear
             if (!formData.password || formData.password.length < 6) {
                setError("La contraseña es obligatoria y debe tener al menos 6 caracteres.");
                return;
            }
            try {
                await createSocio(formData, auth.token);
                refreshSocios();
                onClose();
            } catch (err) {
                setError(err.response?.data?.message || 'Error al crear el socio.');
                console.error(err);
            }
        }
    };


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>{isEditing ? 'Editar Socio' : 'Añadir Nuevo Socio'}</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={6}><TextField name="nombre" label="Nombre" value={formData.nombre} onChange={handleChange} fullWidth required /></Grid>
                        <Grid xs={12} sm={6}><TextField name="apellido" label="Apellido" value={formData.apellido} onChange={handleChange} fullWidth required /></Grid>
                        <Grid xs={12}>
                            <FormControl fullWidth required sx={{ mb: 2 }}>
                                <InputLabel id="tipo-socio-label">Tipo de Socio</InputLabel>
                                <Select
                                    labelId="tipo-socio-label"
                                    name="tipoSocioId"
                                    value={formData.tipoSocioId}
                                    label="Tipo de Socio"
                                    onChange={handleChange}
                                >
                                    {tiposSocio.map((tipo) => (
                                        <MenuItem key={tipo.id} value={tipo.id}>{tipo.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
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

export default SocioModal;