import React, { useState } from 'react';

const ReportIssuePage = () => {
  const [form, setForm] = useState({
    category: '',
    room: '',
    description: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you'd POST to backend
    console.log('Issue reported:', form);
    setSuccess(true);
    setForm({ category: '', room: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Report an Issue</h1>

        {success && (
          <div className="text-green-600 text-sm mb-4 text-center">
            ✅ Your issue has been submitted!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Issue Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-500"
            >
              <option value="">Select Category</option>
              <option value="Maintenance">Maintenance</option>
              <option value="IT Support">IT Support</option>
              <option value="Facilities">Facilities</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Room</label>
            <input
              name="room"
              value={form.room}
              onChange={handleChange}
              required
              placeholder="e.g., C-Lab 01, Study Room 5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe the issue clearly..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Submit Issue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssuePage;
