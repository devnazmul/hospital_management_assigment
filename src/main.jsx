// ===========================================
// #00101
// ===========================================

import { ThemeProvider } from '@material-tailwind/react';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { InvoiceProvider } from './context/InvoiceContext';
import ErrorPage from './ErrorPage';
import './index.css';
import AdminLayout from './layout/AdminLayout';
import AuthenticationPublicLayout from './layout/AuthenticationPublicLayout';
import AppointmentForAssistant from './pages/Assistant/Appointment/AppointmentForAssistant';
import CreateAppointment from './pages/Assistant/Appointment/CreateAppointment';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import Dashboard from './pages/Dashboard/Dashboard';

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}/api/v1.0`;
// DECLER ALL ROUTES HERE
const user_role = JSON.parse(localStorage.getItem('userData'));
let router;
if (user_role === 'assistant') {
  router = createBrowserRouter([
    {
      path: '/',
      element: <AdminLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <AppointmentForAssistant/>,
        }, 
        {
          path: '/',
          element: <CreateAppointment/>,
        }, 
      ],
    },
    {
      path: '/auth',
      element: <AuthenticationPublicLayout />,
      children: [
        {
          path: '/auth',
          element: <Login />,
        },
        {
          path: '/auth/login',
          element: <Login />,
        },
        {
          path: '/auth/registration',
          element: <Registration />,
        },
      ],
    },
  ]);
} else {
  router = createBrowserRouter([
    {
      path: '/',
      element: <AdminLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
        }
      ],
    },
    {
      path: '/auth',
      element: <AuthenticationPublicLayout />,
      children: [
        {
          path: '/auth',
          element: <Login />,
        },
        {
          path: '/auth/login',
          element: <Login />,
        },
      ],
    },
  ]);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <InvoiceProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </InvoiceProvider>
    </ThemeProvider>
  </React.StrictMode>
);
