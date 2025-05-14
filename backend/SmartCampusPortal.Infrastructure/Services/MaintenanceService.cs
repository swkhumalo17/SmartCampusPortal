using System;
using Microsoft.EntityFrameworkCore;
using SmartCampusPortal.Application.Interfaces;
using SmartCampusPortal.Domain.Entities;
using SmartCampusPortal.Infrastructure.Persistence;

namespace SmartCampusPortal.Infrastructure.Services
{
    public class MaintenanceService : IMaintenanceService
    {
        private readonly AppDbContext _db;
        private readonly INotificationService _notificationService;

        public MaintenanceService(AppDbContext db, INotificationService notificationService)
        {
            _db = db;
            _notificationService = notificationService;
        }

        public async Task<bool> ReportIssueAsync(CreateIssueRequest request, string reportedByUserId)
        {
            var issue = new MaintenanceIssue
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Description = request.Description,
                ReportedByUserId = reportedByUserId
            };

            _db.MaintenanceIssues.Add(issue);
            await _db.SaveChangesAsync();

            // Notify admin(s) — you can loop if multiple
            var adminId = "admin_user_id"; // Lookup or use role filter
            await _notificationService.SendNotificationAsync(adminId, $"New maintenance issue: {request.Title}");

            return true;
        }

        public async Task<List<MaintenanceIssue>> GetAllIssuesAsync()
        {
            return await _db.MaintenanceIssues.OrderByDescending(i => i.CreatedAt).ToListAsync();
        }
    }



}

