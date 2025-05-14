using System;
namespace SmartCampusPortal.Application.DTOs
{
    public class ApiResponse<T>
    {
        public T? Data { get; set; }
        public bool IsValid { get; set; }
        public int StatusCode { get; set; }
        public List<string>? Messages { get; set; } = new();
        public List<string>? Errors { get; set; } = new();
    }

}