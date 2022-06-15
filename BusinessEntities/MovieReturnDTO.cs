using movies_api.Entities;

namespace movies_api.Dtos
{
    public class MovieReturnDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int? Year { get; set; }

        public string Description { get; set; }

        public int? Runtime { get; set; }

        public string ParentRating { get; set; }

        public double? ImdbRating { get; set; }

        public double? YourRating { get; set; }

        public string Link { get; set; }

        public string YoutubeTrailer { get; set; }

        public string Director { get; set; }

        public string Stars { get; set; }

        public string Poster { get; set; }

        public List<Genre> Genres { get; set; }

        public IEnumerable<XRefMovieMedialistDTO>? XRefMoviesMedialists { get; set; }

        public int UserId { get; set; }
    }
}
