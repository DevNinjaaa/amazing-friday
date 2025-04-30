using CarShare.Data;
using CarShare.Models;
using Microsoft.EntityFrameworkCore;

namespace CarShare.Repository
{
    public class ProposalRepository : IProposalRepository
    {
        private readonly AppDbContext _context;

        public ProposalRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CarProposal>> GetAllProposalsAsync() => await _context.CarProposals.ToListAsync();
        public async Task<CarProposal?> GetProposalByIdAsync(int proposalId)
        {
            var proposal = await _context.CarProposals.FindAsync(proposalId);

            if (proposal == null)
                return null;

            return proposal;
        }

        public async Task<bool> AcceptProposalAsync(int proposalId)
        {
            var proposal = await _context.CarProposals
            .Include(p => p.Car)
            .FirstOrDefaultAsync(p => p.CarProposalId == proposalId);


            if (proposal == null)
                return false;

            if (proposal.Car.IsRented)
                return false;

            var user = await _context.Users.FindAsync(proposal.RenterId);
            if (user == null)
                return false;

            // Update rental status
            user.IsRenter = true;
            proposal.Car.IsRented = true;

            // Reject all other proposals for this car
            var proposals = await _context.CarProposals
                .Where(p => p.CarId == proposal.CarId)
                .ToListAsync();

            foreach (var p in proposals)
                p.Status = ProposalStatus.Rejected;

            proposal.Status = ProposalStatus.Accepted;

            await _context.SaveChangesAsync();
            return true;
        }



        public async Task AddProposalAsync(CarProposal CarProposal)
        {
            _context.CarProposals.Add(CarProposal);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateProposalAsync(CarProposal proposal)
        {
            _context.CarProposals.Update(proposal);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> DeleteProposalAsync(int id)
        {
            var Proposal = await _context.CarProposals.FindAsync(id);
            if (Proposal != null)
            {

                _context.CarProposals.Remove(Proposal);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
