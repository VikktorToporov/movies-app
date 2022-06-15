using Microsoft.AspNetCore.Mvc;
using movies_api.DTO;
using movies_api.Services;

namespace movies_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedialistController : Controller
    {
        private readonly IMedialistService service;

        public MedialistController(IMedialistService medialistservice)
        {
            service = medialistservice;
        }

        [HttpGet]
        public IActionResult GetAll(int userId = 0, string? keyword = null, bool? isPrivate = null)
        {
            IQueryable all = service.GetAll(userId, keyword, isPrivate);

            return Ok(all);
        }

        [HttpGet]
        [Route("GetById")]
        public IActionResult GetById(int userId, int medialistId)
        {
            IQueryable all = service.GetById(userId, medialistId);

            return Ok(all);
        }

        [HttpPost]
        public async Task<IActionResult> Add(MedialistUpdateDTO dto)
        {
            int id = await service.Add(dto);

            if (id != 0)
            {
                return Ok(id);
            }
            else return BadRequest("Wrong user id !!!");
        }

        [HttpPut]
        public async Task<IActionResult> Update(MedialistUpdateDTO dto)
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

        [HttpPut]
        [Route("AddOrRemoveMovie")]
        public async Task<IActionResult> AddOrRemoveMovie(int movieId, int playlistId)
        {
            bool added = await service.AddOrRemoveMovie(movieId, playlistId);
            if (added)
            {
                return this.Ok(added);
            }
            else return BadRequest("Wrong parameters !");
        }
    }
}
