import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TipoSocioModal from '../components/TipoSocioModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { getTiposSocio, deleteTipoSocio } from '../api/tipoSocioService';
import useAuth from '../hooks/useAuth';

const TiposSocioAdminPage = () => {
  const { auth } = useAuth();
  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tipoToDelete, setTipoToDelete] = useState(null);
  const [error, setError] = useState('');

  const fetchTipos = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getTiposSocio(auth.token);
      setTipos(res.data);
    } catch (err) {
      setError('No se pudieron cargar los tipos de socio.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipos();
    // eslint-disable-next-line
  }, []);

  const handleEdit = (tipo) => {
    setSelectedTipo(tipo);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteTipoSocio(tipoToDelete.id, auth.token);
      fetchTipos();
    } catch {
      setError('No se pudo eliminar el tipo de socio.');
    } finally {
      setConfirmOpen(false);
      setTipoToDelete(null);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Gestión de Tipos de Socio</Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ mb: 3 }}
        onClick={() => { setSelectedTipo(null); setModalOpen(true); }}
      >
        Añadir Nuevo Tipo
      </Button>
      {error && <Box sx={{ color: 'error.main', mb: 2 }}>{error}</Box>}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tipos.map((tipo) => (
                <TableRow key={tipo.id}>
                  <TableCell>{tipo.nombre}</TableCell>
                  <TableCell>{tipo.descripcion}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleEdit(tipo)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => { setTipoToDelete(tipo); setConfirmOpen(true); }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <TipoSocioModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tipo={selectedTipo}
        refreshTipos={fetchTipos}
      />
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="¿Eliminar tipo de socio?"
        content={`¿Estás seguro de que deseas eliminar el tipo "${tipoToDelete?.nombre}"?`}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default TiposSocioAdminPage;
