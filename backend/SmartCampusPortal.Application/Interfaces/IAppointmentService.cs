using SmartCampusPortal.Application.DTOs;
using SmartCampusPortal.Domain.Entities;

namespace SmartCampusPortal.Application.Interfaces
{
    public interface IAppointmentService
    {
        Task<List<AppointmentDto>> GetAppointmentsByUserAsync(string userId);
        Task<AppointmentDto> CreateAppointmentAsync(CreateAppointmentRequest request);
        Task<bool> CancelAppointmentAsync(Guid id, string userId);
        Task<bool> UpdateStatusAsync(Guid id, string status);
    }

}
