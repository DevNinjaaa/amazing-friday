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
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Request>> AddRequest([FromBody] RequestDto requestDto)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
                return Unauthorized("No token found.");

            var userIdClaim = User.FindFirst("userId") ?? User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
                return Unauthorized("User ID not found or invalid.");

            if (requestDto.RequestedAt == default)
                return BadRequest("Invalid or missing request date.");

            var request = new Request
            {
                UserId = userId,
                RequestType = requestDto.RequestType,
                RequestedAt = requestDto.RequestedAt,
                CarPostId = requestDto.RequestType == RequestType.CarPost ? requestDto.CarPostId : null,
                ApprovalStatus = ApprovalStatus.Pending
            };

            var success = await _UserRequestService.AddRequestAsync(request);

            if (success)
                return CreatedAtAction(nameof(AddRequest), new { id = request.RequestId }, request);

            return BadRequest("Failed to submit ownership request.");
        }



        // PUT: api/OwnershipRequest/accept
        [Authorize]
        [HttpPut("accept")]
        public async Task<IActionResult> AcceptRequest([FromBody] Request request)
        {
            if (request == null)
                return BadRequest("Invalid request payload.");

            // Get user ID and role from token
            var userIdClaim = User.FindFirst("userId") ?? User.FindFirst(ClaimTypes.NameIdentifier);
            var roleClaim = User.FindFirst(ClaimTypes.Role);

            if (userIdClaim == null || roleClaim == null || roleClaim.Value != "Admin")
                return Unauthorized("Only admins can approve requests.");

            if (!int.TryParse(userIdClaim.Value, out int adminId))
                return Unauthorized("Invalid admin ID.");

            var success = await _UserRequestService.AcceptRequestAsync(request, adminId);
            if (!success)
                return BadRequest("Failed to approve the request.");

            return Ok("Request approved.");
        }

        [Authorize]
        [HttpPut("reject")]
        public async Task<IActionResult> RejectRequest([FromBody] Request request)
        {
            if (request == null)
                return BadRequest("Invalid request payload.");

            var userIdClaim = User.FindFirst("userId") ?? User.FindFirst(ClaimTypes.NameIdentifier);
            var roleClaim = User.FindFirst(ClaimTypes.Role);

            if (userIdClaim == null || roleClaim == null || roleClaim.Value != "Admin")
                return Unauthorized("Only admins can reject requests.");

            if (!int.TryParse(userIdClaim.Value, out int adminId))
                return Unauthorized("Invalid admin ID.");

            var success = await _UserRequestService.RejectRequestAsync(request, adminId);
            if (!success)
                return BadRequest("Failed to reject the request.");

            return Ok("Request rejected.");
        }

    }
}
