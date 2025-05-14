import React from 'react';

const LecturerAppointments = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Student Name</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Student 1</td>
              <td className="px-4 py-2">9:00 AM</td>
              <td className="px-4 py-2">Confirmed</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Student 2</td>
              <td className="px-4 py-2">11:00 AM</td>
              <td className="px-4 py-2">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LecturerAppointments;
