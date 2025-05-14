using System;
namespace SmartCampusPortal.Application.DTOs
{
    public class TimetableDto
    {
        public string ProgrammeLevel { get; set; }
        public string CourseCode { get; set; }
        public string SubjectCode { get; set; }
        public string SubjectName { get; set; }
        public string LecturerName { get; set; }
        public string Venue { get; set; }
        public string SessionTime { get; set; }
        public string Day { get; set; }
    }
}
