using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CarShare.Data;
using CarShare.Models;
using CarShare.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;

namespace CarShare.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<LoginResponse> RegisterAsync(RegisterRequest registerRequest)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == registerRequest.Username);
            if (existingUser != null)
            {
                throw new Exception("Username already exists.");
            }

            var existingEmail = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == registerRequest.Email);
            if (existingEmail != null)
            {
                throw new Exception("Email already exists.");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerRequest.Password);

            var user = new User
            {
                Username = registerRequest.Username,
                Email = registerRequest.Email,
                PasswordHash = hashedPassword,
                Role = UserRole.User,
                CarOwner = false,
                Renting = false

            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user);
            return new LoginResponse
            {
                Token = token,
                UserId = user.UserId,
                UserName = user.Username,
                Role = user.Role,
                CarOwner = user.CarOwner,
                Renting = user.Renting
            };

        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
        new Claim(JwtRegisteredClaimNames.Sub, user.Username),
        new Claim(ClaimTypes.Role, user.Role.ToString()),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var jwtKey = _configuration["Jwt:Key"] ?? "my_super_secret_key_don't_tell_anyone";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(4),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }


        public async Task<LoginResponse> LoginAsync(LoginRequest loginRequest)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
            {
                throw new Exception("Invalid login attempt.");
            }
            var token = GenerateJwtToken(user);
            return new LoginResponse
            {
                Token = token,
                UserId = user.UserId,
                UserName = user.Username,
                Role = user.Role,
                CarOwner = user.CarOwner,
                Renting = user.Renting
            };
        }
        public async Task<string> RefreshTokenAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) throw new Exception("User not found");

            return GenerateJwtToken(user);
        }

    }
}
