using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public enum RequestType
    {
        PlatformPoster,
        CarPost
    }
    public enum ApprovalStatus
    {
        Accepted,
        Rejected,
        Pending
    }

    public class Request
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RequestId { get; set; }
        [Required]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; } = null!;
        public required RequestType RequestType;
        public DateTime RequestedAt { get; set; }
        [Required]
        public int? CarPostId { get; set; } = null!;

        [ForeignKey("CarPost")]
        public CarPost? CarPost { get; set; } = null!;

        public ApprovalStatus ApprovalStatus { get; set; }
    }
}
