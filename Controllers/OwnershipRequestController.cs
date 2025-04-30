using CarShare.Models;
using CarShare.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CarShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OwnershipRequestController : ControllerBase
    {
        private readonly ICarOwnershipRequest _ownershipRequestService;

        public OwnershipRequestController(ICarOwnershipRequest ownershipRequestService)
        {
            _ownershipRequestService = ownershipRequestService;
        }

        // GET: api/OwnershipRequest
        [HttpGet]
        public async Task<ActionResult<List<AccountApprovalRequest>>> GetAllRequests()
        {
            var requests = await _ownershipRequestService.GetAllOwnershipRequestsAsync();
            return Ok(requests);
        }

        // POST: api/OwnershipRequest
        [HttpPost]
        public async Task<ActionResult<AccountApprovalRequest>> SubmitRequest([FromBody] AccountApprovalRequest request)
        {
            var created = await _ownershipRequestService.AddOwnershipRequestAsync(request);

            if (created)
            {
                // Return 201 Created with the request object
                return CreatedAtAction(nameof(SubmitRequest), new { id = request.AccountApprovalRequestId }, request);
            }
            else
            {
                // Return 400 Bad Request or other appropriate response
                return BadRequest("Failed to submit ownership request.");
            }
        }


        // PUT: api/OwnershipRequest/accept
        [HttpPut("accept")]
        public async Task<IActionResult> AcceptRequest([FromBody] AccountApprovalRequest request, [FromQuery] int adminId)
        {
            var success = await _ownershipRequestService.AcceptAccountApprovalRequestAsync(request, adminId);
            if (!success)
                return BadRequest("Failed to approve the request.");

            return Ok("Request approved.");
        }

        // PUT: api/OwnershipRequest/reject
        [HttpPut("reject")]
        public async Task<IActionResult> RejectRequest([FromBody] AccountApprovalRequest request, [FromQuery] int adminId)
        {
            var success = await _ownershipRequestService.RejectAccountRequestAsync(request, adminId);
            if (!success)
                return BadRequest("Failed to reject the request.");

            return Ok("Request rejected.");
        }
    }
}
