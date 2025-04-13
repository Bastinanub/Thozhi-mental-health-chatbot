import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store/store';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function AppRoutes() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/signup" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <SignupForm />
      } />
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />
      } />
      <Route path="/forgot-password" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <ForgotPassword />
      } />
      <Route path="/dashboard/*" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/" element={<Navigate to="/signup" />} />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;