import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaTrash } from 'react-icons/fa';

const dummyUsers = [
  { id: 1, name: 'Lerato Mokoena', email: 'lerato@tut4life.ac.za', role: 'Student' },
  { id: 2, name: 'Thabo Nkosi', email: 'thabo@tut4life.ac.za', role: 'Lecturer' },
  { id: 3, name: 'Admin User', email: 'admin@tut4life.ac.za', role: 'Admin' },
];

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setUsers(dummyUsers);
    }, 500);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (confirm) {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Manage Users</h1>

        <div className="bg-white shadow-md rounded-3xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-mint-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.role}</td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button className="text-mint-600 hover:text-mint-800">
                      <FaUserEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-6">
                    No users found.
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

export default ManageUsersPage;
