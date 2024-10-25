import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import auth from '../../services/authService';

const PrivateRoute = () => {
  return auth.isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;