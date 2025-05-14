import React from 'react';

const LecturerStudents = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Students</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Student Name</th>
              <th className="px-4 py-2 border">Student ID</th>
              <th className="px-4 py-2 border">Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">John Doe</td>
              <td className="px-4 py-2">S12345</td>
              <td className="px-4 py-2">johndoe@example.com</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Jane Smith</td>
              <td className="px-4 py-2">S67890</td>
              <td className="px-4 py-2">janesmith@example.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LecturerStudents;
