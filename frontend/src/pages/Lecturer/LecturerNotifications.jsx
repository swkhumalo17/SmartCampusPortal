import React, { useEffect, useState } from 'react';

const LecturerNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:7592/api/notifications/lecturer');
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lecturer Notifications</h1>
      <div className="bg-white shadow-lg rounded-lg p-4">
        {notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          <div>
            {notifications.map((notification) => (
              <div key={notification.id} className="p-4 mb-2 border-b">
                <div className="font-semibold">{notification.message}</div>
                <div className="text-sm text-gray-500">{new Date(notification.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturerNotifications;
