import React from 'react';

const ScheduleViewer = () => {
  const schedule = [
    { id: 1, subject: 'Software Engineering', room: 'Room 203', day: 'Monday', time: '09:00 - 11:00' },
    { id: 2, subject: 'Database Systems', room: 'Lab A', day: 'Wednesday', time: '13:00 - 15:00' },
    { id: 3, subject: 'AI & Machine Learning', room: 'Room 105', day: 'Friday', time: '10:00 - 12:00' },
  ];

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Weekly Teaching Schedule
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm">
            <thead>
              <tr className="bg-mint-100 text-gray-700">
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Room</th>
                <th className="px-4 py-2 text-left">Day</th>
                <th className="px-4 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item) => (
                <tr key={item.id} className="border-t text-gray-800">
                  <td className="px-4 py-3">{item.subject}</td>
                  <td className="px-4 py-3">{item.room}</td>
                  <td className="px-4 py-3">{item.day}</td>
                  <td className="px-4 py-3">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {schedule.length === 0 && (
            <p className="text-center text-gray-600 mt-6">No schedule available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleViewer;
