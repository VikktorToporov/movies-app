using movies_api.Database;
using movies_api.DTO;
using movies_api.Dtos;
using movies_api.Entities;

namespace movies_api.Services
{
    public class MedialistService : IMedialistService
    {
        private readonly DataContext context;

        public MedialistService(DataContext context)
        {
            this.context = context;
        }

        public IQueryable<MedialistReturnDTO> GetAll(int userId, string? keyword, bool? isPrivate)
        {
            IQueryable<Medialist> medialists = null;

            if (userId != 0)
            {
                medialists = context.Medialists.Where(x => x.UserId == userId);

                if (keyword != null)
                {
                    IQueryable<Medialist> publicMedialists = context.Medialists.Where(x => x.Private != true);

                    if (publicMedialists.Any())
                    {
                        if (medialists.Any())
                        {
                            medialists = medialists.Union(publicMedialists);
                        }
                        else
                        {
                            medialists = publicMedialists;
                        }
                    }
                }
            }
            else
            {
                medialists = context.Medialists.Where(x => x.Private != true);
            }

            if (keyword != "" && keyword != null)
            {
                medialists = medialists.Where(x => x.Name.Contains(keyword));
            }

            if (isPrivate != null)
            {
                medialists = medialists.Where(x => x.Private == isPrivate);
            }

            IQueryable<MedialistReturnDTO> dtoList = medialists.Select(x => new MedialistReturnDTO() { 
                Id = x.Id,
                Name = x.Name,
                UserId = x.UserId,
                Private = x.Private,
                MovieCount = x.Movies.Count,
            });

            return dtoList;
        }
        public IQueryable<MedialistReturnDTO> GetById(int userId, int medialistId)
        {
            IQueryable<Medialist> medialists = context.Medialists.Where(x => x.UserId == userId && x.Id == medialistId);

            IQueryable<MedialistReturnDTO> dtoList = medialists.Select(x => new MedialistReturnDTO()
            {
                Id = x.Id,
                Name = x.Name,
                UserId = x.UserId,
                Private = x.Private,
                MovieCount = x.Movies.Count
            });

            return dtoList;
        }


        public async Task<int> Add(MedialistUpdateDTO dto)
        {
            Medialist medialist = await DTOtoEntityMapper(dto);

            if (medialist.User == null)
            {
                return 0;
            }

            await context.Medialists.AddAsync(medialist);

            await context.SaveChangesAsync();

            return medialist.Id;
        }

        public async Task<bool> Update(MedialistUpdateDTO dto)
        {
            Medialist media = await DTOtoEntityMapper(dto); 

            if (media.User == null)
            {
                return false;
            }

            context.Medialists.Update(media);

            await context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Delete(int id)
        {
            bool result = false;

            Medialist playlist = context.Medialists.FirstOrDefault(x => x.Id == id);

            if (playlist != null)
            {
                context.Medialists.Remove(playlist);
                await context.SaveChangesAsync();
                result = true;
            };

            return result;
        }

        public async Task<bool> AddOrRemoveMovie(int movieId, int medialistId)
        {
            Movie movie = context.Movies.FirstOrDefault(x => x.Id == movieId);
            Medialist medialist = context.Medialists.FirstOrDefault(x => x.Id == medialistId);

            bool updated = false;

            if (movie != null && medialist != null)
            {
                XRefMovieMedialist xRefMoviePlaylist = context.XRefMoviesMedialists.Where(x => x.Movie.Id == movieId && x.Medialist.Id == medialistId).FirstOrDefault();

                if (xRefMoviePlaylist == null)
                {
                    XRefMovieMedialist newXRefMoviePlaylist = new()
                    {
                        Medialist = medialist,
                        Movie = movie,
                        CreateDate = DateTime.Now,
                    };

                    context.XRefMoviesMedialists.Add(newXRefMoviePlaylist);

                    movie.XRefMoviesMedialists.Add(newXRefMoviePlaylist);
                    medialist.Movies.Add(newXRefMoviePlaylist);
                } else
                {
                    movie.XRefMoviesMedialists.Remove(xRefMoviePlaylist);
                    medialist.Movies.Remove(xRefMoviePlaylist);

                    context.XRefMoviesMedialists.Remove(xRefMoviePlaylist);
                }
               

                await context.SaveChangesAsync();

                updated = true;
            }

            return updated;
        }

        private async Task<Medialist> DTOtoEntityMapper(MedialistUpdateDTO dto)
        {
            Medialist medialist = new()
            {
                User = await context.Users.FindAsync(dto.UserId),
                Id = dto.Id,
                Private = dto.Private,
                Name = dto.Name
            };

            return medialist;
        }
    }
}
