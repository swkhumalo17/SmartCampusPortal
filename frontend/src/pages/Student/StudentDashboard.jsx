import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaClock, FaTools, FaBell } from 'react-icons/fa';

const StudentDashboard = () => {
  const quickLinks = [
    {
      title: 'Book a Room',
      icon: <FaBook />,
      link: '/student/book-room',
      color: 'bg-indigo-500',
    },
    {
      title: 'View Timetable',
      icon: <FaClock />,
      link: '/student/timetable',
      color: 'bg-green-500',
    },
    {
      title: 'Report an Issue',
      icon: <FaTools />,
      link: '/student/report-issue',
      color: 'bg-red-500',
    },
    {
      title: 'Notifications',
      icon: <FaBell />,
      link: '/student/notifications',
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((item, index) => (
            <Link to={item.link} key={index}>
              <div className={`p-6 rounded-2xl shadow-md text-white ${item.color} hover:opacity-90 transition`}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
              </div>
            </Link>
          ))}
        </div>

        {/* Announcements */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Announcements</h2>
          <div className="bg-white rounded-xl shadow p-6 space-y-3">
            <p className="text-gray-600">📢 Campus maintenance will occur this weekend. Bookings may be affected.</p>
            <p className="text-gray-600">📢 Registration for Semester 2 opens next Monday!</p>
            <p className="text-gray-600">📢 New study rooms now available in Building B.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
