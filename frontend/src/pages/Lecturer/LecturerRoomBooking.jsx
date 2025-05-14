import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import API_ENDPOINTS from '../apiEndpoints';

const LecturerRoomBooking = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(2);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    axios
      .get(API_ENDPOINTS.AVAILABLE_ROOMS, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRooms(res.data))
      .catch((err) => console.error('Room fetch error:', err));
  }, [token]);

  const handleBooking = async () => {
    if (!selectedRoom || !date || !time || !duration) {
      setError('Please fill in all fields.');
      setSuccess('');
      return;
    }

    const bookingDateTime = new Date(`${date}T${time}`);

    try {
      await axios.post(
        API_ENDPOINTS.BOOK_ROOM,
        {
          roomId: selectedRoom,
          bookingDate: bookingDateTime.toISOString(),
          durationHours: duration,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess('Room successfully booked!');
      setError('');
      setSelectedRoom('');
      setDate('');
      setTime('');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed.');
      setSuccess('');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Lecturer Room Booking</h2>

      <Card>
        <div className="space-y-4">
          {success && <div className="bg-green-100 text-green-700 p-2 rounded">{success}</div>}
          {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}

          <div>
            <label className="label">Select Room</label>
            <select
              className="input-field w-full"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              <option value="">Choose a room...</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name} ({room.capacity} seats)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Date</label>
            <input
              type="date"
              className="input-field w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Time</label>
            <input
              type="time"
              className="input-field w-full"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Duration (Hours)</label>
            <select
              className="input-field w-full"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={1}>1 Hour</option>
              <option value={2}>2 Hours</option>
              <option value={3}>3 Hours</option>
              <option value={4}>4 Hours</option>
            </select>
          </div>

          <button className="btn-primary w-full" onClick={handleBooking}>
            Book Room
          </button>
        </div>
      </Card>
    </div>
  );
};

export default LecturerRoomBooking;
