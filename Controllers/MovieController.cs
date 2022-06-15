using Microsoft.AspNetCore.Mvc;
using movies_api.DTO;
using movies_api.Enums;
using movies_api.Services;

namespace movies_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : Controller
    {
        private readonly IMovieService service;

        public MovieController(IMovieService movieservice)
        {
            service = movieservice;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int userId = 0, int medialistId = 0, string? searchKeyword = null, [FromQuery] int[]? genreIds = null, bool? isYourRatingNull = null, SortColumn? sortColumn = null, SortOrder? sortOrder = SortOrder.asc)
        {
            IQueryable all = await service.GetAll(userId, medialistId, searchKeyword, genreIds, isYourRatingNull, sortColumn, sortOrder);

            return Ok(all);
        }

        [HttpPost]
        public async Task<IActionResult> Add(MovieUpdateDTO dto)
        {
            int id = await service.Add(dto);

            if (id != 0)
            {
                return Ok(id);
            }
            else return BadRequest("Wrong user id !!!");
        }

        [HttpPut]
        public async Task<IActionResult> Update(MovieUpdateDTO dto)
        {
            bool updated = await service.Update(dto);

            if (updated)
            {
                return Ok(updated);
            }
            else return BadRequest("Wrong user id !!!");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            bool deleted = await service.Delete(id);
            if (deleted)
            {
                return Ok(deleted);
            }
            else return BadRequest("Wrong user id !!!");
        }
    }
}
