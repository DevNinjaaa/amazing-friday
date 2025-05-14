using CarShare.Models.DTOs;
using CarShare.Models;


namespace CarShare.Repositories
{
    public interface ICarRepository
    {
        Task<List<string>> GetAllCarsLocations();
        Task<List<CarPost>> GetAvailableCarsAsync();
        Task<List<Car>> GetCars();
        void UpdateCar(int carId, CarUpdateDTO updateDTO);
        Task<bool> AddCarAsync(Car car);
        // Task<bool> DeleteCarAsync(int carId);
        // CarPost-related operations
        Task<Car?> GetCarByIdAsync(int id);
        Task<bool> CreateCarPostAsync(CarPost carPost);
        Task<bool> DeleteCarPost(int postId, int ownerId);
        Task<bool> UpdateCarPost(int postId, CarPostUpdateDTO updatedPost, int ownerId);
    }
}
