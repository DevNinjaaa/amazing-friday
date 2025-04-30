using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarShare.Models
{
    public enum ProposalStatus
    {
        Pending,
        Accepted,
        Rejected
    }

    public class CarProposal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CarProposalId { get; set; }

        [Required]
        public int RenterId { get; set; }

        [ForeignKey("RenterId")]
        public User? Renter { get; set; } = null!;

        [Required]
        public int CarId { get; set; }
        [ForeignKey("CarId")]

        [Required]
        public Car? Car { get; set; } = null!;
        public int CarPostId { get; set; }

        [ForeignKey("CarPostId")]
        public CarPost? CarPost { get; set; } = null!;
        public string? LicenseDocumentPath { get; set; }
        public string? ProposalDocumentPath { get; set; }
        public ProposalStatus Status { get; set; } = ProposalStatus.Pending;

        public DateTime SubmittedAt { get; set; } = DateTime.Now;
    }
}
