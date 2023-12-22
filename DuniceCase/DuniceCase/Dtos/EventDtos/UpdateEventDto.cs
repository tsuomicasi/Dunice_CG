namespace DuniceCase.Dtos.EventDtos
{
    public class UpdateEventDto
    {

        public string? Title { get; set; }
        public int? Likes { get; set; }
        public string[]? Media { get; set; }
        public DateTime? EventDate { get; set; }
        public string? Description { get; set; }
        public string? Place { get; set; }
        public int[]? Members { get; set; }


    }
}
