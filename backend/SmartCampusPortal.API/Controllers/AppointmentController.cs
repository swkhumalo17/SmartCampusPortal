using System;
using Microsoft.AspNetCore.Mvc;
using SmartCampusPortal.Application.DTOs;
using SmartCampusPortal.Application.Interfaces;

namespace SmartCampusPortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _service;

        public AppointmentController(IAppointmentService service)
        {
            _service = service;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateAppointmentRequest request)
        {
            var result = await _service.CreateAppointmentAsync(request);
            return Ok(result);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser(string userId)
        {
            var appointments = await _service.GetAppointmentsByUserAsync(userId);
            return Ok(appointments);
        }

        [HttpPost("{id}/cancel/{userId}")]
        public async Task<IActionResult> Cancel(Guid id, string userId)
        {
            var success = await _service.CancelAppointmentAsync(id, userId);
            return success ? Ok() : BadRequest();
        }

        [HttpPost("{id}/status/{status}")]
        public async Task<IActionResult> UpdateStatus(Guid id, string status)
        {
            var success = await _service.UpdateStatusAsync(id, status);
            return success ? Ok() : BadRequest();
        }
    }

}

