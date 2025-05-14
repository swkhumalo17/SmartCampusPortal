import React from 'react';

const LecturerSchedule = () => {
  // Sample data - replace with API call later
  const schedule = [
    { id: 1, course: 'Data Structures', day: 'Monday', time: '09:00 - 11:00', room: 'Room A101' },
    { id: 2, course: 'Algorithms', day: 'Tuesday', time: '11:30 - 13:00', room: 'Room B202' },
    { id: 3, course: 'Operating Systems', day: 'Thursday', time: '14:00 - 16:00', room: 'Room C103' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Teaching Schedule</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="text-left px-4 py-2">Course</th>
              <th className="text-left px-4 py-2">Day</th>
              <th className="text-left px-4 py-2">Time</th>
              <th className="text-left px-4 py-2">Room</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((entry) => (
              <tr key={entry.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{entry.course}</td>
                <td className="px-4 py-2">{entry.day}</td>
                <td className="px-4 py-2">{entry.time}</td>
                <td className="px-4 py-2">{entry.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LecturerSchedule;
