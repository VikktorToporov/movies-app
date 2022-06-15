using movies_api.DTO;
using movies_api.Dtos;
using movies_api.Enums;

namespace movies_api.Services
{
    public interface IMovieService
    {
        Task<IQueryable<MovieReturnDTO>> GetAll(int userId, int medialistId, string searchKeyword, int[]? genreIds, bool? isYourRatingNull, SortColumn? sortColumn, SortOrder? sortOrder);

        Task<int> Add(MovieUpdateDTO dto);

        Task<bool> Update(MovieUpdateDTO dto);

        Task<bool> Delete(int id);
    }
}
