using Microsoft.EntityFrameworkCore;

namespace MoviePortal.Models
{
    public class MovieContext : DbContext
    {
        public MovieContext(DbContextOptions<MovieContext> options)
            : base(options)
        {
        }

        public DbSet<MovieModel> Movie { get; set; }
        public DbSet<LoginModel> Login { get; set; }
    }
}