using Microsoft.EntityFrameworkCore;
using SmartCampusPortal.Domain.Entities;
using System;

namespace SmartCampusPortal.Infrastructure.Persistence
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
		public DbSet<User> Users { get; set; }
	}
}

