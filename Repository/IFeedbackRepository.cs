using CarShare.Models;

public interface IFeedbackRepository
{
    Task<List<Feedback>> GetAllFeedbackOnCarAsync(int CarId);
    Task AddFeedbackOnCarAsync(Feedback feedback);
    Task UpdateFeedbackAsync(Feedback feedback);
    Task<bool> DeleteFeedBackAsync(int feedbackId);
}
