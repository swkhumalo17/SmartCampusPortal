import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash } from 'react-icons/fa';
import API_ENDPOINTS from '../apiEndpoints';

const AdminRoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({ name: '', type: 'Study Room' });
  const [loading, setLoading] = useState(false);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.AVAILABLE_ROOMS);
      setRooms(response.data);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async () => {
    if (newRoom.name.trim() === '') return;
    try {
      await axios.post(API_ENDPOINTS.BOOK_ROOM, newRoom);
      fetchRooms(); // refresh
      setNewRoom({ name: '', type: 'Study Room' });
    } catch (error) {
      console.error('Failed to add room:', error);
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      await axios.delete(API_ENDPOINTS.CANCEL_BOOKING(id));
      fetchRooms();
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Room Management</h1>

        {/* Add Room */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Room</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              value={newRoom.name}
              onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
              placeholder="Room Name"
              className="input-field flex-1"
            />
            <select
              value={newRoom.type}
              onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
              className="input-field"
            >
              <option>Study Room</option>
              <option>Computer Lab</option>
              <option>Lecturer Office</option>
            </select>
            <button onClick={handleAddRoom} className="btn-primary flex items-center gap-2">
              <FaPlus /> Add
            </button>
          </div>
        </div>

        {/* Room List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full table-auto">
            <thead className="bg-mint-100">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Room Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Room Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center px-6 py-6 text-gray-500">Loading...</td>
                </tr>
              ) : rooms.length > 0 ? (
                rooms.map((room) => (
                  <tr key={room.id} className="border-t">
                    <td className="px-6 py-4">{room.name}</td>
                    <td className="px-6 py-4">{room.type}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteRoom(room.id)}
                        className="text-red-600 hover:underline"
                      >
                        <FaTrash className="inline" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
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

export default AdminRoomManagement;
