using Microsoft.EntityFrameworkCore;
using SmartCampusPortal.Domain.Entities;
using System;

namespace SmartCampusPortal.Infrastructure.Persistence
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

		public DbSet<User> Users { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Timetable> Timetables { get; set; }
		public DbSet<Notification> Notifications { get; set; }
        public DbSet<MaintenanceIssue> MaintenanceIssues { get; set; }
		public DbSet<Appointment> Appointments { get; set; }
    }
}

