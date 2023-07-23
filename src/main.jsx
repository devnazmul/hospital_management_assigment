// ===========================================
// #00101
// ===========================================

import { ThemeProvider } from '@material-tailwind/react';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ErrorPage from './ErrorPage';
import './index.css';
import AdminLayout from './layout/AdminLayout';
import AuthenticationPublicLayout from './layout/AuthenticationPublicLayout';
import Appointment from './pages/Appointment/Appointment';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Doctor from './pages/Doctor/Doctor';
import Schedule from './pages/Schedule/Schedule';
import UserList from './pages/UserList/UserList';

axios.defaults.baseURL = `${import.meta.env.VITE_BASE_URL}`;
// axios.defaults.baseURL = `http://localhost:5000`;
// DECLER ALL ROUTES HERE
const user = JSON.parse(localStorage.getItem('userData'));
let router;
if (user?.role === 'assistant') {
  router = createBrowserRouter([
    {
      path: '/',
      element: <AdminLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Dashboard/>,
        }, 
        {
          path: '/appointment',
          element: <Appointment/>,
        }, 
        {
          path: '/user',
          element: <UserList/>,
        }, 
        {
          path: '/doctor',
          element: <Doctor/>,
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
      ],
    },
  ]);
} 

else if (user?.role === 'doctor') {
  router = createBrowserRouter([
    {
      path: '/',
      element: <AdminLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Appointment/>,
        }, 
        {
          path: '/schedule',
          element: <Schedule/>,
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

      ],
    },
  ]);
}else if (user?.role === 'patient') {
  router = createBrowserRouter([
    {
      path: '/',
      element: <AdminLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Appointment/>,
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
      ],
    },
  ]);
}else{
  router = createBrowserRouter([
    {
      path: '/',
      element: <AuthenticationPublicLayout />,
      children: [
        {
          path: '/',
          element: <Login />,
        },
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
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
