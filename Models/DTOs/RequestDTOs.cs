using CarShare.Models;

namespace CarShare.DTOs
{
    public class RequestDto
    {
        public RequestType RequestType { get; set; }

        public DateTime RequestedAt { get; set; }

        public int? CarPostId { get; set; }

    }
}
