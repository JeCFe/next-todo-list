namespace Server;

using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Server.DbModels;

public class TodoContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Todo> Todos { get; set; }

    public TodoContext() { }

    public TodoContext(DbContextOptions<TodoContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        modelBuilder.Entity<Todo>(entity =>
        {
            entity.HasKey(k => k.Id);
        });
        modelBuilder.Entity<User>(e =>
        {
            e.HasKey(k => k.Id);
        });
    }
}