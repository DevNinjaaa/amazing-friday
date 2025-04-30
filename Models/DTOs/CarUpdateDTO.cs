namespace CarShare.Models.DTOs

{

    public class CarUpdateDTO
    {
        public string? Brand { get; set; }
        public string? Model { get; set; }
        public string? CarType { get; set; }
        public int? Year { get; set; }
        public TransmissionType? Transmission { get; set; }
    }
}