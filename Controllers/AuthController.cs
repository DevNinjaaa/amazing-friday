using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CarShare.Models.DTOs;
using System.Security.Claims;


namespace CarShare.Services
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;

        public AuthController(IConfiguration configuration, IAuthService authService)
        {
            _configuration = configuration;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        {

            if (registerRequest == null || string.IsNullOrEmpty(registerRequest.Email) ||
                string.IsNullOrEmpty(registerRequest.Password) ||
                registerRequest.Password != registerRequest.ConfirmPassword)
            {
                return BadRequest("Invalid registration request.");
            }

            try
            {
                // Call the service to register the user
                var token = await _authService.RegisterAsync(registerRequest);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                Console.WriteLine($"Login request received: Email = {loginRequest.Email}, Password = {loginRequest.Password}");
                var token = await _authService.LoginAsync(loginRequest);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
        }
        [Authorize]
        [HttpGet("user-info")]
        public IActionResult GetUserInfo()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var username = User.FindFirst(ClaimTypes.Name)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;

            if (userId == null)
            {
                return Unauthorized(new { Message = "User not authenticated" });
            }

            // Return user information
            return Ok(new { UserId = userId, Username = username, Email = email });
        }
    }

}
