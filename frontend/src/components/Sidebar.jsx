import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBook,
  FaCalendarAlt,
  FaTools,
  FaBell,
  FaUserCog,
  FaChartBar,
  FaDoorOpen,
} from 'react-icons/fa';

const Sidebar = ({ role }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  const baseClass = "flex items-center gap-3 px-4 py-2 rounded-md transition";
  const activeClass = "bg-mint-200 text-gray-900 font-semibold";
  const inactiveClass = "text-gray-700 hover:bg-mint-100";

  const menu = {
    Student: [
      { label: 'Dashboard', icon: <FaHome />, path: '/student/dashboard' },
      { label: 'Bookings', icon: <FaBook />, path: '/student/bookings' },
      { label: 'Timetable', icon: <FaCalendarAlt />, path: '/student/timetable' },
      { label: 'Report Issue', icon: <FaTools />, path: '/student/report' },
      { label: 'Notifications', icon: <FaBell />, path: '/student/notifications' },
    ],
    Lecturer: [
      { label: 'Dashboard', icon: <FaHome />, path: '/lecturer/dashboard' },
      { label: 'Manage Bookings', icon: <FaBook />, path: '/lecturer/bookings' },
      { label: 'Schedule', icon: <FaCalendarAlt />, path: '/lecturer/schedule' },
      { label: 'Appointments', icon: <FaDoorOpen />, path: '/lecturer/appointments' },
    ],
    Admin: [
      { label: 'Dashboard', icon: <FaHome />, path: '/admin/dashboard' },
      { label: 'Manage Users', icon: <FaUserCog />, path: '/admin/users' },
      { label: 'Analytics', icon: <FaChartBar />, path: '/admin/analytics' },
      { label: 'Requests', icon: <FaTools />, path: '/admin/requests' },
      { label: 'Room Management', icon: <FaDoorOpen />, path: '/admin/rooms' },
    ],
  };

  return (
    <aside className="w-64 bg-white h-full border-r border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">SmartCampus</h2>
      <nav className="space-y-2">
        {menu[role]?.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${baseClass} ${
              isActive(item.path) ? activeClass : inactiveClass
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
