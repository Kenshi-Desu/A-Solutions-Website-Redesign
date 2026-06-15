using Microsoft.AspNetCore.Mvc;
using A_Solutions_Website_Redesign.Backend.Model.Dtos;
using A_Solutions_Website_Redesign.Backend.Services;

namespace A_Solutions_Website_Redesign.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var response = await _authService.LoginAsync(request);
            return Ok(response);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { Message = ex.Message });
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser([FromBody] UsersPostRequest request)
    {
        // Step 1: Sends the code to their email
        await _authService.RegisterUserAsync(request);
        
        return Ok(new { Message = "Verification code sent to email." });
    }

    [HttpPost("verify")]
    public async Task<IActionResult> VerifyUser([FromBody] VerifyOtpRequest request)
    {
        try
        {
            // Step 2: Checks the code and saves to DB. Returns login token immediately.
            var response = await _authService.VerifyEmailAsync(request);
            return Ok(response);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { Message = ex.Message });
        }
    }
}