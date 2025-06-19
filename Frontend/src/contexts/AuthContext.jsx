import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    if (storedToken && storedUserType) {
      setToken(storedToken);
      setUserType(storedUserType);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password, type) => {
    try {
      const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const endpoint = type === 'admin' ? '/api/admin/login' : '/api/users/login';
      
      const response = await axios.post(`${baseURL}${endpoint}`, {
        email,
        password
      });

      const { token: newToken } = response.data;
      localStorage.setItem('token', newToken);
      localStorage.setItem('userType', type);
      setToken(newToken);
      setUserType(type);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setToken(null);
    setUserType(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    token,
    userType,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 