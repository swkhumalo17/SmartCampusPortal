import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown, FiBell, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import API_ENDPOINTS from '../pages/apiEndpoints'; // Make sure you import this if using centralized API routes

const Topbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const name = auth?.fullName || 'User';
  const role = auth?.role?.toLowerCase() || 'student';
  const userId = auth?.id;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread notification count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await fetch(`${API_ENDPOINTS.GET_USER_NOTIFICATIONS}?userId=${userId}`);
        const data = await res.json();
        const unread = Array.isArray(data)
          ? data.filter((n) => !n.isRead).length
          : 0;
        setUnreadCount(unread);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    if (userId) fetchUnreadCount();
  }, [userId]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNotificationClick = () => {
    navigate(`/${role}/notifications`);
  };

  return (
    <header className="flex items-center justify-between bg-white px-4 md:px-6 py-3 border-b border-gray-200 shadow-sm">
      <h1 className="text-lg font-semibold text-gray-700 capitalize"></h1>

      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        {/* Notification Bell */}
        <button
          onClick={handleNotificationClick}
          className="relative focus:outline-none"
        >
          <FiBell className="text-gray-600 text-xl" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="https://i.pravatar.cc/36?u=user"
              alt="Profile"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="hidden md:block text-sm font-medium text-gray-700">
              {name}
            </span>
            <FiChevronDown className="text-gray-500" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg z-50 text-sm text-gray-700">
              <ul className="p-2 space-y-1">
                <li
                  onClick={() => {
                    navigate(`/${role}/profile`);
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <FiUser /> Profile
                </li>
                <li
                  onClick={() => {
                    navigate(`/${role}/settings`);
                    setDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <FiSettings /> Settings
                </li>
                <hr className="my-1 border-gray-200" />
                <li
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                >
                  <FiLogOut /> Log out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
