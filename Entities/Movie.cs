using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace movies_api.Entities
{
    public class Movie
    {
        public Movie()
        {
            // Add initial value - empty array
            this.XRefMoviesMedialists = new List<XRefMovieMedialist>();
            this.Genres = new List<Genre>();
        }

        // Id is generated automatically
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
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

        public List<Genre> Genres { get; set; }

        public int UserId { get; set; }

        // Don't show in call response
        [JsonIgnore]
        public User User { get; set; }

        // Don't show in call response
        [JsonIgnore]
        public List<XRefMovieMedialist>? XRefMoviesMedialists { get; set; }
    }
}
