namespace DuniceCase.Dtos.EventDtos
{
    public class AddEventDto
    {
        public required string Title { get; set; }
        public string[]? Media { get; set; }
        public int Author { get; set; }
        public required DateTime EventDate { get; set; }
        public string? Description { get; set; } = "";
        public required string Place { get; set; }
        public int[]? Members { get; set; }

    }
}
