namespace Server;

using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Server.DbModels;

public class TodoDb : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Todo> Todos { get; set; }

    public TodoDb() { }

    public TodoDb(DbContextOptions<TodoDb> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        modelBuilder.Entity<User>()
            .HasMany(user => user.Todos)
            .WithOne(todo => todo.User)
            .HasForeignKey(todo => todo.UserId);

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