using System;
namespace SmartCampusPortal.Domain.Entities
{
    public class MaintenanceIssue
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ReportedByUserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public IssueStatus Status { get; set; } = IssueStatus.Pending;

        public enum IssueStatus
        {
            Pending,
            Resolved
        }
    }

}