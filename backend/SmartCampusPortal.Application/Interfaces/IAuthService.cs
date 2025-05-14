using System;
using SmartCampusPortal.Application.DTOs;

namespace SmartCampusPortal.Application.Interfaces
{
    public interface IAuthService
    {
        Task<ApiResponse<string>> RegisterAsync(UserRegisterDto dto);
        Task<ApiResponse<object>> LoginAsync(UserLoginDto dto);
    }
}