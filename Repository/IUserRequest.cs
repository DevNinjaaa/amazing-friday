using CarShare.Models;


namespace CarShare.Repositories
{
    public interface IUserRequest
    {
        Task<List<Request>> GetAllCarPostsRequestsAsync();
        Task<List<Request>> GetAllCarPosterRequestsAsync();
        Task<bool> AddRequestAsync(Request request);
        Task<bool> AcceptRequestAsync(Request request, int AdminId);
        Task<bool> RejectRequestAsync(Request request, int AdminId);
        Task<Request?> GetRequestByIdAsync(int requestId);
    }
}
