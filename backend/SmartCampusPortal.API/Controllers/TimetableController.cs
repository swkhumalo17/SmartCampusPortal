using Microsoft.AspNetCore.Mvc;
using SmartCampusPortal.Application.DTOs;
using SmartCampusPortal.Application.Interfaces;

namespace SmartCampusPortal.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TimetableController : ControllerBase
    {
        private readonly ITimetableService _timetableService;

        public TimetableController(ITimetableService timetableService)
        {
            _timetableService = timetableService;
        }

        // GET: api/timetable/{programmeLevel}
        [HttpGet("{programmeLevel}")]
        public async Task<IActionResult> GetByProgramme(string programmeLevel)
        {
            var timetable = await _timetableService.GetTimetableByProgrammeAsync(programmeLevel);

            if (timetable == null || timetable.Count == 0)
            {
                return NotFound(new ApiResponse<List<TimetableDto>>
                {
                    IsValid = false,
                    StatusCode = 404,
                    Messages = new List<string> { $"No timetable found for: {programmeLevel}" },
                    Data = null
                });
            }

            return Ok(new ApiResponse<List<TimetableDto>>
            {
                IsValid = true,
                StatusCode = 200,
                Data = timetable,
                Messages = new List<string> { $"Timetable for {programmeLevel} retrieved successfully." }
            });
        }

        // POST: api/timetable
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TimetableDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse<object>
                {
                    IsValid = false,
                    StatusCode = 400,
                    Errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage).ToList()
                });
            }

            await _timetableService.AddTimetableAsync(dto);

            return Ok(new ApiResponse<object>
            {
                IsValid = true,
                StatusCode = 200,
                Messages = new List<string> { "Timetable entry created successfully." }
            });
        }
    }
}