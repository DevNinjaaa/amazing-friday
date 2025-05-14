using System.Threading.Tasks;
using CarShare.Models.DTOs;

namespace CarShare.Services
{
    public interface IAuthService
    {
        Task<LoginResponse> RegisterAsync(RegisterRequest registerRequest);
        Task<LoginResponse> LoginAsync(LoginRequest loginRequest);
        Task<string> RefreshTokenAsync(int userId);

    }
}
