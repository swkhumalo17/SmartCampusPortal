import React, { useEffect, useState } from 'react';
import { FaUsers, FaDoorOpen, FaTools, FaChartBar } from 'react-icons/fa';

const AnalyticsPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalIssues: 0,
    mostBookedRoom: 'Computer Lab 1',
  });

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setStats({
        totalUsers: 256,
        totalBookings: 482,
        totalIssues: 39,
        mostBookedRoom: 'Study Room 2',
      });
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">Admin Analytics</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <FaUsers className="text-3xl text-mint-600" />
            <div>
              <h2 className="text-sm text-gray-500">Total Users</h2>
              <p className="text-xl font-bold text-gray-800">{stats.totalUsers}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <FaDoorOpen className="text-3xl text-mint-600" />
            <div>
              <h2 className="text-sm text-gray-500">Total Bookings</h2>
              <p className="text-xl font-bold text-gray-800">{stats.totalBookings}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <FaTools className="text-3xl text-mint-600" />
            <div>
              <h2 className="text-sm text-gray-500">Maintenance Issues</h2>
              <p className="text-xl font-bold text-gray-800">{stats.totalIssues}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
            <FaChartBar className="text-3xl text-mint-600" />
            <div>
              <h2 className="text-sm text-gray-500">Most Booked Room</h2>
              <p className="text-xl font-bold text-gray-800">{stats.mostBookedRoom}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
