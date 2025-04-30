using Microsoft.EntityFrameworkCore;
using CarShare.Models;
namespace CarShare.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<AccountApprovalRequest> AccountApprovalRequests { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<CarPost> CarPosts { get; set; }
        public DbSet<CarProposal> CarProposals { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<PostApprovalRequest> PostApprovalRequest { get; set; }
        public DbSet<User> Users { get; set; }


    }
}
