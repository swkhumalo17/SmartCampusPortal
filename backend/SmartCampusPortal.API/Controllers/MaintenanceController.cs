using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartCampusPortal.Application.Interfaces;
using SmartCampusPortal.Domain.Entities;
using System.Data;
using System.Security.Claims;

namespace SmartCampusPortal.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MaintenanceController : ControllerBase
    {
        private readonly IMaintenanceService _maintenanceService;

        public MaintenanceController(IMaintenanceService maintenanceService)
        {
            _maintenanceService = maintenanceService;
        }

        private string GetCurrentUserId() =>
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;

        [HttpPost("report")]
        public async Task<IActionResult> ReportIssue([FromBody] CreateIssueRequest request)
        {
            var userId = GetCurrentUserId();
            var success = await _maintenanceService.ReportIssueAsync(request, userId);
            return success ? Ok("Issue reported.") : StatusCode(500, "Failed to report.");
        }

        [HttpGet("all")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllIssues()
        {
            var issues = await _maintenanceService.GetAllIssuesAsync();
            return Ok(issues);
        }
    }
}

