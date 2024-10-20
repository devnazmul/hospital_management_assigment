// ===========================================
// #00101
// ===========================================

import { ThemeProvider } from "@material-tailwind/react";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

axios.defaults.baseURL = `${import.meta.env.VITE_BACKEND_URL}`;
const user = JSON.parse(localStorage.getItem("userData"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
