namespace movies_api.DTO
{
    public class MovieUpdateDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int? Year { get; set; }

        public string Description { get; set; } = string.Empty;

        public int? Runtime { get; set; }

        public string ParentRating { get; set; } = string.Empty;

        public double? ImdbRating { get; set; }

        public double? YourRating { get; set; }

        public string Link { get; set; } = string.Empty;

        public string YoutubeTrailer { get; set; } = string.Empty;

        public string Director { get; set; } = string.Empty;

        public string Stars { get; set; } = string.Empty;

        public string Poster { get; set; } = string.Empty;

        public List<string>? Genres { get; set; }

        public int UserId { get; set; }

        public List<int>? MedialistIds { get; set; }
    }
}
