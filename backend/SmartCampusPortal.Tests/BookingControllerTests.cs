using Xunit;
using Moq;
using SmartCampusPortal.API.Controllers;
using SmartCampusPortal.Application.Interfaces;
using SmartCampusPortal.Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System;

namespace SmartCampusPortal.Tests
{
    public class BookingControllerTests
    {
        private readonly Mock<IBookingService> _mockBookingService;
        private readonly BookingController _controller;

        public BookingControllerTests()
        {
            _mockBookingService = new Mock<IBookingService>();
            _controller = new BookingController(_mockBookingService.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, "1")
            }, "mock"));

            _controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() { User = user }
            };
        }

        [Fact]
        public async Task GetMyBookings_ReturnsOkResult_WithWrappedBookings()
        {
            // Arrange
            var bookings = new List<BookingDto>
            {
                new BookingDto
                {
                    Id = Guid.NewGuid(),
                    VenueCode = "A101",
                    StartTime = DateTime.Now,
                    EndTime = DateTime.Now.AddHours(1),
                    Purpose = "Test Lecture",
                    Status = "Approved"
                }
            };

            _mockBookingService
                .Setup(s => s.GetBookingsByUserAsync(1))
                .ReturnsAsync(bookings);

            // Act
            var result = await _controller.GetMyBookings();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<ApiResponse<IEnumerable<BookingDto>>>(okResult.Value);

            Assert.True(response.IsValid);
            Assert.NotNull(response.Data);
            Assert.Single(response.Data);
            Assert.Equal("A101", ((List<BookingDto>)response.Data)[0].VenueCode);
        }
    }
}
