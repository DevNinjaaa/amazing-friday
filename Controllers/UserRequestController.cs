using System.Security.Claims;
using CarShare.DTOs;
using CarShare.Models;
using CarShare.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserRequestController : ControllerBase
    {
        private readonly IUserRequest _UserRequestService;

        public UserRequestController(IUserRequest _UserRequest)
        {
            _UserRequestService = _UserRequest;
        }

        // GET: api/OwnershipRequest
        [HttpGet("car_posts")]
        public async Task<ActionResult<List<Request>>> GetAllCarPostsRequests()
        {
            var requests = await _UserRequestService.GetAllCarPostsRequestsAsync();
            return Ok(requests);
        }
        [HttpGet("car_posters")]
        public async Task<ActionResult<List<Request>>> GetAllCarPostersRequests()
        {
            var requests = await _UserRequestService.GetAllCarPosterRequestsAsync();
            return Ok(requests);
        }

        // POST: api/Request
        [HttpPost]
        public async Task<ActionResult<Request>> AddRequest([FromBody] RequestDto requestDto)
        {

            foreach (var claim in User.Claims)
            {
                Console.WriteLine($"Claim: {claim.Type} - {claim.Value}");
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized(new { Message = "User not authenticated" });
            }


            var request = new Request
            {
                UserId = Int32.Parse(userId),
                RequestType = requestDto.RequestType,
                RequestedAt = requestDto.RequestedAt,
                CarPostId = requestDto.CarPostId == null ? null : requestDto.CarPostId,
                ApprovalStatus = ApprovalStatus.Pending
            };

            var success = await _UserRequestService.AddRequestAsync(request);

            if (success)
                return CreatedAtAction(nameof(AddRequest), new { id = request.RequestId }, request);

            return BadRequest("Failed to submit request.");
        }


        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRequestStatus(int id, [FromBody] RequestStatusUpdateDto dto)
        {
            if (dto == null || dto.Status is not ("Approved" or "Rejected"))
                return BadRequest("Invalid request status.");

            var userIdClaim = User.FindFirst("userId") ?? User.FindFirst(ClaimTypes.NameIdentifier);
            var roleClaim = User.FindFirst(ClaimTypes.Role);

            if (userIdClaim == null || roleClaim?.Value != "Admin")
                return Unauthorized("Only admins can update requests.");

            if (!int.TryParse(userIdClaim.Value, out int adminId))
                return Unauthorized("Invalid admin ID.");

            var request = await _UserRequestService.GetRequestByIdAsync(id);
            if (request == null)
                return NotFound("Request not found.");

            var success = dto.Status == "Approved"
                ? await _UserRequestService.AcceptRequestAsync(request, adminId)
                : await _UserRequestService.RejectRequestAsync(request, adminId);

            if (!success)
                return BadRequest($"Failed to update request status to {dto.Status}.");

            return Ok($"Request {dto.Status.ToLower()}.");
        }


    }

}
