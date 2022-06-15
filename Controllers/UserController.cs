using Microsoft.AspNetCore.Mvc;
using movies_api.DTO;
using movies_api.Entities;
using movies_api.Services;

namespace movies_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService service;

        public UserController(IUserService userservice)
        {
            service = userservice;
        }

        [HttpPost]
        public async Task<IActionResult> Register(User user)
        {
            int id = await service.Register(user);
            return Ok(id);
        }

        [HttpPut]
        [Route("Login")]
        public IActionResult Login(LoginDTO dto)
        {
            int userId = service.Login(dto);

            if (userId != 0)
            {
                return Ok(userId);
            }

            else return Unauthorized();
        }
    }
}
