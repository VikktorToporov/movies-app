using Microsoft.AspNetCore.Mvc;
using movies_api.Services;

namespace movies_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : Controller
    {
        private readonly IGenreService service;

        public GenreController(IGenreService genreservice)
        {
            service = genreservice;
        }

        [HttpGet]
        public IActionResult GetAll(int userId)
        {
            IQueryable all = service.GetAll(userId);

            return Ok(all);
        }
    }
}
