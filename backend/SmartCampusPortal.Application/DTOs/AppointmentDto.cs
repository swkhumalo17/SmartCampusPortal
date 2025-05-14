using System;
namespace SmartCampusPortal.Application.DTOs
{
    public class AppointmentDto
    {
        public Guid Id { get; set; }
        public string StudentId { get; set; }
        public string LecturerId { get; set; }
        public DateTime DateTime { get; set; }
        public string Status { get; set; }
    }

    public class CreateAppointmentRequest
    {
        public string StudentId { get; set; }
        public string LecturerId { get; set; }
        public DateTime DateTime { get; set; }
    }

}

