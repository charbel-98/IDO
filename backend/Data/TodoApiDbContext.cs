using Microsoft.EntityFrameworkCore;
using Models;

namespace TodoApi.Data
{
    public class TodoApiDbContext : DbContext
    {
        public TodoApiDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Todo> TodoItems { get; set; }
    }
}
