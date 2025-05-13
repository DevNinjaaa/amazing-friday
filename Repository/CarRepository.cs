using CarShare.Data;
using CarShare.Models;
using Microsoft.EntityFrameworkCore;
using CarShare.Models.DTOs;
namespace CarShare.Repositories
{
    public class CarRepository : ICarRepository
    {
        private readonly AppDbContext _context;

        public CarRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<string>> GetAllCarsLocations()
        {
            return await _context.Locations.Select(c => c.City)
        .Distinct()
        .ToListAsync();
        }

        public async Task<List<Car>> GetAllCarsByOwnerAsync(int ownerId)
        {
            return await _context.Cars
                                 .Where(c => c.OwnerId == ownerId)
                                 .ToListAsync();
        }

        public async Task<List<Car>> GetAvailableCarsAsync(string? carType, decimal? minPrice, decimal? maxPrice)
        {
            return await _context.CarPosts
                .Where(cp => cp.RentalStatus == RentalStatus.Available)
                .Join(
                    _context.Cars,
                    post => post.CarId,
                    car => car.CarId,
                    (post, car) => car
                )
                .Where(car =>
                    (string.IsNullOrEmpty(carType) || car.Category == carType) &&
                    (!minPrice.HasValue || car.PricePerDay >= (double)minPrice.Value) &&
                    (!maxPrice.HasValue || car.PricePerDay <= (double)maxPrice.Value)
                )
                .ToListAsync();
        }


        public void UpdateCar(int carId, CarUpdateDTO updateDTO)
        {
            var car = _context.Cars.Find(carId);
            if (car == null)
            {
                throw new Exception("Car not found");
            }

            if (!string.IsNullOrEmpty(updateDTO.Brand))
            {
                car.Brand = updateDTO.Brand;
            }

            if (!string.IsNullOrEmpty(updateDTO.Model))
            {
                car.Model = updateDTO.Model;
            }

            if (!string.IsNullOrEmpty(updateDTO.CarType))
            {
                car.Category = updateDTO.CarType;
            }

            if (updateDTO.Year.HasValue)
            {
                car.Year = updateDTO.Year.Value;
            }

            if (updateDTO.Transmission.HasValue)
            {
                car.Transmission = updateDTO.Transmission.Value;
            }

            _context.SaveChanges();
        }


        public async Task<bool> AddCarAsync(Car car)
        {
            var user = await _context.Users.FindAsync(car.OwnerId);
            if (user == null || !user.CarOwner)
                return false;

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCarAsync(int carId)
        {
            var car = await _context.Cars
                                    .Include(c => c.CarPost)
                                    .FirstOrDefaultAsync(c => c.CarId == carId);

            if (car == null)
                return false;

            if (car.CarPost != null)
            {
                if (car.CarPost.RentalStatus == RentalStatus.Rented)
                    return false;

                _context.CarPosts.Remove(car.CarPost);
            }

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> CreateCarPostAsync(CarPost carPost)
        {
            var owner = await _context.Users.FindAsync(carPost.OwnerId);
            if (owner == null || !owner.CarOwner)
                return false;

            var car = await _context.Cars
                .Include(c => c.CarPost)
                .FirstOrDefaultAsync(c => c.CarId == carPost.CarId && c.OwnerId == carPost.OwnerId);

            if (car == null || car.CarPost != null)
                return false;

            _context.CarPosts.Add(carPost);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteCarPost(int postId, int ownerId)
        {
            var carPost = await _context.CarPosts
                .Include(p => p.Car)
                .FirstOrDefaultAsync(p => p.CarPostId == postId && p.OwnerId == ownerId);

            if (carPost == null || carPost.RentalStatus == RentalStatus.Rented)
                return false;

            _context.CarPosts.Remove(carPost);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateCarPost(int postId, CarPostUpdateDTO updatedPost, int ownerId)
        {
            var post = await _context.CarPosts
                                     .Include(p => p.Car)
                                     .FirstOrDefaultAsync(p => p.CarPostId == postId);

            if (post == null)
            {
                return false;
            }

            if (post.OwnerId != ownerId)
            {
                return false;
            }

            if (post.RentalStatus == RentalStatus.Rented)
            {
                return false;
            }

            if (!string.IsNullOrEmpty(updatedPost.Title))
                post.Title = updatedPost.Title;

            if (!string.IsNullOrEmpty(updatedPost.Description))
                post.Description = updatedPost.Description;

            if (updatedPost.LocationId.HasValue)
                post.LocationId = updatedPost.LocationId.Value;

            if (updatedPost.AvailableFrom.HasValue)
                post.AvailableFrom = updatedPost.AvailableFrom.Value;

            if (updatedPost.AvailableTo.HasValue)
                post.AvailableTo = updatedPost.AvailableTo.Value;

            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<List<CarPost>> ListCarPost(int ownerId)
        {
            return await _context.CarPosts
                .Where(p => p.OwnerId == ownerId)
                .Include(p => p.Car)
                .ToListAsync();
        }
    }
}
