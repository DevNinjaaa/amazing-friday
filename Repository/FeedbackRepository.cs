using CarShare.Data;
using CarShare.Models;
using Microsoft.EntityFrameworkCore;

namespace CarShare.Repository
{
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly AppDbContext _context;

        public FeedbackRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Feedback>> GetAllFeedbackOnCarAsync(int carId)
        {
            return await _context.Feedbacks
                                 .Where(f => f.CarId == carId)
                                 .ToListAsync();
        }
        public async Task AddFeedbackOnCarAsync(Feedback feedback)
        {
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateFeedbackAsync(Feedback feedback)
        {
            _context.Feedbacks.Update(feedback);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteFeedBackAsync(int feedbackId)
        {
            var feedback = await _context.Feedbacks.FindAsync(feedbackId);
            if (feedback != null)
            {
                _context.Feedbacks.Remove(feedback);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
