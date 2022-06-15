namespace movies_api.DTO
{
    public class MedialistUpdateDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public int UserId { get; set; }

        public bool Private { get; set; } = false;
    }
}
