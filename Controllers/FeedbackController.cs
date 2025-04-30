using CarShare.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackRepository _feedbackRepository;

        public FeedbackController(IFeedbackRepository feedbackRepository)
        {
            _feedbackRepository = feedbackRepository;
        }

        // GET: api/Feedback/car/5
        [HttpGet("car/{carId}")]
        public async Task<ActionResult<List<Feedback>>> GetAllFeedbackOnCar(int carId)
        {
            var feedbacks = await _feedbackRepository.GetAllFeedbackOnCarAsync(carId);
            return Ok(feedbacks);
        }

        // POST: api/Feedback
        [HttpPost]
        public async Task<IActionResult> AddFeedback([FromBody] Feedback feedback)
        {
            await _feedbackRepository.AddFeedbackOnCarAsync(feedback);
            return Ok("Feedback added successfully.");
        }

        // PUT: api/Feedback
        [HttpPut]
        public async Task<IActionResult> UpdateFeedback([FromBody] Feedback feedback)
        {
            await _feedbackRepository.UpdateFeedbackAsync(feedback);
            return Ok("Feedback updated successfully.");
        }

        // DELETE: api/Feedback/5
        [HttpDelete("{feedbackId}")]
        public async Task<IActionResult> DeleteFeedback(int feedbackId)
        {
            var success = await _feedbackRepository.DeleteFeedBackAsync(feedbackId);
            if (!success)
                return BadRequest("Feedback could not be deleted.");

            return Ok("Feedback deleted successfully.");
        }
    }
}
