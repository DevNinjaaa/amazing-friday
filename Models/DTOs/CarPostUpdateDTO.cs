namespace CarShare.Models.DTOs
{

    public class CarPostUpdateDTO
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? LocationId { get; set; }
        public RentalStatus? RentalStatus { get; set; }
        public DateTime? AvailableFrom { get; set; }
        public DateTime? AvailableTo { get; set; }
        public decimal? RentalPrice { get; set; }
        public ApprovalStatus? ApprovalStatus { get; set; }
    }
}
