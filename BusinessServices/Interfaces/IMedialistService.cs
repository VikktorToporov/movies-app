using movies_api.DTO;
using movies_api.Dtos;

namespace movies_api.Services
{
    public interface IMedialistService
    {
        IQueryable<MedialistReturnDTO> GetAll(int userId, string keyword, bool? isPrivate);

        IQueryable<MedialistReturnDTO> GetById(int userId, int medialistId);

        Task<int> Add(MedialistUpdateDTO dto);

        Task<bool> Delete(int id);

        Task<bool> Update(MedialistUpdateDTO dto);

        Task<bool> AddOrRemoveMovie(int movieId, int medialistId);
    }
}
