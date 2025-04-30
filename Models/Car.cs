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
        public required string CarType { get; set; }
        public DateTime AvailableAt { get; set; }

        public int Year { get; set; }

        [Required]
        public TransmissionType Transmission { get; set; }

        public CarPost? CarPost { get; set; }
    }


}