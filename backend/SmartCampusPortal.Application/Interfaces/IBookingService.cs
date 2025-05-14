using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SmartCampusPortal.Application.DTOs;
using SmartCampusPortal.Domain.Entities;

namespace SmartCampusPortal.Application.Interfaces
{
    public interface IBookingService
    {
        Task<List<BookingDto>> GetBookingsByUserAsync(int userId);
        Task<List<Booking>> GetBookingsByVenueAsync(string venueCode);
        Task<BookingDto> CreateBookingAsync(int userId, BookingDto bookingDto);

        Task<bool> CancelBookingAsync(Guid bookingId, int userId);
        Task<List<AvailableRoomDto>> CheckRoomAvailability(DateTime startTime, DateTime endTime);
    }
}
