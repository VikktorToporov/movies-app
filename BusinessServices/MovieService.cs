using Microsoft.EntityFrameworkCore;
using movies_api.Database;
using movies_api.DTO;
using movies_api.Dtos;
using movies_api.Entities;
using movies_api.Enums;
using System.Collections;
using System.Reflection;

namespace movies_api.Services
{
    public class MovieService : IMovieService
    {
        private readonly DataContext context;

        public MovieService(DataContext datacontext)
        {
            this.context = datacontext;
        }

        public async Task<int> Add(MovieUpdateDTO dto)
        {
            // convert to movie model
            Movie movie = DTOtoEntity(dto);

            if (movie.User == null)
            {
                return 0;
            }

            if (dto.Genres != null && dto.Genres.Any())
            {
                this.AddGenre(movie, dto.Genres);
            }

            await context.Movies.AddAsync(movie);

            await context.SaveChangesAsync();

            return movie.Id;
        }

        public async Task<IQueryable<MovieReturnDTO>> GetAll(int userId, int medialistId, string? searchKeyword, int[]? genreIds, bool? isYourRatingNull, SortColumn? sortColumn, SortOrder? sortOrder)
        {
            // Select all movies in the db
            IQueryable<Movie> movies = context.Movies;

            if (medialistId != 0)
            {
                Medialist medialist = await context.Medialists.Where(m => m.Id == medialistId).FirstOrDefaultAsync();

                if (medialist.Private != true || medialist.UserId == userId)
                {
                    movies = movies.Where(m => m.XRefMoviesMedialists.Any(xref => xref.Medialist.Id == medialistId));
                }
            }
            else if (userId != 0)
            {
               movies = movies.Where(x => x.UserId == userId);
            }           

            movies = this.ApplyFiltering(movies, medialistId, genreIds, searchKeyword, isYourRatingNull);

            // Create return dto object
            IQueryable<MovieReturnDTO> all = movies.Select(x => new MovieReturnDTO()
            {
                Id = x.Id,
                Name = x.Name,
                Year = x.Year,
                Description = x.Description,
                Runtime = x.Runtime,
                ParentRating = x.ParentRating,
                ImdbRating = x.ImdbRating,
                YourRating = x.YourRating,
                Link = x.Link,
                YoutubeTrailer = x.YoutubeTrailer,
                Director = x.Director,
                Stars = x.Stars,
                Poster = x.Poster,
                Genres = x.Genres,
                XRefMoviesMedialists = x.XRefMoviesMedialists.Select(y => new XRefMovieMedialistDTO()
                {
                    Id = y.Id,
                    MedialistId = y.Medialist.Id,
                    MedialistName = y.Medialist.Name,
                    AddDate = y.CreateDate
                }),
                UserId = x.UserId,
            });

            all = ApplySorting(all, sortColumn, sortOrder);

            return all;
        }

        public async Task<bool> Update(MovieUpdateDTO dto)
        {
            Movie movie;

            if (dto != null && dto.Genres != null)
            {
                movie = context.Movies.Where(x => x.Id == dto.Id)
                    .Include(x => x.Genres)
                    .Include(x => x.User)
                    .Include(x => x.XRefMoviesMedialists)
                    .FirstOrDefault();

                foreach (Genre genre in movie.Genres.ToList())
                {
                    movie.Genres.Remove(genre);
                }

                if (dto.Genres.Any())
                {
                    this.AddGenre(movie, dto.Genres);
                }

                foreach (PropertyInfo prop in movie.GetType().GetProperties())
                {
                    // allow only string type properties
                    if (!typeof(IEnumerable).IsAssignableFrom(prop.PropertyType) || prop.PropertyType == typeof(string))
                    {
                        if (prop.Name.ToLower() != "user")
                        {
                            PropertyInfo propInfoDBObj = movie.GetType().GetProperties().FirstOrDefault(f => f.Name.ToLower() == prop.Name.ToLower());
                            PropertyInfo propInfoDTO = dto.GetType().GetProperties().FirstOrDefault(f => f.Name.ToLower() == prop.Name.ToLower());

                            var propValueDBObj = propInfoDBObj.GetValue(movie, null);
                            var propValueDTO = propInfoDTO.GetValue(dto, null);

                            propInfoDBObj.SetValue(movie, propValueDTO, null);
                        }
                    }
                }
            }
            // if no genres
            else
            {
                movie = DTOtoEntity(dto);

                if (movie.User == null)
                {
                    return false;
                }
            }

            context.Movies.Update(movie);

            await context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> Delete(int id)
        {
            bool deleted = false;

            Movie movie = context.Movies.FirstOrDefault(x => x.Id == id);

            if (movie != null)
            {
                context.Movies.Remove(movie);
                await context.SaveChangesAsync();
                deleted = true;
            };

            return deleted;
        }

        // Convert movieDto to movie
        private Movie DTOtoEntity(MovieUpdateDTO dto)
        {
            User user = context.Users.Where(x => x.Id == dto.UserId).FirstOrDefault();

            Movie movie = new()
            {
                User = user,
                Name = dto.Name,
                Description = dto.Description,
                Runtime = dto.Runtime,
                ParentRating = dto.ParentRating,
                ImdbRating = dto.ImdbRating,
                YourRating = dto.YourRating,
                Link = dto.Link,
                YoutubeTrailer = dto.YoutubeTrailer,
                Director = dto.Director,
                Stars = dto.Stars,
                Poster = dto.Poster,
                Year = dto.Year,
                Id = dto.Id
            };

            return movie;
        }

        private void AddGenre(Movie movie, List<string> receivedGenres)
        {
            foreach (string genreName in receivedGenres)
            {
                Genre? genre = context.Genres.Where(x => x.Name.ToLower() == genreName.ToLower()).FirstOrDefault();
                if (genre != null)
                {
                    movie.Genres.Add(genre);
                }
                else
                {
                    Genre newGenre = new()
                    {
                        Name = genreName,
                        User = movie.User,
                    };

                    context.Genres.Add(newGenre);

                    movie.Genres.Add(newGenre);
                }
            }
        }

        private IQueryable<Movie> ApplyFiltering(IQueryable<Movie> movies, int medialistId, int[]? genreIds, string? searchKeyword, bool? isYourRatingNull)
        {
            if (medialistId != 0)
            {
                List<int> xRefMovieMedialistIds = context.XRefMoviesMedialists.Where(z => z.Medialist.Id == medialistId).Select(x => x.Id).ToList();

                if (xRefMovieMedialistIds != null && xRefMovieMedialistIds.Any())
                {
                    movies = movies.Where(x => x.XRefMoviesMedialists.Any(xref => xRefMovieMedialistIds.Any(id => id == xref.Id)));
                }
                else
                {
                    movies = Enumerable.Empty<Movie>().AsQueryable();
                }
            }

            if (genreIds != null && genreIds.Any())
            {
                List<int> genres = context.Genres.Where(z => genreIds.Contains(z.Id)).Select(z => z.Id).ToList();

                if (genres != null && genres.Any())
                {
                    movies = movies.Where(x => x.Genres.Any(genre => genres.Any(z => z == genre.Id)));
                }
                else
                {
                    movies = Enumerable.Empty<Movie>().AsQueryable();
                }
            }

            if (searchKeyword != "" && searchKeyword != null)
            {
                movies = movies.Where(x => x.Name.Contains(searchKeyword) || x.Director.Contains(searchKeyword) || x.Stars.Contains(searchKeyword));
            }

            if (isYourRatingNull != null)
            {
                if (isYourRatingNull == true)
                {
                    movies = movies.Where(x => x.YourRating.HasValue);
                }
                else
                {
                    movies = movies.Where(x => !x.YourRating.HasValue);
                }

            }

            return movies;
        }

        private static IQueryable<MovieReturnDTO> ApplySorting(IQueryable<MovieReturnDTO> query, SortColumn? sortColumn, SortOrder? sortOrder)
        {
            if (sortColumn != null)
            {
                switch (sortColumn)
                {
                    case SortColumn.ImdbRating:
                        {
                           query = sortOrder == SortOrder.asc ? query.OrderBy(x => x.ImdbRating) : query.OrderByDescending(x => x.ImdbRating);
                        }
                        break;
                    case SortColumn.YourRating:
                        query = sortOrder == SortOrder.asc ? query.OrderBy(x => x.YourRating) : query.OrderByDescending(x => x.YourRating);
                        break;
                    case SortColumn.Year:
                        query = sortOrder == SortOrder.asc ? query.OrderBy(x => x.Year) : query.OrderByDescending(x => x.Year);
                        break;
                }
            }

            return query;
        }
    }
}

