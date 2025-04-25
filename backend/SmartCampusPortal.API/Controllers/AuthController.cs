using Microsoft.AspNetCore.Mvc;
using SmartCampusPortal.Application.DTOs;
using SmartCampusPortal.Application.Interfaces;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);

        if (!result.IsValid)
        {
            return Unauthorized(result);
        }

        return Ok(result);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);

        if (!result.IsValid)
        {
            return BadRequest(result);
        }

        return StatusCode(201, result);
    }
}
