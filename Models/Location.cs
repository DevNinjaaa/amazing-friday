using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public class Location
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LocationId { get; set; }

        [Required]
        [StringLength(100)]
        public required string Country { get; set; }

        [Required]
        [StringLength(100)]
        public required string City { get; set; }

        [Required]
        [StringLength(250)]
        public required string Address { get; set; }
    }
}