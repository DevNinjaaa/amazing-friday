using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CarShare.Data;
using CarShare.Models;
using CarShare.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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

        public async Task<string> RegisterAsync(RegisterRequest registerRequest)
        {
            // check if username already exists
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == registerRequest.Username);
            if (existingUser != null)
            {
                throw new Exception("Username already exists.");
            }

            // check if email already exists
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

            return GenerateJwtToken(user);
        }

        // Generate a JWT token
        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
        new Claim(JwtRegisteredClaimNames.Sub, user.Username),
        new Claim(ClaimTypes.Role, user.Role.ToString()),
        new Claim("UserId", user.UserId.ToString()),
        new Claim("CarOwner", user.CarOwner.ToString()),
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


        // log in a user and return a JWT token
        public async Task<string> LoginAsync(LoginRequest loginRequest)
        {
            // find user by email
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.PasswordHash))
            {
                throw new Exception("Invalid login attempt.");
            }

            return GenerateJwtToken(user);
        }
    }
}
