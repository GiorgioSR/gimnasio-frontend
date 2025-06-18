import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { 
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  CssBaseline, AppBar, Toolbar, Typography, Button, Avatar, Chip, Fade
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import SportsIcon from '@mui/icons-material/Sports';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CategoryIcon from '@mui/icons-material/Category';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../hooks/useAuth';

const drawerWidth = 280;

const AdminLayout = () => {
    const navigate = useNavigate();
    const { auth, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const menuItems = [
        { text: 'Dashboard', icon: <AdminPanelSettingsIcon />, path: '/admin', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
        { text: 'Socios', icon: <PeopleIcon />, path: '/admin/socios', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
        { text: 'Entrenadores', icon: <SportsIcon />, path: '/admin/entrenadores', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
        { text: 'Clases', icon: <EventNoteIcon />, path: '/admin/clases', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
        { text: 'Pagos', icon: <PaymentIcon />, path: '/admin/pagos', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
        { text: 'Tipos de Socio', icon: <CategoryIcon />, path: '/admin/tipos-socio', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar 
                position="fixed" 
                sx={{ 
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backdropFilter: 'blur(20px)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                            sx={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                width: 40,
                                height: 40,
                                fontWeight: 'bold'
                            }}
                        >
                            A
                        </Avatar>
                        <Box>
                            <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#1e293b' }}>
                                Panel Administrativo
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748b' }}>
                                Gestión completa del gimnasio
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip 
                            label="Administrador" 
                            size="small" 
                            sx={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                fontWeight: 600
                            }} 
                        />
                        <Button 
                            color="inherit" 
                            onClick={handleLogout}
                            startIcon={<LogoutIcon />}
                            sx={{ 
                                color: '#64748b',
                                '&:hover': {
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    color: '#dc2626'
                                }
                            }}
                        >
                            Cerrar Sesión
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { 
                        width: drawerWidth, 
                        boxSizing: 'border-box',
                        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', pt: 2 }}>
                    <List sx={{ px: 2 }}>
                        {menuItems.map((item, index) => (
                            <Fade in={true} timeout={300 + index * 100} key={item.text}>
                                <ListItem disablePadding sx={{ mb: 1 }}>
                                    <ListItemButton 
                                        onClick={() => navigate(item.path)}
                                        sx={{
                                            borderRadius: 3,
                                            py: 1.5,
                                            px: 2,
                                            '&:hover': {
                                                background: item.gradient,
                                                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                                                    color: 'white',
                                                },
                                                transform: 'translateX(8px) scale(1.02)',
                                            },
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 40, color: '#64748b' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={item.text} 
                                            primaryTypographyProps={{
                                                fontWeight: 600,
                                                fontSize: '0.95rem'
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            </Fade>
                        ))}
                    </List>
                </Box>
            </Drawer>
            
            <Box component="main" sx={{ flexGrow: 1, p: 4, backgroundColor: '#f8fafc' }}>
                <Toolbar />
                <Fade in={true} timeout={500}>
                    <Box>
                        <Outlet />
                    </Box>
                </Fade>
            </Box>
        </Box>
    );
};

export default AdminLayout;