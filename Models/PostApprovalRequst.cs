using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{

    public class PostApprovalRequest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PostApprovalRequestId { get; set; }

        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; } = null!;

        public required int CarPostId { get; set; }
        [ForeignKey("CarPostId")]
        public CarPost? CarPost { get; set; } = null!;

        public DateTime RequestedAt { get; set; }

        public ApprovalStatus IsApproved { get; set; }
    }
}
