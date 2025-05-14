import React, { useEffect, useState } from "react";
import Card from "../../components/CardWrapper";
import {
  getMyBookings,
  createBooking,
  cancelBooking,
} from "../../services/bookingService";

const StudentRoomBooking = () => {
  const [room, setRoom] = useState("");
  const [roomTime, setRoomTime] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleRoomBooking = async () => {
    try {
      await createBooking({
        type: "Room",
        target: room,
        time: roomTime,
      });
      fetchBookings();
    } catch (error) {
      console.error("Room booking failed", error);
    }
  };

  const handleAppointmentBooking = async () => {
    try {
      await createBooking({
        type: "Appointment",
        target: lecturer,
        time: appointmentTime,
      });
      fetchBookings();
    } catch (error) {
      console.error("Appointment booking failed", error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      fetchBookings();
    } catch (error) {
      console.error("Cancel failed", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold mb-4">Room & Appointment Booking</h1>

      <Card>
        <h2 className="text-lg font-medium mb-4">Book a Study Room</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <select className="input-field w-full" value={room} onChange={(e) => setRoom(e.target.value)}>
            <option value="">Select Room</option>
            <option>Lab A</option>
            <option>Study Room B</option>
            <option>Library Hall</option>
          </select>
          <input
            type="datetime-local"
            className="input-field w-full"
            value={roomTime}
            onChange={(e) => setRoomTime(e.target.value)}
          />
          <button className="btn-primary" onClick={handleRoomBooking}>Book</button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-medium mb-4">Set an Appointment</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <select className="input-field w-full" value={lecturer} onChange={(e) => setLecturer(e.target.value)}>
            <option value="">Select Lecturer</option>
            <option>Dr. Smith</option>
            <option>Mr. Johnson</option>
            <option>Prof. Lee</option>
          </select>
          <input
            type="datetime-local"
            className="input-field w-full"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
          />
          <button className="btn-primary" onClick={handleAppointmentBooking}>Book</button>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-medium mb-4">Booking History</h2>
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Target</th>
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="p-2">{booking.type}</td>
                <td className="p-2">{booking.target}</td>
                <td className="p-2">{booking.time}</td>
                <td className="p-2">{booking.status}</td>
                <td className="p-2">
                  {booking.status === "Active" ? (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="btn-outline text-sm"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default StudentRoomBooking;
