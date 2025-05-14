// STEP 5: BookingController
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartCampusPortal.Application.DTOs;
using SmartCampusPortal.Application.Interfaces;
using System.Security.Claims;

namespace SmartCampusPortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                throw new UnauthorizedAccessException("Invalid or missing user ID in token.");

            return userId;
        }

        [HttpGet("my-bookings")]
        public async Task<IActionResult> GetMyBookings()
        {
            var response = new ApiResponse<IEnumerable<BookingDto>>();

            try
            {
                var userId = GetCurrentUserId();
                var bookings = await _bookingService.GetBookingsByUserAsync(userId);

                response.Data = bookings;
                response.IsValid = true;
                response.StatusCode = 200;
                response.Messages!.Add("Bookings retrieved successfully.");

                return Ok(response);
            }
            catch (Exception ex)
            {
                response.IsValid = false;
                response.StatusCode = 500;
                response.Errors!.Add(ex.Message);
                return StatusCode(500, response);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateBooking([FromBody] BookingDto bookingDto)
        {
            var response = new ApiResponse<BookingDto>();

            try
            {
                var userId = GetCurrentUserId();
                var createdBooking = await _bookingService.CreateBookingAsync(userId, bookingDto);

                response.Data = createdBooking;
                response.IsValid = true;
                response.StatusCode = 200;
                response.Messages!.Add("Booking created successfully.");

                return Ok(response);
            }
            catch (Exception ex)
            {
                response.IsValid = false;
                response.StatusCode = 400;
                response.Errors!.Add(ex.Message);
                return BadRequest(response);
            }
        }

        [HttpDelete("cancel/{id}")]
        public async Task<IActionResult> CancelBooking(Guid id)
        {
            var response = new ApiResponse<string>();

            try
            {
                var userId = GetCurrentUserId();
                var success = await _bookingService.CancelBookingAsync(id, userId);

                if (!success)
                {
                    response.IsValid = false;
                    response.StatusCode = 404;
                    response.Errors!.Add("Booking not found or already cancelled.");
                    return NotFound(response);
                }

                response.Data = "Booking cancelled successfully.";
                response.IsValid = true;
                response.StatusCode = 200;
                response.Messages!.Add("Booking cancelled.");

                return Ok(response);
            }
            catch (Exception ex)
            {
                response.IsValid = false;
                response.StatusCode = 500;
                response.Errors!.Add(ex.Message);
                return StatusCode(500, response);
            }
        }

        [HttpGet("availability")]
        public async Task<IActionResult> CheckRoomAvailability([FromQuery] DateTime startTime, [FromQuery] DateTime endTime)
        {
            var response = new ApiResponse<IEnumerable<AvailableRoomDto>>();

            if (endTime <= startTime)
            {
                response.IsValid = false;
                response.StatusCode = 400;
                response.Errors!.Add("End time must be after start time.");
                return BadRequest(response);
            }

            try
            {
                var availableRooms = await _bookingService.CheckRoomAvailability(startTime, endTime);

                response.Data = availableRooms;
                response.IsValid = true;
                response.StatusCode = 200;
                response.Messages!.Add("Available rooms retrieved successfully.");

                return Ok(response);
            }
            catch (Exception ex)
            {
                response.IsValid = false;
                response.StatusCode = 500;
                response.Errors!.Add(ex.Message);
                return StatusCode(500, response);
            }
        }
    }
}