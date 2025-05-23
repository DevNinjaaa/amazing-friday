using System.ComponentModel.DataAnnotations;
using CarShare.Data;
using CarShare.Models;
using CarShare.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace CarShare.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> AddAdminAsync(AdminDto adminDto)
        {
            if (await _context.Users.AnyAsync(u => u.Username == adminDto.Username || u.Email == adminDto.Email))
            {
                throw new Exception("Username or Email already exists.");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(adminDto.Password);

            // Create a new admin user
            var user = new User
            {
                Username = adminDto.Username,
                Email = adminDto.Email,
                PasswordHash = passwordHash,
                Role = UserRole.Admin,
                CarOwner = false,
                Renting = false
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int userId)
            => await _context.Users.FindAsync(userId);

        public async Task<User?> GetUserByGmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
