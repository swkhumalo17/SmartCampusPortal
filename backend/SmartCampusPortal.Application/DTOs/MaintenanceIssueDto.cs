using System;
namespace SmartCampusPortal.Application.DTOs
{
    public class MaintenanceIssueDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ReportedByUserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; } = "Pending"; // Pending, Resolved
    }
}

