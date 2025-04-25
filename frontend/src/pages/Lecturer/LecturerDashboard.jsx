import React from 'react';
import { Link } from 'react-router-dom';

const LecturerDashboard = () => {
  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome, Lecturer
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/lecturer/bookings"
            className="bg-mint-100 hover:bg-mint-200 text-gray-800 p-6 rounded-xl shadow transition"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Room Bookings</h2>
            <p className="text-sm text-gray-600">
              View and manage your booked rooms and labs.
            </p>
          </Link>

          <Link
            to="/lecturer/schedule"
            className="bg-mint-100 hover:bg-mint-200 text-gray-800 p-6 rounded-xl shadow transition"
          >
            <h2 className="text-xl font-semibold mb-2">View Schedule</h2>
            <p className="text-sm text-gray-600">
              See your current teaching timetable and class sessions.
            </p>
          </Link>

          <Link
            to="/lecturer/appointments"
            className="bg-mint-100 hover:bg-mint-200 text-gray-800 p-6 rounded-xl shadow transition"
          >
            <h2 className="text-xl font-semibold mb-2">Appointment Requests</h2>
            <p className="text-sm text-gray-600">
              Approve or decline appointment requests from students.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;
