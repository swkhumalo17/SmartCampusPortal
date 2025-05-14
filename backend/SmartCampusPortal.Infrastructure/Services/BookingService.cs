using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SmartCampusPortal.Application.DTOs;
using SmartCampusPortal.Application.Interfaces;
using SmartCampusPortal.Domain.Entities;
using SmartCampusPortal.Infrastructure.Persistence;

namespace SmartCampusPortal.Infrastructure.Services
{
    public class BookingService : IBookingService
    {
        private readonly AppDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHttpContextFactory _httpContextFactory;
        private readonly IHttpClientFactory _httpClientFactory;

        private readonly List<string> _venues = new()
        {
            "10-120 lab", "10-138 lab", "10-140 lab", "10-170 lab", "10-L41 lab",
            "10-L44 lab", "10-232 lab", "10-233 lab", "10-240 lab", "10-246 lab",
            "10-248 lab", "10-G20 lab", "10-G28 lab", "10-G29 lab", "10-G34 lab",
            "10-L21A lab", "10-L21B lab", "10-222 lab"
        };

        public BookingService(AppDbContext context, IHttpContextAccessor httpContextAccessor, IHttpContextFactory httpContextFactory, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _httpContextFactory = httpContextFactory;
            _httpClientFactory = httpClientFactory;
        }

        private string? GetAccessToken()
        {
            var authHeader = _httpContextAccessor.HttpContext?.Request.Headers["Authorization"].ToString();
            return authHeader?.Replace("Bearer ", "");
        }



        public async Task<List<BookingDto>> GetBookingsByUserAsync(int userId)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId)
                .Select(b => new BookingDto
                {
                    Id = b.Id,
                    VenueCode = b.VenueCode!,
                    StartTime = b.StartTime,
                    EndTime = b.EndTime,
                    Purpose = b.Purpose!,
                    Status = b.Status.ToString()
                })
                .ToListAsync();
        }

        public async Task<List<Booking>> GetBookingsByVenueAsync(string venueCode)
        {
            return await _context.Bookings
                .Where(b => b.VenueCode == venueCode)
                .ToListAsync();
        }

        public async Task<BookingDto> CreateBookingAsync(int userId, BookingDto bookingDto)
        {
            if (bookingDto.EndTime <= bookingDto.StartTime)
                throw new ArgumentException("End time must be after start time.");

            var hasConflict = await _context.Bookings.AnyAsync(b =>
                b.VenueCode == bookingDto.VenueCode &&
                b.Status != Booking.BookingStatus.Cancelled &&
                b.StartTime < bookingDto.EndTime &&
                b.EndTime > bookingDto.StartTime);

            if (hasConflict)
                throw new InvalidOperationException("Room is already booked during that time.");

            var booking = new Booking
            {
                Id = userId,
                UserId = userId,
                VenueCode = bookingDto.VenueCode,
                StartTime = bookingDto.StartTime,
                EndTime = bookingDto.EndTime,
                Purpose = bookingDto.Purpose,
                Status = Booking.BookingStatus.Pending
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            // Backend-to-backend call with Bearer token
            var token = GetAccessToken();
            if (!string.IsNullOrEmpty(token))
            {
                var client = _httpClientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

                var payload = new
                {
                    Venue = booking.VenueCode,
                    Start = booking.StartTime,
                    End = booking.EndTime
                };

                var response = await client.PostAsJsonAsync("http://localhost:7592/api/rooms/update", payload);
                response.EnsureSuccessStatusCode();
            }

            return new BookingDto
            {
                Id = booking.Id,
                VenueCode = booking.VenueCode!,
                StartTime = booking.StartTime,
                EndTime = booking.EndTime,
                Purpose = booking.Purpose!,
                Status = booking.Status.ToString()
            };
        }

        public async Task<bool> CancelBookingAsync(Guid bookingId, int userId)
        {
            var booking = await _context.Bookings
                .FirstOrDefaultAsync(b => b.Id == bookingId && b.UserId == userId);

            if (booking == null || booking.Status == Booking.BookingStatus.Cancelled)
                return false;

            booking.Status = Booking.BookingStatus.Cancelled;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<AvailableRoomDto>> CheckRoomAvailability(DateTime startTime, DateTime endTime)
        {
            var overlappingBookings = await _context.Bookings
                .Where(b => b.Status != Booking.BookingStatus.Cancelled &&
                            b.StartTime < endTime &&
                            b.EndTime > startTime)
                .Select(b => b.VenueCode)
                .ToListAsync();

            return _venues.Select(venue => new AvailableRoomDto
            {
                VenueCode = venue,
                IsAvailable = !overlappingBookings.Contains(venue)
            }).ToList();
        }

    }
}
