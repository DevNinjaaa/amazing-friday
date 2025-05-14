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
        [HttpGet("locations")]
        public async Task<ActionResult<List<string>>> GetAvailableLocations()
        {
            var locations = await _carRepository.GetAllCarsLocations();
            return Ok(locations);

        }
        [HttpGet("available_cars")]
        public async Task<ActionResult<List<CarPost>>> GetAvailableCars()
        {
            var cars = await _carRepository.GetAvailableCarsAsync();
            return Ok(cars);
        }
        [HttpGet]
        public async Task<ActionResult<List<Car>>> GetCars()
        {
            var cars = await _carRepository.GetCars();
            return Ok(cars);
        }

        [HttpPost]
        public async Task<IActionResult> AddCar([FromBody] Car car)
        {
            Console.WriteLine($"Received car data: {Newtonsoft.Json.JsonConvert.SerializeObject(car)}");

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data.");
            }
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
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCarById(int id)
        {
            var car = await _carRepository.GetCarByIdAsync(id);
            if (car == null)
            {
                return NotFound($"Car with ID {id} not found.");
            }
            return Ok(car);
        }

        [HttpPost("post")]
        public async Task<IActionResult> CreateCarPost([FromBody] CarPost carPost)
        {

            var success = await _carRepository.CreateCarPostAsync(carPost);
            if (!success) return BadRequest("Car post creation failed.");
            return Ok("Car post created successfully.");
        }
    }
}
