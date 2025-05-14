using SmartCampusPortal.Application.DTOs;
using SmartCampusPortal.Application.Interfaces;
using SmartCampusPortal.Domain.Entities;
using SmartCampusPortal.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace SmartCampusPortal.Infrastructure.Services
{
    public class TimetableService : ITimetableService
    {
        private readonly AppDbContext _context;

        public TimetableService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TimetableDto>> GetTimetableByProgrammeAsync(string programmeLevel)
        {
            var timetable = await _context.Timetables
                .Where(t => t.ProgrammeLevel.ToLower() == programmeLevel.ToLower())
                .ToListAsync();

            return timetable.Select(t => new TimetableDto
            {
                ProgrammeLevel = t.ProgrammeLevel,
                CourseCode = t.CourseCode,
                SubjectCode = t.SubjectCode,
                SubjectName = t.SubjectName,
                LecturerName = t.LecturerName,
                Venue = t.Venue,
                SessionTime = t.SessionTime,
                Day = t.Day
            }).ToList();
        }

        public async Task AddTimetableAsync(TimetableDto dto)
        {
            var timetable = new Timetable
            {
                ProgrammeLevel = dto.ProgrammeLevel,
                CourseCode = dto.CourseCode,
                SubjectCode = dto.SubjectCode,
                SubjectName = dto.SubjectName,
                LecturerName = dto.LecturerName,
                Venue = dto.Venue,
                SessionTime = dto.SessionTime,
                Day = dto.Day
            };

            _context.Timetables.Add(timetable);
            await _context.SaveChangesAsync();
        }
    }
}
