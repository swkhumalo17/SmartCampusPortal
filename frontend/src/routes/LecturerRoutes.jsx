import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../layout/Layout';

import LecturerDashboard from '../pages/Lecturer/LecturerDashboard';
import LecturerTimetable from '../pages/Lecturer/LecturerTimetable';
import LecturerRoomBooking from '../pages/Lecturer/LecturerRoomBooking';
import LecturerAppointments from '../pages/Lecturer/LecturerAppointments';
import LecturerStudents from '../pages/Lecturer/LecturerStudents';
import LecturerNotifications from '../pages/Lecturer/LecturerNotifications';
import LecturerProfile from '../pages/Lecturer/LecturerProfile';
import NotFoundPage from '../pages/NotFoundPage';

const LecturerRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoute role="Lecturer" />}>
      <Route element={<Layout />}>
        <Route path="dashboard" element={<LecturerDashboard />} />
        <Route path="timetable" element={<LecturerTimetable />} />
        <Route path="room-booking" element={<LecturerRoomBooking />} />
        <Route path="appointments" element={<LecturerAppointments />} />
        <Route path="students" element={<LecturerStudents />} />
        <Route path="notifications" element={<LecturerNotifications />} />
        <Route path="profile" element={<LecturerProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  </Routes>
);

export default LecturerRoutes;
