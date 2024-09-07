import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on app startup
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Register user
  const register = async (data) => {
    try {
      const response = await api.post('/register', data);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // Login user
  const login = async (data) => {
    try {
      const response = await api.post('/login', data);
      if(response.data.user){
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('access_token', JSON.stringify(response.data.access_token));
        setUser(response.data.user);
      }
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Logout user
  const logout = async (user) => {
    try {
      await api.post('/logout', user);
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
