using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public class Feedback
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FeedbackId { get; set; }

        [Required]
        public int CarId { get; set; }

        [ForeignKey("CarId")]
        public Car? Car { get; set; } = null!;

        [Required]
        public int RenterId { get; set; }

        [ForeignKey("RenterId")]
        public User? Renter { get; set; } = null!;

        public string? Comment { get; set; }

        [Range(1, 5, ErrorMessage = "Error!! Rating must be between 1 and 5.")]
        [Required]
        public int Rating { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}
