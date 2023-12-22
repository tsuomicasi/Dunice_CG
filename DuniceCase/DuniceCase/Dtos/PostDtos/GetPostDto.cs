namespace DuniceCase.Dtos.PostDtos
{
    public class GetPostDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string[] Media { get; set; }
        public int Likes { get; set; }
        public int Author { get; set; }
        public string[] Tags { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now.ToUniversalTime();
    }
}
