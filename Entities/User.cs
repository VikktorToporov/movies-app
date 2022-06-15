using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace movies_api.Entities
{
    public class User
    {
        /*
        public User()
        {
            this.Movies = new List<Movie>();
            this.Playlists = new List<Playlist>();
        }*/

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}
