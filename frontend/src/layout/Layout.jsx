import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-cream-100 to-gray-100">
   <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-yellow-500">SmartCampus</h1>
        <nav className="space-x-4 text-sm">
          <Link to="/booking">Booking</Link>
          <Link to="/timetable">Timetable</Link>
          <Link to="/login">Logout</Link>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
