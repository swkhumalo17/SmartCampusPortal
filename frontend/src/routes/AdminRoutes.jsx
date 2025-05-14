import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../layout/Layout';

import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminManageUsers from '../pages/Admin/AdminManageUsers';
import AdminRoomManagement from '../pages/Admin/AdminRoomManagement';
import AdminRequests from '../pages/Admin/AdminRequests';
import AdminNotifications from '../pages/Admin/AdminNotifications';
import AdminProfile from '../pages/Admin/AdminProfile';
import AdminAnalytics from '../pages/Admin/AdminAnalytics';
import NotFoundPage from '../pages/NotFoundPage';

const AdminRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoute role="Admin" />}>
      <Route element={<Layout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="manage-users" element={<AdminManageUsers />} />
        <Route path="room-management" element={<AdminRoomManagement />} />
        <Route path="requests" element={<AdminRequests />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  </Routes>
);

export default AdminRoutes;
