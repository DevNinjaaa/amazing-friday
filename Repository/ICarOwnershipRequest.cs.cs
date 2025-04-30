using CarShare.Models;


namespace CarShare.Repositories
{
    public interface ICarOwnershipRequest
    {
        Task<List<AccountApprovalRequest>> GetAllOwnershipRequestsAsync();
        Task<bool> AddOwnershipRequestAsync(AccountApprovalRequest request);
        Task<bool> AcceptAccountApprovalRequestAsync(AccountApprovalRequest request, int AdminId);
        Task<bool> RejectAccountRequestAsync(AccountApprovalRequest request, int AdminId);
    }
}
