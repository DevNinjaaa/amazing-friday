using CarShare.Models;

namespace CarShare.Repository
{
    public interface IProposalRepository
    {
        Task<List<CarProposal>> GetAllProposalsAsync();
        Task<CarProposal?> GetProposalByIdAsync(int proposalId);
        Task<bool> AcceptProposalAsync(int proposalId);
        Task AddProposalAsync(CarProposal proposal);
        Task UpdateProposalAsync(CarProposal proposal);
        Task<bool> DeleteProposalAsync(int proposalId);
    }
}
