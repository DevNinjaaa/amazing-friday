using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CarShare.Models.DTOs;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace CarShare.Services
{
    [Authorize]
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

        [AllowAnonymous]
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
                var response = await _authService.RegisterAsync(registerRequest);
                return Ok(new { response = response });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                var response = await _authService.LoginAsync(loginRequest);
                return Ok(new { response = response });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
        }

        [HttpGet("user-info")]
        public IActionResult GetUserInfo()
        {
            var userId = User.FindFirst("UserId")?.Value;
            var username = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userId == null)
            {
                return Unauthorized(new { Message = "User not authenticated" });
            }

            return Ok(new
            {
                UserId = userId,
                Username = username,
                Role = role,

            });
        }
    }
}
