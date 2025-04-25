import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const RoomManagementPage = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ name: '', type: 'Study Room' });

  useEffect(() => {
    // Simulated fetch call
    setTimeout(() => {
      setRooms([
        { id: 1, name: 'Room 101', type: 'Study Room' },
        { id: 2, name: 'Lab A1', type: 'Computer Lab' },
        { id: 3, name: 'Office 3B', type: 'Lecturer Office' },
      ]);
    }, 500);
  }, []);

  const handleAddRoom = () => {
    if (newRoom.name.trim() === '') return;
    const newEntry = {
      id: rooms.length + 1,
      ...newRoom,
    };
    setRooms([...rooms, newEntry]);
    setNewRoom({ name: '', type: 'Study Room' });
  };

  const handleDelete = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Room Management
        </h1>

        {/* Add Room Form */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Room</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
              placeholder="Room Name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-mint-500"
            />
            <select
              value={newRoom.type}
              onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-mint-500"
            >
              <option>Study Room</option>
              <option>Computer Lab</option>
              <option>Lecturer Office</option>
            </select>
            <button
              onClick={handleAddRoom}
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
            >
              <FaPlus />
              Add Room
            </button>
          </div>
        </div>

        {/* Room List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-mint-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Room Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Room Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className="border-t">
                  <td className="px-6 py-4 text-gray-800">{room.name}</td>
                  <td className="px-6 py-4 text-gray-600">{room.type}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:underline mr-4">
                      <FaEdit className="inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="text-red-600 hover:underline"
                    >
                      <FaTrash className="inline" />
                    </button>
                  </td>
                </tr>
              ))}
              {rooms.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center px-6 py-6 text-gray-500">
                    No rooms available.
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

export default RoomManagementPage;
