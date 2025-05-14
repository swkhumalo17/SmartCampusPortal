import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../layout/Layout';

import StudentDashboard from '../pages/Student/StudentDashboard';
import StudentRoomBooking from '../pages/Student/StudentRoomBooking';
import StudentTimetable from '../pages/Student/StudentTimetable';
import StudentNotifications from '../pages/Student/StudentNotifications';
import StudentIssueReporting from '../pages/Student/StudentIssueReporting';
import StudentProfile from '../pages/Student/StudentProfile';
import NotFoundPage from '../pages/NotFoundPage';

const StudentRoutes = () => (
  <Routes>
    <Route element={<ProtectedRoute role="Student" />}>
      <Route element={<Layout />}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="bookings" element={<StudentRoomBooking />} />
        <Route path="timetable" element={<StudentTimetable />} />
        <Route path="notifications" element={<StudentNotifications />} />
        <Route path="issues" element={<StudentIssueReporting />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  </Routes>
);

export default StudentRoutes;
