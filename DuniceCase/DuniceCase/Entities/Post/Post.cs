using System.Reflection;

namespace DuniceCase.Entities.Post;

public class Post
{
	public int Id { get; set; }
	public required string Title { get; set; }
	public string Description { get; set; }
	public string[] Media { get; set; }
	public int Likes { get; set; }
	public int Author { get; set; }
	public required string[] Tags { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.Now.ToUniversalTime();
}
