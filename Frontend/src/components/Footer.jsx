import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => (
  <Box component="footer" sx={{
    width: '100%',
    py: 2,
    px: 2,
    mt: 'auto',
    background: 'linear-gradient(90deg, #a8e063 0%, #ffffff 50%, #a8e063 100%)',
    textAlign: 'center',
    borderTop: '1px solid #a8e063',
    fontSize: '0.95rem',
  }}>
    <Typography variant="body2" sx={{ color: '#1976d2' }}>
      &copy; {new Date().getFullYear()} Feedback.com &nbsp;|&nbsp; 
      Contact: 00000000 &nbsp;|&nbsp; 
      Email: <Link href="mailto:feedback@gmail.com" sx={{ color: '#1976d2', textDecoration: 'underline' }}>feedback@gmail.com</Link>
    </Typography>
  </Box>
);

export default Footer; 