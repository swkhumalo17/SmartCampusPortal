import React, { useEffect, useState } from 'react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // In real app, you'd fetch from API
    setNotifications([
      {
        id: 1,
        title: 'Classroom Maintenance',
        message: 'C-Lab 03 will be closed for maintenance on Friday.',
        timestamp: '2025-04-20T10:00:00',
      },
      {
        id: 2,
        title: 'New Timetable Update',
        message: 'Your timetable has been updated. Check your schedule.',
        timestamp: '2025-04-19T14:30:00',
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-mint-50 p-8 font-inter">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Notifications</h1>

        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">You have no notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((note) => (
              <li
                key={note.id}
                className="bg-mint-100 border-l-4 border-mint-500 p-4 rounded-lg shadow-sm"
              >
                <h2 className="text-lg font-semibold text-gray-800">{note.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{note.message}</p>
                <span className="text-xs text-gray-400 block mt-2">
                  {new Date(note.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
