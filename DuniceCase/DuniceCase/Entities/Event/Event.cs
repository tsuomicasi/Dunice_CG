using System.Reflection;

namespace DuniceCase.Entities.Event
{
    public class Event
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public int Likes { get; set; }
        public string[] Media { get; set; }
        public int Author { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now.ToUniversalTime();
        public DateTime EventDate { get; set; }
        public string Description { get; set; }
        public string Place { get; set; }
        public int[] Members { get; set; }
    }
}
