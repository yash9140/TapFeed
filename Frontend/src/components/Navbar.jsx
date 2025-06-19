import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ zIndex: 1201, bgcolor: 'transparent', background: 'linear-gradient(90deg, #a8e063 0%, #ffffff 50%, #a8e063 100%)', color: '#1976d2', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#1976d2' }}>
          TapFeed
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/')} sx={{ color: '#1976d2' }}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/login')} sx={{ color: '#1976d2', fontSize: '0.95rem', fontFamily: 'Montserrat, Arial, sans-serif' }}>User</Button>
          <Button color="inherit" onClick={() => navigate('/admin/login')} sx={{ color: '#1976d2', fontSize: '0.95rem', fontFamily: 'Montserrat, Arial, sans-serif' }}>Admin</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 