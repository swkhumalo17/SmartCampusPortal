import React, { useState, useEffect } from 'react';
import { FaTools, FaCheck, FaClock } from 'react-icons/fa';

const ServiceRequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRequests([
        {
          id: 1,
          title: 'Projector not working in Room 201',
          status: 'Pending',
          submittedBy: 'student123@tut4life.ac.za',
          date: '2025-04-21',
        },
        {
          id: 2,
          title: 'Broken chair in Study Room 3',
          status: 'Resolved',
          submittedBy: 'lecturer456@tut.ac.za',
          date: '2025-04-20',
        },
      ]);
    }, 800);
  }, []);

  const statusColor = (status) => {
    return status === 'Pending' ? 'text-yellow-600' : 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Service Requests</h1>

        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-mint-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Issue</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Submitted By</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-t">
                  <td className="px-6 py-4 text-gray-800">{req.title}</td>
                  <td className={`px-6 py-4 font-semibold ${statusColor(req.status)}`}>
                    {req.status === 'Pending' ? <FaClock className="inline mr-1" /> : <FaCheck className="inline mr-1" />}
                    {req.status}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{req.submittedBy}</td>
                  <td className="px-6 py-4 text-gray-700">{req.date}</td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-6 text-center text-gray-500">
                    Loading requests...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestsPage;
