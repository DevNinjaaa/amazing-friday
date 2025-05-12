using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CarShare.Models.DTOs;
namespace CarShare.Models
{
    public enum UserRole
    {
        Admin,
        User
    }

    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [Required]
        public required string Username { get; set; }

        [Required]
        public required string Email { get; set; }

        [Required]
        public required string PasswordHash { get; set; }

        [Required]
        public UserRole Role { get; set; } = UserRole.User;

        [Required]
        public bool IsCarOwner { get; set; } = false;

        [Required]
        public bool IsRenter { get; set; } = false;

        public ApprovalStatus? CarOwnerApprovalStatus { get; set; }

        public ICollection<CarPost>? CarPosts { get; set; }
        public ICollection<CarProposal>? Proposals { get; set; }
        public ICollection<Car>? Car { get; set; }

    }
}
