import React from 'react';

const BookingManagement = () => {
  const bookings = [
    {
      id: 1,
      room: 'Computer Lab 3',
      date: '2025-04-25',
      time: '10:00 - 12:00',
      status: 'Approved',
    },
    {
      id: 2,
      room: 'Study Room 2A',
      date: '2025-04-26',
      time: '13:00 - 14:30',
      status: 'Pending',
    },
  ];

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Manage Bookings
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-mint-100 text-gray-700 text-sm">
                <th className="px-4 py-2 text-left">Room</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t text-sm text-gray-800">
                  <td className="px-4 py-3">{booking.room}</td>
                  <td className="px-4 py-3">{booking.date}</td>
                  <td className="px-4 py-3">{booking.time}</td>
                  <td className="px-4 py-3">{booking.status}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button className="bg-gray-900 text-white text-xs px-3 py-1 rounded hover:bg-gray-800">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {bookings.length === 0 && (
            <p className="text-center text-gray-600 mt-6">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
