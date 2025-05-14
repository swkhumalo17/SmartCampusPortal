using System;
namespace SmartCampusPortal.Domain.Entities
{
    public class Notification
    {
        public Guid Id { get; set; }
        public string RecipientUserId { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsRead { get; set; } = false;
    }
}

