import React from 'react';

const AdminManageUsers = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold">User List</h2>
        <table className="min-w-full table-auto mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">John Doe</td>
              <td className="px-4 py-2">Student</td>
              <td className="px-4 py-2">
                <button className="btn-primary">Edit</button>
                <button className="btn-outline ml-2">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">Jane Smith</td>
              <td className="px-4 py-2">Lecturer</td>
              <td className="px-4 py-2">
                <button className="btn-primary">Edit</button>
                <button className="btn-outline ml-2">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageUsers;
