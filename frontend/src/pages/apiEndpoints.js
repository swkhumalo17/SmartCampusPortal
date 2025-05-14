const BASE_URL = 'http://localhost:28209/api';

const API_ENDPOINTS = {
  // Auth
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,

  // Booking
  GET_AVAILABLE_ROOMS: `${BASE_URL}/booking/availability`,
  BOOK_ROOM: `${BASE_URL}/booking/create`,
  CANCEL_BOOKING: (id) => `${BASE_URL}/booking/cancel/${id}`,
  GET_USER_BOOKINGS: `${BASE_URL}/booking/my-bookings`,

  // Appointments
  CREATE_APPOINTMENT: `${BASE_URL}/appointment/create`,
  GET_USER_APPOINTMENTS: (userId) => `${BASE_URL}/appointment/user/${userId}`,
  CANCEL_APPOINTMENT: (id, userId) => `${BASE_URL}/appointment/${id}/cancel/${userId}`,
  UPDATE_APPOINTMENT_STATUS: (id, status) => `${BASE_URL}/appointment/${id}/status/${status}`,

  // Maintenance
  REPORT_ISSUE: `${BASE_URL}/maintenance/report`,
  GET_ALL_ISSUES: `${BASE_URL}/maintenance/all`,

  // Notifications
  GET_USER_NOTIFICATIONS: `${BASE_URL}/notification/my-notifications`,
  MARK_NOTIFICATION_READ: (id) => `${BASE_URL}/notification/mark-as-read/${id}`,

  // Timetable
  GET_TIMETABLE_BY_LEVEL: (programmeLevel) => `${BASE_URL}/timetable/${programmeLevel}`,
  POST_TIMETABLE: `${BASE_URL}/timetable`,

  // User (if profile-related APIs exist)
  GET_PROFILE: `${BASE_URL}/users/profile`,
  UPDATE_PROFILE: `${BASE_URL}/users/profile/update`,
};

export default API_ENDPOINTS;
