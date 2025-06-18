import React, { useState, useEffect, useCallback } from 'react';
import { getEntrenadores, deleteEntrenador } from '../api/entrenadorService';
import useAuth from '../hooks/useAuth';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Typography, Box, Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EntrenadorModal from '../components/EntrenadorModal';
import ConfirmDialog from '../components/ConfirmDialog';

const EntrenadoresAdminPage = () => {
    const [entrenadores, setEntrenadores] = useState([]);
    const [error, setError] = useState('');
    const { auth } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedEntrenador, setSelectedEntrenador] = useState(null);

    const fetchEntrenadores = useCallback(async () => {
        try {
            const response = await getEntrenadores(auth.token);
            setEntrenadores(response.data);
        } catch (err) {
            setError('No se pudieron cargar los entrenadores.');
        }
    }, [auth.token]);

    useEffect(() => {
        if (auth.token) {
            fetchEntrenadores();
        }
    }, [auth.token, fetchEntrenadores]);

    const handleOpenModal = (entrenador) => {
        setSelectedEntrenador(entrenador);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedEntrenador(null);
        setIsModalOpen(false);
    };

    const handleOpenConfirm = (entrenador) => {
        setSelectedEntrenador(entrenador);
        setIsConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setSelectedEntrenador(null);
        setIsConfirmOpen(false);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedEntrenador) return;
        try {
            await deleteEntrenador(selectedEntrenador.id, auth.token);
            fetchEntrenadores();
        } catch (err) {
            setError('No se pudo eliminar el entrenador.');
        }
        handleCloseConfirm();
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" gutterBottom>
                    Gestión de Entrenadores
                </Typography>
                <Button variant="contained" onClick={() => handleOpenModal(null)}>
                    Añadir Nuevo Entrenador
                </Button>
            </Box>

            {error && <Alert severity="error">{error}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre Completo</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {entrenadores.map((entrenador) => (
                            <TableRow key={entrenador.id}>
                                <TableCell>{entrenador.nombre} {entrenador.apellido}</TableCell>
                                <TableCell>{entrenador.email}</TableCell>
                                <TableCell>{entrenador.telefono || 'N/A'}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleOpenModal(entrenador)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleOpenConfirm(entrenador)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <EntrenadorModal
                open={isModalOpen}
                onClose={handleCloseModal}
                entrenador={selectedEntrenador}
                refreshEntrenadores={fetchEntrenadores}
            />

            <ConfirmDialog
                open={isConfirmOpen}
                onClose={handleCloseConfirm}
                onConfirm={handleDeleteConfirm}
                title="Confirmar Eliminación"
                message={`¿Estás seguro de que quieres eliminar a ${selectedEntrenador?.nombre} ${selectedEntrenador?.apellido}?`}
            />
        </Box>
    );
};

export default EntrenadoresAdminPage;