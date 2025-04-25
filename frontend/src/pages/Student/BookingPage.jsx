import React, { useState } from 'react';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    roomType: '',
    date: '',
    timeSlot: '',
    purpose: '',
  });

  const [success, setSuccess] = useState(false);

  const roomTypes = ['Computer Lab', 'Study Room', 'Lecturer’s Office'];
  const timeSlots = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '14:00 - 15:00'];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would call backend API to store booking
    console.log(formData);
    setSuccess(true);
    setFormData({ roomType: '', date: '', timeSlot: '', purpose: '' });
  };

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Book a Room</h1>

        {success && (
          <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4 text-center">
            Booking successful! 🎉
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Room Type */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">Room Type</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-mint-500 focus:outline-none"
            >
              <option value="">Select room type</option>
              {roomTypes.map((type, idx) => (
                <option key={idx} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-mint-500 focus:outline-none"
            />
          </div>

          {/* Time Slot */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">Time Slot</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-mint-500 focus:outline-none"
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot, idx) => (
                <option key={idx} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">Purpose</label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              rows={3}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-mint-500 focus:outline-none"
              placeholder="E.g., Group study session, consultation, coding project..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
