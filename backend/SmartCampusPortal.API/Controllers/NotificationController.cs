using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartCampusPortal.Application.DTOs;
using SmartCampusPortal.Application.Interfaces;
using System.Security.Claims;

namespace SmartCampusPortal.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId))
                throw new UnauthorizedAccessException("Invalid or missing user ID in token.");

            return userId;
        }

        [HttpGet("my-notifications")]
        public async Task<IActionResult> GetMyNotifications()
        {
            var response = new ApiResponse<IEnumerable<NotificationDto>>();

            try
            {
                var userId = GetCurrentUserId();
                var notifications = await _notificationService.GetNotificationsByUserIdAsync(userId);

                response.Data = notifications;
                response.IsValid = true;
                response.StatusCode = 200;
                response.Messages!.Add("Notifications retrieved successfully.");

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

        [HttpPost("mark-as-read/{id}")]
        public async Task<IActionResult> MarkAsRead(Guid id)
        {
            var response = new ApiResponse<string>();

            try
            {
                var success = await _notificationService.MarkAsReadAsync(id);

                if (!success)
                {
                    response.IsValid = false;
                    response.StatusCode = 404;
                    response.Errors!.Add("Notification not found.");
                    return NotFound(response);
                }

                response.Data = "Notification marked as read.";
                response.IsValid = true;
                response.StatusCode = 200;
                response.Messages!.Add("Success.");

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
