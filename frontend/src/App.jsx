import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import BookingPage from "./pages/BookingPage";
import TimetablePage from "./pages/TimetablePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Protected Routes inside Layout */}
        <Route element={<Layout />}>
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/timetable" element={<TimetablePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
