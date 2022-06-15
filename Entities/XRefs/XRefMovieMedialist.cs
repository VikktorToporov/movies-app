using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace movies_api.Entities
{
    public class XRefMovieMedialist
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }

        public DateTime CreateDate { get; set; }

        public Movie Movie { get; set; }

        public Medialist Medialist { get; set; }
    }
}
