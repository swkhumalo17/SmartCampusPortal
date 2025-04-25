using System;
namespace SmartCampusPortal.Domain.Entities
{
	public enum UserRole
	{
		Student,
		Lecturer,
		Admin
	}

    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public UserRole Role { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public DateTime DateCreated { get; set; }

        // Student
        public string? StudentNumber { get; set; }
        public string? Faculty { get; set; }
        public string? LevelOfStudy { get; set; }
        public string? YearOfStudy { get; set; }

        // Lecturer
        public string? EmployeeId { get; set; }
        public string? Department { get; set; }

        // Admin
        public string? AdminId { get; set; }
        public string? AccessLevel { get; set; }
    }

}

