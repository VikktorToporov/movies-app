using movies_api.Database;
using movies_api.Entities;

namespace movies_api.Services
{
    public class GenreService : IGenreService
    {

        private readonly DataContext context;

        public GenreService(DataContext context)
        {
            this.context = context;
        }

        public IQueryable<Genre> GetAll(int userId)
        {
            IQueryable<Genre> genres = context.Genres.Where(x => x.UserId == userId);

            return genres;
        }
    }
}
