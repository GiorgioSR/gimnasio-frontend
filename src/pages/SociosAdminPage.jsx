import React, { useState, useEffect, useCallback } from 'react';
import { getSocios, deleteSocio } from '../api/socioService';
import useAuth from '../hooks/useAuth';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Typography, Box, Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Nuevas importaciones
import SocioModal from '../components/SocioModal';
import ConfirmDialog from '../components/ConfirmDialog';

const SociosAdminPage = () => {
    const [socios, setSocios] = useState([]);
    const [error, setError] = useState('');
    const { auth } = useAuth();

    // Estados para manejar los modales
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedSocio, setSelectedSocio] = useState(null);

    const fetchSocios = useCallback(async () => {
        try {
            const response = await getSocios(auth.token);
            setSocios(response.data);
        } catch (err) {
            setError('No se pudieron cargar los socios.');
            console.error(err);
        }
    }, [auth.token]);

    useEffect(() => {
        if (auth.token) {
            fetchSocios();
        }
    }, [auth.token, fetchSocios]);

    // ---- Handlers para los modales ----
    const handleOpenModal = (socio) => {
        setSelectedSocio(socio);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedSocio(null);
        setIsModalOpen(false);
    };

    const handleOpenConfirm = (socio) => {
        setSelectedSocio(socio);
        setIsConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setSelectedSocio(null);
        setIsConfirmOpen(false);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedSocio) return;
        try {
            await deleteSocio(selectedSocio.id, auth.token);
            fetchSocios(); // Recargar la lista
        } catch (err) {
            setError('No se pudo eliminar el socio.');
            console.error(err);
        }
        handleCloseConfirm();
    };

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" gutterBottom>
                    Gestión de Socios
                </Typography>
                <Button variant="contained" onClick={() => handleOpenModal(null)}>
                    Añadir Nuevo Socio
                </Button>
            </Box>
            
            {error && <Alert severity="error">{error}</Alert>}
            
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Tipo de Socios</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Membresía</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {socios.map((socio) => (
                            <TableRow key={socio.id}>
                                <TableCell>{socio.nombre}</TableCell>
                                <TableCell>{socio.apellido}</TableCell>
                                <TableCell>{socio.tipoSocioNombre || 'N/A'}</TableCell>
                                <TableCell>{socio.email}</TableCell>
                                <TableCell>{socio.telefono}</TableCell>
                                <TableCell>{socio.nombreMembresia || 'N/A'}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleOpenModal(socio)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => handleOpenConfirm(socio)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <SocioModal 
                open={isModalOpen} 
                onClose={handleCloseModal} 
                socio={selectedSocio} 
                refreshSocios={fetchSocios} 
            />
            
            <ConfirmDialog
                open={isConfirmOpen}
                onClose={handleCloseConfirm}
                onConfirm={handleDeleteConfirm}
                title="Confirmar Eliminación"
                message={`¿Estás seguro de que quieres eliminar a ${selectedSocio?.nombre} ${selectedSocio?.apellido}? Esta acción no se puede deshacer.`}
            />
        </Box>
    );
};

export default SociosAdminPage;