using CarShare.Models;
using Microsoft.EntityFrameworkCore;
using CarShare.Data;
using NuGet.Versioning;

namespace CarShare.Repositories
{
    public class CarOwnershipRequest : ICarOwnershipRequest
    {
        private readonly AppDbContext _context;

        public CarOwnershipRequest(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<AccountApprovalRequest>> GetAllOwnershipRequestsAsync()
            => await _context.AccountApprovalRequests.ToListAsync();


        public async Task<bool> AddOwnershipRequestAsync(AccountApprovalRequest request)
        {
            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null || user.IsCarOwner == true)
                return false;
            await _context.AccountApprovalRequests.AddAsync(request);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> AcceptAccountApprovalRequestAsync(AccountApprovalRequest request, int AdminId)
        {

            var admin = await _context.Users.FindAsync(AdminId);
            var user = await _context.Users.FindAsync(request.UserId);
            if (admin == null || admin.Role != UserRole.Admin) return false;
            if (user != null)
            {
                user.IsCarOwner = true;
                _context.Users.Update(user);
                _context.AccountApprovalRequests.Remove(request);
                await _context.SaveChangesAsync();
            }
            return true;
        }

        public async Task<bool> RejectAccountRequestAsync(AccountApprovalRequest request, int AdminId)
        {
            var admin = await _context.Users.FindAsync(AdminId);

            if (admin == null || admin.Role != UserRole.Admin) return false;
            _context.AccountApprovalRequests.Remove(request);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
