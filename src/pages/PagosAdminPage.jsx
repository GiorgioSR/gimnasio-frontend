import React, { useState, useEffect, useCallback } from 'react';
import { getPagos, deletePago } from '../api/pagoService';
import useAuth from '../hooks/useAuth';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Alert, Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../components/ConfirmDialog';

// Función para dar formato a la fecha
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const PagosAdminPage = () => {
    const [pagos, setPagos] = useState([]);
    const [error, setError] = useState('');
    const { auth } = useAuth();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedPago, setSelectedPago] = useState(null);

    const fetchPagos = useCallback(async () => {
        try {
            const response = await getPagos(auth.token);
            setPagos(response.data);
        } catch (err) {
            setError('No se pudieron cargar los pagos.');
            console.error(err);
        }
    }, [auth.token]);

    useEffect(() => {
        if (auth.token) {
            fetchPagos();
        }
    }, [auth.token, fetchPagos]);

    const handleOpenConfirm = (pago) => {
        setSelectedPago(pago);
        setIsConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setSelectedPago(null);
        setIsConfirmOpen(false);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedPago) return;
        try {
            await deletePago(selectedPago.id, auth.token);
            fetchPagos(); // Recargar la lista
        } catch (err) {
            setError('No se pudo eliminar el pago.');
        }
        handleCloseConfirm();
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Historial de Pagos
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Pago</TableCell>
                            <TableCell>Socio</TableCell>
                            <TableCell>Membresía</TableCell>
                            <TableCell>Monto (BOB)</TableCell>
                            <TableCell>Fecha de Pago</TableCell>
                            <TableCell>Método</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pagos.map((pago) => (
                            <TableRow key={pago.id}>
                                <TableCell>{pago.id}</TableCell>
                                <TableCell>{pago.socioNombreCompleto}</TableCell>
                                <TableCell>{pago.membresiaNombre}</TableCell>
                                <TableCell>{pago.monto.toFixed(2)}</TableCell>
                                <TableCell>{formatDate(pago.fechaPago)}</TableCell>
                                <TableCell>
                                    <Chip label={pago.metodoPago} size="small" />
                                </TableCell>
                                <TableCell>
                                    <IconButton color="error" onClick={() => handleOpenConfirm(pago)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ConfirmDialog
                open={isConfirmOpen}
                onClose={handleCloseConfirm}
                onConfirm={handleDeleteConfirm}
                title="Confirmar Eliminación"
                message={`¿Estás seguro de que quieres eliminar el pago con ID ${selectedPago?.id}? Esta acción es para corregir errores y no se puede deshacer.`}
            />
        </Box>
    );
};

export default PagosAdminPage;