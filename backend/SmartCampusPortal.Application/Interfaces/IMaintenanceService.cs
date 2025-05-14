using System;
using SmartCampusPortal.Domain.Entities;

namespace SmartCampusPortal.Application.Interfaces
{
	public interface IMaintenanceService
	{
        Task<bool> ReportIssueAsync(CreateIssueRequest request, string reportedByUserId);
        Task<List<MaintenanceIssue>> GetAllIssuesAsync();
    }
}

