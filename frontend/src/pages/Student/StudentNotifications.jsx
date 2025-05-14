import React, { useEffect, useState } from "react";
import Card from "../../components/Card";

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7592/api/notifications/student", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Notification fetch error:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="text-gray-500 text-center">No notifications found.</div>
      ) : (
        <div className="space-y-4">
          {notifications.map((note) => (
            <Card key={note.id}>
              <div className="flex flex-col space-y-1">
                <div className="font-semibold text-lg text-primary">{note.title}</div>
                <div className="text-gray-700">{note.message}</div>
                <div className="text-xs text-gray-400">
                  {new Date(note.date).toLocaleString()}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentNotifications;
