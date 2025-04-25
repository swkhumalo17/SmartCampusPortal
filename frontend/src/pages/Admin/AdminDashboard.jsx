import React from 'react';
import { FaUserCog, FaChartBar, FaBuilding, FaBell, FaClipboardList } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card */}
          <div className="bg-white rounded-3xl p-6 shadow-md flex items-center gap-4 hover:shadow-lg transition">
            <FaUserCog className="text-3xl text-mint-600" />
            <div>
              <p className="text-gray-700 font-semibold">Manage Users</p>
              <p className="text-sm text-gray-500">View and control user accounts</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md flex items-center gap-4 hover:shadow-lg transition">
            <FaChartBar className="text-3xl text-mint-600" />
            <div>
              <p className="text-gray-700 font-semibold">Analytics</p>
              <p className="text-sm text-gray-500">View usage and system metrics</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md flex items-center gap-4 hover:shadow-lg transition">
            <FaBuilding className="text-3xl text-mint-600" />
            <div>
              <p className="text-gray-700 font-semibold">Room Management</p>
              <p className="text-sm text-gray-500">Add or modify room details</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md flex items-center gap-4 hover:shadow-lg transition">
            <FaClipboardList className="text-3xl text-mint-600" />
            <div>
              <p className="text-gray-700 font-semibold">Service Requests</p>
              <p className="text-sm text-gray-500">Handle campus maintenance issues</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-md flex items-center gap-4 hover:shadow-lg transition">
            <FaBell className="text-3xl text-mint-600" />
            <div>
              <p className="text-gray-700 font-semibold">Notifications</p>
              <p className="text-sm text-gray-500">Send updates to users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
