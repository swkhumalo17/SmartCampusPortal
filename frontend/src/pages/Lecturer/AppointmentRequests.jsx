import React, { useState } from 'react';

const AppointmentRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, student: 'Lebo Mokoena', reason: 'Consultation on project', date: '2025-04-25', time: '10:00', status: 'Pending' },
    { id: 2, student: 'Sipho Dlamini', reason: 'Clarify assignment', date: '2025-04-26', time: '14:00', status: 'Pending' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = requests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
  };

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Appointment Requests
        </h1>

        {requests.length === 0 ? (
          <p className="text-center text-gray-600">No appointment requests.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="border border-gray-200 rounded-xl p-5 bg-mint-100 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="mb-3 md:mb-0">
                  <p className="text-gray-800 font-semibold">{req.student}</p>
                  <p className="text-sm text-gray-600">Reason: {req.reason}</p>
                  <p className="text-sm text-gray-600">
                    Date: {req.date} — Time: {req.time}
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    Status: {req.status}
                  </p>
                </div>

                {req.status === 'Pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleStatusChange(req.id, 'Approved')}
                      className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(req.id, 'Declined')}
                      className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentRequests;
