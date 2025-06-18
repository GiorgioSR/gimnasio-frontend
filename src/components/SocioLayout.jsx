import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, CssBaseline, AppBar, Toolbar, Typography, Button } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PaymentIcon from '@mui/icons-material/Payment';
import HomeIcon from '@mui/icons-material/Home';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import useAuth from '../hooks/useAuth';

const drawerWidth = 240;

const SocioLayout = () => {
    const navigate = useNavigate();
    const { auth, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const menuItems = [
        { text: 'Inicio', icon: <HomeIcon />, path: '/socio' },
        { text: 'Generar Rutina con IA', icon: <SmartToyIcon />, path: '/socio/generar-rutina' },
        { text: 'Mis Rutinas', icon: <FitnessCenterIcon />, path: '/socio/rutinas' },
        { text: 'Pagar Membresía', icon: <PaymentIcon />, path: '/socio/pagar' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Gimnasio AI - Bienvenido, {auth.nombre}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item.text} disablePadding>
                                <ListItemButton onClick={() => navigate(item.path)}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {/* Aquí se renderizará el contenido de la página del socio */}
                <Outlet />
            </Box>
        </Box>
    );
};

export default SocioLayout;