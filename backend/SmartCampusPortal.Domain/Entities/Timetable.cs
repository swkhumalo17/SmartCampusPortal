using System;
namespace SmartCampusPortal.Domain.Entities
{
    public class Timetable
    {
        public int Id { get; set; }
        public string? ProgrammeLevel { get; set; } // Postgraduate, Advanced, etc.
        public string? CourseCode { get; set; }
        public string? SubjectCode { get; set; }
        public string? SubjectName { get; set; }
        public string? LecturerName { get; set; }
        public string? Venue { get; set; }
        public string? SessionTime { get; set; } // e.g., 08:30 - 11:30
        public string? Day { get; set; } // e.g., Monday
    }
}