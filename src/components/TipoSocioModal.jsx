import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box
} from '@mui/material';
import { createTipoSocio, updateTipoSocio } from '../api/tipoSocioService';
import useAuth from '../hooks/useAuth';

const TipoSocioModal = ({ open, onClose, tipo, refreshTipos }) => {
  const { auth } = useAuth();
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tipo) {
      setNombre(tipo.nombre || '');
      setDescripcion(tipo.descripcion || '');
    } else {
      setNombre('');
      setDescripcion('');
    }
    setError('');
  }, [tipo, open]);

  const handleSave = async () => {
    if (!nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }
    setLoading(true);
    setError('');
    try {
      if (tipo) {
        await updateTipoSocio(tipo.id, { nombre, descripcion }, auth.token);
      } else {
        await createTipoSocio({ nombre, descripcion }, auth.token);
      }
      refreshTipos();
      onClose();
    } catch (err) {
      setError('Error al guardar el tipo de socio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{tipo ? 'Editar Tipo de Socio' : 'Nuevo Tipo de Socio'}</DialogTitle>
      <DialogContent sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
            fullWidth
            sx={{ mb: 2 }}
            autoFocus
          />
          <TextField
            label="Descripción"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            fullWidth
            multiline
            minRows={2}
            sx={{ mb: 2 }}
          />
          {error && <Box sx={{ color: 'error.main', mb: 1 }}>{error}</Box>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>Cancelar</Button>
        <Button onClick={handleSave} variant="contained" color="primary" disabled={loading}>
          {tipo ? 'Guardar Cambios' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TipoSocioModal;
