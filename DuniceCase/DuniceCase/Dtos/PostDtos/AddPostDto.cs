namespace DuniceCase.Dtos.PostDtos
{
    public class AddPostDto
    {
        public required string Title { get; set; }
        public string? Description { get; set; } = "";
        public string[]? Media { get; set; }
        public int Author { get; set; }
        public required string[] Tags { get; set; }
    }
}
