using DuniceCase.Entities.Event;
using Microsoft.Extensions.Hosting;

namespace DuniceCase.Data
{
    public class DataContext:DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Event> Events { get; set; }
        public DbSet<Post> Posts { get; set; }
    }
}
