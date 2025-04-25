import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";

// Student Pages
import StudentDashboard from "./pages/Student/StudentDashboard";
import BookingPage from "./pages/Student/BookingPage";
import TimetablePage from "./pages/Student/TimetablePage";
import ReportIssuePage from "./pages/Student/ReportIssuePage";
import NotificationsPage from "./pages/Student/NotificationsPage";

// Lecturer Pages
import LecturerDashboard from "./pages/Lecturer/LecturerDashboard";
import BookingManagement from "./pages/Lecturer/BookingManagement";
import ScheduleViewer from "./pages/Lecturer/ScheduleViewer";
import AppointmentRequests from "./pages/Lecturer/AppointmentRequests";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageUsersPage from "./pages/Admin/ManageUsersPage";
import AnalyticsPage from "./pages/Admin/AnalyticsPage";
import ServiceRequestsPage from "./pages/Admin/ServiceRequestsPage";
import RoomManagementPage from "./pages/Admin/RoomManagementPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

          {/* Student Routes */}
          <Route
            element={
              <ProtectedRoute requiredRoles={['Student']}>
                <Layout role="Student" />
              </ProtectedRoute>
            }
          >
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/bookings" element={<BookingPage />} />
            <Route path="/student/timetable" element={<TimetablePage />} />
            <Route path="/student/report" element={<ReportIssuePage />} />
            <Route path="/student/notifications" element={<NotificationsPage />} />
          </Route>

          {/* Lecturer Routes */}
          <Route
            element={
              <ProtectedRoute requiredRoles={['Lecturer']}>
                <Layout role="Lecturer" />
              </ProtectedRoute>
            }
          >
            <Route path="/lecturer/dashboard" element={<LecturerDashboard />} />
            <Route path="/lecturer/bookings" element={<BookingManagement />} />
            <Route path="/lecturer/schedule" element={<ScheduleViewer />} />
            <Route path="/lecturer/appointments" element={<AppointmentRequests />} />
          </Route>

          {/* Admin Routes */}
          <Route
            element={
              <ProtectedRoute requiredRoles={['Admin']}>
                <Layout role="Admin" />
              </ProtectedRoute>
            }
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsersPage />} />
            <Route path="/admin/analytics" element={<AnalyticsPage />} />
            <Route path="/admin/requests" element={<ServiceRequestsPage />} />
            <Route path="/admin/rooms" element={<RoomManagementPage />} />
          </Route>

          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center text-center">
                <div>
                  <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
                  <p className="text-gray-700">Page Not Found</p>
                  <a href="/login" className="text-mint-600 hover:underline mt-4 block">
                    Return to Login
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
