import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";

import AdminRoutes from "./routes/AdminRoutes";
import LecturerRoutes from "./routes/LecturerRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import NotFoundPage from "./pages/NotFoundPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Protected Role-Based Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/lecturer/*" element={<LecturerRoutes />} />
      <Route path="/student/*" element={<StudentRoutes />} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

    <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
