using System;
namespace SmartCampusPortal.Domain.Entities
{
    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? VenueCode { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string? Purpose { get; set; }
        public BookingStatus Status { get; set; } = BookingStatus.Pending;

        public enum BookingStatus
        {
            Pending,
            Approved,
            Rejected,
            Cancelled
        }
    }
}