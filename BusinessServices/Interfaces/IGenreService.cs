using movies_api.Entities;

namespace movies_api.Services
{
    public interface IGenreService
    {
        IQueryable<Genre> GetAll(int userId);
    }
}
