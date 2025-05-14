using CarShare.Models;
using Microsoft.EntityFrameworkCore;
using CarShare.Data;
using CarShare.DTOs;

namespace CarShare.Repositories
{
    public class UserRequest : IUserRequest
    {
        private readonly AppDbContext _context;

        public UserRequest(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Request>> GetAllCarPostsRequestsAsync()
        {
            var CarPostsRequests = await _context.Requests
            .Where(c => c.RequestType == RequestType.CarPost)
            .ToListAsync();
            return CarPostsRequests;
        }
        public async Task<List<Request>> GetAllCarPosterRequestsAsync()
        {
            var CarPosterRequests = await _context.Requests
            .Where(c => c.RequestType == RequestType.CarPost)
            .ToListAsync();
            return CarPosterRequests;
        }

        public async Task<bool> AddRequestAsync(Request request)
        {
            Console.WriteLine("hi");
            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
                return false;
            request.ApprovalStatus = ApprovalStatus.Pending;
            await _context.Requests.AddAsync(request);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> AcceptRequestAsync(Request request, int AdminId)
        {
            var admin = await _context.Users.FindAsync(AdminId);
            var user = await _context.Users.FindAsync(request.UserId);

            // Validate admin and user
            if (admin == null || admin.Role != UserRole.Admin || user == null)
                return false;

            // Handle request types
            if (request.RequestType == RequestType.CarPost)
            {
                if (request.CarPostId != null)
                {
                    var post = await _context.CarPosts.FirstOrDefaultAsync(c => c.CarPostId == request.CarPostId);
                    if (post != null)
                    {
                        post.ApprovalStatus = ApprovalStatus.Accepted;
                        _context.CarPosts.Update(post);
                    }
                }
            }
            else if (request.RequestType == RequestType.PlatformPoster)
            {
                user.CarOwner = true;
                _context.Users.Update(user);
            }

            _context.Requests.Remove(request);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> RejectRequestAsync(Request request, int AdminId)
        {
            var admin = await _context.Users.FindAsync(AdminId);
            var user = await _context.Users.FindAsync(request.UserId);
            if (admin == null || admin.Role != UserRole.Admin || user == null)
                return false;

            _context.Requests.Remove(request);
            await _context.SaveChangesAsync();

            return true;
        }
        public Task<Request?> GetRequestByIdAsync(int requestId)
        {
            return _context.Requests
                .Include(r => r.User)
                .Include(r => r.CarPost)
                .FirstOrDefaultAsync(r => r.RequestId == requestId);
        }
    }

}
