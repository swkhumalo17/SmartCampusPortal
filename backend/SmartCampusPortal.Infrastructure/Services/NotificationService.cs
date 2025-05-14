using System;
using Microsoft.EntityFrameworkCore;

using SmartCampusPortal.Domain.Entities;
using SmartCampusPortal.Application.Interfaces;
using SmartCampusPortal.Infrastructure.Persistence;
using SmartCampusPortal.Application.DTOs;

namespace SmartCampusPortal.Infrastructure.Services
{
	public class NotificationService : INotificationService
    {
        private readonly AppDbContext _db;

        public NotificationService(AppDbContext db)
		{
			_db = db;
		}

        public async Task SendNotificationAsync(string userId, string message)
        {
            var notification = new Notification
            {
                Id = Guid.NewGuid(),
                RecipientUserId = userId,
                Message = message,
                CreatedAt = DateTime.UtcNow
            };

            _db.Notifications.Add(notification);
            await _db.SaveChangesAsync();
        }

        public async Task<List<NotificationDto>> GetNotificationsByUserIdAsync(int userId)
        {
            return await _db.Notifications
                .Where(n => n.RecipientUserId == userId.ToString())
                .OrderByDescending(n => n.CreatedAt)
                .Select(n => new NotificationDto
                {
                    Id = n.Id,
                    Message = n.Message,
                    CreatedAt = n.CreatedAt,
                    IsRead = n.IsRead
                })
                .ToListAsync();
        }

        public async Task<bool> MarkAsReadAsync(Guid notificationId)
        {
            var notification = await _db.Notifications.FindAsync(notificationId);
            if (notification == null) return false;

            notification.IsRead = true;
            await _db.SaveChangesAsync();
            return true;
        }

    }
}

