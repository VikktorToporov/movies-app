using Microsoft.EntityFrameworkCore;
using movies_api.Database;
using movies_api.DTO;
using movies_api.Entities;

namespace movies_api.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext context;

        public UserService(DataContext context)
        {
            this.context = context;
        }

        public async Task<int> Register(User user)
        {

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            context.Users.Add(user);

            await context.SaveChangesAsync();

            return user.Id;
        }

        public int Login(LoginDTO dto)
        {
            User? user = context.Users.Where(x => x.Username == dto.Username).FirstOrDefault();

            if (user != null)
            {

                if (BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                {
                    return user.Id;
                }
            }



            return 0;
        }
    }
}
