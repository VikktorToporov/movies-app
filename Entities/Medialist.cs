using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace movies_api.Entities
{
    public class Medialist
    {
        public Medialist()
        {
            this.Movies = new List<XRefMovieMedialist>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        public bool Private { get; set; } = false;

        public List<XRefMovieMedialist> Movies { get; set; }
    }
}
