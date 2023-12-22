namespace DuniceCase.Dtos.PostDtos
{
    public class UpdatePostDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string[]? Media { get; set; }
        public int? Likes { get; set; }
        public string[]? Tags { get; set; }
    }
}
