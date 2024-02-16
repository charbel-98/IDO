using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models;

namespace TodoApi.Data
{
    public class TodoApiDbContext : IdentityDbContext
    {
        public DbSet<Todo> TodoItems { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public TodoApiDbContext(DbContextOptions options) : base(options)
        {
        }

        
    }
}
