namespace movies_api.Dtos
{
    public class MedialistReturnDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int UserId { get; set; }

        public bool Private { get; set; } = false;

        //public IEnumerable<MovieReturnForMedialistDTO> Movies { get; set; }

        public int MovieCount { get; set; }

    }
}
