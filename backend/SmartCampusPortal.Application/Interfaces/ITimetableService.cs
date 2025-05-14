using SmartCampusPortal.Application.DTOs;

namespace SmartCampusPortal.Application.Interfaces
{
    public interface ITimetableService
    {
        Task<List<TimetableDto>> GetTimetableByProgrammeAsync(string programmeLevel);
        Task AddTimetableAsync(TimetableDto dto);
    }
}
