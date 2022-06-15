
using movies_api.DTO;
using movies_api.Entities;

namespace movies_api.Services
{
    public interface IUserService
    { 
        Task<int> Register(User user);

        int Login(LoginDTO dto);
    }
}
