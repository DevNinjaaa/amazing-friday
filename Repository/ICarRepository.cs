using CarShare.Models.DTOs;
using CarShare.Models;


namespace CarShare.Repositories
{
    public interface ICarRepository
    {
        // Car-related operations
        Task<List<Car>> GetAllCarsByOwnerAsync(int ownerId);
        Task<List<Car>> GetAvailableCarsAsync(string? carType, decimal? minPrice, decimal? maxPrice);
        Task<bool> AddCarAsync(Car car);
        void UpdateCar(int carId, CarUpdateDTO updateDTO);
        Task<bool> DeleteCarAsync(int carId);

        // CarPost-related operations
        Task<bool> CreateCarPostAsync(CarPost carPost);
        Task<bool> DeleteCarPost(int postId, int ownerId);
        Task<bool> UpdateCarPost(int postId, CarPostUpdateDTO updatedPost, int ownerId);
        Task<List<CarPost>> ListCarPost(int ownerId);
        Task<List<string>> GetAllCarsLocations();
    }
}
