using System;
using Microsoft.EntityFrameworkCore;
using SmartCampusPortal.Application.DTOs;
using SmartCampusPortal.Application.Interfaces;
using SmartCampusPortal.Domain.Entities;
using SmartCampusPortal.Infrastructure.Persistence;

namespace SmartCampusPortal.Infrastructure.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly AppDbContext _context;

        public AppointmentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<AppointmentDto> CreateAppointmentAsync(CreateAppointmentRequest request)
        {
            var appointment = new Appointment
            {
                Id = Guid.NewGuid(),
                StudentId = request.StudentId,
                LecturerId = request.LecturerId,
                DateTime = request.DateTime,
                Status = Appointment.AppointmentStatus.Pending
            };

            _context.Add(appointment);
            await _context.SaveChangesAsync();

            return new AppointmentDto
            {
                Id = appointment.Id,
                StudentId = appointment.StudentId,
                LecturerId = appointment.LecturerId,
                DateTime = appointment.DateTime,
                Status = appointment.Status.ToString()
            };
        }

        public async Task<List<AppointmentDto>> GetAppointmentsByUserAsync(string userId)
        {
            var result = await _context.Set<Appointment>()
                .Where(a => a.StudentId == userId || a.LecturerId == userId)
                .ToListAsync();

            return result.Select(a => new AppointmentDto
            {
                Id = a.Id,
                StudentId = a.StudentId,
                LecturerId = a.LecturerId,
                DateTime = a.DateTime,
                Status = a.Status.ToString()
            }).ToList();
        }

        public async Task<bool> CancelAppointmentAsync(Guid id, string userId)
        {
            var appointment = await _context.Set<Appointment>().FirstOrDefaultAsync(a => a.Id == id);
            if (appointment == null || (appointment.StudentId != userId && appointment.LecturerId != userId))
                return false;

            appointment.Status = Appointment.AppointmentStatus.Cancelled;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateStatusAsync(Guid id, string status)
        {
            var appointment = await _context.Set<Appointment>().FindAsync(id);
            if (appointment == null) return false;

            if (Enum.TryParse<Appointment.AppointmentStatus>(status, out var newStatus))
            {
                appointment.Status = newStatus;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }


}

