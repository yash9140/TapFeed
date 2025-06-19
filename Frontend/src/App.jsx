import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navbar from './components/Navbar';
import FeedbackForm from './components/FeedbackForm';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import AdminDashboard from './components/AdminDashboard';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import { useAuth } from './contexts/AuthContext';
import HomeSection from './components/HomeSection';
import Footer from './components/Footer';

const Home = () => {
  const navigate = useNavigate();
  return <HomeSection onCTAClick={() => navigate('/login')} />;
};

const App = () => {
  const { isAuthenticated, userType } = useAuth();
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/feedback" element={isAuthenticated && userType === 'user' ? <FeedbackForm /> : <Navigate to="/login" />} />
          <Route path="/admin/dashboard" element={isAuthenticated && userType === 'admin' ? <AdminDashboard /> : <Navigate to="/admin/login" />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
};

export default App; 