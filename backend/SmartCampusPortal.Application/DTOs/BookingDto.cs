using System;
namespace SmartCampusPortal.Application.DTOs
{
    public class BookingDto
    {
        public Guid? Id { get; set; } 
        public string? VenueCode { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Purpose { get; set; }
        public string? Status { get; set; } 
    }

}