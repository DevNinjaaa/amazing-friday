namespace CarShare.Models.DTOs
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public UserRole Role { get; set; }
        public bool CarOwner { get; set; }
        public bool Renting { get; set; }
    }
}