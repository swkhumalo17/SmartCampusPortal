using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SmartCampusPortal.Application.DTOs;
using SmartCampusPortal.Application.Interfaces;
using SmartCampusPortal.Domain.Entities;
using SmartCampusPortal.Infrastructure.Persistence;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace SmartCampusPortal.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;

        public AuthService(AppDbContext db, IConfiguration config)
        {
            _db = db;
            _config = config;
        }

        public async Task<ApiResponse<string>> RegisterAsync(UserRegisterDto dto)
        {
            var response = new ApiResponse<string>();

            if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
            {
                response.IsValid = false;
                response.StatusCode = 409;
                response.Errors.Add("User already exists.");
                return response;
            }

            if (!Enum.TryParse<UserRole>(dto.Role, true, out var userRole))
            {
                response.IsValid = false;
                response.StatusCode = 400;
                response.Errors.Add("Invalid user role.");
                return response;
            }

            var names = dto.FullName.Split(' ', 2);
            var firstName = names[0];
            var lastName = names.Length > 1 ? names[1] : "";

            var user = new User
            {
                FirstName = firstName,
                LastName = lastName,
                Email = dto.Email,
                Username = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = userRole,
                DateCreated = DateTime.UtcNow
            };

            switch (userRole)
            {
                case UserRole.Student:
                    user.StudentNumber = dto.StudentNumber;
                    user.Faculty = dto.Faculty;
                    user.LevelOfStudy = dto.LevelOfStudy;
                    user.YearOfStudy = dto.YearOfStudy;
                    break;
                case UserRole.Lecturer:
                    user.EmployeeId = dto.EmployeeId;
                    user.Department = dto.Department;
                    break;
                case UserRole.Admin:
                    user.AdminId = dto.AdminId;
                    user.AccessLevel = dto.AccessLevel;
                    break;
            }

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            response.IsValid = true;
            response.StatusCode = 201;
            response.Data = GenerateToken(user);
            response.Messages.Add("Registration successful.");
            return response;
        }

        public async Task<ApiResponse<object>> LoginAsync(UserLoginDto dto)
        {
            var response = new ApiResponse<object>();
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == dto.Email.ToLower() || u.Username.ToLower() == dto.Email.ToLower());

            if (user == null)
            {
                response.IsValid = false;
                response.StatusCode = 401;
                response.Errors.Add("User not found.");
                return response;
            }

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                response.IsValid = false;
                response.StatusCode = 401;
                response.Errors.Add("Incorrect password.");
                return response;
            }

            // Generate JWT Token
            var token = GenerateToken(user); // Helper method that generates the token

            response.IsValid = true;
            response.StatusCode = 200;
            response.Data = new
            {
                token,
                role = user.Role.ToString()
            };
            response.Messages.Add("Login successful.");

            return response;
        }


        private string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(6),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

