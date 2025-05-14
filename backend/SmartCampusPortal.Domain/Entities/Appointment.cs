using System;
namespace SmartCampusPortal.Domain.Entities
{
    public class Appointment
    {
        public Guid Id { get; set; }
        public string StudentId { get; set; }
        public string LecturerId { get; set; }
        public DateTime DateTime { get; set; }
        public AppointmentStatus Status { get; set; }

        public enum AppointmentStatus
        {
            Pending,
            Approved,
            Rejected,
            Cancelled
        }
    }
}

