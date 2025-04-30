using CarShare.Models;
using CarShare.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CarShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProposalController : ControllerBase
    {
        private readonly IProposalRepository _proposalRepository;

        public ProposalController(IProposalRepository proposalRepository)
        {
            _proposalRepository = proposalRepository;
        }

        // GET: api/Proposal
        [HttpGet]
        public async Task<ActionResult<List<CarProposal>>> GetAllProposals()
        {
            var proposals = await _proposalRepository.GetAllProposalsAsync();
            return Ok(proposals);
        }

        // GET: api/Proposal/5
        [HttpGet("{proposalId}")]
        public async Task<ActionResult<CarProposal>> GetProposalById(int proposalId)
        {
            var proposal = await _proposalRepository.GetProposalByIdAsync(proposalId);
            if (proposal == null)
                return NotFound();

            return Ok(proposal);
        }

        // POST: api/Proposal
        [HttpPost]
        public async Task<IActionResult> AddProposal([FromBody] CarProposal proposal)
        {
            await _proposalRepository.AddProposalAsync(proposal);
            return Ok("Proposal added successfully.");
        }

        // PUT: api/Proposal
        [HttpPut]
        public async Task<IActionResult> UpdateProposal([FromBody] CarProposal proposal)
        {
            await _proposalRepository.UpdateProposalAsync(proposal);
            return Ok("Proposal updated successfully.");
        }

        // DELETE: api/Proposal/5
        [HttpDelete("{proposalId}")]
        public async Task<IActionResult> DeleteProposal(int proposalId)
        {
            var success = await _proposalRepository.DeleteProposalAsync(proposalId);
            if (!success)
                return BadRequest("Proposal could not be deleted.");
            return Ok("Proposal deleted successfully.");
        }

        // PUT: api/Proposal/accept/5
        [HttpPut("accept/{proposalId}")]
        public async Task<IActionResult> AcceptProposal(int proposalId)
        {
            var success = await _proposalRepository.AcceptProposalAsync(proposalId);
            if (!success)
                return BadRequest("Could not accept the proposal.");

            return Ok("Proposal accepted.");
        }
    }
}
