using SmartCampusPortal.Application.DTOs;

namespace SmartCampusPortal.Application.Interfaces
{
    public interface INotificationService
    {
        Task SendNotificationAsync(string userId, string message);
        Task<List<NotificationDto>> GetNotificationsByUserIdAsync(int userId);
        Task<bool> MarkAsReadAsync(Guid notificationId);
    }
}
