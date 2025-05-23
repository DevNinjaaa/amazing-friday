using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public class CarPost
    {
        [Key]
        public int CarPostId { get; set; }

        [Required]
        public required int CarId { get; set; }

        [ForeignKey("CarId")]
        public Car? Car { get; set; }

        [Required]
        public int OwnerId { get; set; }

        [ForeignKey("OwnerId")]
        public User? Owner { get; set; }

        [Required]
        public required string Title { get; set; }

        [Required]
        public string? Description { get; set; }

        [Required]
        public int LocationId { get; set; }

        [ForeignKey("LocationId")]
        public Location? Location { get; set; }

        [Required]
        public RentalStatus RentalStatus { get; set; }

        [Required]
        public DateTime AvailableFrom { get; set; }

        [Required]
        public DateTime AvailableTo { get; set; }
        public ApprovalStatus ApprovalStatus { get; set; }
    }

}
