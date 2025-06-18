import React, { useState, useEffect, useCallback } from 'react';
import { getClases, deleteClase } from '../api/claseService';
import useAuth from '../hooks/useAuth';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Typography, Box, Alert, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClaseModal from '../components/ClaseModal';
import ConfirmDialog from '../components/ConfirmDialog';

const ClasesAdminPage = () => {
    const [clases, setClases] = useState([]);
    const [error, setError] = useState('');
    const { auth } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedClase, setSelectedClase] = useState(null);

    const fetchClases = useCallback(async () => {
        try {
            const response = await getClases(auth.token);
            setClases(response.data);
        } catch (err) {
            setError('No se pudieron cargar las clases.');
        }
    }, [auth.token]);

    useEffect(() => {
        if (auth.token) {
            fetchClases();
        }
    }, [auth.token, fetchClases]);

    const handleOpenModal = (clase) => {
        setSelectedClase(clase);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedClase(null);
        setIsModalOpen(false);
    };

    const handleOpenConfirm = (clase) => {
        setSelectedClase(clase);
        setIsConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedClase) return;
        try {
            await deleteClase(selectedClase.id, auth.token);
            fetchClases();
        } catch (err) {
            setError('No se pudo eliminar la clase.');
        }
        setIsConfirmOpen(false);
        setSelectedClase(null);
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" gutterBottom>Gestión de Clases</Typography>
                <Button variant="contained" onClick={() => handleOpenModal(null)}>Añadir Nueva Clase</Button>
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Entrenador</TableCell>
                            <TableCell>Días</TableCell>
                            <TableCell>Horario</TableCell>
                            <TableCell>Capacidad</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clases.map((clase) => (
                            <TableRow key={clase.id}>
                                <TableCell>{clase.nombre}</TableCell>
                                <TableCell>{clase.entrenadorNombreCompleto}</TableCell>
                                <TableCell>{clase.dias.join(', ')}</TableCell>
                                <TableCell>{`${clase.horarioInicio} - ${clase.horarioFin}`}</TableCell>
                                <TableCell>{`${clase.cuposOcupados} / ${clase.capacidadMaxima}`}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleOpenModal(clase)}><EditIcon /></IconButton>
                                    <IconButton color="error" onClick={() => handleOpenConfirm(clase)}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ClaseModal open={isModalOpen} onClose={handleCloseModal} clase={selectedClase} refreshClases={fetchClases} />
            <ConfirmDialog
                open={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Confirmar Eliminación"
                message={`¿Estás seguro de que quieres eliminar la clase "${selectedClase?.nombre}"?`}
            />
        </Box>
    );
};

export default ClasesAdminPage;