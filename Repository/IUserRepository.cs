using CarShare.Models;
using CarShare.Models.DTOs;

namespace CarShare.Repository
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<User?> GetUserByGmailAsync(string Email);
        Task UpdateUserAsync(User user);
        Task<bool> DeleteUserAsync(int id);
        Task<User> AddAdminAsync(AdminDto adminDto);
    }
}
