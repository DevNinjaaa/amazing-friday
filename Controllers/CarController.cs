using CarShare.Models;
using CarShare.Models.DTOs;
using CarShare.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CarShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarController : ControllerBase
    {
        private readonly ICarRepository _carRepository;

        public CarController(ICarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        // ----------------------
        // Car-related Endpoints
        // ----------------------

        [HttpGet("owner/{ownerId}")]
        public async Task<ActionResult<List<Car>>> GetCarsByOwner(int ownerId)
        {
            var cars = await _carRepository.GetAllCarsByOwnerAsync(ownerId);
            return Ok(cars);
        }

        [HttpGet("available")]
        public async Task<ActionResult<List<Car>>> GetAvailableCars(
            [FromQuery] string? carType,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice)
        {
            var cars = await _carRepository.GetAvailableCarsAsync(carType, minPrice, maxPrice);
            return Ok(cars);
        }

        [HttpPost]
        public async Task<IActionResult> AddCar([FromBody] Car car)
        {
            var success = await _carRepository.AddCarAsync(car);
            if (!success) return BadRequest("Invalid car or owner.");
            return Ok("Car added successfully.");
        }

        [HttpPut("{carId}")]
        public IActionResult UpdateCar(int carId, [FromBody] CarUpdateDTO updateDTO)
        {
            _carRepository.UpdateCar(carId, updateDTO);
            return Ok("Car updated successfully.");
        }

        [HttpDelete("{carId}")]
        public async Task<IActionResult> DeleteCar(int carId)
        {
            var success = await _carRepository.DeleteCarAsync(carId);
            if (!success) return BadRequest("Car could not be deleted (might be rented).");
            return Ok("Car deleted successfully.");
        }

        // -------------------------
        // CarPost-related Endpoints
        // -------------------------

        [HttpPost("post")]
        public async Task<IActionResult> CreateCarPost([FromBody] CarPost carPost)
        {
            var success = await _carRepository.CreateCarPostAsync(carPost);
            if (!success) return BadRequest("Car post creation failed.");
            return Ok("Car post created successfully.");
        }

        [HttpPut("post/{postId}")]
        public async Task<IActionResult> UpdateCarPost(int postId, [FromBody] CarPostUpdateDTO updatedPost, [FromQuery] int ownerId)
        {
            var success = await _carRepository.UpdateCarPost(postId, updatedPost, ownerId);
            if (!success) return BadRequest("Failed to update car post.");
            return Ok("Car post updated successfully.");
        }

        [HttpDelete("post/{postId}")]
        public async Task<IActionResult> DeleteCarPost(int postId, [FromQuery] int ownerId)
        {
            var success = await _carRepository.DeleteCarPost(postId, ownerId);
            if (!success) return BadRequest("Failed to delete car post.");
            return Ok("Car post deleted successfully.");
        }

        [HttpGet("posts/{ownerId}")]
        public async Task<ActionResult<List<CarPost>>> ListCarPosts(int ownerId)
        {
            var posts = await _carRepository.ListCarPost(ownerId);
            return Ok(posts);
        }
    }
}
