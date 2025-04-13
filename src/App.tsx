import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store/store';
import SignupForm from './components/SignupForm';
<<<<<<< HEAD
import LoginForm from './components/LoginForm';
import ForgotPassword from './components/ForgotPassword';
=======
>>>>>>> 050b2f1c7ddc205d38880608208a8537f275b0b6
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
<<<<<<< HEAD
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />
      } />
      <Route path="/forgot-password" element={
        isAuthenticated ? <Navigate to="/dashboard" /> : <ForgotPassword />
      } />
=======
>>>>>>> 050b2f1c7ddc205d38880608208a8537f275b0b6
      <Route path="/dashboard/*" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
<<<<<<< HEAD
      <Route path="/" element={<Navigate to="/login" />} />
=======
      <Route path="/" element={<Navigate to="/signup" />} />
>>>>>>> 050b2f1c7ddc205d38880608208a8537f275b0b6
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