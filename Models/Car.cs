using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public enum RentalStatus
    {
        Available,
        Rented
    }
    public enum TransmissionType
    {
        Manual,
        Automatic
    }

    [Table("Car")]
    public class Car
    {
        [Key]
        public int CarId { get; set; }

        [Required]
        public int OwnerId { get; set; }
        [Required]

        [ForeignKey("OwnerId")]
        public User? Owner { get; set; } = null!;

        [Required]
        public required string Brand { get; set; }

        [Required]
        public required string Model { get; set; }
        public bool IsRented { get; set; }

        [Required]
        public required string Category { get; set; }
        public DateTime AvailableAt { get; set; }
        public string? ImageUrl { get; set; }
        public int Year { get; set; }
        public double? Rating { get; set; }
        public int Reviews { get; set; }
        public required double PricePerDay { get; set; }
        public string? Description { get; set; }
        public string? LicensePlate { get; set; }
        public int Seats { get; set; }
        public string? FuelType { get; set; }

        [Required]
        public TransmissionType Transmission { get; set; }
        public required int Doors { get; set; }
        public CarPost? CarPost { get; set; }
        public ICollection<Feedback>? Feedbacks { get; set; }
    }


}