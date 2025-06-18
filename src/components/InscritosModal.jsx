import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, CircularProgress, Alert
} from '@mui/material';
import { getSociosInscritos } from '../api/claseService';
import useAuth from '../hooks/useAuth';

const InscritosModal = ({ open, onClose, clase }) => {
    const { auth } = useAuth();
    const [inscritos, setInscritos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (open && clase) {
            const fetchInscritos = async () => {
                setIsLoading(true);
                setError('');
                try {
                    const response = await getSociosInscritos(clase.id, auth.token);
                    setInscritos(response.data);
                } catch (err) {
                    setError('No se pudieron cargar los socios inscritos.');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchInscritos();
        }
    }, [open, clase, auth.token]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>Socios Inscritos en "{clase?.nombre}"</DialogTitle>
            <DialogContent>
                {isLoading && <CircularProgress />}
                {error && <Alert severity="error">{error}</Alert>}
                {!isLoading && !error && (
                    <List dense>
                        {inscritos.length > 0 ? (
                            inscritos.map(socio => (
                                <ListItem key={socio.id}>
                                    <ListItemText primary={`${socio.nombre} ${socio.apellido}`} secondary={socio.email} />
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="No hay socios inscritos en esta clase." />
                            </ListItem>
                        )}
                    </List>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default InscritosModal;