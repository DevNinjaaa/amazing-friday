using CarShare.Models;
using CarShare.Models.DTOs;
using CarShare.Repository;
using Microsoft.AspNetCore.Mvc;

namespace CarShare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return Ok(users);
        }

        // GET: api/User/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        // GET: api/User/gmail?email=example@gmail.com
        [HttpGet("gmail")]
        public async Task<ActionResult<User>> GetUserByGmail([FromQuery] string email)
        {
            var user = await _userRepository.GetUserByGmailAsync(email);
            if (user == null)
                return NotFound();

            return Ok(user);
        }


        // POST: api/User/add-admin-user
        [HttpPost("add-admin-user")]
        public async Task<ActionResult> AddAdminUser([FromBody] AdminDto user)
        {
            var admin = await _userRepository.AddAdminAsync(user);
            return CreatedAtAction(nameof(GetUserById), new { id = admin.UserId }, admin);
        }


        // PUT: api/User/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            if (id != user.UserId)
                return BadRequest("User ID mismatch.");

            var existingUser = await _userRepository.GetUserByIdAsync(id);
            if (existingUser == null)
                return NotFound();

            await _userRepository.UpdateUserAsync(user);
            return NoContent();
        }

        // DELETE: api/User/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deleted = await _userRepository.DeleteUserAsync(id);
            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
