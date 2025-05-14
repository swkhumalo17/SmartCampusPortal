using System;
using System.ComponentModel.DataAnnotations;

namespace SmartCampusPortal.Application.DTOs
{
    public class UserRegisterDto
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;

        // Student fields
        public string? StudentNumber { get; set; }
        public string? Faculty { get; set; }
        public string? LevelOfStudy { get; set; }
        public string? YearOfStudy { get; set; }

        // Lecturer fields
        public string? EmployeeId { get; set; }
        public string? Department { get; set; }

        // Admin fields
        public string? AdminId { get; set; }
        public string? AccessLevel { get; set; }
    }


}

