/* eslint-disable arrow-body-style */
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Appointment from "./pages/Appointment/Appointment";
import Dashboard from "./pages/Dashboard/Dashboard";
import Doctor from "./pages/Doctor/Doctor";
import UserList from "./pages/UserList/UserList";
import Login from "./pages/Auth/Login";
import AuthenticationPublicLayout from "./layout/AuthenticationPublicLayout";
import Schedule from "./pages/Schedule/Schedule";
import ErrorPage from "./ErrorPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* NOT FOUND PAGE (404) */}
        <Route path="*" element={<ErrorPage />} />

        {/* ADMIN ROUTES  */}
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="user" element={<UserList />} />
          <Route path="doctor" element={<Doctor />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>

        {/* AUTHENTICATION RELATED ROUTES  */}
        <Route path="auth" element={<AuthenticationPublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          {/* <Route path="change-password" element={<ChangePassword />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="business-create" element={<CreateBusinessPublic />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
