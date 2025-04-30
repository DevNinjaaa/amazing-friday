using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public enum ApprovalStatus
    {
        Approved,
        Rejected,
        Pending
    }

    public class AccountApprovalRequest
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccountApprovalRequestId { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; } = null!;

        [Required]
        public DateTime RequestedAt { get; set; }
    }

}
