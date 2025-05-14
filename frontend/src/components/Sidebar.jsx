import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiCalendar,
  FiTool,
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiBookOpen,
  FiBell,
  FiClipboard,
} from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role || 'Student';

  const navItems = {
    Student: [
      { name: 'Dashboard', path: '/student/dashboard', icon: <FiHome /> },
      { name: 'Timetable', path: '/student/timetable', icon: <FiCalendar /> },
      { name: 'Bookings', path: '/student/bookings', icon: <FiBookOpen /> },
      { name: 'Issues', path: '/student/issues', icon: <FiTool /> },
      { name: 'Notifications', path: '/student/notifications', icon: <FiBell /> },
    ],
    Lecturer: [
      { name: 'Dashboard', path: '/lecturer/dashboard', icon: <FiHome /> },
      { name: 'My Classes', path: '/lecturer/classes', icon: <FiClipboard /> },
      { name: 'Bookings', path: '/lecturer/bookings', icon: <FiBookOpen /> },
      { name: 'Issues', path: '/lecturer/issues', icon: <FiTool /> },
      { name: 'Notifications', path: '/lecturer/notifications', icon: <FiBell /> },
    ],
    Admin: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: <FiHome /> },
      { name: 'User Management', path: '/admin/users', icon: <FiUsers /> },
      { name: 'Analytics', path: '/admin/analytics', icon: <FiClipboard /> },
      { name: 'Maintenance', path: '/admin/maintenance', icon: <FiTool /> },
      { name: 'Notifications', path: '/admin/notifications', icon: <FiBell /> },
    ],
  };

  const otherItems = [
    { name: 'Settings', path: `/${role.toLowerCase()}/settings`, icon: <FiSettings /> },
    { name: 'Help', path: `/${role.toLowerCase()}/help`, icon: <FiHelpCircle /> },
  ];

  return (
    <aside className="w-65 h-full bg-white border-r border-gray-200 shadow-sm hidden md:flex flex-col">
      <div className="px-4 py-3 border-b border-gray-100 flex justify-center">
  <img
    src="/TransparentLogo.png"
    alt="Smart Campus Logo"
    className="h-[90px] w-[90px]"
  />
</div>

      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">Main</p>
          {navItems[role]?.map(({ name, path, icon }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {icon}
              <span>{name}</span>
            </NavLink>
          ))}
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">Other</p>
          {otherItems.map(({ name, path, icon }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-green-100 text-green-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {icon}
              <span>{name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
