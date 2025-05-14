import axios from "axios";

const API_URL = "http://localhost:15596/api/booking";

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getMyBookings = async () => {
  const res = await axios.get(`${API_URL}/my-bookings`, getAuthHeaders());
  return res.data.data;
};

export const createBooking = async (bookingDto) => {
  const res = await axios.post(`${API_URL}/create`, bookingDto, getAuthHeaders());
  return res.data.data;
};

export const cancelBooking = async (id) => {
  const res = await axios.delete(`${API_URL}/cancel/${id}`, getAuthHeaders());
  return res.data.data;
};

export const checkRoomAvailability = async (startTime, endTime) => {
  const res = await axios.get(`${API_URL}/availability`, {
    ...getAuthHeaders(),
    params: { startTime, endTime },
  });
  return res.data.data;
};
