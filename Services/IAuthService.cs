using System.Threading.Tasks;
using CarShare.Models.DTOs;

namespace CarShare.Services
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterRequest registerRequest);
        Task<string> LoginAsync(LoginRequest loginRequest);

    }
}
